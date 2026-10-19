import { createHash } from 'node:crypto'
import config from '@payload-config'
import { getPayload } from 'payload'
import { validateContactValues } from '@/lib/contact-form'
import { getPublishedContactForm, parseContactFormLocator } from '@/payload/published-contact-form'
import { getEmailSettings, notifyEnquiry } from '@/payload/email'
import { after } from 'next/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const allowedOrigins = new Set([new URL(request.url).origin, process.env.NEXT_PUBLIC_SERVER_URL, process.env.NEXT_PUBLIC_SITE_URL].filter(Boolean))
  if (origin && !allowedOrigins.has(origin)) return Response.json({ error: 'This request is not allowed.' }, { status: 403 })
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ error: 'Send this enquiry as JSON.' }, { status: 415 })
  }
  if (Number(request.headers.get('content-length') || 0) > 64000) {
    return Response.json({ error: 'Your enquiry is too long.' }, { status: 413 })
  }
  let raw: unknown
  try {
    const body = await request.text()
    if (body.length > 64000) return Response.json({ error: 'Your enquiry is too long.' }, { status: 413 })
    raw = JSON.parse(body)
  } catch {
    return Response.json({ error: 'Please check your enquiry and try again.' }, { status: 400 })
  }
  // Silently discard spam before validation, without creating any record.
  if (raw && typeof raw === 'object' && typeof (raw as Record<string, unknown>).website === 'string' && (raw as Record<string, string>).website.trim()) {
    return Response.json({ success: true, message: 'Submission accepted.' })
  }
  const input = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw as Record<string, unknown> : {}
  const locator = parseContactFormLocator(input.form)
  if (!locator) return Response.json({ error: 'This form has changed. Please refresh and try again.' }, { status: 400 })

  try {
    const payload = await getPayload({ config })
    const form = await getPublishedContactForm(payload, locator)
    if (!form) return Response.json({ error: 'This form is not accepting enquiries. Please refresh or contact us directly.' }, { status: 400 })
    const { data, errors } = validateContactValues(form.fields, input.values, input.timeZone)
    if (!data) return Response.json({ error: form.block.validationSummaryMessage || 'Please check the highlighted fields.', errors }, { status: 400 })
    // Configure the hosting proxy to replace forwarding headers. Only the salted hash is stored.
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'local'
    const ipHash = createHash('sha256').update(`${process.env.PAYLOAD_SECRET || 'local-development'}:${ip}`).digest('hex')
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const recent = await payload.find({ collection: 'enquiries', overrideAccess: true, depth: 0, limit: 6,
      where: { and: [{ ipHash: { equals: ipHash } }, { createdAt: { greater_than: since } }] }, sort: '-createdAt' })
    if (recent.totalDocs >= 5 || (recent.docs[0] && Date.now() - new Date(recent.docs[0].createdAt).getTime() < 30_000)) {
      return Response.json({ error: 'Please wait a little before sending another enquiry.' }, { status: 429, headers: { 'Retry-After': '60' } })
    }
    const source = typeof input.source === 'string' ? input.source.trim().slice(0, 300) : ''
    const enquiry = await payload.create({ collection: 'enquiries', overrideAccess: true, data: {
      ...data.legacy, source, ipHash, status: 'new', formIdentity: locator, fieldValues: data.fieldValues,
    } })
    try {
      const email = await getEmailSettings(payload)
      if (email.enabled && email.notifyEnquiries) after(() => notifyEnquiry(payload, enquiry))
    } catch {
      payload.logger.error('Enquiry saved. Notification scheduling failed; review the admin inbox.')
    }
    return Response.json({ success: true, message: 'Your enquiry has been saved. Our team will be in touch.' }, { status: 201 })
  } catch (error) {
    console.error('Enquiry could not be saved:', error instanceof Error ? error.message : 'Unknown storage error')
    return Response.json({ error: 'We could not save your enquiry. Please try again, or contact us by email.' }, { status: 503 })
  }
}
