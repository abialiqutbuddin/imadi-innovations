import { legacyContactFields } from '../lib/contact-form'

/** Editable starting content for the Figma revision reviewed on 18 October 2026. */
type Content = Record<string, any>
export type RevisionMedia = {
  contactCard?: string | number
  officePhoto?: string | number
  consultation?: string | number
}

export const revisionAssets = [
  { key: 'contactCard', filename: 'contact-callout-art.png', alt: 'Purple Imadi brand artwork', caption: 'Decorative artwork supplied in the Imadi Innovations Figma design.' },
  { key: 'officePhoto', filename: 'contact-office-photo.jpg', alt: 'People collaborating in an office', caption: 'Illustrative photograph supplied in the Imadi Innovations Figma design.' },
  { key: 'consultation', filename: 'consultation-cta-art.png', alt: 'Soft purple Imadi brand artwork', caption: 'Decorative artwork supplied in the Imadi Innovations Figma design.' },
] as const

/** Copied blocks get new IDs; existing records keep their own block/array IDs. */
export function withoutContentIDs(value: any): any {
  if (Array.isArray(value)) return value.map(withoutContentIDs)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'id').map(([key, item]) => [key, withoutContentIDs(item)]))
}

export function consultationContent(image?: string | number): Content {
  return {
    blockType: 'cta', enabled: true, variant: 'consultation', theme: 'light',
    eyebrow: null, title: 'READY TO SCALE', highlight: 'YOUR BUSINESS?',
    description: 'Book a free consultation to get clarity, direction, and expert advice you can implement right away.',
    image, primaryAction: { label: 'Book a meeting', href: '/contact' },
    secondaryAction: { label: null, href: null },
  }
}

export function updatedContactContent(template: Content, image?: string | number, variant: 'standard' | 'page' = 'standard'): Content {
  const content: Content = {
    ...template, blockType: 'contact', enabled: true, variant, theme: 'lavender',
    eyebrow: null, title: 'HAVE A PROJECT', highlight: 'IDEA IN MIND?',
    description: "We'll schedule a call to discuss your idea. After discovery sessions, we'll send a proposal, and upon approval, we'll get started.",
    nameLabel: 'Full Name', companyLabel: 'Company Name', emailLabel: 'Email',
    preferredTimeLabel: 'Preferred Time', preferredTimePlaceholder: 'A convenient time and your time zone',
    serviceLabel: 'Service', budgetLabel: 'Budget', messageLabel: 'Project Details',
    submitLabel: 'Submit', cardTitle: 'Find the right solution for you now', cardImage: image,
    cardButton: { label: 'Book a Call', href: 'tel:+923330365252' },
  }
  return { ...content, formMode: 'custom', formFields: legacyContactFields(content) }
}

export function updatedTestimonials(template: Content = {}): Content {
  return {
    blockType: 'testimonials', enabled: true, theme: 'light', testimonials: [],
    ...template, eyebrow: 'Testimonials', title: 'CLIENT STORIES', highlight: null, description: null,
  }
}

export function updatedTestimonialHeadings(layout: Content[]): Content[] {
  return layout.map((item) => item.blockType === 'testimonials' ? updatedTestimonials(item) : item)
}

function updatedProcessLabels(process: Content): Content {
  return {
    ...process, eyebrow: null,
    steps: (process.steps || []).map((step: Content, index: number) => ({ ...step, number: `Step ${String(index + 1).padStart(2, '0')}` })),
  }
}

export function contactChannelsContent(image?: string | number, email = 'hello@imadi-innovations.com'): Content {
  return {
    blockType: 'contactChannels', enabled: true, theme: 'dark',
    title: 'Drop us an email to explore for business collaborations or career opportunities.',
    image,
    items: [
      { label: 'For business collaborations', link: { label: email, href: `mailto:${email}` } },
      { label: 'For career opportunities', link: { label: email, href: `mailto:${email}` } },
    ],
  }
}

export function revisedPageLayout(slug: string, layout: Content[], options: {
  media: RevisionMedia
  contact: Content
  process: Content
  faqReference: Content
  email?: string
}): Content[] {
  if (slug === 'contact') return [
    updatedContactContent(withoutContentIDs(options.contact), options.media.contactCard, 'page'),
    contactChannelsContent(options.media.officePhoto, options.email),
    updatedTestimonials(),
    options.faqReference,
  ]
  const next = updatedTestimonialHeadings(layout).map((item) => (slug === 'home' || slug === 'about') && item.blockType === 'process'
    ? updatedProcessLabels(item) : item)
  if (slug === 'about' && !next.some((item) => item.blockType === 'process')) {
    const testimonialIndex = next.findIndex((item) => item.blockType === 'testimonials')
    if (testimonialIndex < 0) throw new Error('About needs its existing Testimonials section as the process insertion point.')
    const process = withoutContentIDs(options.process)
    next.splice(testimonialIndex, 0, updatedProcessLabels({ ...process, anchor: 'about-process' }))
  }
  return next
}
