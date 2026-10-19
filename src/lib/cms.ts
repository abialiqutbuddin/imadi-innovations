import 'server-only'
import { cache } from 'react'
import { draftMode, headers } from 'next/headers'
import { getPayload, type CollectionSlug, type GlobalSlug } from 'payload'
import config from '@payload-config'
import type { Document } from './content'

export const cms = cache(() => getPayload({ config }))

const requestContext = cache(async () => {
  const payload = await cms()
  const draft = await draftMode()
  const { user } = draft.isEnabled
    ? await payload.auth({ headers: await headers() })
    : { user: null }
  return { payload, user, draft: draft.isEnabled && !!user }
})

export const getSettings = cache(async (): Promise<Document> => {
  const { payload, user, draft } = await requestContext()
  // Site settings contain public presentation fields. Direct global endpoints are editor-only
  // so drafts cannot leak through REST; this server query explicitly selects published content.
  return (await payload.findGlobal({
    slug: 'site-settings' as GlobalSlug,
    depth: 2,
    overrideAccess: true,
    user,
    draft,
  })) as Document
})

export const getDocuments = cache(async (collection: string, limit = 50): Promise<Document[]> => {
  const { payload, user, draft } = await requestContext()
  const data = await payload.find({
    collection: collection as CollectionSlug,
    limit,
    depth: 2,
    sort: collection === 'posts' ? '-publishedAt' : 'sortOrder',
    overrideAccess: false,
    user,
    draft,
  })
  return data.docs as Document[]
})

export const getSiteContext = cache(async () => {
  const [settings, services, projects, posts, faqs, testimonials, sharedSections, request] =
    await Promise.all([
      getSettings(),
      getDocuments('services'),
      getDocuments('projects'),
      getDocuments('posts'),
      getDocuments('faqs'),
      getDocuments('testimonials'),
      getDocuments('shared-sections'),
      requestContext(),
    ])
  return { settings, services, projects, posts, faqs, testimonials, sharedSections, formPreview: request.draft }
})

export const getDocument = cache(
  async (collection: string, slug: string): Promise<Document | null> => {
    const { payload, user, draft } = await requestContext()
    const data = await payload.find({
      collection: collection as CollectionSlug,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 3,
      overrideAccess: false,
      user,
      draft,
    })
    return (data.docs[0] as Document) || null
  },
)
