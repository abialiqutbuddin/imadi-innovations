/** Shared, serializable form definitions. The API resolves these from published CMS content. */
export const contactFieldTypes = ['text', 'email', 'tel', 'url', 'number', 'textarea', 'select', 'datetime', 'checkbox'] as const
export type ContactFieldType = (typeof contactFieldTypes)[number]
export type ContactFormLocator = { collection: 'pages' | 'shared-sections' | 'services' | 'projects'; id: string | number; blockId: string }
export type ContactOption = { label: string; value: string }
export type ContactField = {
  key: string; type: ContactFieldType; label: string; placeholder?: string; helpText?: string
  required: boolean; enabled: boolean; width: 'half' | 'full'; optionsSource: 'custom' | 'services'
  options: ContactOption[]; minLength?: number; maxLength?: number; min?: number; max?: number; validationMessage?: string
}
export type ContactValue = string | boolean
export type ContactFieldValue = { key: string; label: string; type: ContactFieldType; value: ContactValue; timeZone?: string }
export type ContactDefinition = Record<string, any>
const reserved = new Set(['__proto__', 'prototype', 'constructor', 'website', 'source', 'form', 'values', 'timezone'])
const types = new Set<string>(contactFieldTypes)
export const validFieldKey = (value: unknown): value is string => typeof value === 'string' && /^[a-z][a-zA-Z0-9_]{0,63}$/.test(value) && !reserved.has(value.toLowerCase())
const text = (value: unknown, fallback = '') => typeof value === 'string' ? value : fallback
const finite = (value: unknown) => typeof value === 'number' && Number.isFinite(value) ? value : undefined

/** Validate definitions at publication/save time, including disabled rows and duplicate option values. */
export function validateContactDefinitions(value: unknown): true | string {
  if (value == null) return true
  if (!Array.isArray(value) || value.length > 30) return 'Use no more than 30 form fields.'
  const keys = new Set<string>()
  for (const item of value) {
    if (!item || typeof item !== 'object') return 'Each form field must have a key, label and type.'
    const field = item as ContactDefinition
    if (!validFieldKey(field.key)) return 'Field keys must start with a lowercase letter and use letters, numbers or underscores. System keys are reserved.'
    if (keys.has(field.key)) return `The field key “${field.key}” is used more than once.`
    keys.add(field.key)
    if (!types.has(field.type) || !text(field.label).trim()) return 'Each form field needs a label and a supported type.'
    if (['text', 'email', 'tel', 'url', 'textarea'].includes(field.type)) {
      if (field.minLength != null && (!Number.isInteger(field.minLength) || field.minLength < 0 || field.minLength > 5000)) return 'Minimum length must be a whole number from 0 to 5,000.'
      if (field.maxLength != null && (!Number.isInteger(field.maxLength) || field.maxLength < 1 || field.maxLength > 5000)) return 'Maximum length must be a whole number from 1 to 5,000.'
      if (field.minLength != null && field.maxLength != null && field.minLength > field.maxLength) return 'Minimum length cannot exceed maximum length.'
      const typeLimit = field.type === 'email' ? 254 : field.type === 'tel' ? 60 : field.type === 'url' ? 2048 : 5000
      if (field.minLength != null && field.minLength > typeLimit) return `Minimum length for ${field.type} fields cannot exceed ${typeLimit} characters.`
    }
    if (field.type === 'number') {
      if (field.min != null && finite(field.min) === undefined || field.max != null && finite(field.max) === undefined) return 'Number limits must be finite numbers.'
      if (field.min != null && field.max != null && field.min > field.max) return 'Minimum value cannot exceed maximum value.'
    }
    if (field.type === 'select' && field.optionsSource !== 'services') {
      if (!Array.isArray(field.options) || field.options.length < 1 || field.options.length > 100) return 'Custom dropdowns need between 1 and 100 options.'
      const values = new Set<string>()
      for (const option of field.options) {
        if (!text(option?.label).trim() || !text(option?.value).trim() || text(option.value).length > 160) return 'Each dropdown option needs a label and a value of 160 characters or fewer.'
        if (values.has(option.value.trim())) return `Dropdown “${field.label}” has duplicate option values.`
        values.add(option.value.trim())
      }
    }
  }
  return true
}

const base = (key: string, type: ContactFieldType, label: string, extra: Partial<ContactField> = {}): ContactField => ({
  key, type, label, required: false, enabled: true, width: 'half', optionsSource: 'custom', options: [], ...extra,
})

/** Historical content keeps its labels and layout until explicitly switched to the builder. */
export function legacyContactFields(block: ContactDefinition, services: ContactDefinition[] = []): ContactField[] {
  const name = base('name', 'text', text(block.nameLabel, 'Full name'), { placeholder: text(block.namePlaceholder, 'Your name'), required: true, minLength: 2, maxLength: 120, width: block.variant === 'page' ? 'half' : 'full' })
  const company = base('company', 'text', text(block.companyLabel, 'Company name'), { placeholder: text(block.companyPlaceholder, 'Your company'), maxLength: 160 })
  const email = base('email', 'email', text(block.emailLabel, 'Email'), { placeholder: text(block.emailPlaceholder, 'you@company.com'), required: true, maxLength: 254 })
  const preferredTime = base('preferredTime', 'datetime', text(block.preferredTimeLabel, 'Preferred time'), { placeholder: text(block.preferredTimePlaceholder), helpText: text(block.preferredTimePlaceholder) })
  return [
    ...(block.variant === 'page' ? [name, company, email, preferredTime] : [name, company, email]),
    base('service', 'select', text(block.serviceLabel, 'What do you need?'), { placeholder: text(block.servicePlaceholder, 'Choose a service'), optionsSource: 'services', options: services.map(service => ({ label: text(service.title), value: text(service.title).trim() })).filter(option => option.value) }),
    base('budget', 'select', text(block.budgetLabel, 'Budget'), { placeholder: text(block.budgetPlaceholder, 'Select a range'), options: (Array.isArray(block.budgetOptions) ? block.budgetOptions : []).map((option: ContactDefinition) => ({ label: text(option.label), value: text(option.label).trim() })).filter((option: ContactOption) => option.value) }),
    base('message', 'textarea', text(block.messageLabel, 'Tell us about your project'), { placeholder: text(block.messagePlaceholder, 'What are you building, and what would you like to improve?'), required: true, minLength: 20, maxLength: 5000, width: 'full' }),
  ]
}

export function resolveContactFields(block: ContactDefinition, services: ContactDefinition[] = []): ContactField[] {
  if (block.formMode !== 'custom') return legacyContactFields(block, services)
  const source = Array.isArray(block.formFields) ? block.formFields : []
  return source.filter((field: ContactDefinition) => field.enabled !== false).map((field: ContactDefinition) => base(field.key, field.type, text(field.label), {
    placeholder: text(field.placeholder), helpText: text(field.helpText), validationMessage: text(field.validationMessage),
    required: field.required === true, enabled: true, width: field.width === 'full' ? 'full' : 'half',
    optionsSource: field.optionsSource === 'services' ? 'services' : 'custom',
    options: field.optionsSource === 'services'
      ? services.map(service => ({ label: text(service.title), value: text(service.title).trim() })).filter(option => option.value)
      : (Array.isArray(field.options) ? field.options : []).map((option: ContactDefinition) => ({ label: text(option.label), value: text(option.value).trim() })),
    ...(['text', 'email', 'tel', 'url', 'textarea'].includes(field.type) ? { minLength: finite(field.minLength), maxLength: finite(field.maxLength) } : {}),
    ...(field.type === 'number' ? { min: finite(field.min), max: finite(field.max) } : {}),
  }))
}

export function validLocalDateTime(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value)
  if (!match) return false
  const [year, month, day, hour, minute] = match.slice(1).map(Number)
  if (year < 1900 || year > 2200 || month < 1 || month > 12 || hour > 23 || minute > 59 || day < 1) return false
  return day <= new Date(Date.UTC(year, month, 0)).getUTCDate()
}
export function validTimeZone(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > 100) return false
  try { new Intl.DateTimeFormat('en', { timeZone: value }); return true } catch { return false }
}

export function validateContactValues(fields: ContactField[], raw: unknown, timeZone?: unknown): {
  data?: { values: Record<string, ContactValue>; fieldValues: ContactFieldValue[]; legacy: Record<string, string> }; errors?: Record<string, string>
} {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return { errors: { form: 'Please enter your enquiry details.' } }
  if (fields.length > 30 || fields.some(field => !validFieldKey(field.key)) || new Set(fields.map(field => field.key)).size !== fields.length) return { errors: { form: 'This form is unavailable. Please contact us directly.' } }
  const input = raw as Record<string, unknown>
  const knownKeys = new Set(fields.map(field => field.key))
  if (Object.keys(input).some(key => !knownKeys.has(key))) return { errors: { form: 'This form has changed. Please refresh and try again.' } }
  const errors: Record<string, string> = {}
  const values: Record<string, ContactValue> = Object.create(null)
  const fieldValues: ContactFieldValue[] = []
  const legacy: Record<string, string> = {}
  const zone = timeZone == null || timeZone === '' ? undefined : validTimeZone(timeZone) ? timeZone : null
  for (const field of fields) {
    const original = Object.hasOwn(input, field.key) ? input[field.key] : undefined
    let value: ContactValue = field.type === 'checkbox' ? original === true || original === 'on' || original === 'true' : typeof original === 'string' ? original.trim() : ''
    const fail = (message: string) => { errors[field.key] = field.validationMessage || message }
    if (original != null && typeof original !== 'string' && typeof original !== 'boolean') fail(`Enter a valid value for ${field.label}.`)
    if (field.type === 'checkbox' && typeof original === 'string' && !['', 'on', 'true', 'false'].includes(original)) fail(`Enter a valid value for ${field.label}.`)
    if (field.type !== 'checkbox' && typeof original === 'boolean') fail(`Enter a valid value for ${field.label}.`)
    if (field.required && (value === '' || value === false)) fail(`${field.label} is required.`)
    if (typeof value === 'string' && value) {
      const max = Math.min(field.maxLength ?? (field.type === 'textarea' ? 5000 : field.type === 'text' ? 160 : 5000), field.type === 'email' ? 254 : field.type === 'url' ? 2048 : field.type === 'tel' ? 60 : 5000)
      if (value.length > max) fail(`Keep ${field.label} to ${max.toLocaleString('en')} characters or fewer.`)
      if (field.minLength != null && value.length < field.minLength) fail(`Use at least ${field.minLength} characters for ${field.label}.`)
      if (field.type === 'email') { value = value.toLowerCase(); if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) fail('Enter a valid email address.') }
      if (field.type === 'tel' && !/^[+()\d\s.\-]{3,60}$/.test(value)) fail('Enter a valid phone number.')
      if (field.type === 'url') { try { if (!['http:', 'https:'].includes(new URL(value).protocol)) fail('Enter a valid https:// website address.') } catch { fail('Enter a valid https:// website address.') } }
      if (field.type === 'number') { const number = Number(value); if (!Number.isFinite(number) || !/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(value)) fail('Enter a valid number.'); else if (field.min != null && number < field.min || field.max != null && number > field.max) fail(`Enter a number${field.min != null ? ` from ${field.min}` : ''}${field.max != null ? ` up to ${field.max}` : ''}.`) }
      if (field.type === 'select' && !field.options.some(option => option.value === value)) fail('Choose an available option.')
      if (field.type === 'datetime' && (!validLocalDateTime(value) || !zone)) fail('Choose a valid date and time.')
    }
    values[field.key] = value
    fieldValues.push({ key: field.key, label: field.label, type: field.type, value, ...(field.type === 'datetime' && value && zone ? { timeZone: zone } : {}) })
    if (['name', 'email', 'company', 'service', 'budget', 'message', 'preferredTime'].includes(field.key) && typeof value === 'string') {
      // Preserve the established inbox summary fields without constraining the editable form.
      if (field.key !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) legacy[field.key] = field.key === 'preferredTime' && value && zone ? `${value} (${zone})` : value
    }
  }
  return Object.keys(errors).length ? { errors } : { data: { values, fieldValues, legacy } }
}
