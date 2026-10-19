import assert from 'node:assert/strict'
import test from 'node:test'
import nodemailer from 'nodemailer'
import { decryptSMTPPassword, editableSMTPAdapter, encryptSMTPPassword, notifyEnquiry } from '../src/payload/email'

test('SMTP passwords use authenticated encryption and reject corruption or a different key', () => {
  const savedSecret = process.env.PAYLOAD_SECRET
  process.env.PAYLOAD_SECRET = 'test-secret-for-smtp-encryption-only'
  try {
    const encrypted = encryptSMTPPassword('private-test-password')
    assert.ok(!encrypted.includes('private-test-password'))
    assert.notEqual(encrypted, encryptSMTPPassword('private-test-password'))
    assert.equal(decryptSMTPPassword(encrypted), 'private-test-password')
    assert.throws(() => decryptSMTPPassword(encrypted.slice(0, -4) + 'AAAA'))
    process.env.PAYLOAD_SECRET = 'another-encryption-key'
    assert.throws(() => decryptSMTPPassword(encrypted))
  } finally { process.env.PAYLOAD_SECRET = savedSecret }
})

test('SMTP uses saved settings immediately, forces TLS and a configured sender, and blocks file/URL attachments', async () => {
  const original = nodemailer.createTransport
  const savedSecret = process.env.PAYLOAD_SECRET
  process.env.PAYLOAD_SECRET = 'smtp-transport-test-secret'
  let options: any
  let message: any
  const settings = { enabled: true, host: 'smtp.example.test', port: 587, security: 'starttls', username: 'team', smtpPassword: encryptSMTPPassword('test-password'), fromAddress: 'team@example.test', fromName: 'Team' }
  nodemailer.createTransport = ((config: any) => {
    options = config
    return { sendMail: async (mail: any) => { message = mail; return { accepted: [mail.to] } } }
  }) as typeof nodemailer.createTransport
  try {
    const payload = { findGlobal: async () => settings } as any
    const adapter = editableSMTPAdapter({ payload })
    await adapter.sendEmail({ to: 'recipient@example.test', subject: 'Test', text: 'Test', from: 'forged@example.test' })
    assert.equal(options.requireTLS, true)
    assert.equal(options.auth.pass, 'test-password')
    assert.equal(options.disableFileAccess, true)
    assert.equal(message.disableUrlAccess, true)
    assert.equal(message.from.address, 'team@example.test')
    settings.enabled = false
    await assert.rejects(adapter.sendEmail({ to: 'recipient@example.test' }))
  } finally {
    nodemailer.createTransport = original
    process.env.PAYLOAD_SECRET = savedSecret
  }
})

test('failed email delivery is caught without losing the already-saved enquiry', async () => {
  let logged = false
  const payload = { findGlobal: async () => ({ enabled: true, notifyEnquiries: true, notificationEmail: 'owner@example.test' }),
    sendEmail: async () => { throw new Error('Private SMTP diagnostic') }, logger: { error: (message: string) => { logged = true; assert.ok(!message.includes('Private SMTP diagnostic')) } } } as any
  await notifyEnquiry(payload, { id: 42, fieldValues: [{ label: 'Name', value: 'Test' }] })
  assert.equal(logged, true)
})
