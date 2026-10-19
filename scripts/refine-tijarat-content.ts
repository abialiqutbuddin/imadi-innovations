/**
 * Refine the two known initial Tijarat product placements before admin setup.
 * Dry run: npx tsx scripts/refine-tijarat-content.ts
 * Apply:   npx tsx scripts/refine-tijarat-content.ts --apply
 * No uploads or content writes occur during dry run. Unknown copy/media, private
 * drafts and concurrent edits stop the operation. Other blocks and CTAs stay intact.
 */
import path from 'node:path'
import { access } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import nextEnv from '@next/env'
import { getPayload } from 'payload'
import { product } from '../src/content/company'
import {
  tijaratFeatureCards,
  tijaratImageCaption,
  tijaratProduct,
  withTijaratProductContent,
} from '../src/content/tijarat-content'

nextEnv.loadEnvConfig(process.cwd())
// A dry run must not trigger the adapter's development-time schema push.
Object.assign(process.env, { NODE_ENV: 'production', PAYLOAD_DB_PUSH: 'false' })
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
const apply = process.argv.includes('--apply')
type Data = Record<string, any>
type Plan = { id: number; slug: string; updatedAt: string; fingerprint: string; productIndex: number; heroIndex?: number; cardsIndex?: number }
const plan: Plan[] = []
const skipped: string[] = []
const imageFilename = 'tijarat-invoicing.png'
const logoFilename = 'tijarat-logo.png'
const oldCards = [
  { title: 'Billing & inventory', description: 'Bring sales, products, and stock movement into one connected flow.' },
  { title: 'Customers & suppliers', description: 'Keep contact details, balances, and payment records easier to follow.' },
  { title: 'Accounts & reports', description: 'Organise expenses and payments, and see the information that matters.' },
  { title: 'Made for local teams', description: 'Urdu and English experiences shaped around local business needs.' },
]
const hash = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const contentHash = (document: Data) => hash({ description: document.description, layout: document.layout })
const same = (left: unknown, right: unknown) => JSON.stringify(left) === JSON.stringify(right)
const cardsCopy = (items: Data[] = []) => items.map(({ title, description }) => ({ title, description }))

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

async function mediaFilename(media: unknown): Promise<string | null> {
  if (!media) return null
  if (typeof media === 'object' && 'filename' in media && typeof media.filename === 'string') return media.filename
  const id = typeof media === 'object' && 'id' in media ? (media as Data).id : media
  assert(typeof id === 'number' || typeof id === 'string', 'Invalid media reference in a Tijarat product block.')
  const record = await payload.findByID({ collection: 'media', id, depth: 0, overrideAccess: true })
  return record.filename || null
}

async function verifyPublished(document: Data) {
  assert(document._status === 'published', `Private draft found in pages/${document.slug}; no update is allowed.`)
  const latest = await payload.findVersions({ collection: 'pages', where: { parent: { equals: document.id } }, limit: 1, sort: '-updatedAt', depth: 0, overrideAccess: true })
  assert(latest.docs[0]?.version?._status !== 'draft', `Private version found in pages/${document.slug}; no update is allowed.`)
}

async function inspect(slug: string) {
  const found = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, draft: true, limit: 1, depth: 0, overrideAccess: true })
  const document = found.docs[0] as Data | undefined
  assert(document, `Required page missing: ${slug}.`)
  await verifyPublished(document)
  const layout: Data[] = document.layout || []
  const products = layout.map((block, index) => ({ block, index })).filter(({ block }) => block.blockType === 'product')
  assert(products.length === 1, `Expected exactly one product block in pages/${slug}.`)
  const { block, index: productIndex } = products[0]
  assert(block.title === product.title && block.highlight === product.highlight, `Product heading changed in pages/${slug}.`)
  const image = await mediaFilename(block.image)
  const logo = await mediaFilename(block.logo)
  const features = (block.features || []).map((item: Data) => item.text)
  const current = image === imageFilename && logo === logoFilename && block.composition === 'single'
    && block.name === 'Tijarat' && block.description === tijaratProduct.description
    && block.imageCaption === tijaratImageCaption && !(block.secondaryImages || []).length
    && same(features, tijaratProduct.features)
  if (!current) {
    assert(image === '8064-412-imgImage7.png' && logo === null, `Unknown product media in pages/${slug}.`)
    assert(block.composition === 'dashboard' && block.name === 'Tijarat · Early access'
      && block.description === product.description && block.imageCaption === 'Illustrative interface concept'
      && same(features, product.features), `Product copy or presentation changed in pages/${slug}.`)
    const secondary = await Promise.all((block.secondaryImages || []).map((item: Data) => mediaFilename(item.image)))
    assert(same(secondary, ['8064-412-imgImage10.png', '8064-412-imgImage8.png', '8064-412-imgImage9.png']), `Unknown concept composition in pages/${slug}.`)
    assert((block.secondaryImages || []).every((item: Data) => item.caption === 'Illustrative interface concept'), `Concept captions changed in pages/${slug}.`)
  }
  let heroIndex: number | undefined
  let cardsIndex: number | undefined
  if (slug === 'tijarat') {
    const heroes = layout.map((item, index) => ({ item, index })).filter(({ item }) => item.blockType === 'hero')
    const cards = layout.map((item, index) => ({ item, index })).filter(({ item }) => item.blockType === 'problems')
    assert(heroes.length === 1 && cards.length === 1, 'Tijarat hero or feature-card structure has changed.')
    heroIndex = heroes[0].index
    cardsIndex = cards[0].index
    const hero = heroes[0].item
    assert(hero.title === 'Meet Tijarat.' && hero.highlight === 'Built around your business.', 'Tijarat hero heading changed.')
    assert(document.description === (current ? tijaratProduct.description : product.description)
      && hero.description === (current ? tijaratProduct.description : product.description)
      && hero.eyebrow === (current ? tijaratProduct.eyebrow : 'BUSINESS SOFTWARE FOR PAKISTAN · EARLY ACCESS'), 'Tijarat introduction has changed.')
    assert(same(cardsCopy(cards[0].item.items), current ? tijaratFeatureCards : oldCards), 'Tijarat feature-card copy has changed.')
  }
  if (current) { skipped.push(`pages/${slug}: product content already refined`); return }
  plan.push({ id: document.id, slug, updatedAt: document.updatedAt, fingerprint: contentHash(document), productIndex, heroIndex, cardsIndex })
}

async function recheck(item: Plan): Promise<Data> {
  const current = await payload.findByID({ collection: 'pages', id: item.id, draft: true, depth: 0, overrideAccess: true }) as Data
  await verifyPublished(current)
  assert(current.updatedAt === item.updatedAt && contentHash(current) === item.fingerprint, `Page changed after preflight: ${item.slug}.`)
  return current
}

async function upload(filename: string, alt: string, caption: string): Promise<number> {
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, depth: 0, limit: 1, overrideAccess: true })
  if (existing.docs[0]) return existing.docs[0].id
  const record = await payload.create({ collection: 'media', overrideAccess: true,
    filePath: path.resolve(process.cwd(), 'public', 'company', filename),
    data: { alt, caption, credit: 'Existing public Imadi Innovations Tijarat product material.' },
  })
  return record.id
}

try {
  assert(!(await payload.count({ collection: 'users', overrideAccess: true })).totalDocs, 'Tijarat refinement only runs before administrator setup. Existing accounts require manual content review.')
  await Promise.all([imageFilename, logoFilename].map((filename) => access(path.resolve(process.cwd(), 'public', 'company', filename))))
  await inspect('home')
  await inspect('tijarat')
  console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', pages: plan.map(({ slug }) => ({ slug, changes: slug === 'tijarat' ? ['product image/logo/composition/copy', 'page and hero description', 'hero eyebrow', 'feature-card copy'] : ['product image/logo/composition/copy'] })), media: plan.length ? [imageFilename, logoFilename] : [], skipped }, null, 2))
  for (const item of plan) await recheck(item)
  if (apply && plan.length) {
    assert(!(await payload.count({ collection: 'users', overrideAccess: true })).totalDocs, 'An account was created during preflight; refinement refused.')
    const image = await upload(imageFilename, 'Tijarat invoicing interface from the existing public product material', tijaratImageCaption)
    const logo = await upload(logoFilename, 'Tijarat logo', 'Tijarat identity from the existing public product material.')
    for (const item of plan) {
      assert(!(await payload.count({ collection: 'users', overrideAccess: true })).totalDocs, 'An account was created during refinement; further page updates refused.')
      const current = await recheck(item)
      const layout = structuredClone(current.layout)
      layout[item.productIndex] = withTijaratProductContent(layout[item.productIndex], image, logo)
      if (item.slug === 'tijarat') {
        layout[item.heroIndex!].description = tijaratProduct.description
        layout[item.heroIndex!].eyebrow = tijaratProduct.eyebrow
        layout[item.cardsIndex!].items = tijaratFeatureCards.map((card, index) => ({ ...layout[item.cardsIndex!].items[index], ...card }))
      }
      await payload.update({ collection: 'pages', id: item.id, overrideAccess: true, data: { layout, ...(item.slug === 'tijarat' ? { description: tijaratProduct.description } : {}) } })
    }
    console.log(`Refined ${plan.length} Tijarat product placements. Existing CTAs, contacts, other blocks and Site Settings were preserved.`)
  } else console.log(apply ? 'Content already matches; no writes required.' : 'Dry run only. No media or content was changed.')
} catch (error) {
  console.error('Tijarat refinement failed:', error instanceof Error ? error.message : 'Unknown error')
  process.exitCode = 1
} finally {
  await payload.destroy()
  process.exit(process.exitCode || 0)
}
