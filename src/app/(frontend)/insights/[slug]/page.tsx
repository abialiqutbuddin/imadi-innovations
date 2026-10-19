import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDocument, getSiteContext } from '@/lib/cms'
import { Blocks, FormattedText } from '@/components/Blocks'
import { Eyebrow, Heading, Picture } from '@/components/ui'
import { pageMetadata } from '@/components/PageView'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  return pageMetadata('posts', (await params).slug)
}
export default async function Article({ params }: Props) {
  const [post, context] = await Promise.all([
    getDocument('posts', (await params).slug),
    getSiteContext(),
  ])
  if (!post) notFound()
  return (
    <>
      <article className="section article-page">
        <div className="container content-narrow">
          <p className="breadcrumb">
            <Link href="/insights">
              ← {context.settings.labels?.backToInsights || 'Back to insights'}
            </Link>
          </p>
          <Eyebrow>{post.category}</Eyebrow>
          <Heading title={post.title} as="h1" />
          <p className="article-excerpt">{post.excerpt}</p>
          <div className="article-byline">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'Asia/Karachi',
              })}
            </time>
            {post.readTime ? (
              <>
                <span>·</span>
                <span>{post.readTime}</span>
              </>
            ) : null}
          </div>
          <Picture
            media={post.coverImage}
            alt={post.title}
            className="article-cover"
            priority
            sizes="80vw"
          />
          <FormattedText data={post.body} />
        </div>
      </article>
      <Blocks
        blocks={[
          {
            blockType: 'posts',
            eyebrow: context.settings.labels?.postsLink,
            title: context.settings.labels?.moreInsights || 'Keep exploring',
            posts: context.posts.filter((p) => p.id !== post.id).slice(0, 3),
          },
        ]}
        context={context}
      />
    </>
  )
}
