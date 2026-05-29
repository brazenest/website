import type { RequestHandler } from '@builder.io/qwik-city'
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim()

  if (!value) {
    throw new Error(`${name} must be set before sending contact form email.`)
  }

  return value
}

function getIntentLabel(intent: string) {
  if (intent === 'teardown') {
    return 'Website Teardown Review'
  }

  if (intent === 'project') {
    return 'Project Inquiry'
  }

  return 'Project & Teardown'
}

function getRecipientEmails() {
  return getRequiredEnv('CONTACT_FORM_TO_EMAIL')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
}

async function sendContactEmail({
  websiteUrl,
  intentLabel,
  email,
  phone,
  context,
}: {
  websiteUrl: string
  intentLabel: string
  email?: string
  phone?: string
  context?: string
}) {
  const region = getRequiredEnv('AWS_REGION')
  const fromEmail = getRequiredEnv('CONTACT_FORM_FROM_EMAIL')
  const toEmails = getRecipientEmails()
  const subjectPrefix = process.env.CONTACT_FORM_SUBJECT_PREFIX?.trim() || 'Website contact'
  const submittedAt = new Date().toISOString()

  if (toEmails.length === 0) {
    throw new Error('CONTACT_FORM_TO_EMAIL must include at least one email address.')
  }

  const emailBody = [
    'New teardown request / inquiry',
    '',
    `Website: ${websiteUrl}`,
    `Intent: ${intentLabel}`,
    `Email: ${email || 'Not provided'}`,
    `Phone: ${phone || 'Not provided'}`,
    context ? `\nContext:\n${context}` : '',
    '',
    'This request came through the website teardown form.',
    `Submitted at: ${submittedAt}`,
  ].join('\n')

  const ses = new SESv2Client({ region })

  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: fromEmail,
      Destination: {
        ToAddresses: toEmails,
      },
      ReplyToAddresses: email ? [email] : undefined,
      Content: {
        Simple: {
          Subject: {
            Charset: 'UTF-8',
            Data: `${subjectPrefix}: ${intentLabel}`,
          },
          Body: {
            Text: {
              Charset: 'UTF-8',
              Data: emailBody,
            },
          },
        },
      },
    }),
  )
}

/**
 * API route for handling teardown/contact requests
 * Accepts POST requests with form data and sends email notifications
 */
export const onPost: RequestHandler = async (requestEvent) => {
  const request = requestEvent.request as any
  const formData = await request.formData()

  // Extract form fields
  const websiteUrl = formData.get('websiteUrl')?.toString().trim()
  const intent = formData.get('intent')?.toString().trim()
  const email = formData.get('email')?.toString().trim()
  const phone = formData.get('phone')?.toString().trim()
  const context = formData.get('context')?.toString().trim()

  // Validate required fields
  if (!websiteUrl || !intent) {
    requestEvent.json(400, { message: 'Website URL and intent are required.' })
    return
  }

  // Validate URL format
  try {
    new URL(websiteUrl)
  } catch {
    requestEvent.json(400, { message: 'Please provide a valid website URL.' })
    return
  }

  try {
    if (email && !emailPattern.test(email)) {
      requestEvent.json(400, { message: 'Please provide a valid email address.' })
      return
    }

    await sendContactEmail({
      websiteUrl,
      intentLabel: getIntentLabel(intent),
      email,
      phone,
      context,
    })

    // Send response
    requestEvent.json(200, { success: true })
    return
  } catch (error) {
    console.error('Error processing teardown request:', error)
    requestEvent.json(500, { message: 'Failed to process your request. Please try again.' })
    return
  }
}
