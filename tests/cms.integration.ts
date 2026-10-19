/** Run against a disposable database, never against the main development or production database. */
import assert from 'node:assert/strict'
import { getPayload, handleEndpoints } from 'payload'
import config from '../src/payload.config'
import { POST as submitEnquiry } from '../src/app/api/contact/route'

if (!process.env.CMS_INTEGRATION_TEST) throw new Error('Set CMS_INTEGRATION_TEST=1 and a disposable SQLITE_DATABASE_PATH before running this check.')

const payload = await getPayload({ config })
const request = (path: string, method = 'GET', body?: unknown, ip?: string) => new Request(`http://localhost:3000${path}`, {
  method, headers: { 'Content-Type': 'application/json', ...(ip ? { 'x-forwarded-for': ip } : {}) }, ...(body ? { body: JSON.stringify(body) } : {}),
})

try {
  const registered = await handleEndpoints({ config, path: '/api/users/first-register',
    request: request('/api/users/first-register', 'POST', { name: 'Integration Admin', email: 'admin@example.test', password: 'Integration-only-4f28b91a' }) })
  assert.equal(registered.status, 200)
  const registration = await registered.json()
  assert.equal(registration.user.role, 'admin', 'The first account must receive administrator access.')
  const admin = registration.user
  const editor = await payload.create({ collection: 'users', data: {
    name: 'Integration Editor', email: 'editor@example.test', password: 'Integration-editor-892a1bc4', role: 'editor',
  }, user: admin, overrideAccess: false })
  const unchanged = await payload.update({ collection: 'users', id: editor.id, data: { role: 'admin' }, user: editor, overrideAccess: false })
  assert.equal(unchanged.role, 'editor', 'Editors must not be able to promote themselves.')
  await assert.rejects(payload.create({ collection: 'users', data: {
    name: 'Blocked Account', email: 'blocked@example.test', password: 'Integration-blocked-982b45ac', role: 'admin',
  }, user: editor, overrideAccess: false }))

  await payload.create({ collection: 'pages', draft: true, data: { title: 'Private draft', slug: 'private-draft', layout: [] } })
  const productBlock = { blockType: 'product' as const, name: 'Product', secondaryImages: [{ caption: 'Extra screenshot' }] }
  const page = await payload.create({ collection: 'pages', data: { title: 'Published page', slug: 'published-page', layout: [productBlock], _status: 'published' } })
  const shared = await payload.create({ collection: 'shared-sections', data: { title: 'Reusable product', slug: 'reusable-product', layout: [productBlock], _status: 'published' } })
  const service = await payload.create({ collection: 'services', data: { title: 'Service', slug: 'service', summary: 'Service summary', sections: [productBlock], _status: 'published' } })
  const project = await payload.create({ collection: 'projects', data: { title: 'Project', slug: 'project', summary: 'Project summary', sections: [productBlock], _status: 'published' } })
  for (const blocks of [page.layout, shared.layout, service.sections, project.sections]) {
    const block = blocks?.[0]
    assert.equal(block?.blockType, 'product')
    if (block?.blockType === 'product') assert.equal(block.secondaryImages?.[0].caption, 'Extra screenshot')
  }
  const publicRead = await handleEndpoints({ config, path: '/api/pages', request: request('/api/pages?draft=true') })
  assert.equal(publicRead.status, 200)
  const publicDocuments = await publicRead.json()
  assert.deepEqual(publicDocuments.docs.map((doc: { slug: string }) => doc.slug), ['published-page'])
  const publicEnquiries = await handleEndpoints({ config, path: '/api/enquiries', request: request('/api/enquiries') })
  assert.equal(publicEnquiries.status, 403)
  const privateSettings = await handleEndpoints({ config, path: '/api/globals/site-settings', request: request('/api/globals/site-settings?draft=true') })
  assert.equal(privateSettings.status, 403)

  const editorSession = await payload.login({ collection: 'users', data: { email: 'editor@example.test', password: 'Integration-editor-892a1bc4' } })
  const authenticatedRead = (path: string) => new Request(`http://localhost:3000${path}`, { headers: { Authorization: `JWT ${editorSession.token}` } })
  const post = await payload.create({ collection: 'posts', data: {
    title: 'Published article A', slug: 'published-article', excerpt: 'An editorial revision privacy test.', author: 'Imadi Innovations', _status: 'published',
  } })

  // A published document may have a newer private revision. Explicit ?draft=true is
  // deliberately hostile here: it must never reveal that revision to an anonymous visitor.
  const revisions = [
    { collection: 'pages', id: page.id, markerA: page.title },
    { collection: 'shared-sections', id: shared.id, markerA: shared.title },
    { collection: 'services', id: service.id, markerA: service.title },
    { collection: 'posts', id: post.id, markerA: post.title },
  ] as const
  for (const { collection, id, markerA } of revisions) {
    const markerB = `${markerA} — private revision B`
    await payload.update({ collection, id, data: { title: markerB }, draft: true, overrideAccess: false, user: editor })
    const publicREST = await handleEndpoints({ config, path: `/api/${collection}/${id}`, request: request(`/api/${collection}/${id}?draft=true`) })
    assert.equal(publicREST.status, 200, `${collection}: public REST must still read the published record.`)
    assert.equal((await publicREST.json()).title, markerA, `${collection}: REST draft=true must retain published A.`)
    const publicLocal = await payload.findByID({ collection, id, overrideAccess: false, draft: false })
    assert.equal(publicLocal.title, markerA, `${collection}: public Local API must retain published A.`)
    const editorLocal = await payload.findByID({ collection, id, overrideAccess: false, draft: true, user: editor })
    assert.equal(editorLocal.title, markerB, `${collection}: authenticated Local preview must show draft B.`)
    const editorREST = await handleEndpoints({ config, path: `/api/${collection}/${id}`, request: authenticatedRead(`/api/${collection}/${id}?draft=true`) })
    assert.equal(editorREST.status, 200)
    assert.equal((await editorREST.json()).title, markerB, `${collection}: authenticated REST preview must show B.`)
    await payload.update({ collection, id, data: { title: markerB, _status: 'published' }, overrideAccess: false, user: editor })
    const published = await payload.findByID({ collection, id, overrideAccess: false, draft: false })
    assert.equal(published.title, markerB, `${collection}: published B must become public.`)
  }

  const sharedPublishedTitle = 'Shared call to action A'
  const sharedDraftTitle = 'Shared call to action B'
  const reusable = await payload.create({ collection: 'shared-sections', data: {
    title: 'Revision visibility shared section', slug: 'revision-visibility-shared',
    layout: [{ blockType: 'cta', title: sharedPublishedTitle }], _status: 'published',
  } })
  const hostPage = await payload.create({ collection: 'pages', data: {
    title: 'Shared section host', slug: 'shared-section-host',
    layout: [{ blockType: 'sharedSection', section: reusable.id }], _status: 'published',
  } })
  await payload.update({ collection: 'shared-sections', id: reusable.id,
    data: { layout: [{ blockType: 'cta', title: sharedDraftTitle }] }, draft: true, overrideAccess: false, user: editor })
  const populatedSectionTitle = (doc: { layout?: unknown[] | null }) => {
    const block = doc.layout?.[0] as { section?: { layout?: { title?: string | null }[] | null } } | undefined
    return block?.section?.layout?.[0]?.title
  }
  const publicPopulated = await payload.findByID({ collection: 'pages', id: hostPage.id, depth: 3, draft: false, overrideAccess: false })
  assert.equal(populatedSectionTitle(publicPopulated), sharedPublishedTitle, 'Public Local population must retain shared published A.')
  const publicPopulatedREST = await handleEndpoints({ config, path: `/api/pages/${hostPage.id}`, request: request(`/api/pages/${hostPage.id}?draft=true&depth=3`) })
  assert.equal(publicPopulatedREST.status, 200)
  assert.equal(populatedSectionTitle(await publicPopulatedREST.json()), sharedPublishedTitle, 'Anonymous REST draft=true must not leak a related shared draft.')
  const editorPopulated = await payload.findByID({ collection: 'pages', id: hostPage.id, depth: 3, draft: true, overrideAccess: false, user: editor })
  assert.equal(populatedSectionTitle(editorPopulated), sharedDraftTitle, 'Editor preview must populate related shared draft B.')
  await payload.update({ collection: 'shared-sections', id: reusable.id,
    data: { layout: [{ blockType: 'cta', title: sharedDraftTitle }], _status: 'published' }, overrideAccess: false, user: editor })
  const publishedPopulated = await payload.findByID({ collection: 'pages', id: hostPage.id, depth: 3, draft: false, overrideAccess: false })
  assert.equal(populatedSectionTitle(publishedPopulated), sharedDraftTitle, 'Publishing a shared section must update its public host page.')

  await payload.updateGlobal({ slug: 'site-settings', data: { companyName: 'Imadi Innovations', tagline: 'Global published A', _status: 'published' }, overrideAccess: false, user: editor })
  await payload.updateGlobal({ slug: 'site-settings', data: { tagline: 'Global private B' }, draft: true, overrideAccess: false, user: editor })
  assert.equal((await payload.findGlobal({ slug: 'site-settings', draft: false, overrideAccess: true })).tagline, 'Global published A', 'Public server settings query must retain published A.')
  assert.equal((await payload.findGlobal({ slug: 'site-settings', draft: true, overrideAccess: false, user: editor })).tagline, 'Global private B', 'Authenticated settings preview must show private B.')
  await payload.updateGlobal({ slug: 'site-settings', data: { tagline: 'Global private B', _status: 'published' }, overrideAccess: false, user: editor })
  assert.equal((await payload.findGlobal({ slug: 'site-settings', draft: false, overrideAccess: true })).tagline, 'Global private B', 'Published settings B must become public.')

  const contactPage = await payload.create({ collection: 'pages', data: { title: 'Contact form test', slug: 'contact-form-test', _status: 'published', layout: [{ blockType: 'contact', variant: 'page' }] } })
  const contactLocator = { collection: 'pages', id: contactPage.id, blockId: contactPage.layout![0].id }
  const enquiry = { form: contactLocator, values: { name: 'Amina Khan', email: 'amina@example.test', preferredTime: '2026-10-20T10:30', message: 'We would like to discuss a custom operations platform.' }, timeZone: 'Asia/Karachi' }
  const invalid = await submitEnquiry(request('/api/contact', 'POST', { ...enquiry, values: { ...enquiry.values, message: 'Too short' } }))
  assert.equal(invalid.status, 400)
  const unidentified = await submitEnquiry(request('/api/contact', 'POST', enquiry.values))
  assert.equal(unidentified.status, 400, 'A flat payload cannot bypass the published form definition.')
  const saved = await submitEnquiry(request('/api/contact', 'POST', enquiry))
  assert.equal(saved.status, 201)
  assert.equal((await payload.count({ collection: 'enquiries', overrideAccess: true })).totalDocs, 1)
  const storedEnquiry = await payload.find({ collection: 'enquiries', depth: 0, overrideAccess: true, limit: 1 })
  assert.equal(storedEnquiry.docs[0].preferredTime, `${enquiry.values.preferredTime} (Asia/Karachi)`, 'Preferred date/time and timezone survive server validation.')
  assert.deepEqual(storedEnquiry.docs[0].formIdentity, contactLocator)
  const rateLimited = await submitEnquiry(request('/api/contact', 'POST', enquiry))
  assert.equal(rateLimited.status, 429)
  const bot = await submitEnquiry(request('/api/contact', 'POST', { ...enquiry, website: 'spam.example.test' }))
  assert.equal(bot.status, 200)
  assert.equal((await payload.count({ collection: 'enquiries', overrideAccess: true })).totalDocs, 1)

  // The builder removes core required fields and adds its own required, ordered answers.
  const formFields = [
    { key: 'department', type: 'select' as const, label: 'Department', required: true, options: [{ label: 'Sales team', value: 'sales' }] },
    { key: 'consent', type: 'checkbox' as const, label: 'Contact consent', required: true },
    { key: 'callback', type: 'datetime' as const, label: 'Callback time' },
  ]
  const customPage = await payload.create({ collection: 'pages', data: { title: 'Custom form', slug: 'custom-form', _status: 'published', layout: [{ blockType: 'contact', formMode: 'custom', formFields }] } })
  const customBlock = customPage.layout![0]
  if (customBlock.blockType !== 'contact') throw new Error('Expected a contact block.')
  const customLocator = { collection: 'pages', id: customPage.id, blockId: customBlock.id }
  await payload.update({ collection: 'pages', id: customPage.id, draft: true, data: { layout: [{ ...customBlock, blockType: 'contact', formMode: 'custom', formFields: [...formFields, { key: 'privateField', type: 'text', label: 'Private draft field', required: true }] }] } })
  const customInput = { form: customLocator, values: { department: 'sales', consent: true, callback: '2026-10-20T10:30' }, timeZone: 'Asia/Karachi' }
  const forgedChoice = await submitEnquiry(request('/api/contact', 'POST', { ...customInput, values: { ...customInput.values, department: 'forged' } }, '198.51.100.41'))
  assert.equal(forgedChoice.status, 400)
  const unchecked = await submitEnquiry(request('/api/contact', 'POST', { ...customInput, values: { ...customInput.values, consent: false } }, '198.51.100.41'))
  assert.equal(unchecked.status, 400)
  const impossibleDate = await submitEnquiry(request('/api/contact', 'POST', { ...customInput, values: { ...customInput.values, callback: '2026-02-30T10:30' } }, '198.51.100.41'))
  assert.equal(impossibleDate.status, 400)
  const customSaved = await submitEnquiry(request('/api/contact', 'POST', customInput, '198.51.100.41'))
  assert.equal(customSaved.status, 201, 'Private draft fields do not change published validation and removed name/email/message are not required.')
  const customStored = (await payload.find({ collection: 'enquiries', sort: '-createdAt', overrideAccess: true, limit: 1 })).docs[0]
  const snapshot = customStored.fieldValues as { key: string; label: string; value: unknown }[]
  assert.deepEqual(snapshot.map(field => field.key), ['department', 'consent', 'callback'])
  assert.equal(snapshot[0].label, 'Department')
  assert.equal(customStored.email, null)
  await payload.update({ collection: 'enquiries', id: customStored.id, data: { status: 'contacted', fieldValues: [{ key: 'tampered', value: 'changed' }] }, user: editor, overrideAccess: false })
  assert.deepEqual((await payload.findByID({ collection: 'enquiries', id: customStored.id, overrideAccess: true })).fieldValues, snapshot, 'Editor status updates cannot rewrite the answer audit snapshot.')
  await payload.update({ collection: 'pages', id: customPage.id, data: { layout: [{ ...customBlock, blockType: 'contact', formMode: 'custom', formFields: [{ key: 'phone', type: 'tel', label: 'Phone number', required: true }, ...formFields.slice().reverse()] }], _status: 'published' } })
  const newRequired = await submitEnquiry(request('/api/contact', 'POST', customInput, '198.51.100.42'))
  assert.equal(newRequired.status, 400)
  assert.ok((await newRequired.json()).errors.phone, 'A newly published required field is enforced by the server.')
  assert.deepEqual((await payload.findByID({ collection: 'enquiries', id: customStored.id, overrideAccess: true })).fieldValues, snapshot, 'Reordering/publishing new fields cannot rewrite historical answer snapshots.')
  for (const [slug, status, block] of [
    ['private-contact', 'draft', { blockType: 'contact', formMode: 'custom', formFields }],
    ['disabled-contact', 'published', { blockType: 'contact', enabled: false, formMode: 'custom', formFields }],
    ['empty-contact', 'published', { blockType: 'contact', formMode: 'custom', formFields: [] }],
  ] as const) {
    const doc = await payload.create({ collection: 'pages', draft: status === 'draft', data: { title: slug, slug, _status: status, layout: [block as any] } })
    const blocked = await submitEnquiry(request('/api/contact', 'POST', { ...customInput, form: { collection: 'pages', id: doc.id, blockId: doc.layout![0].id } }, '198.51.100.43'))
    assert.equal(blocked.status, 400, `${slug} cannot accept enquiries.`)
  }
  await assert.rejects(payload.create({ collection: 'pages', data: { title: 'Duplicate key', slug: 'duplicate-form-key', layout: [{ blockType: 'contact', formMode: 'custom', formFields: [formFields[0], formFields[0]] }] } }))
  console.log('CMS integration passed: first admin, editor permissions, published revision privacy and publishing across four collections and site settings, populated shared revision privacy, scoped reusable nested arrays and versions, private enquiries/settings, published form authority, editable required fields/choices/order, private drafts, historical snapshots, rate limit, and honeypot.')
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  await payload.destroy()
}
// Match Payload's CLI: the adapter retains a dedicated reconnect socket even after destroy().
process.exit(process.exitCode || 0)
