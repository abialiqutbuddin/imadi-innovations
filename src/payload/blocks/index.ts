import type { Block, CollectionSlug, Field, GroupField, TextField } from 'payload'
import { contactBuilderFields } from '../contact-fields'
import { actionField, imageField, itemFields, richContentField, scopedArrayTableName, statisticFields } from '../fields'

const showLegacyContactFields = (_data: unknown, siblingData: Record<string, unknown>) => siblingData.formMode !== 'custom'

/** Keep presentation options constrained so editors can compose pages without breaking the design. */
const commonFields = (): Field[] => [
  { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { description: 'Turn off to hide this section without deleting its content.' } },
  { name: 'eyebrow', type: 'text', label: 'Small section label' },
  { name: 'title', type: 'text' },
  { name: 'highlight', type: 'text', admin: { description: 'Highlighted part of the heading, displayed in the brand typeface.' } },
  { name: 'description', type: 'textarea' },
  { name: 'theme', type: 'select', defaultValue: 'light', options: [
    { label: 'White', value: 'light' }, { label: 'Dark', value: 'dark' }, { label: 'Soft lavender', value: 'lavender' },
  ] },
  { name: 'anchor', type: 'text', admin: { description: 'Optional section address, for example process. Link to it using #process.' } },
]

const section = (slug: string, singular: string, fields: Field[]): Block => ({
  slug, labels: { singular, plural: `${singular} sections` },
  fields: [...commonFields(), ...fields, ...(fields.some((field) => 'name' in field && field.name === 'primaryAction') ? [] : [actionField('primaryAction')])],
})

const records = (name: string, relationTo: CollectionSlug): Field => ({
  name, type: 'relationship', relationTo, hasMany: true,
  admin: { description: 'Choose and drag records into display order. Leave empty to show published featured content automatically.' },
})

const recordListFields = (name: string, relationTo: CollectionSlug): Field[] => [
  records(name, relationTo),
  { name: 'selectionMode', type: 'select', defaultValue: 'featured', options: [
    { label: 'Featured content', value: 'featured' }, { label: 'All published content', value: 'all' },
    { label: 'Only records selected above', value: 'selected' },
  ], admin: { description: 'Use all published content for listing pages, featured for highlights, or selected for manual curation.' } },
  { name: 'maxItems', type: 'number', min: 0, defaultValue: 0,
    admin: { description: 'Maximum cards to show. Leave at 0 to display every matching record.' } },
]

// Reuse the same optional destination validator as buttons without changing other
// item arrays (service benefits, process steps, and split-content lists).
const actionHrefField = (actionField('link') as GroupField).fields.find(
  (field) => 'name' in field && field.name === 'href',
) as TextField
const problemItemFields: Field[] = [
  ...itemFields,
  { ...actionHrefField, name: 'href', label: 'Link destination' },
  { name: 'linkLabel', type: 'text', label: 'Link text', admin: { description: 'Optional. Leave the destination blank to hide this card’s link.' } },
]

export const pageBlocks: Block[] = [
  section('hero', 'Hero', [
    { name: 'trailingTitle', type: 'text', admin: { description: 'Heading text following the highlighted words.' } },
    { name: 'variant', type: 'select', defaultValue: 'brand', options: ['brand', 'split', 'centered', 'editorial'] },
    { name: 'badge', type: 'text' }, imageField(), actionField('primaryAction'), actionField('secondaryAction'),
    { name: 'proof', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
  ]),
  section('stats', 'Statistics', [{ name: 'items', type: 'array', fields: statisticFields }]),
  section('problems', 'Problems & solutions', [{ name: 'items', type: 'array', fields: problemItemFields }]),
  section('services', 'Services', [...recordListFields('services', 'services'), actionField('primaryAction')]),
  section('projects', 'Selected projects', [...recordListFields('projects', 'projects'), actionField('primaryAction'),
    { name: 'showFilters', type: 'checkbox', defaultValue: false }]),
  section('process', 'Our process', [
    { name: 'steps', type: 'array', fields: [{ name: 'number', type: 'text' }, ...itemFields] }, imageField(), imageField('backgroundImage'),
  ]),
  section('product', 'Product spotlight', [
    { name: 'name', type: 'text' }, imageField('logo'), imageField(),
    { name: 'composition', type: 'select', defaultValue: 'single', options: ['single', 'dashboard'] },
    { name: 'imageCaption', type: 'text' },
    { name: 'secondaryImages', type: 'array', dbName: scopedArrayTableName('extra_images'), fields: [imageField(), { name: 'caption', type: 'text' }] },
    { name: 'features', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] }, actionField('primaryAction'),
  ]),
  section('testimonials', 'Testimonials', recordListFields('testimonials', 'testimonials')),
  section('posts', 'Insights', [...recordListFields('posts', 'posts'), actionField('primaryAction')]),
  section('contact', 'Contact form', [
    { name: 'variant', type: 'select', defaultValue: 'standard', options: [
      { label: 'Shared contact section', value: 'standard' },
      { label: 'Contact page introduction', value: 'page' },
    ], admin: { description: 'Use the page introduction once at the top of the Contact page. Other contact sections keep a section heading.' } },
    ...contactBuilderFields,
    { name: 'nameLabel', type: 'text', defaultValue: 'Your name', admin: { condition: showLegacyContactFields } },
    { name: 'namePlaceholder', type: 'text', defaultValue: 'Your full name', admin: { condition: showLegacyContactFields } },
    { name: 'emailLabel', type: 'text', defaultValue: 'Email address', admin: { condition: showLegacyContactFields } },
    { name: 'emailPlaceholder', type: 'text', defaultValue: 'you@company.com', admin: { condition: showLegacyContactFields } },
    { name: 'preferredTimeLabel', type: 'text', defaultValue: 'Preferred time (optional)', admin: { condition: showLegacyContactFields } },
    { name: 'preferredTimePlaceholder', type: 'text', defaultValue: 'A convenient time and your time zone', admin: { condition: showLegacyContactFields } },
    { name: 'companyLabel', type: 'text', defaultValue: 'Company (optional)', admin: { condition: showLegacyContactFields } },
    { name: 'companyPlaceholder', type: 'text', defaultValue: 'Your company name', admin: { condition: showLegacyContactFields } },
    { name: 'serviceLabel', type: 'text', defaultValue: 'What can we help with?', admin: { condition: showLegacyContactFields } },
    { name: 'servicePlaceholder', type: 'text', defaultValue: 'Choose a service', admin: { condition: showLegacyContactFields } },
    { name: 'budgetLabel', type: 'text', defaultValue: 'Project budget (optional)', admin: { condition: showLegacyContactFields } },
    { name: 'budgetPlaceholder', type: 'text', defaultValue: 'Select a range', admin: { condition: showLegacyContactFields } },
    { name: 'budgetOptions', type: 'array', fields: [{ name: 'label', type: 'text', required: true }], admin: { condition: showLegacyContactFields } },
    { name: 'messageLabel', type: 'text', defaultValue: 'Tell us about your project', admin: { condition: showLegacyContactFields } },
    { name: 'messagePlaceholder', type: 'text', defaultValue: 'What would you like to build or improve?', admin: { condition: showLegacyContactFields } },
    { name: 'submitLabel', type: 'text', defaultValue: 'Send enquiry' },
    { name: 'submittingLabel', type: 'text', defaultValue: 'Sending your enquiry…' },
    { name: 'errorMessage', type: 'text', defaultValue: 'We could not save your enquiry. Please try again, or contact us by email.' },
    { name: 'privacyNote', type: 'textarea', defaultValue: 'We use your details to respond to your enquiry.' },
    { name: 'cardTitle', type: 'text' }, imageField('cardImage', 'Contact card artwork'), actionField('cardButton', 'Contact card button'),
    { name: 'successMessage', type: 'textarea', defaultValue: 'Thank you. Your enquiry has been saved and our team will be in touch.' },
  ]),
  section('contactChannels', 'Email & collaboration', [
    { name: 'items', type: 'array', dbName: scopedArrayTableName('channels'), fields: [
      { name: 'label', type: 'text', required: true, admin: { description: 'The reason for getting in touch, such as business enquiries or careers.' } },
      actionField('link', 'Email or contact link'),
    ] },
    imageField('image', 'Full-width photograph'),
  ]),
  section('faqs', 'Frequently asked questions', [...recordListFields('faqs', 'faqs'),
    { name: 'supportTitle', type: 'text' }, { name: 'supportDescription', type: 'textarea' }, imageField(), actionField('action', 'Support button')]),
  section('cta', 'Call to action', [
    { name: 'variant', type: 'select', defaultValue: 'standard', options: [
      { label: 'Standard call to action', value: 'standard' },
      { label: 'Consultation panel', value: 'consultation' },
    ] },
    imageField('image', 'Panel artwork'), actionField('primaryAction'), actionField('secondaryAction'),
  ]),
  section('richContent', 'Formatted text', [richContentField()]),
  section('splitContent', 'Image & text', [
    imageField(), { name: 'imagePosition', type: 'select', defaultValue: 'right', options: ['left', 'right'] },
    richContentField(), { name: 'items', type: 'array', fields: itemFields }, actionField('primaryAction'),
  ]),
  section('gallery', 'Image gallery', [
    { name: 'images', type: 'array', fields: [imageField(), { name: 'caption', type: 'text' }] },
  ]),
  {
    slug: 'sharedSection', labels: { singular: 'Reusable section', plural: 'Reusable sections' },
    fields: [
      { name: 'enabled', type: 'checkbox', defaultValue: true },
      { name: 'section', type: 'relationship', relationTo: 'shared-sections', required: true,
        admin: { description: 'This content is maintained once under Reusable sections. Publishing an update there changes every page using it.' } },
    ],
  },
]

export const layoutField = (name = 'layout', label = 'Page sections', excludeShared = false): Field => ({
  name, label, type: 'blocks', blocks: excludeShared ? pageBlocks.filter((block) => block.slug !== 'sharedSection') : pageBlocks,
  admin: { description: 'Add, reorder, duplicate, or hide sections. Changes remain drafts until you publish.' },
})
