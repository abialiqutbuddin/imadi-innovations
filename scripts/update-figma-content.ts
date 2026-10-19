/**
 * Upgrade the untouched local preview to the 18 October Figma revision.
 * Dry run: NODE_ENV=production npx tsx scripts/update-figma-content.ts
 * Apply:   NODE_ENV=production npx tsx scripts/update-figma-content.ts --apply
 *
 * This is deliberately limited to the pre-admin local preview database. Existing
 * edited layouts and private drafts must be reviewed in the admin instead.
 */
import path from 'node:path'
import { createHash } from 'node:crypto'
import { access, readFile } from 'node:fs/promises'
import nextEnv from '@next/env'
import { createLocalReq, getPayload, type CollectionSlug, type PayloadRequest } from 'payload'
import {
  consultationContent, revisedPageLayout, revisionAssets,
  updatedContactContent, updatedTestimonialHeadings, type RevisionMedia,
} from '../src/content/figma-revision'

// Never let this content helper perform development schema push.
if (process.env.NODE_ENV !== 'production') throw new Error('Run this helper with NODE_ENV=production so schema push stays disabled.')
nextEnv.loadEnvConfig(process.cwd())
if (process.env.PAYLOAD_DB_PUSH === 'true') throw new Error('Disable PAYLOAD_DB_PUSH before this content-only upgrade.')
const database = new URL(process.env.DATABASE_URL || 'file:missing')
if (!['postgres:', 'postgresql:'].includes(database.protocol)
  || !['localhost', '127.0.0.1', '[::1]'].includes(database.hostname)
  || database.pathname !== '/imadi_website_codex') {
  throw new Error('This one-time upgrade only targets the local imadi_website_codex preview database.')
}
const approved = JSON.parse(await readFile(new URL('../src/content/figma-revision-baselines.json', import.meta.url), 'utf8')) as Record<string, string | string[]>
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
type Content = Record<string, any>
type Plan = { collection: CollectionSlug; document: Content; key: 'layout' | 'sections'; before: string; after: Content[] }
const apply = process.argv.includes('--apply')
const credit = 'Provided Imadi Innovations Figma design, file 4YOqW3WUKIlEaocLabMIXP.'

function normalized(value: any): any {
  if (Array.isArray(value)) return value.map(normalized)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(Object.keys(value).sort().flatMap((key) => {
    const item = value[key]
    if (['id', 'createdAt', 'updatedAt', '_status', 'blockName'].includes(key) || item === null || item === undefined || item === '') return []
    if ((key === 'enabled' && item === true) || (key === 'theme' && item === 'light')
      || (key === 'selectionMode' && item === 'featured') || (key === 'maxItems' && item === 0)) return []
    if (key === 'variant' && item === 'standard') return []
    if (key === 'preferredTimeLabel' && item === 'Preferred time (optional)') return []
    if (key === 'preferredTimePlaceholder' && item === 'A convenient time and your time zone') return []
    const next = normalized(item)
    if (next && typeof next === 'object' && Object.keys(next).length === 0) return []
    return [[key, next]]
  }))
}
const fingerprint = (value: unknown) => createHash('sha256').update(JSON.stringify(normalized(value))).digest('hex')
const recordName = (collection: string, document: Content) => `${collection}/${document.slug}`

async function noAccounts(req?: PayloadRequest) {
  if ((await payload.count({ collection: 'users', overrideAccess: true, req })).totalDocs) {
    throw new Error('The preview now has administrator/editor accounts. Review existing content in admin instead of running this pre-admin upgrade.')
  }
}

async function current(item: Plan, req?: PayloadRequest) {
  const document = await payload.findByID({ collection: item.collection, id: item.document.id, depth: 0, draft: true, overrideAccess: true, req }) as Content
  if (document._status !== 'published' || document.updatedAt !== item.document.updatedAt || fingerprint(document[item.key]) !== item.before) {
    throw new Error(`Content or draft changed after preflight: ${recordName(item.collection, document)}.`)
  }
  return document
}

try {
  await noAccounts()
  const records: Record<string, Content[]> = {}
  for (const collection of ['pages', 'shared-sections', 'services', 'projects'] as CollectionSlug[]) {
    records[collection] = (await payload.find({ collection, draft: true, depth: 0, pagination: false, overrideAccess: true })).docs
  }
  const sharedContact = records['shared-sections'].find((item) => item.slug === 'contact')
  const sharedCTA = records['shared-sections'].find((item) => item.slug === 'call-to-action')
  const sharedFAQs = records['shared-sections'].find((item) => item.slug === 'faqs')
  const home = records.pages.find((item) => item.slug === 'home')
  const contact = sharedContact?.layout?.find((item: Content) => item.blockType === 'contact')
  const processBlock = home?.layout?.find((item: Content) => item.blockType === 'process')
  if (!sharedContact || !sharedCTA || !sharedFAQs || !contact || !processBlock) throw new Error('Expected shared contact, consultation, FAQ, or Home process content is missing.')
  if (sharedCTA.layout?.length !== 1 || sharedCTA.layout[0].blockType !== 'cta') throw new Error('The shared call-to-action layout has been customized; review it manually.')

  const media: RevisionMedia = {}
  const mediaPlan: { asset: typeof revisionAssets[number]; id?: number }[] = []
  for (const [index, asset] of revisionAssets.entries()) {
    await access(path.resolve(process.cwd(), 'public', 'figma', asset.filename))
    const matches = await payload.find({ collection: 'media', where: { filename: { equals: asset.filename } }, depth: 0, limit: 2, overrideAccess: true })
    if (matches.totalDocs > 1) throw new Error(`More than one media record uses ${asset.filename}; review the duplicate manually.`)
    const id = matches.docs[0]?.id
    mediaPlan.push({ asset, id })
    media[asset.key] = id ?? -(index + 1001)
  }

  function makePlan(images: RevisionMedia): Plan[] {
    const plan: Plan[] = []
    for (const [collection, documents] of Object.entries(records)) {
      for (const document of documents) {
        const key = collection === 'services' || collection === 'projects' ? 'sections' : 'layout'
        const before = fingerprint(document[key] || [])
        let after: Content[]
        if (collection === 'shared-sections' && document.id === sharedContact!.id) {
          after = document.layout.map((item: Content) => item.blockType === 'contact' ? updatedContactContent(item, images.contactCard) : item)
        } else if (collection === 'shared-sections' && document.id === sharedCTA!.id) {
          after = [{ ...document.layout[0], ...consultationContent(images.consultation) }]
        } else if (collection === 'pages') {
          const faqReference = document.layout.find((item: Content) => item.blockType === 'sharedSection' && item.section === sharedFAQs!.id)
            || { blockType: 'sharedSection', enabled: true, section: sharedFAQs!.id }
          after = revisedPageLayout(document.slug, document.layout, { media: images, contact, process: processBlock, faqReference })
        } else after = updatedTestimonialHeadings(document[key] || [])
        if (fingerprint(after) === before) continue
        const name = recordName(collection, document)
        if (document._status !== 'published') throw new Error(`Refusing to publish a private draft: ${name}.`)
        const approvedStates = Array.isArray(approved[name]) ? approved[name] : [approved[name]]
        if (!approvedStates.includes(before)) throw new Error(`The layout has changed since the reviewed baseline: ${name}. No content update was applied.`)
        plan.push({ collection: collection as CollectionSlug, document, key, before, after })
      }
    }
    return plan
  }

  const plan = makePlan(media)
  console.log(JSON.stringify({
    mode: apply ? 'apply' : 'dry-run',
    media: mediaPlan.map(({ asset, id }) => ({ filename: asset.filename, operation: id ? 'reuse existing' : 'upload exact source asset' })),
    records: plan.map(({ collection, document, key }) => ({ record: recordName(collection, document), field: key })),
    note: 'Unrelated copy, project stories, images, settings, existing versions and enquiry records are preserved. No testimonial endorsements are created.',
  }, null, 2))
  for (const item of plan) await current(item)
  if (!apply) console.log('Dry run only. Review the plan before running with --apply.')
  else if (!plan.length) console.log('The reviewed content is already up to date. No content was changed.')
  else {
    await noAccounts()
    for (const item of mediaPlan) {
      if (!item.id) {
        const asset = await payload.create({ collection: 'media', overrideAccess: true,
          filePath: path.resolve(process.cwd(), 'public', 'figma', item.asset.filename),
          data: { alt: item.asset.alt, caption: item.asset.caption, credit },
        })
        item.id = asset.id
      }
      media[item.asset.key] = item.id
    }
    const transactionID = await payload.db.beginTransaction()
    if (!transactionID) throw new Error('A database transaction could not be opened; the content layouts were left unchanged.')
    const req = await createLocalReq({ req: { transactionID } }, payload)
    try {
      await noAccounts(req)
      for (const item of plan) await current(item, req)
      for (const item of makePlan(media)) {
        await payload.update({ collection: item.collection, id: item.document.id, depth: 0, overrideAccess: true,
          req, data: { [item.key]: item.after, _status: 'published' } as any,
        })
      }
      await payload.db.commitTransaction(transactionID)
    } catch (error) {
      await payload.db.rollbackTransaction(transactionID)
      throw error
    }
    console.log(`Updated ${plan.length} reviewed layouts; registered or reused ${mediaPlan.length} exact source images.`)
  }
} catch (error) {
  console.error('Figma content update refused:', error instanceof Error ? error.message : 'Unknown error')
  process.exitCode = 1
} finally {
  await payload.destroy()
  process.exit(process.exitCode || 0)
}
