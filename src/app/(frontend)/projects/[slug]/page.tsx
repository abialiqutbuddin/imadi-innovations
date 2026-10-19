import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDocument, getSiteContext } from '@/lib/cms'
import { Blocks, FormattedText } from '@/components/Blocks'
import { Eyebrow, Heading, Picture } from '@/components/ui'
import { pageMetadata } from '@/components/PageView'
import { safeHref, type Document } from '@/lib/content'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  return pageMetadata('projects', (await params).slug)
}
export default async function CaseStudy({ params }: Props) {
  const { slug } = await params
  const [project, context] = await Promise.all([getDocument('projects', slug), getSiteContext()])
  if (!project) notFound()
  const labels = context.settings.labels || {}
  const testimonial =
    project.testimonial &&
    typeof project.testimonial === 'object' &&
    project.testimonial._status === 'published' &&
    project.testimonial.quote &&
    project.testimonial.name
      ? project.testimonial
      : null
  return (
    <>
      <section className="section case-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">{labels.homeBreadcrumb || 'Home'}</Link>
            <span> / </span>
            <Link href="/projects">{labels.projectsLink || 'Projects'}</Link>
          </p>
          <Eyebrow>{project.industry}</Eyebrow>
          <Heading title={project.title} as="h1" />
          <p className="case-description">{project.summary}</p>
          <Picture
            media={project.coverImage}
            alt={project.title}
            className="case-cover"
            priority
            sizes="90vw"
          />
        </div>
      </section>
      <div className="container case-facts">
        {project.client ? (
          <div>
            <span>{labels.clientLabel || 'Client'}</span>
            <p>{project.client}</p>
          </div>
        ) : null}
        {project.industry ? (
          <div>
            <span>{labels.industryLabel || 'Industry'}</span>
            <p>{project.industry}</p>
          </div>
        ) : null}
        {project.services?.length ? (
          <div>
            <span>{labels.servicesLabel || 'Services'}</span>
            <p>
              {project.services
                .map((s: Document) => s.title)
                .filter(Boolean)
                .join(', ')}
            </p>
          </div>
        ) : null}
        {project.year ? (
          <div>
            <span>{labels.yearLabel || 'Year'}</span>
            <p>{project.year}</p>
          </div>
        ) : null}
      </div>
      <section className="section">
        <div className="container content-narrow">
          <FormattedText data={project.content} />
          {project.challenge || project.solution ? (
            <div className="case-challenges">
              {project.challenge ? (
                <article>
                  <h2>{labels.challengeHeading || 'The challenge'}</h2>
                  <p>{project.challenge}</p>
                </article>
              ) : null}
              {project.solution ? (
                <article>
                  <h2>{labels.solutionHeading || 'Our approach'}</h2>
                  <p>{project.solution}</p>
                </article>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>
      {project.gallery?.length ? (
        <Blocks
          blocks={[{ blockType: 'gallery', title: labels.galleryHeading, images: project.gallery }]}
          context={context}
        />
      ) : null}
      {project.results?.length ? (
        <section className="section case-results">
          <div className="container">
            <Heading title={labels.resultsHeading || 'The outcome'} />
            <div className="case-results__grid">
              {project.results.map((result: Document) => (
                <article key={result.id || result.label}>
                  <h3>{result.value}</h3>
                  <p>{result.label}</p>
                  {result.description ? <p>{result.description}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {testimonial ? (
        <Blocks
          blocks={[
            {
              blockType: 'testimonials',
              title: project.client || testimonial.company || testimonial.name,
              eyebrow: labels.clientLabel || 'Client',
              selectionMode: 'selected',
              maxItems: 1,
              testimonials: [testimonial],
            },
          ]}
          context={context}
        />
      ) : null}
      <Blocks blocks={project.sections || []} context={context} formOwner={{ collection: 'projects', id: project.id }} />
      <div className="container back-link">
        <Link href="/projects">← {labels.backToProjects || 'Back to projects'}</Link>
        {project.projectURL ? (
          <a href={safeHref(project.projectURL)} target="_blank" rel="noopener noreferrer">
            {labels.visitProject || 'Visit project'} ↗
          </a>
        ) : null}
      </div>
    </>
  )
}
