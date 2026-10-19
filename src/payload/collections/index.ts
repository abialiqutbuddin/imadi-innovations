import path from 'node:path'
import type { CollectionConfig } from 'payload'
import { editorialAccess, editorialHooks, isAdmin, isAdminField, isEditor } from '../access'
import { layoutField } from '../blocks'
import { featuredField, imageField, itemFields, richContentField, seoField, slugField, sortOrderField, statisticFields } from '../fields'
import { previewAdmin } from '../preview'

const versions = { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 30 }

export const Users: CollectionConfig = {
  slug: 'users', auth: { tokenExpiration: 7200, maxLoginAttempts: 8, lockTime: 10 * 60 * 1000 },
  admin: { useAsTitle: 'name', group: 'Administration', defaultColumns: ['name', 'email', 'role'] },
  access: {
    admin: ({ req }) => Boolean(req.user && ['admin', 'editor'].includes((req.user as { role?: string }).role || '')),
    create: isAdmin,
    read: ({ req }) => req.user ? ((req.user as { role?: string }).role === 'admin' ? true : { id: { equals: req.user.id } }) : false,
    update: ({ req }) => req.user ? ((req.user as { role?: string }).role === 'admin' ? true : { id: { equals: req.user.id } }) : false,
    delete: isAdmin,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'select', required: true, defaultValue: 'editor', options: [
      { label: 'Administrator — content and team access', value: 'admin' },
      { label: 'Editor — content and publishing', value: 'editor' },
    ], admin: { condition: (_data, _siblingData, { user }) => Boolean(user) },
      access: { create: isAdminField, update: isAdminField } },
  ],
  hooks: {
    beforeChange: [async ({ operation, data, req }) => {
      // Payload's first-user setup is intentionally the only unauthenticated account bootstrap.
      if (operation === 'create') {
        const existing = await req.payload.count({ collection: 'users', overrideAccess: true, req })
        if (existing.totalDocs === 0) data.role = 'admin'
      }
      return data
    }],
  },
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt', group: 'Content library', description: 'Upload reusable images. Write useful alternative text for visitors using screen readers.' },
  access: { read: () => true, create: isEditor, update: isEditor, delete: isEditor },
  upload: {
    // Uploads are supplied by the persistent runtime volume, never bundled into server code.
    staticDir: path.resolve(/* turbopackIgnore: true */ process.cwd(), process.env.MEDIA_UPLOAD_DIR || 'media'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    imageSizes: [
      { name: 'thumbnail', width: 480 },
      { name: 'card', width: 960 },
      { name: 'hero', width: 1920 },
    ],
    adminThumbnail: 'thumbnail', focalPoint: true,
  },
  fields: [
    { name: 'alt', type: 'text', required: true, label: 'Alternative text' },
    { name: 'caption', type: 'textarea' },
    { name: 'credit', type: 'text', admin: { description: 'Photographer, source, or license information when applicable.' } },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages', access: editorialAccess, hooks: editorialHooks, versions,
  admin: { useAsTitle: 'title', group: 'Website', defaultColumns: ['title', 'slug', '_status', 'updatedAt'], ...previewAdmin('pages') },
  fields: [
    { name: 'title', type: 'text', required: true }, slugField(),
    { name: 'description', type: 'textarea', admin: { description: 'Internal page description and fallback search description.' } },
    layoutField(), seoField,
  ],
}

export const SharedSections: CollectionConfig = {
  slug: 'shared-sections', labels: { singular: 'Reusable section', plural: 'Reusable sections' },
  access: editorialAccess, hooks: editorialHooks, versions, defaultSort: 'sortOrder',
  admin: { useAsTitle: 'title', group: 'Website', defaultColumns: ['title', 'slug', '_status'],
    description: 'Maintain shared contact, FAQ, CTA, or other sections once. Every page using this reusable section receives the published update.' },
  fields: [
    { name: 'title', type: 'text', required: true }, slugField(),
    layoutField('layout', 'Shared content', true), sortOrderField,
  ],
}

export const Services: CollectionConfig = {
  slug: 'services', access: editorialAccess, hooks: editorialHooks, versions, defaultSort: 'sortOrder',
  defaultPopulate: { title: true, slug: true, summary: true, heroImage: true, icon: true, tags: true, featured: true },
  admin: { useAsTitle: 'title', group: 'Content library', defaultColumns: ['title', 'slug', 'featured', '_status'], ...previewAdmin('services') },
  fields: [
    { name: 'title', type: 'text', required: true }, slugField(),
    { name: 'summary', type: 'textarea', required: true },
    { name: 'eyebrow', type: 'text' }, { name: 'highlight', type: 'text' },
    { name: 'icon', type: 'text', admin: { description: 'Icon key, for example code, mobile, layers, sparkles, or chart.' } },
    imageField('heroImage'),
    { name: 'tags', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    { name: 'benefits', type: 'array', fields: itemFields },
    { name: 'statistics', type: 'array', fields: statisticFields },
    richContentField('content', 'Introduction'), layoutField('sections', 'Additional page sections'),
    featuredField, sortOrderField, seoField,
  ],
}

export const Projects: CollectionConfig = {
  slug: 'projects', access: editorialAccess, hooks: editorialHooks, versions, defaultSort: 'sortOrder',
  defaultPopulate: { title: true, slug: true, summary: true, coverImage: true, categories: true, testimonial: true, services: true, client: true, featured: true },
  admin: { useAsTitle: 'title', group: 'Content library', defaultColumns: ['title', 'client', 'featured', '_status'], ...previewAdmin('projects') },
  fields: [
    { name: 'title', type: 'text', required: true }, slugField(),
    { name: 'summary', type: 'textarea', required: true },
    { name: 'client', type: 'text' }, { name: 'industry', type: 'text' },
    { name: 'year', type: 'text' }, { name: 'projectURL', type: 'text' },
    imageField('coverImage'),
    { name: 'gallery', type: 'array', fields: [imageField(), { name: 'caption', type: 'text' }] },
    { name: 'categories', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'challenge', type: 'textarea' }, { name: 'solution', type: 'textarea' },
    { name: 'results', type: 'array', fields: statisticFields },
    { name: 'testimonial', type: 'relationship', relationTo: 'testimonials' },
    richContentField('content', 'Project story'), layoutField('sections', 'Additional case study sections'),
    featuredField, sortOrderField, seoField,
  ],
}

export const Testimonials: CollectionConfig = {
  slug: 'testimonials', access: editorialAccess, hooks: editorialHooks, versions, defaultSort: 'sortOrder',
  defaultPopulate: { quote: true, name: true, role: true, company: true, photo: true, companyLogo: true, featured: true, _status: true },
  admin: { useAsTitle: 'name', group: 'Content library', defaultColumns: ['name', 'company', 'featured', '_status'],
    description: 'Publish only genuine client quotes for which you have permission. Draft examples never appear on the website.' },
  fields: [
    { name: 'quote', type: 'textarea', required: true }, { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text' }, { name: 'company', type: 'text' }, imageField('photo'), imageField('companyLogo'),
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
    featuredField, sortOrderField,
  ],
}

export const Posts: CollectionConfig = {
  slug: 'posts', access: editorialAccess, hooks: editorialHooks, versions, defaultSort: '-publishedAt',
  defaultPopulate: { title: true, slug: true, excerpt: true, coverImage: true, author: true, publishedAt: true, category: true, readTime: true, featured: true },
  admin: { useAsTitle: 'title', group: 'Content library', defaultColumns: ['title', 'author', 'publishedAt', '_status'], ...previewAdmin('posts') },
  fields: [
    { name: 'title', type: 'text', required: true }, slugField(),
    { name: 'excerpt', type: 'textarea', required: true }, imageField('coverImage'),
    { name: 'author', type: 'text', required: true, defaultValue: 'Imadi Innovations' },
    { name: 'category', type: 'text' },
    { name: 'publishedAt', type: 'date', defaultValue: () => new Date().toISOString(), admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'readTime', type: 'text', admin: { description: 'For example, 5 min read.' } },
    richContentField('body', 'Article body'), featuredField, sortOrderField, seoField,
  ],
}

export const FAQs: CollectionConfig = {
  slug: 'faqs', labels: { singular: 'FAQ', plural: 'FAQs' }, access: editorialAccess, hooks: editorialHooks, versions, defaultSort: 'sortOrder',
  defaultPopulate: { question: true, answer: true },
  admin: { useAsTitle: 'question', group: 'Content library', defaultColumns: ['question', '_status', 'sortOrder'] },
  fields: [
    { name: 'question', type: 'text', required: true }, { name: 'answer', type: 'textarea', required: true },
    { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
    featuredField, sortOrderField,
  ],
}

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: { useAsTitle: 'name', group: 'Business', defaultColumns: ['name', 'email', 'service', 'status', 'createdAt'],
    description: 'Enquiries are saved here. Optional email notifications are configured under Administration → Email settings; this inbox always retains saved submissions.' },
  access: { create: () => false, read: isEditor, update: isEditor, delete: isAdmin },
  timestamps: true,
  fields: [
    { name: 'name', type: 'text' }, { name: 'email', type: 'email' },
    { name: 'company', type: 'text' }, { name: 'preferredTime', type: 'text' },
    { name: 'service', type: 'text' }, { name: 'budget', type: 'text' },
    { name: 'message', type: 'textarea' },
    { name: 'formIdentity', type: 'json', access: { update: () => false }, admin: { readOnly: true, description: 'Published form and section that accepted this enquiry.' } },
    { name: 'fieldValues', label: 'Submitted answers', type: 'json', access: { update: () => false }, admin: { readOnly: true, description: 'Ordered snapshot of the field labels, types and answers at the time of submission. Later form edits do not rewrite previous enquiries.' } },
    { name: 'source', type: 'text' },
    { name: 'status', type: 'select', defaultValue: 'new', options: ['new', 'contacted', 'in-progress', 'closed'] },
    { name: 'internalNotes', type: 'textarea' },
    { name: 'ipHash', type: 'text', index: true, admin: { hidden: true }, access: { read: isAdminField } },
  ],
}

export const collections = [Users, Media, Pages, SharedSections, Services, Projects, Testimonials, Posts, FAQs, Enquiries]
