import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { collections } from './payload/collections'
import { SiteSettings } from './payload/globals/SiteSettings'
import { EmailSettings } from './payload/globals/EmailSettings'
import { editableSMTPAdapter } from './payload/email'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const siteURL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3100'
const databaseURL = process.env.DATABASE_URL
const sqlitePath = process.env.SQLITE_DATABASE_PATH || path.resolve(process.cwd(), 'imadi-local.db')
const secret = process.env.PAYLOAD_SECRET
if (process.env.NODE_ENV === 'production') {
  if (!secret || secret.length < 32 || secret === 'development-only-replace-with-a-random-32-character-secret') {
    throw new Error('Set PAYLOAD_SECRET to a strong random secret of at least 32 characters before running the production website.')
  }
  if (!databaseURL?.startsWith('postgres')) {
    throw new Error('Set DATABASE_URL to a PostgreSQL connection string before running the production website. SQLite is available for local development.')
  }
}

export default buildConfig({
  secret: secret || 'development-only-replace-with-a-random-32-character-secret',
  serverURL: siteURL,
  admin: {
    user: 'users',
    meta: { titleSuffix: ' · Imadi Studio', description: 'Manage the Imadi Innovations website.' },
    importMap: { baseDir: dirname },
    components: { beforeDashboard: ['/payload/components/DashboardIntro#DashboardIntro'] },
  },
  editor: lexicalEditor(),
  collections,
  globals: [SiteSettings, EmailSettings],
  email: editableSMTPAdapter,
  db: databaseURL?.startsWith('postgres')
    ? postgresAdapter({ pool: { connectionString: databaseURL },
      migrationDir: path.resolve(dirname, 'payload/migrations/postgres'),
      push: process.env.PAYLOAD_DB_PUSH === 'true' || process.env.NODE_ENV !== 'production' })
    : sqliteAdapter({ client: { url: sqlitePath.startsWith('file:') ? sqlitePath : `file:${sqlitePath}` },
      migrationDir: path.resolve(dirname, 'payload/migrations/sqlite'),
      push: process.env.PAYLOAD_DB_PUSH === 'true' || process.env.NODE_ENV !== 'production' }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload/payload-types.ts') },
  upload: { limits: { fileSize: 15 * 1024 * 1024 } },
  cors: [siteURL], csrf: [siteURL],
  graphQL: { disablePlaygroundInProduction: true },
})
