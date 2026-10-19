import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { mediaAlt, mediaURL, populated, safeHref, type Document } from '@/lib/content'
import { Button, Eyebrow, Heading, Picture, SectionIntro } from './ui'
import { ContactForm } from './ContactForm'
import { ProjectFilter } from './ProjectFilter'
import type { ContactFormLocator } from '@/lib/contact-form'

type FormOwner = Pick<ContactFormLocator, 'collection' | 'id'>

export function FormattedText({ data }: { data?: Document | null }) {
  if (!data?.root) return null
  return (
    <div className="prose">
      <RichText data={data as any} />
    </div>
  )
}

function select(block: Document, context: Document, key: string, limit = 100) {
  const cap = block.maxItems > 0 ? block.maxItems : block.selectionMode === 'all' ? 1000 : limit
  const items = populated(context[key])
  if (block.selectionMode === 'all') return items.slice(0, cap)
  const selected = populated(block[key])
  if (selected.length) return selected.slice(0, cap)
  if (block.selectionMode === 'selected') return []
  const featured = items.filter((item) => item.featured)
  return (featured.length ? featured : items).slice(0, cap)
}

export function Blocks({ blocks, context, formOwner }: { blocks: Document[]; context: Document; formOwner?: FormOwner }) {
  return (
    <>
      {blocks
        .filter((b) => b.enabled !== false)
        .map((block, index) => (
          <Block key={block.id || `${block.blockType}-${index}`} block={block} context={context} formOwner={formOwner} />
        ))}
    </>
  )
}

function Block({ block: b, context, formOwner }: { block: Document; context: Document; formOwner?: FormOwner }) {
  const settings = context.settings || {}
  const labels = settings.labels || {}
  const sectionProps = {
    id: b.anchor || undefined,
    className: `section section--${b.blockType} theme--${b.theme || 'light'}`,
  }
  switch (b.blockType) {
    case 'sharedSection': {
      const shared =
        b.section && typeof b.section === 'object'
          ? b.section
          : populated(context.sharedSections).find((s) => s.id === b.section)
      return shared?.layout ? (
        <Blocks
          blocks={shared.layout.filter((item: Document) => item.blockType !== 'sharedSection')}
          context={context}
          formOwner={{ collection: 'shared-sections', id: shared.id }}
        />
      ) : null
    }
    case 'hero': {
      const brand = b.variant === 'brand'
      return (
        <section
          {...sectionProps}
          className={`${sectionProps.className} hero hero--${b.variant || 'split'}`}
        >
          {brand ? (
            <Image
              src="/figma/8019-216-imgBg.png"
              alt=""
              fill
              sizes="100vw"
              className="hero-texture"
              priority
            />
          ) : null}
          <div className="container hero-inner">
            <div className="hero-copy">
              {!brand && b.eyebrow?.startsWith('Home') ? (
                <p className="breadcrumb">
                  <Link href="/">{labels.homeLink || 'Home'}</Link>
                  <span aria-hidden="true"> / </span>
                  {b.eyebrow.replace(/^Home\s*\/\s*/, '')}
                </p>
              ) : (
                <Eyebrow>{b.eyebrow || b.badge}</Eyebrow>
              )}
              <h1 className="display hero-title">
                {b.title}
                {b.highlight ? (
                  <>
                    <br />
                    <span className="gradient-text">{b.highlight}</span>
                  </>
                ) : null}
                {b.trailingTitle ? (
                  <>
                    <br />
                    {b.trailingTitle}
                  </>
                ) : null}
              </h1>
              {b.description ? <p className="hero-description">{b.description}</p> : null}
              {b.proof?.length ? (
                <ul className="hero-proof">
                  {b.proof.map((p: Document) => (
                    <li key={p.id || p.text}>{p.text}</li>
                  ))}
                </ul>
              ) : null}
              <div className="button-group">
                {b.primaryAction?.label ? (
                  <Button href={b.primaryAction.href}>{b.primaryAction.label}</Button>
                ) : null}
                {b.secondaryAction?.label ? (
                  <Button variant="dark" href={b.secondaryAction.href} meeting>
                    {b.secondaryAction.label}
                  </Button>
                ) : null}
              </div>
            </div>
            {mediaURL(b.image) || brand ? (
              <Picture
                media={b.image}
                fallback={brand ? '/figma/8019-216-imgLogo.png' : undefined}
                alt={brand ? '' : b.title}
                className={brand ? 'hero-art' : 'hero-image'}
                priority
              />
            ) : null}
          </div>
        </section>
      )
    }
    case 'stats':
      return (
        <section {...sectionProps}>
          <div className="container">
            <SectionIntro {...b} />
          </div>
          <div className="container statistics">
            {(b.items || []).map((item: Document) => (
              <div key={item.id || item.label}>
                <p className="stat-value">{item.value}</p>
                {b.title || b.highlight ? <h3>{item.label}</h3> : <h2>{item.label}</h2>}
                {item.description ? <p>{item.description}</p> : null}
              </div>
            ))}
          </div>
        </section>
      )
    case 'problems':
      return (
        <section {...sectionProps}>
          <div className="container">
            <SectionIntro {...b} action={b.primaryAction} />
            <div className="problem-grid">
              {(b.items || []).map((item: Document) => (
                <article className="problem-card" key={item.id || item.title}>
                  <span className="problem-icon">
                    <img src="/figma/8024-252-imgFrame1.svg" alt="" width={48} height={48} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.href ? (
                    <Link className="text-link" href={safeHref(item.href)}>
                      {item.linkLabel || labels.serviceReadMore}
                      <span aria-hidden="true"> ↗</span>
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      )
    case 'services': {
      const services = select(b, context, 'services')
      return (
        <section {...sectionProps}>
          <div className="container">
            <SectionIntro
              {...b}
              action={b.primaryAction}
              titleDecoration={
                <img
                  className="heading-capsule"
                  src="/figma/8039-1227-imgFrame21.png"
                  alt=""
                  width={180}
                  height={80}
                />
              }
            />
            <div className="service-list">
              {services.map((service) => (
                <Link className="service-row" key={service.id} href={`/services/${service.slug}`}>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </div>
                  <div className="service-preview">
                    <Picture
                      media={service.heroImage}
                      fallback="/figma/8039-1227-imgFrame42.png"
                      alt=""
                    />
                  </div>
                  <img
                    className="service-arrow"
                    src="/figma/8039-1227-imgFrame.svg"
                    width={100}
                    height={100}
                    alt=""
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )
    }
    case 'projects': {
      const projects = select(b, context, 'projects', b.showFilters ? 100 : 3)
      return (
        <section {...sectionProps}>
          <div className="container">
            <SectionIntro {...b} action={b.primaryAction} />
            {b.showFilters ? (
              <ProjectFilter
                projects={projects}
                allLabel={labels.allFilter}
                emptyLabel={labels.emptyProjects}
              />
            ) : (
              <div className="featured-projects">
                {projects.map((project) => (
                  <article className="project-feature" key={project.id}>
                    <div className="project-feature__copy">
                      <Link href={`/projects/${project.slug}`}>
                        <h3>{project.title}</h3>
                      </Link>
                      <p>{project.summary}</p>
                      <div className="tags">
                        {(project.categories || []).map((c: Document) => (
                          <span key={c.id || c.label}>{c.label}</span>
                        ))}
                      </div>
                      {project.testimonial && typeof project.testimonial === 'object' ? (
                        <div className="project-endorsement">
                          <Picture
                            media={project.testimonial.photo}
                            alt={project.testimonial.name}
                          />
                          <div>
                            <p>{project.testimonial.name}</p>
                            <small>
                              {[project.testimonial.role, project.testimonial.company]
                                .filter(Boolean)
                                .join(', ')}
                            </small>
                          </div>
                        </div>
                      ) : (
                        <Link className="text-link" href={`/projects/${project.slug}`}>
                          {labels.projectReadMore || 'Explore project'}
                          <span aria-hidden="true"> ↗</span>
                        </Link>
                      )}
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="project-feature__image"
                      aria-label={`${labels.projectReadMore || 'Explore'} ${project.title}`}
                    >
                      <Picture
                        media={project.coverImage}
                        fallback={project.fallbackImage}
                        alt={project.title}
                      />
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )
    }
    case 'process': {
      const steps = b.steps || []
      if (b.theme !== 'dark')
        return (
          <section
            {...sectionProps}
            className={`${sectionProps.className} process-section--timeline`}
          >
            <div className="container">
              <SectionIntro {...b} action={b.primaryAction} />
              <div className="journey-grid">
                {steps.map((step: Document, index: number) => (
                  <article key={step.id || step.title}>
                    <span>{step.number || String(index + 1).padStart(2, '0')}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )
      return (
        <section {...sectionProps} className={`${sectionProps.className} process-section`}>
          <Image
            src={mediaURL(b.backgroundImage, '/figma/8062-182-imgImage5.png')}
            alt=""
            fill
            sizes="100vw"
            className="process-background"
          />
          <div className="container">
            <SectionIntro {...b} title={b.title ? `${b.title} ` : b.title} action={b.primaryAction} />
            <div className="process-grid">
              {steps.map((step: Document, i: number) => (
                <div
                  className={`process-column process-column--${i + 1}`}
                  key={step.id || step.title}
                >
                  <article className="process-card">
                    <span>{step.number || `0${i + 1}`}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </article>
                  <Picture
                    media={b.image}
                    fallback="/figma/8062-182-imgHeroSection.png"
                    alt=""
                    className="process-visual"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )
    }
    case 'product': {
      const composition = b.composition === 'dashboard'
      const secondary = b.secondaryImages || []
      return (
        <section {...sectionProps} className={`${sectionProps.className} product-section`}>
          <div className="container">
            {mediaURL(b.logo) ? (
              <Picture media={b.logo} className="product-logo" alt={b.name} />
            ) : null}
            <SectionIntro {...b} centered />
            <div className="product-actions">
              {b.primaryAction?.label ? (
                <Button href={b.primaryAction.href}>{b.primaryAction.label}</Button>
              ) : null}
            </div>
            {composition ? (
              <div className="product-composition">
                <div className="product-main">
                  <img
                    src={mediaURL(b.image, '/figma/8064-412-imgImage7.png')}
                    alt={mediaAlt(b.image, b.name || 'Interface concept')}
                  />
                </div>
                {['balance', 'insight', 'chart'].map((name, index) => (
                  <div key={name} className={`product-float product-float--${name}`}>
                    <img
                      src={mediaURL(
                        secondary[index]?.image,
                        `/figma/8064-412-imgImage${[10, 8, 9][index]}.png`,
                      )}
                      alt={mediaAlt(secondary[index]?.image, '')}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Picture media={b.image} className="product-image" alt={b.name} sizes="90vw" />
            )}
            {b.imageCaption || b.image?.caption ? (
              <p className="image-caption">{b.imageCaption || b.image.caption}</p>
            ) : null}
            {b.features?.length ? (
              <div className="product-features">
                {b.features.map((f: Document) => (
                  <span key={f.id || f.text}>{f.text}</span>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      )
    }
    case 'testimonials': {
      const testimonials = select(b, context, 'testimonials')
      if (!testimonials.length) return null
      return (
        <section {...sectionProps}>
          <div className="container">
            <SectionIntro {...b} centered />
          </div>
          <div className="testimonial-strip" tabIndex={0} aria-label={b.title}>
            {testimonials.map((t) => (
              <figure
                className={`testimonial-card ${!mediaURL(t.photo) ? 'testimonial-card--text' : ''}`}
                key={t.id}
              >
                <Picture media={t.photo} alt={t.name} />
                <figcaption>
                  <blockquote>“{t.quote}”</blockquote>
                  <div>
                    <p>{t.name}</p>
                    <small>{[t.role, t.company].filter(Boolean).join(', ')}</small>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )
    }
    case 'posts': {
      const posts = select(b, context, 'posts', b.showAll ? 100 : 3)
      if (!posts.length) return null
      return (
        <section {...sectionProps}>
          <div className="container">
            <SectionIntro {...b} action={b.primaryAction} centered />
            <div className="post-grid">
              {posts.map((post) => (
                <article className="post-card" key={post.id}>
                  <Link href={`/insights/${post.slug}`} className="post-cover">
                    <Picture media={post.coverImage} alt={post.title} />
                    <span className="post-category">{post.category}</span>
                  </Link>
                  <div className="post-card__body">
                    <Link href={`/insights/${post.slug}`}>
                      <h3>{post.title}</h3>
                    </Link>
                    <p>{post.excerpt}</p>
                    <div className="post-author">
                      <span className="author-mark" aria-hidden="true">
                        i.
                      </span>
                      <div>
                        <span>{post.author}</span>
                        <time dateTime={post.publishedAt}>
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                timeZone: 'Asia/Karachi',
                              })
                            : ''}
                        </time>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )
    }
    case 'contact': {
      const page = b.variant === 'page'
      return (
        <section
          {...sectionProps}
          className={`${sectionProps.className} contact-section--revised ${page ? 'contact-section--page' : ''}`}
        >
          <div className="container contact-grid">
            <div>
              <Eyebrow>{b.eyebrow}</Eyebrow>
              <Heading title={b.title} highlight={b.highlight} as={page ? 'h1' : 'h2'} />
              <p className="contact-description">{b.description}</p>
              <div className="contact-callout">
                <div>
                  <h3>{b.cardTitle || settings.footer?.headline}</h3>
                  <Button href={b.cardButton?.href || settings.booking?.href || '/contact'}>
                    {b.cardButton?.label || settings.booking?.label || 'Book a call'}
                  </Button>
                </div>
                {mediaURL(b.cardImage) ? (
                  <Picture media={b.cardImage} alt="" className="contact-callout__art" />
                ) : (
                  <img src="/figma/8019-216-imgLogo.png" width={280} height={280} alt="" />
                )}
              </div>
              {!page && settings.contact?.email ? (
                <a className="contact-email" href={`mailto:${settings.contact.email}`}>
                  {settings.contact?.email}
                  <span aria-hidden="true"> ↗</span>
                </a>
              ) : null}
            </div>
            <ContactForm
              block={b}
              services={context.services || []}
              form={formOwner && b.id ? { ...formOwner, blockId: String(b.id) } : undefined}
              preview={context.formPreview === true}
            />
          </div>
        </section>
      )
    }
    case 'contactChannels':
      return (
        <section {...sectionProps} className={`${sectionProps.className} contact-channels-section`}>
          <div className="container contact-channels">
            <Heading title={b.title} highlight={b.highlight} />
            {b.description ? (
              <p className="contact-channels__description">{b.description}</p>
            ) : null}
            <div className="contact-channels__list">
              {(b.items || []).map((item: Document, index: number) => (
                <div className="contact-channel" key={item.id || `${item.label}-${index}`}>
                  {item.label ? <h3>{item.label}</h3> : null}
                  {item.link?.label ? (
                    <Link href={safeHref(item.link.href)}>
                      <span className="contact-channel__icon" aria-hidden="true">
                        <img src="/figma/8019-216-imgFrame2.svg" width={28} height={28} alt="" />
                      </span>
                      <span>{item.link.label}</span>
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          {mediaURL(b.image) ? (
            <Picture
              media={b.image}
              alt={mediaAlt(b.image)}
              className="contact-channels__image"
              sizes="100vw"
            />
          ) : null}
        </section>
      )
    case 'faqs': {
      const faqs = select(b, context, 'faqs')
      if (!faqs.length) return null
      return (
        <section {...sectionProps}>
          <div className="container">
            <SectionIntro {...b} centered />
            <div className="faq-grid">
              <div className="faq-support">
                {mediaURL(b.image) ? (
                  <Picture media={b.image} alt={mediaAlt(b.image)} />
                ) : (
                  <div className="faq-brand-visual">
                    <img src="/figma/8019-216-imgLogo.png" width={300} height={300} alt="" />
                  </div>
                )}
                <div>
                  <div>
                    <h3>{b.supportTitle || 'Have more questions?'}</h3>
                    <p>{b.supportDescription || settings.tagline}</p>
                  </div>
                  <Button
                    href={
                      b.action?.href ||
                      b.primaryAction?.href ||
                      settings.booking?.href ||
                      '/contact'
                    }
                    variant="dark"
                    meeting
                  >
                    {b.action?.label ||
                      b.primaryAction?.label ||
                      settings.booking?.label ||
                      'Let’s talk'}
                  </Button>
                </div>
              </div>
              <div className="faq-list">
                {faqs.map((faq, i) => (
                  <details key={faq.id} open={i === 0}>
                    <summary>
                      {faq.question}
                      <span className="faq-plus" aria-hidden="true" />
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )
    }
    case 'cta': {
      const consultation = b.variant === 'consultation'
      return (
        <section
          {...sectionProps}
          className={`${sectionProps.className} ${consultation ? 'cta-section--consultation' : ''}`}
        >
          <div className="container">
            <div className={`cta-panel ${consultation ? 'cta-panel--consultation' : ''}`}>
              {mediaURL(b.image) ? (
                <Picture media={b.image} alt="" className="cta-panel__image" sizes="90vw" />
              ) : null}
              <Eyebrow>{b.eyebrow}</Eyebrow>
              <Heading title={b.title} highlight={b.highlight} />
              {b.description ? <p>{b.description}</p> : null}
              <div className="button-group">
                {b.primaryAction?.label ? (
                  <Button href={b.primaryAction.href} meeting={consultation}>
                    {b.primaryAction.label}
                  </Button>
                ) : null}
                {b.secondaryAction?.label ? (
                  <Button href={b.secondaryAction.href} variant="outline">
                    {b.secondaryAction.label}
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )
    }
    case 'richContent':
      return (
        <section {...sectionProps}>
          <div className="container content-narrow">
            <SectionIntro {...b} />
            <FormattedText data={b.content} />
          </div>
        </section>
      )
    case 'splitContent':
      return (
        <section {...sectionProps}>
          <div
            className={`container split-section ${b.imagePosition === 'left' ? 'split-section--reverse' : ''}`}
          >
            <div>
              <Eyebrow>{b.eyebrow}</Eyebrow>
              <Heading title={b.title} highlight={b.highlight} />
              {b.description ? <p>{b.description}</p> : null}
              <FormattedText data={b.content} />
              {b.items?.length ? (
                <ul className="benefit-list">
                  {b.items.map((item: Document) => (
                    <li key={item.id || item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
              {b.primaryAction?.label ? (
                <Button href={b.primaryAction.href} variant="dark">
                  {b.primaryAction.label}
                </Button>
              ) : null}
            </div>
            <Picture media={b.image} alt={b.title} />
          </div>
        </section>
      )
    case 'gallery': {
      const isPortrait = (item: Document) =>
        item.image &&
        typeof item.image === 'object' &&
        item.image.width > 0 &&
        item.image.height > item.image.width
      const hasPortraits = (b.images || []).some(isPortrait)
      return (
        <section {...sectionProps}>
          <div className="container">
            <SectionIntro {...b} />
            <div className={`image-gallery ${hasPortraits ? 'image-gallery--screens' : ''}`}>
              {(b.images || []).map((item: Document) => (
                <figure
                  key={item.id || mediaURL(item.image)}
                  className={
                    isPortrait(item) ? 'gallery-item--portrait' : 'gallery-item--landscape'
                  }
                  style={
                    isPortrait(item)
                      ? ({
                          '--screen-ratio': `${item.image.width} / ${item.image.height}`,
                        } as CSSProperties)
                      : undefined
                  }
                >
                  <Picture media={item.image} alt={item.caption} sizes="90vw" />
                  {item.caption ? <figcaption>{item.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )
    }
    default:
      return null
  }
}
