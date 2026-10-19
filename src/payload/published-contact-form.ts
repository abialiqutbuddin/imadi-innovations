import type { Payload } from 'payload'
import { resolveContactFields, type ContactDefinition, type ContactFormLocator } from '../lib/contact-form'

const collections = new Set(['pages', 'shared-sections', 'services', 'projects'])
export function parseContactFormLocator(value: unknown): ContactFormLocator | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const locator = value as Record<string, unknown>
  if (typeof locator.collection !== 'string' || !collections.has(locator.collection)) return null
  if (!['string', 'number'].includes(typeof locator.id) || !String(locator.id).trim() || String(locator.id).length > 80) return null
  if (typeof locator.blockId !== 'string' || !locator.blockId.trim() || locator.blockId.length > 80) return null
  return { collection: locator.collection as ContactFormLocator['collection'], id: locator.id as string | number, blockId: locator.blockId }
}

/** Never accept validation rules or draft form definitions supplied by the visitor. */
export async function getPublishedContactForm(payload: Payload, locator: ContactFormLocator) {
  const document = await payload.find({
    collection: locator.collection, overrideAccess: false, draft: false, depth: 0, limit: 1,
    where: { and: [{ id: { equals: locator.id } }, { _status: { equals: 'published' } }] },
  })
  const owner = document.docs[0] as ContactDefinition | undefined
  const layout = locator.collection === 'pages' || locator.collection === 'shared-sections' ? owner?.layout : owner?.sections
  const block = (Array.isArray(layout) ? layout : []).find((item: ContactDefinition) => item.id === locator.blockId && item.blockType === 'contact' && item.enabled !== false) as ContactDefinition | undefined
  if (!block) return null
  const services = await payload.find({ collection: 'services', overrideAccess: false, draft: false, depth: 0, pagination: false, sort: 'sortOrder', where: { _status: { equals: 'published' } } })
  const fields = resolveContactFields(block, services.docs)
  if (!fields.length) return null
  return { block, fields, locator }
}
