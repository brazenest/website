import { siteConfig } from '~/config/site'
import { sendEmail } from '~/lib/server/email/sendEmail'
import { getRuntimeEnv } from '~/lib/server/runtimeEnv'
import type { ContactFormInput } from './contactForm'

const CONTACT_FORM_TO_EMAIL_ENV = 'CONTACT_FORM_TO_EMAIL'
const CONTACT_FORM_FROM_EMAIL_ENV = 'CONTACT_FORM_FROM_EMAIL'
const CONTACT_FORM_SUBJECT_PREFIX_ENV = 'CONTACT_FORM_SUBJECT_PREFIX'

export async function sendContactInquiry(input: ContactFormInput) {
  const toEmail = getRequiredEnvValue(CONTACT_FORM_TO_EMAIL_ENV)
  const fromEmail = getRequiredEnvValue(CONTACT_FORM_FROM_EMAIL_ENV)
  const subjectPrefix = getRuntimeEnv(CONTACT_FORM_SUBJECT_PREFIX_ENV)?.trim() || siteConfig.siteName

  await sendEmail({
    from: fromEmail,
    to: [toEmail],
    replyTo: [input.email],
    subject: `${subjectPrefix}: ${input.inquiryType} from ${input.name}`,
    text: buildTextBody(input),
    html: buildHtmlBody(input),
  })
}

function getRequiredEnvValue(name: string) {
  const value = getRuntimeEnv(name)?.trim()

  if (!value) {
    throw new Error(`${name} must be set for the contact form.`)
  }

  return value
}

function buildTextBody(input: ContactFormInput) {
  return [
    'New website inquiry',
    '',
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Inquiry type: ${input.inquiryType}`,
    `Organization: ${input.company || 'Not provided'}`,
    `Project URL: ${input.projectUrl || 'Not provided'}`,
    `Timeline: ${input.timeline || 'Not provided'}`,
    '',
    'Message:',
    input.message,
  ].join('\n')
}

function buildHtmlBody(input: ContactFormInput) {
  return `
    <h1>New website inquiry</h1>
    <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
    <p><strong>Inquiry type:</strong> ${escapeHtml(input.inquiryType)}</p>
    <p><strong>Organization:</strong> ${escapeHtml(input.company || 'Not provided')}</p>
    <p><strong>Project URL:</strong> ${escapeHtml(input.projectUrl || 'Not provided')}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(input.timeline || 'Not provided')}</p>
    <h2>Message</h2>
    <p>${escapeHtml(input.message).replace(/\n/g, '<br />')}</p>
  `.trim()
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}