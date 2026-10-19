import path from 'node:path'
import { access } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import nextEnv from '@next/env'
import { getPayload, type CollectionSlug } from 'payload'
import { additionalProjects, projectCaseStudies, projectStoryFields } from '../src/content/project-case-studies'
import {
  about,
  company,
  faqs,
  hero,
  postSeeds,
  problems,
  product,
  projectSeeds,
  services,
} from '../src/content/company'
import { tijaratFeatureCards, tijaratImageCaption, tijaratProduct, withTijaratProductContent } from '../src/content/tijarat-content'
import { consultationContent, revisedPageLayout, updatedContactContent, updatedTestimonialHeadings } from '../src/content/figma-revision'

// Load the project's environment before evaluating the database configuration.
nextEnv.loadEnvConfig(process.cwd())

const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
type RecordData = Record<string, any>
type ID = string | number

const created: Record<string, number> = {}
const skipped: Record<string, number> = {}
const refinementMode = process.env.IMADI_REFINE_DESIGN_CONTENT === 'true'
const applyRefinement = refinementMode && process.argv.includes('--apply')
const refinementBaselines = new Map<string, RecordData>()
const refinementPlan: { collection: CollectionSlug; id: ID; slug: string; updatedAt: string; before: string; data: RecordData }[] = []

// Compare editable content while ignoring Payload metadata and empty/default
// values introduced by field defaults. Never use this to bypass a draft check.
function normalizeSeedContent(input: unknown): unknown {
    if (Array.isArray(input)) return input.map(normalizeSeedContent)
    if (!input || typeof input !== 'object') return input
    const entries = Object.entries(input as RecordData).sort(([a], [b]) => a.localeCompare(b)).flatMap(([key, item]) => {
      if (['id', 'createdAt', 'updatedAt', '_status', 'blockName'].includes(key) || item === null || item === undefined || item === '') return []
      if ((key === 'enabled' && item === true) || (key === 'theme' && item === 'light') || (key === 'noIndex' && item === false) || (key === 'selectionMode' && item === 'featured') || (key === 'maxItems' && item === 0)) return []
      const normalized = normalizeSeedContent(item)
      if ((Array.isArray(normalized) && normalized.length === 0) || (normalized && typeof normalized === 'object' && !Array.isArray(normalized) && Object.keys(normalized).length === 0)) return []
      return [[key, normalized]]
    })
    return Object.fromEntries(entries)
}

function fingerprint(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(normalizeSeedContent(value))).digest('hex')
}

function seedDifferences(expected: unknown, actual: unknown, prefix = ''): RecordData[] {
  if (JSON.stringify(expected) === JSON.stringify(actual)) return []
  if (expected && actual && typeof expected === 'object' && typeof actual === 'object') {
    const left = expected as RecordData
    const right = actual as RecordData
    return [...new Set([...Object.keys(left), ...Object.keys(right)])].flatMap((key) => seedDifferences(left[key], right[key], prefix ? `${prefix}.${key}` : key)).slice(0, 40)
  }
  const summarize = (value: unknown) => typeof value === 'string' && value.length > 220 ? `${value.slice(0, 220)}…` : value
  return [{ field: prefix, expected: summarize(expected), actual: summarize(actual) }]
}

function editableFields(collection: string, document: RecordData): RecordData {
  const keys = collection === 'pages'
    ? ['title', 'slug', 'description', 'layout', 'seo']
    : ['title', 'slug', 'summary', 'eyebrow', 'highlight', 'icon', 'heroImage', 'tags', 'benefits', 'statistics', 'content', 'sections', 'featured', 'sortOrder', 'seo']
  return Object.fromEntries(keys.map((key) => [key, document[key]]))
}

/** Reruns only add missing records; existing drafts and editorial changes are kept. */
async function ensureRecord(
  collection: CollectionSlug,
  data: RecordData,
  key = 'slug',
): Promise<RecordData> {
  const existing = await payload.find({
    collection,
    where: { [key]: { equals: data[key] } },
    limit: 1,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    const document = existing.docs[0] as RecordData
    const baseline = refinementBaselines.get(`${collection}:${data[key]}`)
    if (refinementMode && baseline) {
      if (document._status !== 'published') throw new Error(`Refusing to replace an unpublished draft: ${collection}/${data[key]}.`)
      const before = fingerprint(editableFields(collection, document))
      const after = fingerprint(editableFields(collection, data))
      if (before !== after) {
        if (before !== fingerprint(editableFields(collection, baseline))) {
          console.error(JSON.stringify({
            record: `${collection}/${data[key]}`, createdAt: document.createdAt, updatedAt: document.updatedAt,
            differences: seedDifferences(normalizeSeedContent(editableFields(collection, baseline)), normalizeSeedContent(editableFields(collection, document))),
          }, null, 2))
          throw new Error(`Content differs from the known initial seed: ${collection}/${data[key]}. No refinement was applied.`)
        }
        // Payload's initial insert may stamp updatedAt one millisecond after
        // createdAt. This tolerance is considered only after the complete
        // original-content fingerprint, published state, and no-users checks.
        const insertTimestampDifference = Date.parse(document.updatedAt) - Date.parse(document.createdAt)
        if (!document.createdAt || !Number.isFinite(insertTimestampDifference) || insertTimestampDifference < 0 || insertTimestampDifference > 1) {
          console.error(JSON.stringify({ record: `${collection}/${data[key]}`, createdAt: document.createdAt, updatedAt: document.updatedAt, editableContentMatchesInitialSeed: true }, null, 2))
          throw new Error(`Record has been edited since creation: ${collection}/${data[key]}. No refinement was applied.`)
        }
        refinementPlan.push({ collection, id: document.id, slug: data[key], updatedAt: document.updatedAt, before, data })
      }
    }
    skipped[collection] = (skipped[collection] || 0) + 1
    return document
  }
  if (refinementMode) throw new Error(`Expected initial seed record is missing: ${collection}/${data[key]}. Run the normal seed on an empty database first.`)
  const document = await payload.create({ collection, data: data as any, overrideAccess: true })
  created[collection] = (created[collection] || 0) + 1
  return document
}

async function upload(
  relativePath: string,
  alt: string,
  credit: string,
  caption?: string,
): Promise<ID> {
  const filePath = path.resolve(process.cwd(), 'public', relativePath)
  await access(filePath)
  const filename = path.basename(filePath)
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    skipped.media = (skipped.media || 0) + 1
    return existing.docs[0].id
  }
  if (refinementMode) throw new Error(`Expected seed media is missing: ${filename}. Refinement does not upload or create records.`)
  const document = await payload.create({
    collection: 'media',
    filePath,
    data: { alt, credit, caption },
    overrideAccess: true,
  })
  created.media = (created.media || 0) + 1
  return document.id
}

function richText(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: null,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: null,
        children: [
          { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
        ],
        textFormat: 0,
        textStyle: '',
      })),
    },
  }
}

const action = (label: string, href: string) => ({ label, href })
const block = (blockType: string, data: RecordData) => ({
  blockType,
  enabled: true,
  theme: 'light',
  ...data,
})
const contact = (overrides: RecordData = {}) =>
  block('contact', {
    eyebrow: 'HAVE SOMETHING IN MIND?',
    title: 'Have a project',
    highlight: 'idea in mind?',
    description:
      'Tell us what you want to manage, automate, or improve. We’ll help you find a clear place to start.',
    anchor: 'contact',
    theme: 'lavender',
    nameLabel: 'Your name',
    namePlaceholder: 'Your full name',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@company.com',
    companyLabel: 'Company (optional)',
    companyPlaceholder: 'Your company name',
    serviceLabel: 'What can we help with?',
    servicePlaceholder: 'Choose a service',
    budgetLabel: 'Project budget (optional)',
    budgetPlaceholder: 'Select a range',
    budgetOptions: [
      'Under $2,500',
      '$2,500–$5,000',
      '$5,000–$10,000',
      '$10,000+',
      'Let’s discuss',
    ].map((label) => ({ label })),
    messageLabel: 'Tell us about your project',
    messagePlaceholder: 'What would you like to build or improve?',
    submitLabel: 'Send enquiry',
    submittingLabel: 'Sending your enquiry…',
    errorMessage: 'We could not save your enquiry. Please try again, or contact us by email.',
    privacyNote:
      'We use your details to respond to your enquiry. Read our privacy policy for more information.',
    successMessage: 'Thank you. Your enquiry has been saved and our team will be in touch.',
    cardTitle: 'Prefer a conversation?',
    cardButton: action('Chat on WhatsApp', 'https://wa.me/923330365252'),
    ...overrides,
  })
const cta = (overrides: RecordData = {}) =>
  block('cta', {
    eyebrow: 'YOUR NEXT CHAPTER STARTS HERE',
    title: 'A better way to work',
    highlight: 'starts with a conversation.',
    description:
      'Bring us your workflow, your challenge, or your next product idea. Let’s work out what comes next.',
    primaryAction: action('Let’s talk', '/contact'),
    secondaryAction: action('Explore our work', '/projects'),
    ...overrides,
  })
const fourProcessSteps = [
  {
    number: '01',
    title: 'Understand & plan',
    description:
      'We map your workflow, understand your users, and agree on the scope of a useful first release.',
  },
  {
    number: '02',
    title: 'Design the experience',
    description:
      'We shape the journeys and screens, making the important decisions visible before development.',
  },
  {
    number: '03',
    title: 'Build & review',
    description:
      'We develop the product in reviewable stages and test the workflows that matter to your team.',
  },
  {
    number: '04',
    title: 'Launch & improve',
    description:
      'We prepare the release, help your team get started, and plan the next improvements around real use.',
  },
]
const sharedSection = (section: ID) => block('sharedSection', { section })

async function seed() {
  const figmaCredit = 'Provided Imadi Innovations Figma design, file 4YOqW3WUKIlEaocLabMIXP.'
  const sourceRoot = 'https://wordpress.imadi-innovations.com/wp-content/uploads/2026/04/'
  const brandLogo = await upload(
    'figma/8019-216-imgLogo.png',
    'Imadi Innovations logo',
    figmaCredit,
  )
  const brandBackground = await upload(
    'figma/8019-216-imgBg.png',
    'Abstract purple brand texture',
    figmaCredit,
  )
  const processImage = await upload(
    'figma/8062-182-imgHeroSection.png',
    'Conceptual visual of a person wearing a virtual reality headset',
    figmaCredit,
  )
  const processBackground = await upload(
    'figma/8062-182-imgImage5.png',
    'Abstract purple light on a dark background',
    figmaCredit,
  )
  const conceptImage = await upload(
    'figma/8064-412-imgImage7.png',
    'Illustrative interface concept for the product spotlight',
    figmaCredit,
    'Illustrative interface concept. This visual is a design reference, not a screenshot of the current Tijarat product.',
  )
  const conceptSecondary: { image: ID; caption: string }[] = []
  for (const [filename, caption] of [
    ['8064-412-imgImage10.png', 'Illustrative interface concept'],
    ['8064-412-imgImage8.png', 'Illustrative interface concept'],
    ['8064-412-imgImage9.png', 'Illustrative interface concept'],
  ]) {
    const image = await upload(
      `figma/${filename}`,
      'Illustrative interface concept for the product spotlight',
      figmaCredit,
      caption,
    )
    conceptSecondary.push({ image, caption })
  }
  // Preserve the concept composition for the historical refinement baseline.
  // Fresh installations use genuine, existing public Tijarat product material.
  const tijaratImage = refinementMode ? undefined : await upload(
    'company/tijarat-invoicing.png',
    'Tijarat invoicing interface from the existing public product material',
    'Existing public Imadi Innovations Tijarat product material.',
    tijaratImageCaption,
  )
  const tijaratLogo = refinementMode ? undefined : await upload(
    'company/tijarat-logo.png',
    'Tijarat logo',
    'Existing public Imadi Innovations Tijarat product material.',
  )
  const strategyImage = await upload(
    'figma/8039-1227-imgFrame42.png',
    'Conceptual illustration of a person with a futuristic light visor',
    figmaCredit,
    'Conceptual editorial illustration',
  )
  const productDesignImage = await upload(
    'figma/8039-1227-imgFrame21.png',
    'Conceptual illustration of a virtual reality headset',
    figmaCredit,
    'Conceptual editorial illustration',
  )
  // Future fresh installs use the final exported images when present. The old
  // refinement path retains its exact historical media references and must not
  // be used to replace assets on an already refined site.
  const optionalFreshAsset = async (filename: string, alt: string, fallback?: ID, caption?: string): Promise<ID | undefined> => {
    if (refinementMode) return fallback
    try { await access(path.resolve(globalThis.process.cwd(), 'public', 'figma', filename)) } catch { return fallback }
    return upload(`figma/${filename}`, alt, figmaCredit, caption)
  }
  const faqPhoto = await optionalFreshAsset('faq-team-photo.png', 'People collaborating around a table', brandLogo, 'Photograph supplied in the Imadi Innovations Figma design.')
  const aboutPhoto = await optionalFreshAsset('about-team-photo.png', 'A group collaborating in a workspace', strategyImage, 'Photograph supplied in the Imadi Innovations Figma design; illustrative imagery.')
  const footerLogo = await optionalFreshAsset('footer-mark.png', 'Imadi Innovations footer mark')
  const revisionMedia = {
    contactCard: await optionalFreshAsset('contact-callout-art.png', 'Purple Imadi brand artwork'),
    officePhoto: await optionalFreshAsset('contact-office-photo.jpg', 'People collaborating in an office', undefined, 'Illustrative photograph supplied in the Imadi Innovations Figma design.'),
    consultation: await optionalFreshAsset('consultation-cta-art.png', 'Soft purple Imadi brand artwork'),
  }

  const screenshotSources: Record<
    string,
    { filename: string; original: string; alt: string; mobile?: string; mobileOriginal?: string }
  > = {
    dockiship: {
      filename: 'dockiship-desktop.png',
      original: 'dockiship-desktop-scaled.png',
      alt: 'DockiShip web operations dashboard, as shown on the existing Imadi Innovations portfolio',
    },
    eclinicassist: {
      filename: 'eclinicassist-desktop.png',
      original: 'Screenshot-2026-04-22-at-5.42.03-PM-scaled.png',
      alt: 'eClinicAssist administration interface, as shown on the existing Imadi Innovations portfolio',
    },
    lynchr: {
      filename: 'lynchr-desktop.png',
      original: 'Screenshot-2026-04-22-at-5.46.37-PM-scaled.png',
      alt: 'LyncHR employee management interface, as shown on the existing Imadi Innovations portfolio',
    },
    'pmo-karachi': {
      filename: 'pmo-karachi-desktop.png',
      original: 'Screenshot-2026-04-22-at-5.45.11-PM-scaled.png',
      alt: 'PMO Karachi event operations interface, as shown on the existing Imadi Innovations portfolio',
      mobile: 'pmo-karachi-mobile.png',
      mobileOriginal: 'PMO-KARACHI.png',
    },
    'magnet-cargo': {
      filename: 'magnet-cargo-desktop.png',
      original: 'magnet-desktop-scaled.png',
      alt: 'Magnet Cargo booking interface, as shown on the existing Imadi Innovations portfolio',
    },
    'one-window-system': {
      filename: 'ows-desktop.png',
      original: 'ows-desktop-scaled.png',
      alt: 'One Window System education management interface, as shown on the existing Imadi Innovations portfolio',
      mobile: 'ows-mobile.png',
      mobileOriginal: 'ows-mobile.png',
    },
    restro: {
      filename: 'restro-desktop.png',
      original: 'Screenshot-2026-04-22-at-5.19.41-PM-scaled.png',
      alt: 'Restro catering operations interface, as shown on the existing Imadi Innovations portfolio',
      mobile: 'restro-mobile.png',
      mobileOriginal: 'Restro.png',
    },
    nutrilife: {
      filename: 'nutrilife-mobile.png',
      original: 'nutrilife-mobile.png',
      alt: 'Nutrilife mobile wellness interface, as shown on the existing Imadi Innovations portfolio',
    },
  }
  const projectImages: Record<string, ID> = {}
  const projectGalleries: Record<string, RecordData[]> = {}
  for (const [slug, source] of Object.entries(screenshotSources)) {
    projectImages[slug] = await upload(
      `company/${source.filename}`,
      source.alt,
      `Imadi Innovations public portfolio: ${sourceRoot}${source.original}`,
    )
    projectGalleries[slug] = [
      {
        image: projectImages[slug],
        caption: `${projectSeeds.find((project) => project.slug === slug)?.title} interface`,
      },
    ]
    if (source.mobile && source.mobileOriginal) {
      const image = await upload(
        `company/${source.mobile}`,
        `${projectSeeds.find((project) => project.slug === slug)?.title} mobile interface, as shown on the existing Imadi Innovations portfolio`,
        `Imadi Innovations public portfolio: ${sourceRoot}${source.mobileOriginal}`,
      )
      projectGalleries[slug].push({ image, caption: 'Mobile experience' })
    }
  }
  if (!refinementMode) {
    for (const project of additionalProjects) {
      projectImages[project.slug] = await upload(
        `company/${project.placeholder}`,
        `${project.title}: project screenshots coming soon`,
        'Imadi Innovations. Labelled presentation placeholder; not an application screenshot.',
        'Project screenshots coming soon. Replace this image through the project’s cover-image field.',
      )
      projectGalleries[project.slug] = []
    }
  }
  const mobileServiceHero = await optionalFreshAsset('service-hero.png', 'Mobile application interface mockup supplied in the Figma design', projectImages.nutrilife, 'Illustrative service artwork supplied in the Imadi Innovations Figma design.')

  const faqIds: ID[] = []
  for (const [index, faq] of faqs.entries()) {
    const document = await ensureRecord(
      'faqs',
      { ...faq, featured: true, sortOrder: index, _status: 'published' },
      'question',
    )
    faqIds.push(document.id)
  }
  const sharedContact = await ensureRecord('shared-sections', {
    title: 'Contact — shared across the website',
    slug: 'contact',
    layout: [refinementMode ? contact() : updatedContactContent(contact(), revisionMedia.contactCard)],
    sortOrder: 0,
    _status: 'published',
  })
  const sharedFAQs = await ensureRecord('shared-sections', {
    title: 'FAQs — shared across the website',
    slug: 'faqs',
    sortOrder: 1,
    _status: 'published',
    layout: [
      block('faqs', {
        eyebrow: 'A FEW COMMON QUESTIONS',
        title: 'Got questions?',
        highlight: 'We’ve got answers',
        faqs: faqIds,
        supportTitle: 'Still have a question?',
        supportDescription:
          'Tell us what’s on your mind. We’re happy to talk through the next step.',
        image: faqPhoto,
        action: action('Let’s talk', '/contact'),
      }),
    ],
  })
  const sharedCTA = await ensureRecord('shared-sections', {
    title: 'Call to action — shared across the website',
    slug: 'call-to-action',
    layout: [refinementMode ? cta() : consultationContent(revisionMedia.consultation)],
    sortOrder: 2,
    _status: 'published',
  })
  const contactSection = () => sharedSection(sharedContact.id)
  const faqSection = () => sharedSection(sharedFAQs.id)
  const ctaSection = () => sharedSection(sharedCTA.id)
  const process = () =>
    block('process', {
      eyebrow: 'HOW WE WORK',
      title: 'How we',
      highlight: 'work',
      anchor: 'process',
      theme: 'dark',
      description: 'A collaborative process, with a clear purpose at every stage.',
      image: processImage,
      backgroundImage: processBackground,
      steps: fourProcessSteps,
    })

  const serviceIcons = ['mobile', 'code', 'layers', 'globe', 'sparkles']
  const serviceTags = [
    ['Mobile strategy', 'Android & iOS', 'Connected workflows'],
    ['Web platforms', 'Portals & dashboards', 'Integrations'],
    ['Billing & inventory', 'Printing', 'Offline workflows'],
    ['Product strategy', 'MVP development', 'Product growth'],
    ['Document reading', 'Search & summaries', 'Workflow assistance'],
  ]
  const serviceImages = [
    projectImages.nutrilife,
    projectImages.dockiship,
    processBackground,
    brandBackground,
    projectImages.restro,
  ]
  const serviceCapabilities = [
    [{ value: 'Android', label: 'Mobile experiences' }, { value: 'iOS', label: 'Customer and team apps' }, { value: 'UX', label: 'Clear everyday journeys' }, { value: 'APIs', label: 'Connected business tools' }],
    [{ value: 'Portals', label: 'One place to get things done' }, { value: 'Dashboards', label: 'A clearer operational view' }, { value: 'Workflows', label: 'Your process, connected' }, { value: 'APIs', label: 'Tools working together' }],
    [{ value: 'Billing', label: 'Practical counter workflows' }, { value: 'Stock', label: 'Inventory and movement' }, { value: 'Printing', label: 'Designed around your setup' }, { value: 'Offline', label: 'Connectivity requirements planned' }],
    [{ value: 'Strategy', label: 'A focused product direction' }, { value: 'UX', label: 'Thoughtful user journeys' }, { value: 'MVP', label: 'A useful first release' }, { value: 'Growth', label: 'A foundation for improvement' }],
    [{ value: 'Documents', label: 'Structured information' }, { value: 'Search', label: 'Find what matters' }, { value: 'Summaries', label: 'A clearer starting point' }, { value: 'Workflows', label: 'Assistance with human review' }],
  ]
  const serviceFeatureImages = [
    [projectImages.nutrilife, projectGalleries['pmo-karachi'][1].image],
    [projectImages.dockiship, projectImages.eclinicassist],
    [projectImages.lynchr, projectImages.dockiship],
    [projectImages.dockiship, projectImages.eclinicassist],
    [projectImages.restro, projectGalleries.restro[1].image],
  ]
  const serviceFeatureCopy = [
    ['A useful mobile experience starts with a clear task. Our Nutrilife portfolio example focuses on nutrition, health goals, and wellness habits, keeping those everyday activities close at hand.', 'Mobile work should stay connected to the wider operation. PMO Karachi brings event coordination and team tasks to web and mobile users, illustrating how the same workflow can travel with the team.'],
    ['DockiShip brings inventory, purchasing, and marketplace fulfilment into a shared workspace. It is an example of designing around a connected business process rather than adding another isolated tool.', 'eClinicAssist brings provider records, credentialing, compliance tracking, and operational reporting together. Clear relationships and role-aware workflows help make complex administration easier to follow.'],
    ['Daily operational software starts with the records and decisions people rely on. LyncHR is a web-based example from our portfolio, connecting employee information, attendance, leave, and payroll. Desktop projects apply the same workflow-first thinking to the required local setup.', 'Billing, inventory, and printing need a coherent flow. The DockiShip web platform shown here illustrates connected stock and purchasing records; desktop requirements are scoped separately around your devices, connectivity, and working conditions.'],
    ['A focused first release should complete a useful journey. The DockiShip web platform in our portfolio shows how related records and operational tasks can live within one product workspace.', 'A product needs clear paths for both everyday users and administrators. eClinicAssist illustrates a connected web platform with directories, status tracking, documents, and reporting, shaped around its operational users.'],
    ['Restro turns details from unstructured catering messages into organised order information. Administrative review remains part of the workflow, connecting assistance to the decisions the team needs to make.', 'The next step matters as much as the extraction. Restro connects structured orders with scheduling, customer information, and payment tracking, helping kitchen and administrative teams work from shared details.'],
  ]
  const serviceBenefitDescriptions = [
    ['Task-focused journeys for customers, staff, and field teams.', 'Plan the experience around the devices your users carry.', 'Bring account information and operational updates into the app.', 'Define what must stay available when connectivity is limited.'],
    ['Start with the real steps, handoffs, and exceptions in your process.', 'Give each user the information and actions their work requires.', 'Bring related information together instead of entering it twice.', 'Use reusable patterns that can support the next stage of work.'],
    ['Connect the records used at the counter and in the back office.', 'Plan around the printers and equipment your team already uses.', 'Agree how local work and later synchronisation should behave.', 'Make repeated tasks easy to find, understand, and complete.'],
    ['Choose the core journey that the first version needs to complete.', 'Design a coherent experience for users and administrators.', 'Build shared patterns that future features can extend.', 'Use real questions and observations to guide the next release.'],
    ['Turn relevant document fields into information your team can review.', 'Connect answers and summaries to the sources they depend on.', 'Place useful assistance within the tools your team already uses.', 'Make the source, proposed result, and review action clear.'],
  ]
  const serviceDocuments: Record<string, RecordData> = {}
  for (const [index, service] of services.entries()) {
    const originalServiceData = {
      title: service.title,
      slug: service.slug,
      summary: service.summary,
      eyebrow: 'WHAT WE CAN BUILD TOGETHER',
      highlight: 'built around your people.',
      icon: serviceIcons[index],
      heroImage: serviceImages[index],
      tags: serviceTags[index].map((label) => ({ label })),
      benefits: service.benefits.map((title) => ({ title, icon: serviceIcons[index] })),
      statistics: [],
      content: richText([service.description]),
      sections: [
        process(),
        block('projects', {
          eyebrow: 'REAL WORK IN PRACTICE',
          title: 'Built for real',
          highlight: 'business workflows.',
          projects: [],
          showFilters: false,
          primaryAction: action('Explore our work', '/projects'),
        }),
        block('testimonials', {
          eyebrow: 'CLIENT PERSPECTIVES',
          title: 'Good work starts with',
          highlight: 'good relationships.',
          testimonials: [],
        }),
        contactSection(),
        faqSection(),
        ctaSection(),
      ],
      featured: true,
      sortOrder: index,
      _status: 'published',
      seo: { title: `${service.title} | Imadi Innovations`, description: service.description },
    }
    refinementBaselines.set(`services:${service.slug}`, originalServiceData)
    const refinedServiceData: RecordData = {
      ...originalServiceData,
      heroImage: index === 0 ? mobileServiceHero : originalServiceData.heroImage,
      statistics: serviceCapabilities[index],
      benefits: originalServiceData.benefits.map((benefit, benefitIndex) => ({ ...benefit, description: serviceBenefitDescriptions[index][benefitIndex] })),
      sections: [
        { ...process(), anchor: 'service-process', description: undefined },
        block('projects', { eyebrow: 'Our Projects', projects: [], showFilters: false, selectionMode: 'featured', maxItems: 3 }),
        ...serviceFeatureImages[index].map((image, row) => block('splitContent', {
          theme: 'lavender', title: service.benefits[row * 2] || service.benefits[row],
          description: serviceFeatureCopy[index][row], image, imagePosition: row === 0 ? 'right' : 'left',
          primaryAction: action(row === 0 ? 'Talk about your project' : 'Explore our work', row === 0 ? '/contact' : '/projects'),
        })),
        block('posts', { eyebrow: 'Insights', title: 'Expert insights', highlight: '& guidance', posts: [], selectionMode: 'featured', maxItems: 3 }),
        contactSection(), faqSection(), ctaSection(),
      ],
    }
    if (!refinementMode) refinedServiceData.sections = updatedTestimonialHeadings(refinedServiceData.sections)
    serviceDocuments[service.slug] = await ensureRecord('services', refinedServiceData)
  }
  const ids = (records: Record<string, RecordData>) =>
    Object.values(records).map((document) => document.id)
  const serviceIds = ids(serviceDocuments)
  const projectServiceSlugs: Record<string, string[]> = {
    dockiship: ['custom-web-software'],
    eclinicassist: ['custom-web-software'],
    lynchr: ['custom-web-software'],
    'pmo-karachi': ['custom-web-software', 'mobile-applications'],
    'magnet-cargo': ['custom-web-software'],
    'one-window-system': ['custom-web-software', 'mobile-applications'],
    restro: ['custom-web-software', 'ai-integrations'],
    nutrilife: ['mobile-applications'],
    ...Object.fromEntries(additionalProjects.map((project) => [project.slug, [...project.serviceSlugs]])),
  }
  const projectIndustries = [
    'E-commerce & logistics',
    'Healthcare administration',
    'Human resources',
    'Event operations',
    'Cargo & logistics',
    'Restaurant operations',
    'Education',
    'Health & wellness',
  ]
  const projectDocuments: Record<string, RecordData> = {}
  const freshProjects = [...projectSeeds, ...additionalProjects.map((project) => ({
    ...project,
    summary: projectCaseStudies[project.slug].summary,
    challenge: projectCaseStudies[project.slug].challenge,
    solution: projectCaseStudies[project.slug].solution,
    results: projectCaseStudies[project.slug].outcomes.map((outcome) => outcome.label),
    published: true,
  }))]
  for (const [index, project] of (refinementMode ? projectSeeds : freshProjects).entries()) {
    const story = refinementMode ? null : projectStoryFields(project.slug, [contactSection(), faqSection(), ctaSection()])
    projectDocuments[project.slug] = await ensureRecord('projects', {
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      client: project.client,
      industry: 'industry' in project ? project.industry : projectIndustries[index],
      coverImage: projectImages[project.slug],
      gallery: projectGalleries[project.slug],
      categories: [{ label: project.category }],
      services: projectServiceSlugs[project.slug].map((slug) => serviceDocuments[slug].id),
      challenge: project.challenge,
      solution: project.solution,
      results: project.results?.map((label, resultIndex) => ({
        value: ['Connected', 'Organised', 'Visible'][resultIndex] || 'Delivered',
        label,
      })),
      sections: [contactSection(), faqSection(), ctaSection()],
      ...story,
      featured: index < 3,
      sortOrder: index,
      _status: project.published ? 'published' : 'draft',
      seo: { title: `${project.title} | Imadi Innovations`, description: story?.summary || project.summary },
    })
  }
  const projectIds = ids(projectDocuments)
  const featuredProjectIds = projectIds.slice(0, 3)
  const postDocuments: Record<string, RecordData> = {}
  const articleImages = [strategyImage, productDesignImage, processBackground]
  for (const [index, post] of postSeeds.entries()) {
    postDocuments[post.slug] = await ensureRecord('posts', {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: richText(post.body),
      author: company.name,
      category: ['Business systems', 'Product strategy', 'AI & automation'][index],
      coverImage: articleImages[index],
      readTime: `${Math.max(2, Math.ceil(post.body.join(' ').split(/\s+/).length / 200))} min read`,
      publishedAt: '2026-10-17T04:00:00.000Z',
      featured: true,
      sortOrder: index,
      // Original articles are written for this build, not inherited client claims.
      _status: 'published',
      seo: { title: `${post.title} | Imadi Insights`, description: post.excerpt },
    })
  }
  const postIds = ids(postDocuments)
  const projects = (all = false) =>
    block('projects', {
      eyebrow: 'A FEW THINGS WE’VE BUILT',
      title: 'Purposeful work.',
      highlight: 'Practical outcomes.',
      description: 'Different industries. Different challenges. Software shaped around the work.',
      projects: all ? [] : featuredProjectIds,
      showFilters: all,
      selectionMode: all ? 'all' : 'selected',
      maxItems: all ? 0 : 3,
      primaryAction: all ? undefined : action('Explore all projects', '/projects'),
      anchor: 'work',
    })
  const testimonials = () =>
    block('testimonials', {
      eyebrow: 'CLIENT PERSPECTIVES',
      title: 'Good work starts with',
      highlight: 'good relationships.',
      description: 'Perspectives from the people we build with.',
      testimonials: [],
    })
  const posts = (all = false) =>
    block('posts', {
      eyebrow: 'IDEAS WORTH SHARING',
      title: 'Expert insights',
      highlight: '& guidance',
      description: 'Practical thinking on design, software, and making everyday work simpler.',
      posts: all ? [] : postIds,
      selectionMode: all ? 'all' : 'selected',
      maxItems: all ? 0 : 3,
      primaryAction: all ? undefined : action('View all insights', '/insights'),
    })
  const productSection = () => {
    const initial = block('product', {
      eyebrow: 'OUR OWN NEXT CHAPTER',
      title: product.title,
      highlight: product.highlight,
      description: product.description,
      name: 'Tijarat · Early access',
      image: conceptImage,
      composition: 'dashboard',
      imageCaption: 'Illustrative interface concept',
      secondaryImages: conceptSecondary,
      features: product.features.map((text) => ({ text })),
      primaryAction: action(product.ctaLabel, product.ctaHref),
    })
    return !refinementMode && tijaratImage && tijaratLogo
      ? withTijaratProductContent(initial, tijaratImage, tijaratLogo)
      : initial
  }
  const serviceSection = (all = false) =>
    block('services', {
      eyebrow: 'WHAT WE DO',
      title: 'Everything your',
      highlight: 'brand needs',
      theme: 'dark',
      description: 'The right platform for your people, connected to the way your business works.',
      services: all ? [] : serviceIds,
      selectionMode: all ? 'all' : 'selected',
      maxItems: 0,
      primaryAction: all ? undefined : action('Explore our services', '/services'),
      anchor: 'services',
    })
  const innerHero = (
    title: string,
    highlight: string,
    description: string,
    extra: RecordData = {},
  ) =>
    block('hero', {
      eyebrow: 'IMADI INNOVATIONS',
      title,
      highlight,
      description,
      variant: 'split',
      primaryAction: action('Start a conversation', '/contact'),
      ...extra,
    })
  const capabilityStats = () =>
    block('stats', {
      items: [
        { value: 'Mobile', label: 'Experiences on the move' },
        { value: 'Web', label: 'Connected business platforms' },
        { value: 'Desktop', label: 'Tools for daily operations' },
        { value: 'AI', label: 'Useful workflow assistance' },
      ],
    })

  const pageSeeds = [
    {
      title: 'Home',
      slug: 'home',
      description: company.description,
      layout: [
        block('hero', {
          variant: 'brand',
          title: 'Designing the',
          highlight: 'next generation',
          trailingTitle: 'of brands',
          eyebrow: hero.eyebrow,
          badge: company.tagline,
          description:
            'We bring thoughtful design and practical engineering together to build mobile apps, web platforms, and business software around the way you work.',
          image: brandLogo,
          primaryAction: action('Explore projects', '/projects'),
          secondaryAction: action('Book a meeting', '/contact'),
        }),
        capabilityStats(),
        block('problems', {
          eyebrow: 'SOUND FAMILIAR?',
          title: 'Problems',
          highlight: 'we solve',
          description: 'We help turn everyday friction into useful digital experiences.',
          items: problems,
          primaryAction: action('Let’s solve it together', '/contact'),
        }),
        serviceSection(),
        projects(),
        process(),
        productSection(),
        testimonials(),
        posts(),
        contactSection(),
        faqSection(),
        ctaSection(),
      ],
    },
    {
      title: 'About us',
      slug: 'about',
      description: about.description,
      layout: [
        innerHero(about.title, about.highlight, about.description, {
          eyebrow: about.eyebrow,
          image: strategyImage,
        }),
        capabilityStats(),
        block('splitContent', {
          eyebrow: 'OUR STORY',
          title: 'Built around the work.',
          highlight: 'And the people doing it.',
          image: productDesignImage,
          imagePosition: 'left',
          content: richText(about.story),
        }),
        block('problems', {
          eyebrow: 'WHAT GUIDES US',
          title: 'Clear thinking.',
          highlight: 'Careful execution.',
          items: [
            {
              title: 'Understand before building',
              description: 'We start with your workflow and the people who use it.',
            },
            {
              title: 'Keep the conversation clear',
              description: 'Straightforward scope, visible progress, and useful reviews.',
            },
            {
              title: 'Make the everyday easier',
              description: 'Thoughtful interfaces and systems that support real tasks.',
            },
          ],
        }),
        testimonials(),
        posts(),
        contactSection(),
        faqSection(),
        ctaSection(),
      ],
    },
    {
      title: 'Services',
      slug: 'services',
      description:
        'Mobile apps, web platforms, desktop systems, SaaS products, and useful AI integrations.',
      layout: [
        innerHero(
          'The right tools.',
          'A better way to work.',
          'From customer experiences to internal operations, we design and build software with a clear purpose.',
        ),
        serviceSection(true),
        process(),
        projects(),
        contactSection(),
        faqSection(),
        ctaSection(),
      ],
    },
    {
      title: 'Projects',
      slug: 'projects',
      description:
        'Explore software built for real workflows across logistics, healthcare administration, HR, events, and more.',
      layout: [
        innerHero(
          'Good ideas.',
          'Working in the real world.',
          'A selection of platforms, apps, and connected systems built around the people who use them.',
        ),
        projects(true),
        contactSection(),
        faqSection(),
        ctaSection(),
      ],
    },
    {
      title: 'Contact',
      slug: 'contact',
      description: 'Talk to Imadi Innovations about your next software project.',
      layout: [
        innerHero(
          'Let’s talk about',
          'what comes next.',
          'Share your idea, the workflow you want to improve, or the challenge you are working through.',
          { primaryAction: action('Email our team', `mailto:${company.email}`) },
        ),
        contactSection(),
        faqSection(),
        ctaSection(),
      ],
    },
    {
      title: 'Tijarat',
      slug: 'tijarat',
      description: refinementMode ? product.description : tijaratProduct.description,
      layout: [
        innerHero('Meet Tijarat.', 'Built around your business.', refinementMode ? product.description : tijaratProduct.description, {
          eyebrow: refinementMode ? 'BUSINESS SOFTWARE FOR PAKISTAN · EARLY ACCESS' : tijaratProduct.eyebrow,
          primaryAction: action('Ask about early access', '#early-access'),
        }),
        productSection(),
        block('problems', {
          eyebrow: 'THE EVERYDAY, CONNECTED',
          title: 'One clearer view',
          highlight: 'of your business.',
          description: 'Help shape a practical workspace for the way Pakistani businesses operate.',
          items: refinementMode ? [
            {
              title: 'Billing & inventory',
              description: 'Bring sales, products, and stock movement into one connected flow.',
            },
            {
              title: 'Customers & suppliers',
              description: 'Keep contact details, balances, and payment records easier to follow.',
            },
            {
              title: 'Accounts & reports',
              description: 'Organise expenses and payments, and see the information that matters.',
            },
            {
              title: 'Made for local teams',
              description: 'Urdu and English experiences shaped around local business needs.',
            },
          ] : tijaratFeatureCards,
        }),
        contact({
          anchor: 'early-access',
          eyebrow: 'HELP SHAPE TIJARAT',
          title: 'Your business.',
          highlight: 'Your next step.',
          description:
            'Tell us about your business and the challenges you want Tijarat to help solve. Our team will follow up about early access.',
          messageLabel: 'What would you like Tijarat to help with?',
          submitLabel: 'Enquire about early access',
          cardTitle: 'Talk to us about Tijarat',
        }),
        ctaSection(),
      ],
    },
    {
      title: 'Insights',
      slug: 'insights',
      description:
        'Original thinking on useful software, thoughtful design, and clearer business workflows.',
      layout: [
        innerHero(
          'A little insight.',
          'A fresh perspective.',
          'Practical ideas for turning business problems into useful digital experiences.',
        ),
        posts(true),
        ctaSection(),
      ],
    },
    {
      title: 'Privacy',
      slug: 'privacy',
      description: 'How Imadi Innovations uses information submitted through this website.',
      layout: [
        innerHero(
          'Your information.',
          'Handled with care.',
          'How we use the details you share through this website.',
          { primaryAction: action('Contact us', `mailto:${company.email}`) },
        ),
        block('richContent', {
          title: 'Website privacy information',
          content: richText([
            'When you send an enquiry through this website, we collect the details you choose to provide, such as your name, email address, company, project requirements, service interests, and budget. We use those details to respond to your enquiry and discuss your requirements.',
            'Enquiries are stored in our website’s content management system and are accessible to authorised members of our team. Please avoid including passwords, payment card details, or sensitive personal records in your message.',
            'Our hosting and security services may process technical request information to operate the website and help prevent abuse. Administrative sign-in and preview features use cookies needed for those features to work.',
            'Links to services such as WhatsApp and LinkedIn take you to those providers. Their privacy policies apply when you use those services.',
            `To ask about information you have shared, request a correction, or discuss deletion, contact ${company.email}. We may need enough information to identify the enquiry and verify your request.`,
            'We update this notice when the way this website handles information changes. Last updated: 17 October 2026.',
          ]),
        }),
      ],
    },
  ]
  for (const page of pageSeeds) {
    const originalPageData = {
      ...page,
      _status: 'published',
      seo: {
        title: `${page.title === 'Home' ? 'Thoughtful design. Practical software.' : page.title} | Imadi Innovations`,
        description: page.description,
      },
    }
    let layout = page.layout.map((section: RecordData) => {
      if (section.blockType === 'projects') return { ...section, eyebrow: section.showFilters ? undefined : 'Our Projects', title: undefined, highlight: undefined, description: undefined, primaryAction: undefined }
      if (section.blockType === 'process') return { ...section, description: undefined, primaryAction: action('Let’s discuss your project', '/contact') }
      if (page.slug === 'home' && section.blockType === 'problems') return {
        ...section,
        items: section.items.map((item: RecordData, index: number) => ({
          ...item,
          href: ['/services/custom-web-software', '/services/ai-integrations', '/services/custom-web-software', '/services/saas-products'][index] || '/contact',
          linkLabel: 'Read more',
        })),
      }
      return section
    })
    if (page.slug === 'projects') {
      layout = [
        { ...layout[0], image: projectImages.dockiship },
        { ...capabilityStats(), theme: 'dark' },
        layout[1], posts(), contactSection(), faqSection(), ctaSection(),
      ]
    }
    if (page.slug === 'about') {
      layout = [
        innerHero(about.title, about.highlight, about.description, {
          eyebrow: about.eyebrow, variant: 'editorial', image: aboutPhoto,
        }),
        capabilityStats(),
        block('problems', {
          eyebrow: 'OUR STORY', title: 'How we', highlight: 'got here',
          description: 'Practical software starts with understanding the people and the work.',
          items: about.story.map((description, index) => ({
            title: ['Understand the work', 'Design and development, together', 'Keep the conversation clear', 'Build for the next chapter'][index], description,
            href: '/contact', linkLabel: 'Read more',
          })),
          primaryAction: action('Meet your next project partner', '/contact'),
        }),
        block('splitContent', {
          theme: 'lavender', title: 'Designed for the way your team works.',
          description: 'The most useful interface makes the next step easier to see. We connect everyday records, decisions, and tasks in a workspace shaped around your operation.',
          image: projectImages.dockiship, imagePosition: 'right', primaryAction: action('Explore our work', '/projects'),
        }),
        block('splitContent', {
          theme: 'lavender', title: 'Connected experiences, across devices.',
          description: 'Teams work in different places and on different screens. PMO Karachi is one example from our portfolio of bringing related event workflows to both web and mobile users.',
          image: projectGalleries['pmo-karachi'][1].image, imagePosition: 'left', primaryAction: action('Talk about your project', '/contact'),
        }),
        testimonials(), posts(), contactSection(), faqSection(), ctaSection(),
      ]
    }
    if (!refinementMode) layout = revisedPageLayout(page.slug, layout, {
      media: revisionMedia, contact: contact(),
      process: { ...process(), description: undefined, primaryAction: action('Let’s discuss your project', '/contact') },
      faqReference: faqSection(), email: company.email,
    })
    const refinedPageData = { ...originalPageData, layout }
    if (fingerprint(editableFields('pages', originalPageData)) !== fingerprint(editableFields('pages', refinedPageData))) {
      refinementBaselines.set(`pages:${page.slug}`, originalPageData)
    }
    await ensureRecord('pages', refinedPageData)
  }

  const settings = (await payload.findGlobal({
    slug: 'site-settings',
    depth: 0,
    draft: true,
    overrideAccess: true,
  })) as RecordData
  const settingsPersisted = Boolean(settings.createdAt || settings.updatedAt)
  if (refinementMode && !(settings.companyName && settingsPersisted)) {
    throw new Error('Published initial Site Settings are missing. Refinement does not create or replace settings.')
  }
  if (!(settings.companyName && settingsPersisted)) {
    await payload.updateGlobal({
      slug: 'site-settings',
      overrideAccess: true,
      data: {
        _status: 'published',
        companyName: company.name,
        tagline: company.tagline,
        description: company.description,
        contact: { email: company.email, phone: company.phone, address: company.address },
        socials: company.socials.map(({ label, href }) => ({ label, url: href })),
        navigation: [
          { label: 'Case studies', href: '/projects' },
          { label: 'Services', href: '/services' },
          { label: 'Tijarat', href: '/tijarat' },
          { label: 'Process', href: '/#process' },
          { label: 'About', href: '/about' },
          { label: 'Insights', href: '/insights' },
        ],
        footerNavigation: [
          { label: 'Services', href: '/services' },
          { label: 'Projects', href: '/projects' },
          { label: 'About us', href: '/about' },
          { label: 'Insights', href: '/insights' },
          { label: 'Tijarat', href: '/tijarat' },
          { label: 'Contact', href: '/contact' },
          { label: 'Privacy', href: '/privacy' },
        ],
        booking: action('Book a call', '/contact'),
        footer: {
          logo: footerLogo,
          headline: 'Your next big idea.',
          highlight: 'Let’s make it happen.',
          description: 'Thoughtful design and practical software, built around your business.',
          copyright: 'Imadi Innovations. All rights reserved.',
        },
      } as any,
    })
    created['site-settings'] = 1
  } else {
    skipped['site-settings'] = 1
  }

  // Account creation belongs to Payload's initial /admin/create-first-user flow.
  // This seed deliberately does not create users or ship a shared password.
  console.log(refinementMode ? 'Design refinement preflight complete. No content has been changed.' : 'Initial content seed complete. Existing content was preserved.')
  console.log(JSON.stringify({ created, skipped }, null, 2))
  if (!refinementMode) console.log('Create the first administrator through /admin, then manage content there.')
}

try {
  if (refinementMode && (await payload.count({ collection: 'users', overrideAccess: true })).totalDocs > 0) {
    throw new Error('This one-time refinement only runs before administrator setup. Existing accounts or editorial work must be reviewed manually.')
  }
  await seed()
  if (refinementMode) {
    console.log(JSON.stringify({ mode: applyRefinement ? 'apply' : 'dry-run', eligible: refinementPlan.map(({ collection, slug }) => `${collection}/${slug}`) }, null, 2))
    if (applyRefinement) {
      if ((await payload.count({ collection: 'users', overrideAccess: true })).totalDocs > 0) throw new Error('An account was created during preflight. No refinement was applied.')
      // Revalidate every record before beginning writes. Any edited draft, changed
      // timestamp, or fingerprint aborts the complete apply phase.
      for (const item of refinementPlan) {
        const current = await payload.findByID({ collection: item.collection, id: item.id, depth: 0, draft: true, overrideAccess: true }) as RecordData
        if (current._status !== 'published' || current.updatedAt !== item.updatedAt || fingerprint(editableFields(item.collection, current)) !== item.before) {
          throw new Error(`Content changed after preflight: ${item.collection}/${item.slug}. No refinement was applied.`)
        }
      }
      for (const item of refinementPlan) await payload.update({ collection: item.collection, id: item.id, overrideAccess: true, data: item.data as any })
      console.log(`Applied ${refinementPlan.length} verified initial-content refinements. No users, settings, media, or unrelated documents were changed.`)
    } else {
      console.log('Dry run only. Review the eligible list, then run this same refinement command with --apply.')
    }
  }
} catch (error) {
  console.error('Content seeding failed:', error instanceof Error ? error.message : 'Unknown error')
  process.exitCode = 1
} finally {
  await payload.destroy()
  // Match the Payload CLI: the database adapter retains a checked-out listener
  // connection. All writes above are awaited before terminating this one-off CLI.
  process.exit(process.exitCode || 0)
}
