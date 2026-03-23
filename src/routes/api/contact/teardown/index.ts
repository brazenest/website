import type { RequestHandler } from '@builder.io/qwik-city'

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
  const context = formData.get('context')?.toString().trim()

  // Validate required fields
  if (!websiteUrl || !intent) {
    requestEvent.status(400)
    return requestEvent.json({ message: 'Website URL and intent are required.' })
  }

  // Validate URL format
  try {
    new URL(websiteUrl)
  } catch {
    requestEvent.status(400)
    return requestEvent.json({ message: 'Please provide a valid website URL.' })
  }

  try {
    // Format the email content
    const intentLabel =
      intent === 'teardown'
        ? 'Website Teardown Review'
        : intent === 'project'
          ? 'Project Inquiry'
          : 'Project & Teardown'

    const emailBody = `
New Teardown Request / Inquiry

Website: ${websiteUrl}
Intent: ${intentLabel}
${email ? `Email: ${email}` : 'Email: Not provided'}
${context ? `\nContext:\n${context}` : ''}

This request came through the website teardown form.
Submitted at: ${new Date().toISOString()}
`

    // For now, log to console (you can extend this with actual email service)
    console.log('📧 Teardown Request Received:')
    console.log(emailBody)

    // Send response
    requestEvent.status(200)
    return requestEvent.json({ success: true })
  } catch (error) {
    console.error('Error processing teardown request:', error)
    requestEvent.status(500)
    return requestEvent.json({ message: 'Failed to process your request. Please try again.' })
  }
}
