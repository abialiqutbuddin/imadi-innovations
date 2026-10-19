import type { Field } from 'payload'
import { contactFieldTypes, validFieldKey, validateContactDefinitions } from '../lib/contact-form'
import { scopedArrayTableName } from './fields'

const textConstraints = (_data: unknown, sibling: Record<string, unknown>) => !['checkbox', 'select', 'datetime', 'number'].includes(String(sibling.type))
export const contactBuilderFields: Field[] = [
  { name: 'formMode', type: 'select', defaultValue: 'legacy', options: [
    { label: 'Original fields and labels', value: 'legacy' },
    { label: 'Editable form builder', value: 'custom' },
  ], admin: { description: 'Use the form builder to add, delete, drag into order, hide or change required fields. Publish the page or reusable section to update the public form.' } },
  { name: 'formFields', label: 'Form fields', type: 'array', maxRows: 30,
    dbName: scopedArrayTableName('forms'),
    validate: (value: unknown) => validateContactDefinitions(value),
    admin: { components: { RowLabel: '/payload/components/ContactFieldRowLabel#ContactFieldRowLabel' }, condition: (_data, siblingData) => siblingData.formMode === 'custom',
      description: 'Rows appear in this order. A full-width field occupies its own row. An empty list disables submission. Field keys identify saved answers: keep existing keys unchanged when editing labels.' },
    fields: [
      { name: 'key', label: 'Field key', type: 'text', required: true, maxLength: 64,
        validate: (value: unknown) => validFieldKey(value) || 'Start with a lowercase letter; use letters, numbers and underscores. System keys are reserved.',
        admin: { description: 'Unique internal name, for example phone or projectDeadline. Keep it stable after publication; changing it creates a different answer identity.' } },
      { name: 'label', type: 'text', required: true, maxLength: 160 },
      { name: 'type', type: 'select', required: true, defaultValue: 'text', options: contactFieldTypes.map(value => ({ value, label: ({ text: 'Text', email: 'Email address', tel: 'Phone number', url: 'Website address', number: 'Number', textarea: 'Long text', select: 'Dropdown', datetime: 'Date and time', checkbox: 'Checkbox' })[value] })) },
      { name: 'placeholder', type: 'text', maxLength: 200 },
      { name: 'helpText', type: 'textarea', maxLength: 500 },
      { name: 'required', type: 'checkbox', defaultValue: false },
      { name: 'enabled', label: 'Show field', type: 'checkbox', defaultValue: true },
      { name: 'width', type: 'select', defaultValue: 'half', options: [{ label: 'Half row', value: 'half' }, { label: 'Full row', value: 'full' }] },
      { name: 'validationMessage', label: 'Validation message', type: 'text', maxLength: 300, admin: { description: 'Optional custom message shown when this field is required or invalid.' } },
      { name: 'optionsSource', label: 'Dropdown choices', type: 'select', defaultValue: 'custom', options: [
        { label: 'Custom options below', value: 'custom' }, { label: 'Published services', value: 'services' },
      ], admin: { condition: (_data, sibling) => sibling.type === 'select' } },
      { name: 'options', type: 'array', maxRows: 100, dbName: scopedArrayTableName('choices'),
        admin: { components: { RowLabel: '/payload/components/ContactFieldRowLabel#ContactOptionRowLabel' }, condition: (_data, sibling) => sibling.type === 'select' && sibling.optionsSource !== 'services', description: 'Drag choices into display order. Each value must be unique within this dropdown.' },
        fields: [
          { name: 'label', type: 'text', required: true, maxLength: 160 },
          { name: 'value', type: 'text', required: true, maxLength: 160, admin: { description: 'Saved answer value. Keep it stable when changing the displayed label.' } },
        ] },
      { name: 'minLength', type: 'number', min: 0, max: 5000, admin: { condition: textConstraints, description: 'Optional minimum characters for a non-empty answer.' } },
      { name: 'maxLength', type: 'number', min: 1, max: 5000, admin: { condition: textConstraints, description: 'Optional maximum characters. Server safety limits still apply.' } },
      { name: 'min', label: 'Minimum number', type: 'number', admin: { condition: (_data, sibling) => sibling.type === 'number' } },
      { name: 'max', label: 'Maximum number', type: 'number', admin: { condition: (_data, sibling) => sibling.type === 'number' } },
    ] },
  { name: 'validationSummaryMessage', type: 'text', defaultValue: 'Please check the highlighted fields.' },
  { name: 'datePickerLabels', label: 'Date picker labels', type: 'group', fields: [
    { name: 'dialogTitle', type: 'text', defaultValue: 'Choose date and time' },
    { name: 'previousMonth', type: 'text', defaultValue: 'Previous month' },
    { name: 'nextMonth', type: 'text', defaultValue: 'Next month' },
    { name: 'calendarHelp', type: 'textarea', defaultValue: 'Use arrow keys to move by day or week, Home or End for the week, Page Up or Down for the month. Hold Shift with Page Up or Down to change year. Press Enter to select a day, then choose a time and apply.' },
    { name: 'timeLabel', type: 'text', defaultValue: 'Time (24-hour)' },
    { name: 'hourLabel', type: 'text', defaultValue: 'Hour, 00 to 23' },
    { name: 'minuteLabel', type: 'text', defaultValue: 'Minute, 00 to 59' },
    { name: 'clearLabel', type: 'text', defaultValue: 'Clear' },
    { name: 'cancelLabel', type: 'text', defaultValue: 'Cancel' },
    { name: 'applyLabel', type: 'text', defaultValue: 'Apply' },
    { name: 'closeLabel', type: 'text', defaultValue: 'Close date picker' },
    { name: 'invalidTime', type: 'text', defaultValue: 'Enter an hour from 00–23 and minutes from 00–59.' },
  ] },
  { name: 'previewMessage', type: 'text', defaultValue: 'Publish this form before accepting enquiries.' },
  { name: 'unavailableMessage', type: 'textarea', defaultValue: 'This form is not accepting enquiries right now. Please contact us by email.' },
]
