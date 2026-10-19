import nextEnv from '@next/env'
import { getPayload } from 'payload'

nextEnv.loadEnvConfig(process.cwd(), false)
const { default: config } = await import('../src/payload.config')
const payload = await getPayload({ config })
try {
  if ((await payload.count({ collection: 'users', overrideAccess: true })).totalDocs) {
    console.log('Administrator already exists; bootstrap skipped.')
  } else {
    const email = process.env.BOOTSTRAP_ADMIN_EMAIL
    const password = process.env.BOOTSTRAP_ADMIN_PASSWORD
    if (!email || !password || password.length < 20) throw new Error('Supply an administrator email and a unique password of at least 20 characters.')
    const user = await payload.create({ collection: 'users', overrideAccess: true,
      data: { name: 'Abiali Gadiwala', email, password, role: 'admin' } })
    console.log(`Administrator created: ${user.email}. No password is logged.`)
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Administrator bootstrap failed.')
  process.exitCode = 1
} finally {
  await payload.destroy()
  process.exit(process.exitCode || 0)
}
