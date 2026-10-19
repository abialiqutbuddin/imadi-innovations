export type EnquiryInput = {
  name: string
  email: string
  company: string
  preferredTime: string
  service: string
  budget: string
  message: string
  source: string
  website: string
}

const clean = (value: unknown, max: number) => typeof value === 'string' ? value.trim().slice(0, max + 1) : ''

export function validateEnquiry(value: unknown): { data?: EnquiryInput; errors?: Record<string, string> } {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { errors: { form: 'Please enter your enquiry details.' } }
  const input = value as Record<string, unknown>
  const data: EnquiryInput = {
    name: clean(input.name, 120), email: clean(input.email, 254).toLowerCase(), company: clean(input.company, 160),
    preferredTime: clean(input.preferredTime, 160),
    service: clean(input.service, 160), budget: clean(input.budget, 160), message: clean(input.message, 5000),
    source: clean(input.source, 300), website: clean(input.website, 300),
  }
  const errors: Record<string, string> = {}
  if (data.name.length < 2 || data.name.length > 120) errors.name = 'Enter your name (2–120 characters).'
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email address.'
  if (data.message.length < 20 || data.message.length > 5000) errors.message = 'Tell us a little more about your project (20–5,000 characters).'
  if (data.company.length > 160) errors.company = 'Keep the company name under 160 characters.'
  if (data.preferredTime.length > 160) errors.preferredTime = 'Keep the preferred time under 160 characters.'
  if (data.service.length > 160) errors.service = 'Keep the service name under 160 characters.'
  if (data.budget.length > 160) errors.budget = 'Keep the budget under 160 characters.'
  if (data.source.length > 300) data.source = data.source.slice(0, 300)
  return Object.keys(errors).length ? { errors } : { data }
}
