import { notFound } from 'next/navigation'
import { getDocument, getSiteContext } from '@/lib/cms'
import { Blocks, FormattedText } from '@/components/Blocks'
import { Eyebrow, Heading } from '@/components/ui'
import { pageMetadata } from '@/components/PageView'
import { populated, type Document } from '@/lib/content'
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  return pageMetadata('services', (await params).slug)
}
export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const [service, context] = await Promise.all([getDocument('services', slug), getSiteContext()])
  if (!service) notFound()
  const relatedProjects = context.projects.filter(
    (project: Document) =>
      Array.isArray(project.services) &&
      project.services.some(
        (related: Document | string | number) =>
          String(related && typeof related === 'object' ? related.id : related) ===
          String(service.id),
      ),
  )
  const serviceContext = { ...context, projects: relatedProjects }

  // Automatic project sections use this service's related projects. Explicit
  // editorial selections remain intact, including selections in shared sections.
  const visibleSections = (sections: Document[]): Document[] =>
    sections.flatMap((section) => {
      if (section.blockType === 'projects') {
        const selected = populated(section.projects)
        const available =
          section.selectionMode === 'all'
            ? relatedProjects
            : selected.length
              ? selected
              : section.selectionMode === 'selected'
                ? []
                : relatedProjects
        return available.length ? [section] : []
      }
      if (section.blockType === 'sharedSection') {
        const shared =
          section.section && typeof section.section === 'object'
            ? section.section
            : context.sharedSections.find(
                (item: Document) => String(item.id) === String(section.section),
              )
        return shared
          ? [{ ...section, section: { ...shared, layout: visibleSections(shared.layout || []) } }]
          : []
      }
      return [section]
    })
  const blocks = [
    {
      blockType: 'hero',
      variant: 'split',
      eyebrow: service.eyebrow || `Home / ${service.title}`,
      title: service.title,
      highlight: service.highlight,
      description: service.summary,
      image: service.heroImage,
      proof: populated(service.tags)
        .filter((tag) => tag.label)
        .map((tag) => ({ text: tag.label })),
      primaryAction: {
        label: context.settings.booking?.label,
        href: context.settings.booking?.href,
      },
    },
    ...(service.statistics?.length
      ? [{ blockType: 'stats', theme: 'dark', items: service.statistics }]
      : []),
  ]
  return (
    <div className="service-page">
      <Blocks blocks={blocks} context={serviceContext} formOwner={{ collection: 'services', id: service.id }} />
      {!service.benefits?.length && service.content ? (
        <section className="section">
          <div className="container content-narrow"><FormattedText data={service.content} /></div>
        </section>
      ) : null}
      {service.benefits?.length ? (
        <section className="section service-benefits">
          <div className="container">
            <div className="benefit-grid">
              <div className="service-benefits__intro">
                <Eyebrow>{service.eyebrow}</Eyebrow>
                <Heading title={context.settings.labels?.serviceBenefitsHeading || 'Built around your business'} />
                <FormattedText data={service.content} />
              </div>
              {service.benefits.map((b: Document, index: number) => (
                <article className="service-benefit-card" key={b.id || b.title}>
                  <span className="benefit-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{b.title}</h3>
                  {b.description ? <p>{b.description}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <Blocks blocks={visibleSections(service.sections || [])} context={serviceContext} formOwner={{ collection: 'services', id: service.id }} />
    </div>
  )
}
