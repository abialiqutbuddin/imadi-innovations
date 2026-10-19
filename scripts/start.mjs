import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { access, cp, mkdir } from 'node:fs/promises'
import nextEnv from '@next/env'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const standalone = path.join(root, '.next', 'standalone')
process.env.NODE_ENV = 'production'
nextEnv.loadEnvConfig(root, false)

try {
  await access(path.join(standalone, 'server.js'))
} catch {
  throw new Error('Build the website with npm run build before starting it.')
}

// Next's standalone server needs its public files and browser bundles beside it.
await mkdir(path.join(standalone, '.next'), { recursive: true })
await Promise.all([
  cp(path.join(root, 'public'), path.join(standalone, 'public'), { recursive: true }),
  cp(path.join(root, '.next', 'static'), path.join(standalone, '.next', 'static'), {
    recursive: true,
  }),
])
process.env.MEDIA_UPLOAD_DIR = path.resolve(root, process.env.MEDIA_UPLOAD_DIR || 'media')
await mkdir(process.env.MEDIA_UPLOAD_DIR, { recursive: true })
process.env.HOSTNAME = process.env.WEBSITE_BIND_HOST || '127.0.0.1'
process.env.PORT = process.env.PORT || '3100'
await import(pathToFileURL(path.join(standalone, 'server.js')).href)
