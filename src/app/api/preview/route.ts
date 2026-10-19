import config from '@payload-config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

const paths = { pages: '', services: '/services', projects: '/projects', posts: '/insights' } as const
type PreviewCollection = keyof typeof paths

export async function GET(request: Request) {
  const url = new URL(request.url)
  const collection = (url.searchParams.get('collection') || 'pages') as PreviewCollection
  const slug = url.searchParams.get('slug') || 'home'
  if (!Object.hasOwn(paths, collection) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return Response.json({ error: 'Invalid preview address.' }, { status: 400 })
  }
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: request.headers })
  if (!user || !['admin', 'editor'].includes((user as { role?: string }).role || '')) {
    return Response.json({ error: 'Sign in to the admin panel before opening a draft preview.' }, { status: 401 })
  }
  // Never allow this endpoint to redirect to arbitrary URLs or unavailable records.
  const result = await payload.find({ collection, where: { slug: { equals: slug } }, draft: true,
    overrideAccess: false, user, limit: 1, depth: 0 })
  if (!result.docs.length) return Response.json({ error: 'Save a draft before opening its preview.' }, { status: 404 })
  const draft = await draftMode()
  draft.enable()
  const destination = collection === 'pages' && slug === 'home' ? '/' : `${paths[collection]}/${slug}`
  return Response.redirect(new URL(destination, url.origin), 307)
}
