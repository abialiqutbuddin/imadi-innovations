import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDocument, getSiteContext } from '@/lib/cms'
import { mediaURL, type Document } from '@/lib/content'
import { Blocks } from './Blocks'
import { PreviewPage } from './Preview'

export async function pageMetadata(collection: string, slug: string): Promise<Metadata> {
  const document = await getDocument(collection, slug)
  if (!document) return {}
  const description =
    document.seo?.description || document.description || document.summary || document.excerpt
  const image = mediaURL(document.seo?.image || document.coverImage)
  const url =
    slug === 'home'
      ? '/'
      : collection === 'pages'
        ? `/${slug}`
        : `/${collection === 'posts' ? 'insights' : collection}/${slug}`
  return {
    title: document.seo?.title ? { absolute: document.seo.title } : document.title,
    description,
    robots: document.seo?.noIndex ? { index: false, follow: true } : undefined,
    alternates: { canonical: url },
    openGraph: {
      title: document.seo?.title || document.title,
      description,
      url,
      ...(image ? { images: [image] } : {}),
    },
  }
}

export async function PageView({ slug }: { slug: string }) {
  const [page, context, draft] = await Promise.all([
    getDocument('pages', slug),
    getSiteContext(),
    draftMode(),
  ])
  if (!page) notFound()
  return draft.isEnabled ? (
    <PreviewPage page={page} context={context} />
  ) : (
    <Blocks blocks={page.layout || []} context={context} formOwner={{ collection: 'pages', id: page.id }} />
  )
}

export function reusableEnding(home: Document | null): Document[] {
  return (home?.layout || []).filter((b: Document) =>
    ['sharedSection', 'contact', 'faqs', 'cta'].includes(b.blockType),
  )
}
