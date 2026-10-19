/**
 * Opt the two reviewed starter forms into the field builder without changing copy.
 * NODE_ENV=production npx tsx scripts/upgrade-contact-forms.ts --plan ../../work/contact-form-upgrade.json
 * NODE_ENV=production npx tsx scripts/upgrade-contact-forms.ts --apply --plan ../../work/contact-form-upgrade.json
 */
import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import nextEnv from '@next/env'
import { createLocalReq, getPayload, type PayloadRequest } from 'payload'
import { legacyContactFields } from '../src/lib/contact-form'
if (process.env.NODE_ENV !== 'production') throw new Error('Use NODE_ENV=production to prevent development schema push.')
nextEnv.loadEnvConfig(process.cwd())
if (process.env.PAYLOAD_DB_PUSH === 'true') throw new Error('Disable PAYLOAD_DB_PUSH before this content-only upgrade.')
const database = new URL(process.env.DATABASE_URL || 'file:missing')
if (!['postgres:', 'postgresql:'].includes(database.protocol) || !['localhost', '127.0.0.1', '[::1]'].includes(database.hostname) || database.pathname !== '/imadi_website_codex') throw new Error('This helper only targets the local imadi_website_codex preview database.')
const planArgument = process.argv.indexOf('--plan')
const planFile = planArgument >= 0 ? process.argv[planArgument + 1] : undefined
if (!planFile) throw new Error('Provide --plan with a reviewable JSON path. Run without --apply first.')
const apply = process.argv.includes('--apply')
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
type Content = Record<string, any>
type PlanRow = { collection: 'pages' | 'shared-sections'; id: number; slug: string; updatedAt: string; fingerprint: string; fieldKeys: string[][] }
const fingerprint = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const targets = [{ collection: 'pages' as const, slug: 'contact' }, { collection: 'shared-sections' as const, slug: 'contact' }]
async function noAccounts(req?: PayloadRequest) {
  if ((await payload.count({ collection: 'users', overrideAccess: true, req })).totalDocs) throw new Error('The preview has admin/editor accounts. Upgrade the existing forms manually in admin; this pre-admin helper cannot edit them.')
}
async function load(req?: PayloadRequest) {
  await noAccounts(req)
  const rows: PlanRow[] = []
  const documents: Content[] = []
  for (const target of targets) {
    const found = await payload.find({ collection: target.collection, where: { slug: { equals: target.slug } }, draft: true, depth: 0, overrideAccess: true, limit: 2, req })
    if (found.totalDocs !== 1) throw new Error(`Expected exactly one ${target.collection}/contact record.`)
    const doc = found.docs[0] as Content
    if (doc._status !== 'published') throw new Error(`Refusing to publish private draft ${target.collection}/contact.`)
    const blocks = (doc.layout || []).filter((block: Content) => block.blockType === 'contact' && block.formMode !== 'custom')
    if (!blocks.length) continue
    rows.push({ collection: target.collection, id: doc.id, slug: doc.slug, updatedAt: doc.updatedAt, fingerprint: fingerprint(doc.layout), fieldKeys: blocks.map((block: Content) => legacyContactFields(block).map(field => field.key)) })
    documents.push(doc)
  }
  return { rows, documents }
}
try {
  const planned = await load()
  if (!apply) {
    await writeFile(planFile, `${JSON.stringify({ version: 1, database: 'imadi_website_codex', records: planned.rows }, null, 2)}\n`, { mode: 0o600 })
    console.log(JSON.stringify({ mode: 'dry-run', records: planned.rows, note: 'Only formMode and formFields will change. Existing copy, other sections, enquiries, assets and private drafts are preserved.' }, null, 2))
  } else {
    const approved = JSON.parse(await readFile(planFile, 'utf8'))
    if (approved.version !== 1 || approved.database !== 'imadi_website_codex' || fingerprint(approved.records) !== fingerprint(planned.rows)) throw new Error('Content changed since the reviewed plan. Run a new dry run and review it before applying.')
    if (!planned.rows.length) console.log('The two starter forms already use the builder. No changes applied.')
    else {
      const transactionID = await payload.db.beginTransaction()
      if (!transactionID) throw new Error('Could not start a transaction. No forms were changed.')
      const req = await createLocalReq({ req: { transactionID } }, payload)
      try {
        const current = await load(req)
        if (fingerprint(current.rows) !== fingerprint(planned.rows)) throw new Error('Content changed during preflight. No forms were changed.')
        for (const [index, row] of current.rows.entries()) {
          const doc = current.documents[index]
          const layout = doc.layout.map((block: Content) => block.blockType === 'contact' && block.formMode !== 'custom' ? { ...block, formMode: 'custom', formFields: legacyContactFields(block) } : block)
          await payload.update({ collection: row.collection, id: row.id, data: { layout, _status: 'published' }, overrideAccess: true, req })
        }
        await payload.db.commitTransaction(transactionID)
      } catch (error) { await payload.db.rollbackTransaction(transactionID); throw error }
      console.log(`Enabled the editable field builder on ${planned.rows.length} reviewed forms.`)
    }
  }
} finally { await payload.destroy() }
process.exit(0)
