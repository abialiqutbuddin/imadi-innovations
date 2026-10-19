import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto'
import nodemailer from 'nodemailer'
import type { EmailAdapter, Payload } from 'payload'

const marker = 'smtp:v1:'
const key = () => createHash('sha256').update(process.env.PAYLOAD_SECRET || '').digest()

export function encryptSMTPPassword(value: string) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key(), iv)
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()])
  return marker + Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString('base64')
}

export function decryptSMTPPassword(value: string) {
  if (!value) return ''
  if (!value.startsWith(marker)) throw new Error('Invalid stored SMTP credential.')
  const buffer = Buffer.from(value.slice(marker.length), 'base64')
  const decipher = createDecipheriv('aes-256-gcm', key(), buffer.subarray(0, 12))
  decipher.setAuthTag(buffer.subarray(12, 28))
  return Buffer.concat([decipher.update(buffer.subarray(28)), decipher.final()]).toString('utf8')
}

export async function getEmailSettings(payload: Payload) {
  return payload.findGlobal({ slug: 'email-settings', overrideAccess: true, depth: 0,
    context: { internalSMTPRead: true } })
}

export const editableSMTPAdapter: EmailAdapter = ({ payload }) => ({
  name: 'admin-configured-smtp',
  defaultFromAddress: 'info@imadi-innovations.com',
  defaultFromName: 'Imadi Innovations',
  async sendEmail(message) {
    const settings = await getEmailSettings(payload)
    if (!settings.enabled || !settings.host || !settings.fromAddress || !settings.smtpPassword) {
      throw new Error('Configure and enable SMTP under Administration → Email settings first.')
    }
    const transport = nodemailer.createTransport({
      host: settings.host, port: settings.port || 587,
      secure: settings.security === 'tls', requireTLS: settings.security !== 'tls',
      auth: { user: settings.username || '', pass: decryptSMTPPassword(settings.smtpPassword) },
      connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000,
      disableFileAccess: true, disableUrlAccess: true,
    })
    return transport.sendMail({ ...message,
      from: { name: settings.fromName || 'Imadi Innovations', address: settings.fromAddress },
      disableFileAccess: true, disableUrlAccess: true,
    })
  },
})

/** An email failure must never discard an enquiry already saved to the inbox. */
export async function notifyEnquiry(payload: Payload, enquiry: { id: number | string; email?: string | null; fieldValues?: unknown }) {
  try {
    const settings = await getEmailSettings(payload)
    if (!settings.enabled || !settings.notifyEnquiries || !settings.notificationEmail) return
    const answers = Array.isArray(enquiry.fieldValues) ? enquiry.fieldValues : []
    const text = answers.map((answer: { label?: string; key?: string; value?: unknown }) =>
      `${answer.label || answer.key || 'Answer'}: ${typeof answer.value === 'string' ? answer.value : JSON.stringify(answer.value)}`).join('\n\n')
    await payload.sendEmail({ to: settings.notificationEmail, replyTo: enquiry.email || undefined,
      subject: `New website enquiry #${enquiry.id} — Imadi Innovations`,
      text: `${text}\n\nOpen the admin inbox: ${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/enquiries/${enquiry.id}`,
    })
  } catch {
    payload.logger.error('Enquiry saved, but its email notification failed. Review Email settings and the Enquiries inbox.')
  }
}
