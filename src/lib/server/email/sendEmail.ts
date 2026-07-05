/**
 * Minimal Resend email client.
 *
 * Uses the Resend HTTP API directly via `fetch` (no SDK) so it runs unchanged on
 * both Node.js (Fastify) and the Cloudflare Workers runtime, and keeps the
 * Worker bundle small.
 *
 * Requires the RESEND_API_KEY environment variable, read via getRuntimeEnv so it
 * resolves from Cloudflare bindings or Node's process.env (see
 * src/lib/server/runtimeEnv.ts).
 *
 * Docs: https://resend.com/docs/api-reference/emails/send-email
 */
import { getRuntimeEnv } from '~/lib/server/runtimeEnv'

const RESEND_API_KEY_ENV = 'RESEND_API_KEY'
const RESEND_ENDPOINT = 'https://api.resend.com/emails'

export interface SendEmailParams {
  /** Sender, e.g. "Alden Gillespy <no-reply@aldengillespy.com>" (domain must be verified in Resend). */
  from: string
  /** One or more recipient addresses. */
  to: string[]
  subject: string
  /** Plain-text body. */
  text: string
  /** Optional HTML body. */
  html?: string
  /** Optional Reply-To addresses. */
  replyTo?: string[]
}

interface ResendErrorBody {
  message?: string
  name?: string
  statusCode?: number
}

export async function sendEmail(params: SendEmailParams): Promise<void> {
  const apiKey = getRuntimeEnv(RESEND_API_KEY_ENV)?.trim()

  if (!apiKey) {
    throw new Error(`${RESEND_API_KEY_ENV} must be set to send email.`)
  }

  if (params.to.length === 0) {
    throw new Error('At least one recipient is required to send email.')
  }

  const payload: Record<string, unknown> = {
    from: params.from,
    to: params.to,
    subject: params.subject,
    text: params.text,
  }

  if (params.html) {
    payload.html = params.html
  }

  if (params.replyTo && params.replyTo.length > 0) {
    payload.reply_to = params.replyTo
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    let detail = ''

    try {
      const body = (await response.json()) as ResendErrorBody
      detail = body.message || body.name || JSON.stringify(body)
    } catch {
      detail = await response.text().catch(() => '')
    }

    throw new Error(`Resend API request failed (${response.status}): ${detail}`)
  }
}
