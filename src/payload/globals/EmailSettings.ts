import type { GlobalConfig } from 'payload'
import { isAdmin } from '../access'
import { encryptSMTPPassword, getEmailSettings } from '../email'

export const EmailSettings: GlobalConfig = {
  slug: 'email-settings', label: 'Email settings',
  admin: { group: 'Administration', description: 'Administrator-only SMTP settings for password recovery and enquiry notifications. Saved passwords are encrypted and never displayed again. A blank password keeps the saved credential. Changes apply immediately; no rebuild is needed.' },
  access: { read: isAdmin, update: isAdmin },
  fields: [
    { name: 'enabled', label: 'Enable outgoing email', type: 'checkbox', defaultValue: false },
    { name: 'host', label: 'SMTP hostname', type: 'text', admin: { placeholder: 'smtp.example.com' },
      validate: (value: unknown) => !value || (typeof value === 'string' && /^[a-zA-Z0-9.-]+$/.test(value)) || 'Enter a hostname without a URL, port or path.' },
    { name: 'port', type: 'number', defaultValue: 587, min: 1, max: 65535 },
    { name: 'security', label: 'Transport security', type: 'select', defaultValue: 'starttls', options: [
      { label: 'STARTTLS (usually port 587)', value: 'starttls' }, { label: 'TLS (usually port 465)', value: 'tls' },
    ] },
    { name: 'username', label: 'SMTP username', type: 'text' },
    { name: 'smtpPassword', label: 'New SMTP password / application password', type: 'text',
      admin: { description: 'Enter a new password to replace the saved one. It is hidden after saving.',
        components: { Field: '/payload/components/SMTPPasswordField#SMTPPasswordField' } },
      hooks: {
        beforeChange: [async ({ value, req }) => value ? encryptSMTPPassword(String(value)) : (await getEmailSettings(req.payload)).smtpPassword || '' ],
        afterRead: [({ value, req }) => req.context?.internalSMTPRead ? value : '' ],
      },
    },
    { name: 'fromAddress', label: 'Sender email address', type: 'email', defaultValue: 'info@imadi-innovations.com' },
    { name: 'fromName', label: 'Sender name', type: 'text', defaultValue: 'Imadi Innovations' },
    { name: 'notifyEnquiries', label: 'Email new enquiries to the team', type: 'checkbox', defaultValue: true },
    { name: 'notificationEmail', label: 'Enquiry notification recipient', type: 'email', defaultValue: 'abialigadi@gmail.com' },
  ],
}
