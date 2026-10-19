import { createHash } from 'node:crypto'
import type { DBIdentifierName, Field } from 'payload'

/** dbName replaces a full SQL table name. Preserve each parent scope, including versions. */
export const scopedArrayTableName = (fieldName: string): DBIdentifierName => ({ tableName }) => {
  const parent = tableName || 'content'
  const hash = createHash('sha256').update(`${parent}:${fieldName}`).digest('hex').slice(0, 12)
  return `${parent.slice(0, 16)}_${hash}_${fieldName.slice(0, 12)}`
}

export const slugify = (value: string): string => value.toLowerCase().trim()
  .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const slugField = (source = 'title'): Field => ({
  name: 'slug', type: 'text', required: true, unique: true, index: true,
  admin: { position: 'sidebar', description: 'The address of this page. Use lowercase words separated by hyphens.' },
  hooks: { beforeValidate: [({ value, data, originalDoc }) => slugify(String(value || data?.[source] || originalDoc?.[source] || ''))] },
  validate: (value: unknown) => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
    ? true : 'Use lowercase letters, numbers, and hyphens.' ,
})

export const imageField = (name = 'image', label?: string): Field => ({
  name, label, type: 'upload', relationTo: 'media',
})

export const actionField = (name: string, label?: string): Field => ({
  name, label, type: 'group', fields: [
    { name: 'label', type: 'text', admin: { description: 'Button text. Leave blank to hide this button.' } },
    { name: 'href', type: 'text', admin: { description: 'An internal address such as /projects, or a full https:// address.' },
      validate: (value: unknown) => !value || (typeof value === 'string' && /^(\/(?!\/)|https?:\/\/|mailto:|tel:|#)/i.test(value))
        ? true : 'Enter a site path, https:// address, email link, phone link, or section anchor.' },
  ],
})

export const seoField: Field = {
  name: 'seo', label: 'Search & social sharing', type: 'group', fields: [
    { name: 'title', type: 'text', maxLength: 100 },
    { name: 'description', type: 'textarea', maxLength: 300 },
    imageField('image', 'Social sharing image'),
    { name: 'noIndex', type: 'checkbox', defaultValue: false, admin: { description: 'Ask search engines not to list this page.' } },
  ],
}

export const sortOrderField: Field = {
  name: 'sortOrder', type: 'number', defaultValue: 0,
  admin: { position: 'sidebar', description: 'Lower numbers appear first when no manual selection is made.' },
}

export const featuredField: Field = {
  name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' },
}

export const richContentField = (name = 'content', label?: string): Field => ({ name, label, type: 'richText' })

export const statisticFields: Field[] = [
  { name: 'value', type: 'text', required: true },
  { name: 'label', type: 'text', required: true },
  { name: 'description', type: 'textarea' },
]

export const itemFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'description', type: 'textarea' },
  { name: 'icon', type: 'text', admin: { description: 'Optional icon key: sparkles, code, layers, mobile, globe, chart, shield, or users.' } },
]
