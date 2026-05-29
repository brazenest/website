const CONTACT_FORM_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const CONTACT_INQUIRY_TYPES = [
  'Engineering engagement',
  'Production engagement',
  'Cross-disciplinary collaboration',
  'Professional opportunity',
  'Other',
] as const

export type ContactInquiryType = (typeof CONTACT_INQUIRY_TYPES)[number]

export type ContactFormValues = {
  name: string
  email: string
  company: string
  projectUrl: string
  inquiryType: ContactInquiryType
  timeline: string
  message: string
}

export type ContactFormInput = ContactFormValues

export type ContactFormFieldErrors = Partial<Record<keyof ContactFormValues, string>>

export type ContactFormFailure = {
  success: false
  formError?: string
  fieldErrors: ContactFormFieldErrors
  values: ContactFormValues
}

export const DEFAULT_CONTACT_FORM_VALUES: ContactFormValues = {
  name: '',
  email: '',
  company: '',
  projectUrl: '',
  inquiryType: CONTACT_INQUIRY_TYPES[0],
  timeline: '',
  message: '',
}

export function parseContactFormInput(formData: Record<string, unknown>) {
  const values: ContactFormValues = {
    name: normalizeField(formData.name),
    email: normalizeField(formData.email),
    company: normalizeField(formData.company),
    projectUrl: normalizeField(formData.projectUrl),
    inquiryType: normalizeInquiryType(formData.inquiryType),
    timeline: normalizeField(formData.timeline),
    message: normalizeField(formData.message),
  }

  const fieldErrors: ContactFormFieldErrors = {}

  if (values.name.length < 2) {
    fieldErrors.name = 'Enter your name so I know who is reaching out.'
  } else if (values.name.length > 80) {
    fieldErrors.name = 'Keep the name under 80 characters.'
  }

  if (!CONTACT_FORM_EMAIL_REGEX.test(values.email)) {
    fieldErrors.email = 'Enter a valid reply-to email address.'
  }

  if (values.company.length > 120) {
    fieldErrors.company = 'Keep the organization field under 120 characters.'
  }

  if (values.projectUrl) {
    try {
      const url = new URL(values.projectUrl)

      if (!['http:', 'https:'].includes(url.protocol)) {
        fieldErrors.projectUrl = 'Use a full http or https URL.'
      }
    } catch {
      fieldErrors.projectUrl = 'Enter a valid URL or leave this blank.'
    }
  }

  if (!CONTACT_INQUIRY_TYPES.includes(values.inquiryType)) {
    fieldErrors.inquiryType = 'Choose the inquiry type that best matches the work.'
  }

  if (values.timeline.length > 120) {
    fieldErrors.timeline = 'Keep the timeline note under 120 characters.'
  }

  if (values.message.length < 40) {
    fieldErrors.message = 'Add a little more context so the first reply can be useful.'
  } else if (values.message.length > 5000) {
    fieldErrors.message = 'Keep the message under 5,000 characters.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      formError: 'The inquiry needs a few fixes before it can be sent.',
      fieldErrors,
      values,
    } satisfies ContactFormFailure
  }

  return {
    input: values,
    values,
  }
}

function normalizeField(value: unknown) {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (Array.isArray(value)) {
    return normalizeField(value[0])
  }

  return ''
}

function normalizeInquiryType(value: unknown): ContactInquiryType {
  const normalized = normalizeField(value)

  return CONTACT_INQUIRY_TYPES.find((option) => option === normalized) ?? CONTACT_INQUIRY_TYPES[0]
}