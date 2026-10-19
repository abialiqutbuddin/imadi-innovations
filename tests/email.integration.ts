import assert from 'node:assert/strict'
import { getPayload, handleEndpoints } from 'payload'
import config from '../src/payload.config'
import { decryptSMTPPassword, getEmailSettings } from '../src/payload/email'

if (!process.env.CMS_MIGRATION_TEST || !process.env.DATABASE_URL?.includes('imadi_migration_test_')) {
  throw new Error('Use a disposable PostgreSQL imadi_migration_test_… database only.')
}
const payload = await getPayload({ config })
try {
  const admin = await payload.create({ collection: 'users', data: { name: 'SMTP Admin', email: 'smtp-admin@example.test', password: 'SMTP-test-only-cdf276d8eafe', role: 'admin' } })
  const editor = await payload.create({ collection: 'users', data: { name: 'SMTP Editor', email: 'smtp-editor@example.test', password: 'SMTP-test-only-f6234eaac278', role: 'editor' } })
  await assert.rejects(payload.findGlobal({ slug: 'email-settings', overrideAccess: false }))
  await assert.rejects(payload.findGlobal({ slug: 'email-settings', overrideAccess: false, user: editor }))
  await assert.rejects(payload.updateGlobal({ slug: 'email-settings', overrideAccess: false, user: editor, data: { enabled: true } }))
  const saved = await payload.updateGlobal({ slug: 'email-settings', overrideAccess: false, user: admin,
    data: { enabled: false, host: 'smtp.example.test', smtpPassword: 'smtp-private-test-credential', notificationEmail: 'owner@example.test' } })
  assert.equal(saved.smtpPassword, '')
  const internal = await getEmailSettings(payload)
  assert.equal(decryptSMTPPassword(internal.smtpPassword!), 'smtp-private-test-credential')
  assert.notEqual(internal.smtpPassword, 'smtp-private-test-credential')
  await payload.updateGlobal({ slug: 'email-settings', overrideAccess: false, user: admin, data: { smtpPassword: '', fromName: 'Updated sender' } })
  assert.equal(decryptSMTPPassword((await getEmailSettings(payload)).smtpPassword!), 'smtp-private-test-credential', 'Blank input preserves the encrypted password.')
  const session = await payload.login({ collection: 'users', data: { email: admin.email, password: 'SMTP-test-only-cdf276d8eafe' } })
  const read = await handleEndpoints({ config, path: '/api/globals/email-settings', request: new Request('http://localhost:3000/api/globals/email-settings', { headers: { Authorization: `JWT ${session.token}` } }) })
  assert.equal(read.status, 200)
  const response = await read.text()
  assert.ok(!response.includes('smtp-private-test-credential') && !response.includes('smtp:v1:'))
  console.log('Email integration passed: administrator-only settings, encrypted persistence, blank-password preservation, no secret in admin REST responses.')
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  await payload.destroy()
  process.exit(process.exitCode || 0)
}
