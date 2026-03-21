import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'
import { siteConfig } from '~/config/site'
import type { ContactFormInput } from './contactForm'

const CONTACT_FORM_TO_EMAIL_ENV = 'CONTACT_FORM_TO_EMAIL'
const CONTACT_FORM_FROM_EMAIL_ENV = 'CONTACT_FORM_FROM_EMAIL'
const CONTACT_FORM_SUBJECT_PREFIX_ENV = 'CONTACT_FORM_SUBJECT_PREFIX'

let client: SESv2Client | undefined

export async function sendContactInquiry(input: ContactFormInput) {
  const toEmail = getRequiredEnvValue(CONTACT_FORM_TO_EMAIL_ENV)
  const fromEmail = getRequiredEnvValue(CONTACT_FORM_FROM_EMAIL_ENV)
  const subjectPrefix = process.env[CONTACT_FORM_SUBJECT_PREFIX_ENV]?.trim() || siteConfig.siteName

  await getClient().send(
    new SendEmailCommand({
      FromEmailAddress: fromEmail,
      Destination: {
        ToAddresses: [toEmail],
      },
      ReplyToAddresses: [input.email],
      Content: {
        Simple: {
          Subject: {
            Data: `${subjectPrefix}: ${input.inquiryType} from ${input.name}`,
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: buildTextBody(input),
              Charset: 'UTF-8',
            },
            Html: {
              Data: buildHtmlBody(input),
              Charset: 'UTF-8',
            },
          },
        },
      },
    }),
  )
}

function getClient() {
  if (!client) {
    client = new SESv2Client({
      region: getAwsRegion(),
    })
  }

  return client
}

function getAwsRegion() {
  const region = process.env.AWS_REGION?.trim() || process.env.AWS_DEFAULT_REGION?.trim()

  if (!region) {
    throw new Error('AWS_REGION or AWS_DEFAULT_REGION must be set for the contact form.')
  }

  return region
}

function getRequiredEnvValue(name: string) {
  const value = process.env[name]?.trim()

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