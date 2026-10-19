import assert from 'node:assert/strict'
import test from 'node:test'
import { legacyContactFields, resolveContactFields, validateContactDefinitions, validateContactValues, validLocalDateTime, validFieldKey } from '../src/lib/contact-form'

const custom = (rows: Record<string, unknown>[]) => resolveContactFields({ formMode: 'custom', formFields: rows })
const rows = [
  { key: 'email', label: 'Email', type: 'email', required: true },
  { key: 'department', label: 'Department', type: 'select', required: true, options: [{ label: 'Sales team', value: 'sales' }, { label: 'Support', value: 'support' }] },
  { key: 'agreed', label: 'Consent', type: 'checkbox', required: true },
  { key: 'meeting', label: 'Meeting time', type: 'datetime' },
]

test('legacy labels and selection lists survive until the builder is enabled; an empty builder stays empty', () => {
  const legacy = legacyContactFields({ variant: 'page', nameLabel: 'Your full name', budgetOptions: [{ label: 'Discuss' }] }, [{ title: 'Platform development' }])
  assert.equal(legacy[0].label, 'Your full name')
  assert.equal(legacy[3].type, 'datetime')
  assert.deepEqual(legacy.find(field => field.key === 'budget')?.options, [{ label: 'Discuss', value: 'Discuss' }])
  assert.deepEqual(resolveContactFields({ formMode: 'custom', formFields: [] }), [])
})

test('removing original email/name/message fields and adding/reordering fields changes the validation contract', () => {
  const fields = custom([{ key: 'phone', type: 'tel', label: 'Phone', required: true }, { key: 'interest', type: 'text', label: 'Interest' }])
  const data = validateContactValues(fields, { interest: 'A platform', phone: '+92 333 1234567' }).data
  assert.ok(data)
  assert.deepEqual(data.fieldValues.map(field => field.key), ['phone', 'interest'])
  assert.equal(data.legacy.email, undefined)
  assert.equal(data.legacy.message, undefined)
  assert.ok(validateContactValues(fields, {}).errors?.phone)
})

test('definitions reject duplicate/reserved keys and duplicate or missing dropdown choices', () => {
  assert.equal(validFieldKey('constructor'), false)
  assert.equal(validFieldKey('__proto__'), false)
  assert.equal(validFieldKey('source'), false)
  assert.equal(validateContactDefinitions(rows), true)
  assert.match(String(validateContactDefinitions([rows[0], rows[0]])), /more than once/)
  assert.match(String(validateContactDefinitions([{ key: 'service', type: 'select', label: 'Service', options: [{ value: 'one', label: 'First' }, { value: 'one', label: 'Second' }] }])), /duplicate/)
  assert.match(String(validateContactDefinitions([{ key: 'service', type: 'select', label: 'Service' }])), /options/)
})

test('required additions, forged dropdown choices and unchecked consent cannot reach persistence', () => {
  const fields = custom(rows)
  assert.ok(validateContactValues(fields, { email: 'amina@example.com', department: 'forged', agreed: false }).errors?.department)
  assert.ok(validateContactValues(fields, { email: 'amina@example.com', department: 'sales', agreed: false }).errors?.agreed)
  assert.ok(validateContactValues(fields, { department: 'sales', agreed: true }).errors?.email)
  const result = validateContactValues(fields, { email: ' AMINA@EXAMPLE.COM ', department: 'sales', agreed: true })
  assert.equal(result.data?.values.email, 'amina@example.com')
  assert.equal(result.data?.fieldValues[1].label, 'Department')
})

test('unknown/disabled fields and prototype keys are rejected', () => {
  const fields = custom([{ key: 'hiddenField', type: 'text', label: 'Hidden', enabled: false }, rows[0]])
  assert.deepEqual(fields.map(field => field.key), ['email'])
  assert.ok(validateContactValues(fields, { email: 'amina@example.com', hiddenField: 'injected' }).errors?.form)
  assert.ok(validateContactValues(fields, JSON.parse('{"email":"amina@example.com","__proto__":"injected"}')).errors?.form)
  assert.equal(({} as Record<string, unknown>).injected, undefined)
})

test('real calendar validation handles leap years, impossible dates, time bounds and valid timezone snapshots', () => {
  assert.equal(validLocalDateTime('2028-02-29T09:30'), true)
  for (const value of ['2027-02-29T09:30', '2026-04-31T09:30', '2026-00-01T09:30', '2026-10-18T24:00', '2026-10-18T12:60', '2026-10-18T12:00Z']) assert.equal(validLocalDateTime(value), false, value)
  const fields = custom([{ key: 'preferredTime', label: 'Meeting', type: 'datetime' }])
  const result = validateContactValues(fields, { preferredTime: '2026-10-19T14:15' }, 'Asia/Karachi')
  assert.equal(result.data?.fieldValues[0].timeZone, 'Asia/Karachi')
  assert.equal(result.data?.legacy.preferredTime, '2026-10-19T14:15 (Asia/Karachi)')
  assert.ok(validateContactValues(fields, { preferredTime: '2026-10-19T14:15' }, 'invented/timezone').errors?.preferredTime)
  assert.ok(validateContactValues(fields, { preferredTime: '2026-10-19T14:15' }).errors?.preferredTime, 'Date/time values without an IANA timezone are ambiguous and must be rejected.')
  assert.ok(validateContactValues(fields, {}).data, 'An omitted optional date does not require a timezone.')
})

test('numeric, text, URL limits and editable validation messages apply on both server and browser', () => {
  const fields = custom([
    { key: 'teamSize', label: 'Team size', type: 'number', min: 1, max: 100 },
    { key: 'details', label: 'Details', type: 'textarea', minLength: 10, maxLength: 20, validationMessage: 'Please describe the project in 10–20 characters.' },
    { key: 'site', label: 'Website', type: 'url' },
  ])
  const invalid = validateContactValues(fields, { teamSize: 'Infinity', details: 'Short', site: 'javascript:alert(1)' })
  assert.ok(invalid.errors?.teamSize)
  assert.equal(invalid.errors?.details, 'Please describe the project in 10–20 characters.')
  assert.ok(invalid.errors?.site)
  assert.ok(validateContactValues(fields, { teamSize: '101' }).errors?.teamSize)
  assert.ok(validateContactValues(fields, { teamSize: '20', details: 'A new platform', site: 'https://example.com' }).data)
})


test('option values normalize whitespace and type changes ignore stale text constraints', () => {
  const fields = custom([{ key: 'department', type: 'select', label: 'Department', minLength: 100, options: [{ label: 'Sales', value: ' sales ' }] }, { key: 'meeting', type: 'datetime', label: 'Meeting', maxLength: 2 }, { key: 'count', type: 'number', label: 'Count', maxLength: 1 }])
  assert.ok(validateContactValues(fields, { department: 'sales', meeting: '2026-10-20T10:30', count: '100' }, 'Asia/Karachi').data)
  assert.match(String(validateContactDefinitions([{ key: 'department', type: 'select', label: 'Department', options: [{ label: 'Sales', value: ' sales ' }, { label: 'Other sales', value: 'sales' }] }])), /duplicate/)
})


test('text-type minimums cannot exceed the server caps and hide irrelevant old constraints after type changes', () => {
  for (const [type, minLength] of [['email', 255], ['tel', 61], ['url', 2049]] as const) {
    assert.match(String(validateContactDefinitions([{ key: 'answer', label: 'Answer', type, minLength }])), /cannot exceed/)
  }
  assert.equal(validateContactDefinitions([{ key: 'answer', label: 'Answer', type: 'select', minLength: 100, maxLength: 2, min: 10, max: 1, options: [{ label: 'Sales', value: 'sales' }] }]), true)
})
