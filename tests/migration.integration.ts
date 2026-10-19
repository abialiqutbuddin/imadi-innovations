/** Check upgrades against existing content; use a disposable PostgreSQL database only. */
import assert from 'node:assert/strict'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import * as initial from '../src/payload/migrations/postgres/20261017_092407_initial_schema'
import * as labels from '../src/payload/migrations/postgres/20261017_093151_interface_labels'
import * as editorial from '../src/payload/migrations/postgres/20261017_103321_editorial_content_controls'
import * as formBuilder from '../src/payload/migrations/postgres/20261018_183306_contact_form_builder'
import * as contactUpdate from '../src/payload/migrations/postgres/20261018_170119_figma_contact_update'
import * as emailSettings from '../src/payload/migrations/postgres/20261019_063411_email_settings'

if (!process.env.CMS_MIGRATION_TEST || !process.env.DATABASE_URL?.includes('imadi_migration_test_')) {
  throw new Error('Set CMS_MIGRATION_TEST=1 with a disposable PostgreSQL database named imadi_migration_test_…')
}

const payload = await getPayload({ config })
const migration = (name: string, module: typeof initial) => ({
  name,
  up: (args: unknown) => module.up(args as Parameters<typeof module.up>[0]),
  down: (args: unknown) => module.down(args as Parameters<typeof module.down>[0]),
})
const initialMigration = migration('20261017_092407_initial_schema', initial)
const labelsMigration = migration('20261017_093151_interface_labels', labels)
const editorialMigration = migration('20261017_103321_editorial_content_controls', editorial)
const contactMigration = migration('20261018_170119_figma_contact_update', contactUpdate)
const formMigration = migration('20261018_183306_contact_form_builder', formBuilder)
const emailMigration = migration('20261019_063411_email_settings', emailSettings)
const adapter = payload.db as unknown as { pool: { query: (sql: string) => Promise<{ rows: Record<string, unknown>[] }> } }

try {
  await payload.db.migrate({ migrations: [initialMigration] })
  await adapter.pool.query(`INSERT INTO site_settings (company_name, tagline, footer_headline, _status) VALUES ('Imadi Innovations', 'Existing published company copy', 'Existing footer copy', 'published')`)
  await payload.db.migrate({ migrations: [initialMigration, labelsMigration] })
  // Seed a published page and its newer private revision using the old physical
  // schema, before the new presentation controls exist.
  const { rows: existingPages } = await adapter.pool.query(`INSERT INTO pages (title, slug, _status) VALUES ('Existing published page A', 'existing-page', 'published') RETURNING id`)
  const existingPageID = Number(existingPages[0].id)
  await adapter.pool.query(`INSERT INTO _pages_v (parent_id, version_title, version_slug, version__status, latest, autosave) VALUES (${existingPageID}, 'Existing private page B', 'existing-page', 'draft', true, false)`)
  await payload.db.migrate({ migrations: [initialMigration, labelsMigration, editorialMigration, contactMigration, formMigration, emailMigration] })
  const { rows } = await adapter.pool.query('SELECT company_name, tagline, labels_service_benefits_heading, labels_skip_link, labels_home_breadcrumb FROM site_settings')
  assert.equal(rows.length, 1)
  assert.equal(rows[0].company_name, 'Imadi Innovations')
  assert.equal(rows[0].tagline, 'Existing published company copy')
  assert.equal(rows[0].labels_service_benefits_heading, 'Built around your business')
  assert.equal(rows[0].labels_skip_link, 'Skip to content')
  assert.equal(rows[0].labels_home_breadcrumb, 'Home')
  const { rows: columns } = await adapter.pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name IN ('site_settings', '_site_settings_v') AND column_name LIKE '%labels_%'`)
  assert.ok(columns.every((column) => String(column.column_name).length <= 63))
  const published = await payload.findByID({ collection: 'pages', id: existingPageID, draft: false, overrideAccess: false })
  const draft = await payload.findByID({ collection: 'pages', id: existingPageID, draft: true, overrideAccess: true })
  assert.equal(published.title, 'Existing published page A')
  assert.equal(draft.title, 'Existing private page B')
  const controls = await payload.create({ collection: 'pages', data: {
    title: 'New presentation controls', slug: 'presentation-controls', _status: 'published', layout: [
      { blockType: 'hero', variant: 'editorial', title: 'Editorial heading' },
      { blockType: 'problems', items: [{ title: 'Editable card', href: '/services', linkLabel: 'Explore services' }] },
      { blockType: 'contact', variant: 'page', title: 'Have a project', preferredTimeLabel: 'Preferred time', preferredTimePlaceholder: 'Include your time zone' },
      { blockType: 'contactChannels', theme: 'dark', title: 'Talk to our team', items: [{ label: 'Business enquiries', link: { label: 'hello@example.test', href: 'mailto:hello@example.test' } }] },
      { blockType: 'cta', variant: 'consultation', title: 'Ready to scale', primaryAction: { label: 'Book a meeting', href: '/contact' } },
    ],
  } })
  const hero = controls.layout?.[0]
  const problems = controls.layout?.[1]
  assert.equal(hero?.blockType, 'hero')
  if (hero?.blockType === 'hero') assert.equal(hero.variant, 'editorial')
  assert.equal(problems?.blockType, 'problems')
  if (problems?.blockType === 'problems') {
    assert.equal(problems.items?.[0].href, '/services')
    assert.equal(problems.items?.[0].linkLabel, 'Explore services')
  }
  const contact = controls.layout?.[2]
  assert.equal(contact?.blockType, 'contact')
  if (contact?.blockType === 'contact') {
    assert.equal(contact.variant, 'page')
    assert.equal(contact.preferredTimeLabel, 'Preferred time')
  }
  const channels = controls.layout?.[3]
  assert.equal(channels?.blockType, 'contactChannels')
  if (channels?.blockType === 'contactChannels') assert.equal(channels.items?.[0].link?.href, 'mailto:hello@example.test')
  const consultation = controls.layout?.[4]
  assert.equal(consultation?.blockType, 'cta')
  if (consultation?.blockType === 'cta') assert.equal(consultation.variant, 'consultation')
  const { rows: assets } = await adapter.pool.query(`INSERT INTO media (alt) VALUES ('Footer mark test asset') RETURNING id`)
  const footerLogoID = Number(assets[0].id)
  const settings = await payload.updateGlobal({ slug: 'site-settings', depth: 0, data: { footer: { logo: footerLogoID } } })
  assert.equal(settings.footer?.logo, footerLogoID)
  assert.equal(settings.footer?.headline, 'Existing footer copy')
  const editableForm = await payload.create({ collection: 'pages', data: { title: 'Editable form', slug: 'editable-form', _status: 'published', layout: [{ blockType: 'contact', formMode: 'custom', formFields: [{ key: 'phone', label: 'Phone', type: 'tel', required: true }, { key: 'team', label: 'Team', type: 'select', options: [{ label: 'Sales', value: 'sales' }] }] }] } })
  const editableBlock = editableForm.layout?.[0]
  assert.equal(editableBlock?.blockType, 'contact')
  if (editableBlock?.blockType === 'contact') assert.deepEqual(editableBlock.formFields?.map(field => field.key), ['phone', 'team'])
  const answerOnly = await payload.create({ collection: 'enquiries', data: { formIdentity: { collection: 'pages', id: editableForm.id, blockId: editableBlock?.id }, fieldValues: [{ key: 'phone', label: 'Phone', type: 'tel', value: '+92 333 1234567' }] } })
  assert.ok(!answerOnly.name)
  const preferredTime = 'Tuesday at 10 am PKT'
  const enquiry = await payload.create({ collection: 'enquiries', data: { name: 'Migration enquiry', email: 'migration@example.test', message: 'We would like to discuss a project with your team.', preferredTime } })
  assert.equal(enquiry.preferredTime, preferredTime)
  const { rows: roleColumns } = await adapter.pool.query(`SELECT is_nullable FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role'`)
  assert.equal(roleColumns[0].is_nullable, 'NO')
  console.log('Incremental migrations passed: published content and private drafts preserved; editorial, contact-page, collaboration links, consultation and preferred-time fields persist; users.role remains NOT NULL.')
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  await payload.destroy()
}
process.exit(process.exitCode || 0)
