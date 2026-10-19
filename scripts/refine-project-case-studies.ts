/**
 * Upgrade the untouched initial portfolio with researched case studies.
 * Dry run: npx tsx scripts/refine-project-case-studies.ts
 * Apply:   npx tsx scripts/refine-project-case-studies.ts --apply
 *
 * Only for the dedicated initial preview before administrator setup. Existing
 * edited records, private drafts and conflicting project slugs are refused.
 */
import path from 'node:path'
import { createHash } from 'node:crypto'
import nextEnv from '@next/env'
import { getPayload } from 'payload'
import { projectSeeds } from '../src/content/company'
import { additionalProjects, projectCaseStudies, projectStoryFields } from '../src/content/project-case-studies'

nextEnv.loadEnvConfig(process.cwd())
// A dry run must not trigger development-time schema synchronization.
Object.assign(process.env, { NODE_ENV: 'production', PAYLOAD_DB_PUSH: 'false' })
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
const apply = process.argv.includes('--apply')
type Data = Record<string, any>
type Plan = { id: number; slug: string; updatedAt: string; before: string; data: Data }
const updates: Plan[] = []
const creates: (typeof additionalProjects)[number][] = []
const skipped: string[] = []

function normalize(input: any): any {
  if (Array.isArray(input)) return input.map(normalize)
  if (!input || typeof input !== 'object') return input
  return Object.fromEntries(Object.entries(input).sort(([a], [b]) => a.localeCompare(b)).flatMap(([key, value]) => {
    if (['id', 'createdAt', 'updatedAt', 'blockName'].includes(key) || value == null || value === '') return []
    if ((key === 'enabled' && value === true) || (key === 'theme' && value === 'light') || (key === 'newTab' && value === false)) return []
    const item = normalize(value)
    if (Array.isArray(item) && item.length === 0) return []
    if (item && typeof item === 'object' && !Array.isArray(item) && Object.keys(item).length === 0) return []
    return [[key, item]]
  }))
}
const fingerprint = (value: unknown) => createHash('sha256').update(JSON.stringify(normalize(value))).digest('hex')
const editorial = (doc: Data) => Object.fromEntries(['summary', 'challenge', 'solution', 'content', 'results', 'sections'].map((key) => [key, doc[key]]))

async function find(slug: string): Promise<Data | undefined> {
  const result = await payload.find({ collection: 'projects', where: { slug: { equals: slug } }, depth: 0, draft: true, limit: 1, overrideAccess: true })
  return result.docs[0]
}

async function assertNoUsers() {
  if ((await payload.count({ collection: 'users', overrideAccess: true })).totalDocs) throw new Error('Case-study refinement only runs before administrator setup. Use the admin panel for an edited site.')
}

try {
  await assertNoUsers()
  const shared = await payload.find({ collection: 'shared-sections', limit: 100, depth: 0, draft: true, overrideAccess: true })
  const endings = ['contact', 'faqs', 'call-to-action'].map((slug) => {
    const doc = shared.docs.find((item) => item.slug === slug)
    if (!doc || doc._status !== 'published') throw new Error(`Missing or unpublished shared section: ${slug}.`)
    return { blockType: 'sharedSection', enabled: true, section: doc.id }
  })

  for (const original of projectSeeds) {
    if (!projectCaseStudies[original.slug]) continue
    const current = await find(original.slug)
    if (!current || current._status !== 'published') throw new Error(`Missing initial project or unpublished draft: ${original.slug}.`)
    const data = projectStoryFields(original.slug, endings)!
    if (fingerprint(editorial(current)) === fingerprint(editorial(data))) { skipped.push(original.slug); continue }
    const baseline = {
      summary: original.summary, challenge: original.challenge, solution: original.solution,
      results: original.results.map((label, index) => ({ value: ['Connected', 'Organised', 'Visible'][index] || 'Delivered', label })),
      sections: endings,
    }
    const delta = Date.parse(current.updatedAt) - Date.parse(current.createdAt)
    if (fingerprint(editorial(current)) !== fingerprint(editorial(baseline)) || current.title !== original.title || current.client !== original.client || !Number.isFinite(delta) || delta < 0 || delta > 1) {
      throw new Error(`Project differs from untouched starter content: ${original.slug}. No case-study changes applied.`)
    }
    if (current.seo?.description && current.seo.description !== original.summary) throw new Error(`Project SEO has been edited: ${original.slug}.`)
    updates.push({ id: current.id, slug: original.slug, updatedAt: current.updatedAt, before: fingerprint(editorial(current)), data: { ...data, seo: { ...current.seo, description: data.summary } } })
  }

  const serviceDocs = await payload.find({ collection: 'services', depth: 0, limit: 100, overrideAccess: true })
  for (const project of additionalProjects) {
    for (const slug of project.serviceSlugs) if (!serviceDocs.docs.some((service) => service.slug === slug)) throw new Error(`Missing related service: ${slug}.`)
    const current = await find(project.slug)
    if (!current) { creates.push(project); continue }
    const expected = projectStoryFields(project.slug, endings)!
    if (current._status !== 'published' || current.title !== project.title || fingerprint(editorial(current)) !== fingerprint(editorial(expected))) throw new Error(`An existing project uses the new slug ${project.slug}; manual review required.`)
    skipped.push(project.slug)
  }
  console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', update: updates.map((item) => item.slug), create: creates.map((item) => item.slug), preservedWithoutExpansion: ['restro', 'one-window-system', 'nutrilife'], skipped }, null, 2))

  const recheck = async (item: Plan) => {
    const current = await find(item.slug)
    if (!current || current._status !== 'published' || current.updatedAt !== item.updatedAt || fingerprint(editorial(current)) !== item.before) throw new Error(`Project changed after preflight: ${item.slug}.`)
  }
  for (const item of updates) await recheck(item)
  if (apply) {
    await assertNoUsers()
    for (const item of updates) {
      await recheck(item)
      await payload.update({ collection: 'projects', id: item.id, overrideAccess: true, data: item.data as any })
    }
    for (const project of creates) {
      if (await find(project.slug)) throw new Error(`Project appeared after preflight: ${project.slug}.`)
      const images = await payload.find({ collection: 'media', where: { filename: { equals: project.placeholder } }, limit: 1, depth: 0, overrideAccess: true })
      const image = images.docs[0] || await payload.create({ collection: 'media', overrideAccess: true,
        filePath: path.resolve(process.cwd(), 'public', 'company', project.placeholder),
        data: { alt: `${project.title}: project screenshots coming soon`, caption: 'Screenshot placeholder. Replace through the project cover-image field.', credit: 'Imadi Innovations. Labelled presentation placeholder; not an application screenshot.' },
      })
      const fields = projectStoryFields(project.slug, endings)!
      await payload.create({ collection: 'projects', overrideAccess: true, data: {
        title: project.title, slug: project.slug, client: project.client, industry: project.industry,
        coverImage: image.id, categories: [{ label: project.category }],
        services: project.serviceSlugs.map((slug) => serviceDocs.docs.find((service) => service.slug === slug)!.id),
        ...fields, featured: false, sortOrder: 8 + additionalProjects.indexOf(project), _status: 'published',
        seo: { title: `${project.title} | Imadi Innovations`, description: fields.summary },
      } as any })
    }
    console.log(`Updated ${updates.length} researched case studies and added ${creates.length} projects with labelled screenshot placeholders. Other projects and shared content were preserved.`)
  } else console.log('Dry run only. Add --apply to apply the reviewed initial-content plan.')
} catch (error) {
  console.error('Case-study refinement failed:', error instanceof Error ? error.message : 'Unknown error')
  process.exitCode = 1
} finally {
  await payload.destroy()
  process.exit(process.exitCode || 0)
}
