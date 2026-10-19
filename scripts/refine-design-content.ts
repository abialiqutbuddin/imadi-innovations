/**
 * One-time refinement of untouched initial content, before administrator setup.
 *
 * Dry run: npx tsx scripts/refine-design-content.ts
 * Apply:   npx tsx scripts/refine-design-content.ts --apply
 *
 * The shared seed builds a complete preflight plan. It refuses missing records,
 * user accounts, unpublished drafts, edited timestamps, and unknown seed content.
 * It never creates users, uploads media, or overwrites Site Settings in this mode.
 */
process.env.IMADI_REFINE_DESIGN_CONTENT = 'true'
await import('./seed')
export {}
