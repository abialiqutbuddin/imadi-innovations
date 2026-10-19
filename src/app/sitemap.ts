import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
export const dynamic = 'force-dynamic'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const origin = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100'
  const groups = await Promise.all(
    ['pages', 'services', 'projects', 'posts'].map(async (collection) => {
      const { docs } = await payload.find({
        collection: collection as any,
        limit: 1000,
        depth: 0,
        where: { 'seo.noIndex': { not_equals: true } },
        overrideAccess: false,
        draft: false,
      })
      return docs.map((doc: any) => ({
        url: `${origin}${collection === 'pages' ? (doc.slug === 'home' ? '' : `/${doc.slug}`) : `/${collection === 'posts' ? 'insights' : collection}/${doc.slug}`}`,
        lastModified: doc.updatedAt,
      }))
    }),
  )
  return groups.flat()
}
