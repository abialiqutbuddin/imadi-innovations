/**
 * One-time image-slot correction before administrator setup.
 * Dry run: npx tsx scripts/sync-figma-assets.ts
 * Apply:   npx tsx scripts/sync-figma-assets.ts --apply
 *
 * Existing content and copy are preserved. Only known temporary image slots are
 * replaced, after verifying old filenames, published state, and updatedAt.
 */
import path from 'node:path'
import { access } from 'node:fs/promises'
import nextEnv from '@next/env'
import { getPayload, type CollectionSlug } from 'payload'

nextEnv.loadEnvConfig(process.cwd())
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
const apply = process.argv.includes('--apply')
type Data = Record<string, any>
type ID = number
type Plan = {
  collection?: CollectionSlug
  id?: ID
  slug: string
  updatedAt: string
  slot: 'faq' | 'about' | 'mobile' | 'footer'
  index?: number
  oldFilename: string | null
  target: string
  alt: string
}
const plan: Plan[] = []
const skipped: string[] = []
const credit = 'Provided Imadi Innovations Figma design, file 4YOqW3WUKIlEaocLabMIXP.'

async function exists(filename: string) {
  try { await access(path.resolve(process.cwd(), 'public', 'figma', filename)); return true } catch { return false }
}

async function filename(media: unknown): Promise<string | null> {
  if (!media) return null
  if (typeof media === 'object' && 'filename' in media && typeof media.filename === 'string') return media.filename
  const id = typeof media === 'object' && 'id' in media ? (media as Data).id : media
  if (typeof id !== 'number' && typeof id !== 'string') throw new Error('Invalid media reference in an image slot.')
  const image = await payload.findByID({ collection: 'media', id, depth: 0, overrideAccess: true })
  return image.filename || null
}

async function record(collection: CollectionSlug, slug: string): Promise<Data> {
  const result = await payload.find({ collection, where: { slug: { equals: slug } }, draft: true, depth: 0, limit: 1, overrideAccess: true })
  const document = result.docs[0] as Data | undefined
  if (!document) throw new Error(`Required initial record missing: ${collection}/${slug}.`)
  if (document._status !== 'published') throw new Error(`Refusing to replace an image in a private draft: ${collection}/${slug}.`)
  return document
}

async function queueLayout(collection: CollectionSlug, slug: string, blockType: string, slot: 'faq' | 'about', oldFilename: string, target: string, alt: string) {
  if (!(await exists(target))) { skipped.push(`${collection}/${slug}: ${target} is not available`); return }
  const document = await record(collection, slug)
  const matches = (document.layout || []).map((block: Data, index: number) => ({ block, index })).filter(({ block }: { block: Data }) => block.blockType === blockType)
  if (matches.length !== 1) throw new Error(`Expected exactly one ${blockType} block in ${collection}/${slug}.`)
  const current = await filename(matches[0].block.image)
  if (current === target) { skipped.push(`${collection}/${slug}: image already matches ${target}`); return }
  if (current !== oldFilename) throw new Error(`Image has changed in ${collection}/${slug}: expected ${oldFilename}, found ${current || 'empty'}.`)
  plan.push({ collection, id: document.id, slug, updatedAt: document.updatedAt, slot, index: matches[0].index, oldFilename, target, alt })
}

async function upload(target: string, alt: string): Promise<ID> {
  const existing = await payload.find({ collection: 'media', where: { filename: { equals: target } }, depth: 0, limit: 1, overrideAccess: true })
  if (existing.docs[0]) return existing.docs[0].id
  const media = await payload.create({ collection: 'media', overrideAccess: true,
    filePath: path.resolve(process.cwd(), 'public', 'figma', target),
    data: { alt, credit, caption: target.endsWith('team-photo.png') ? 'Photograph supplied in the Imadi Innovations Figma design; illustrative imagery.' : 'Brand or service artwork supplied in the Imadi Innovations Figma design.' },
  })
  return media.id
}

async function recheck(item: Plan): Promise<Data> {
  const current = item.collection
    ? await payload.findByID({ collection: item.collection, id: item.id!, depth: 0, draft: true, overrideAccess: true }) as Data
    : await payload.findGlobal({ slug: 'site-settings', depth: 0, draft: true, overrideAccess: true }) as Data
  if (current._status !== 'published' || current.updatedAt !== item.updatedAt) throw new Error(`Record changed after preflight: ${item.collection || 'global'}/${item.slug}.`)
  const media = item.slot === 'footer' ? current.footer?.logo : item.slot === 'mobile' ? current.heroImage : current.layout?.[item.index!]?.image
  if (await filename(media) !== item.oldFilename) throw new Error(`Image slot changed after preflight: ${item.collection || 'global'}/${item.slug}.`)
  return current
}

try {
  if ((await payload.count({ collection: 'users', overrideAccess: true })).totalDocs) throw new Error('Image sync only runs before administrator setup. Existing accounts require manual content review.')
  await queueLayout('shared-sections', 'faqs', 'faqs', 'faq', '8019-216-imgLogo.png', 'faq-team-photo.png', 'People collaborating around a table')
  await queueLayout('pages', 'about', 'hero', 'about', '8039-1227-imgFrame42.png', 'about-team-photo.png', 'A group collaborating in a workspace')

  if (await exists('service-hero.png')) {
    const mobile = await record('services', 'mobile-applications')
    const current = await filename(mobile.heroImage)
    if (current === 'service-hero.png') skipped.push('services/mobile-applications: hero image already matches')
    else {
      if (current !== 'nutrilife-mobile.png') throw new Error(`Mobile service hero changed: expected nutrilife-mobile.png, found ${current || 'empty'}.`)
      plan.push({ collection: 'services', id: mobile.id, slug: mobile.slug, updatedAt: mobile.updatedAt, slot: 'mobile', oldFilename: current, target: 'service-hero.png', alt: 'Mobile application interface mockup supplied in the Figma design' })
    }
  } else skipped.push('services/mobile-applications: optional service-hero.png is not available')

  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0, draft: true, overrideAccess: true }) as Data
  if (settings._status !== 'published') throw new Error('Site Settings has an unpublished draft. Footer image sync was refused.')
  const footerFilename = await filename(settings.footer?.logo)
  if (footerFilename) skipped.push(`Footer mark preserved: ${footerFilename}`)
  else if (!(await exists('footer-mark.png'))) skipped.push('Footer mark: optional footer-mark.png is not available; the exact static SVG remains the renderer fallback')
  else plan.push({ slug: 'site-settings', updatedAt: settings.updatedAt, slot: 'footer', oldFilename: null, target: 'footer-mark.png', alt: 'Imadi Innovations footer mark' })
  console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', images: plan.map(({ collection, slug, slot, oldFilename, target }) => ({ record: `${collection || 'global'}/${slug}`, slot, from: oldFilename, to: target })), skipped }, null, 2))
  // Validate the complete plan before uploading any media or writing any content.
  for (const item of plan) await recheck(item)
  if (apply) {
    if ((await payload.count({ collection: 'users', overrideAccess: true })).totalDocs) throw new Error('An account was created during preflight. Sync was refused.')
    for (const item of plan) {
      const imageID = await upload(item.target, item.alt)
      const current = await recheck(item)
      if (item.slot === 'footer') await payload.updateGlobal({ slug: 'site-settings', overrideAccess: true, data: { footer: { ...current.footer, logo: imageID } } })
      else if (item.slot === 'mobile') await payload.update({ collection: item.collection!, id: item.id!, overrideAccess: true, data: { heroImage: imageID } })
      else {
        const layout = structuredClone(current.layout)
        layout[item.index!].image = imageID
        await payload.update({ collection: item.collection!, id: item.id!, overrideAccess: true, data: { layout } })
      }
    }
    console.log(`Updated ${plan.length} verified image slots. Header branding, text, and other content were preserved.`)
  } else console.log('Dry run only. Run the same command with --apply after reviewing the image plan.')
} catch (error) {
  console.error('Figma image sync failed:', error instanceof Error ? error.message : 'Unknown error')
  process.exitCode = 1
} finally {
  await payload.destroy()
  process.exit(process.exitCode || 0)
}
