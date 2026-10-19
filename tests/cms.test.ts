import assert from 'node:assert/strict'
import test from 'node:test'
import { isAdminField, publishedOrEditor } from '../src/payload/access'
import { validateEnquiry } from '../src/payload/enquiry-validation'
import { scopedArrayTableName } from '../src/payload/fields'

test('nested SQL arrays retain collection and version scope while leaving room for index names', () => {
  const definition = scopedArrayTableName('extra_images')
  assert.equal(typeof definition, 'function')
  if (typeof definition !== 'function') return
  const parents = ['pages_blocks_product', 'services_blocks_product', 'projects_blocks_product', '_shared_sections_v_blocks_product']
  const names = parents.map((tableName) => definition({ tableName }))
  assert.equal(new Set(names).size, parents.length)
  assert.ok(names.every((name) => name.length + '_v_parent_id_idx'.length < 63))
})

test('public content queries remain filtered to published records, including draft requests', async () => {
  const publicQuery = await publishedOrEditor({ req: { user: null, query: { draft: 'true' } } } as never)
  assert.deepEqual(publicQuery, { _status: { equals: 'published' } })
  assert.equal(await publishedOrEditor({ req: { user: { id: 1, role: 'editor' } } } as never), true)
  assert.deepEqual(await publishedOrEditor({ req: { user: { id: 2, role: 'untrusted' } } } as never), { _status: { equals: 'published' } })
})

test('editors cannot grant administrator roles', async () => {
  assert.equal(await isAdminField({ req: { user: { id: 1, role: 'editor' } } } as never), false)
  assert.equal(await isAdminField({ req: { user: { id: 1, role: 'admin' } } } as never), true)
})

test('an enquiry is normalized and keeps the visitor’s actual message', () => {
  const message = 'We need a booking platform for our growing service team.'
  const result = validateEnquiry({ name: '  Amina Khan  ', email: ' AMINA@EXAMPLE.COM ', message: ` ${message} `, company: 'Acme' })
  assert.equal(result.data?.name, 'Amina Khan')
  assert.equal(result.data?.email, 'amina@example.com')
  assert.equal(result.data?.message, message)
  assert.equal(result.errors, undefined)
})

test('invalid, oversized and incomplete enquiries cannot reach persistence', () => {
  assert.ok(validateEnquiry(null).errors?.form)
  assert.ok(validateEnquiry({ name: 'A', email: 'not-an-email', message: 'Hello' }).errors?.message)
  const result = validateEnquiry({ name: 'Amina', email: 'amina@example.com', message: 'x'.repeat(5001) })
  assert.equal(result.data, undefined)
  assert.ok(result.errors?.message)
})

test('contact enquiries preserve an optional preferred time without accepting oversized values', () => {
  const enquiry = { name: 'Amina Khan', email: 'amina@example.com', message: 'We need a booking platform for our growing service team.' }
  assert.equal(validateEnquiry(enquiry).data?.preferredTime, '')
  assert.equal(validateEnquiry({ ...enquiry, preferredTime: '  Tuesday at 10 am PKT  ' }).data?.preferredTime, 'Tuesday at 10 am PKT')
  const oversized = validateEnquiry({ ...enquiry, preferredTime: 'x'.repeat(161) })
  assert.equal(oversized.data, undefined)
  assert.ok(oversized.errors?.preferredTime)
})
