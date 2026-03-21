import type {
  BlogPostAuthoringValues,
  BlogPostFormFieldErrorMap,
  BlogPostFormValues,
  BlogPostSide,
  BlogPostStatus,
} from '~/types/content'

type ValidatorOptions = {
  existingPublishedAt?: string | null
}

export type BlogPostFormInput = FormData | Record<string, unknown>

export type BlogPostValidationFailure = {
  success: false
  fieldErrors: BlogPostFormFieldErrorMap
  values: BlogPostFormValues
}

export type BlogPostValidationSuccess = {
  success: true
  values: BlogPostFormValues
  input: BlogPostAuthoringValues
}

export type BlogPostValidationResult = BlogPostValidationFailure | BlogPostValidationSuccess

const BLOG_POST_SIDE_OPTIONS: BlogPostSide[] = ['engineering', 'production', 'bridge']
const BLOG_POST_STATUS_OPTIONS: BlogPostStatus[] = ['draft', 'published']

function normalizeFormValue(value: FormDataEntryValue | string | string[] | null | undefined): string {
  if (Array.isArray(value)) {
    return normalizeFormValue(value[0])
  }

  return typeof value === 'string' ? value.trim() : ''
}

function getInputValue(input: BlogPostFormInput, key: string): FormDataEntryValue | string | string[] | null | undefined {
  if (input instanceof FormData) {
    return input.get(key)
  }

  const value = input[key]

  if (typeof value === 'string' || value == null || Array.isArray(value)) {
    return value
  }

  return null
}

function normalizeSingleLine(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function normalizeSlug(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
}

function isBlogPostSide(value: string): value is BlogPostSide {
  return BLOG_POST_SIDE_OPTIONS.includes(value as BlogPostSide)
}

function isBlogPostStatus(value: string): value is BlogPostStatus {
  return BLOG_POST_STATUS_OPTIONS.includes(value as BlogPostStatus)
}

function isValidDateTime(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime())
}

function isValidCoverImageUrl(value: string): boolean {
  if (value.startsWith('/')) {
    return !value.includes(' ')
  }

  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function validateAndNormalizeBlogPostForm(
  formData: BlogPostFormInput,
  options: ValidatorOptions = {},
): BlogPostValidationResult {
  const rawStatus = normalizeFormValue(getInputValue(formData, 'status'))
  const rawSide = normalizeFormValue(getInputValue(formData, 'side'))
  const title = normalizeSingleLine(normalizeFormValue(getInputValue(formData, 'title')))
  const slug = normalizeSlug(normalizeFormValue(getInputValue(formData, 'slug')))
  const summary = normalizeSingleLine(normalizeFormValue(getInputValue(formData, 'summary')))
  const bodyMarkdown = normalizeFormValue(getInputValue(formData, 'bodyMarkdown'))
  const publishedAtInput = normalizeFormValue(getInputValue(formData, 'publishedAt'))
  const coverImageUrl = normalizeFormValue(getInputValue(formData, 'coverImageUrl'))
  const coverImageAlt = normalizeSingleLine(normalizeFormValue(getInputValue(formData, 'coverImageAlt')))

  const values: BlogPostFormValues = {
    title,
    slug,
    summary,
    bodyMarkdown,
    side: isBlogPostSide(rawSide) ? rawSide : 'engineering',
    status: isBlogPostStatus(rawStatus) ? rawStatus : 'draft',
    publishedAt: publishedAtInput,
    coverImageUrl,
    coverImageAlt,
  }

  const fieldErrors: BlogPostFormFieldErrorMap = {}

  if (!title) {
    fieldErrors.title = 'Title is required.'
  }

  if (!slug) {
    fieldErrors.slug = 'Slug is required.'
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fieldErrors.slug = 'Slug must normalize to lowercase letters, numbers, and single hyphens only.'
  }

  if (!summary) {
    fieldErrors.summary = 'Summary is required.'
  }

  if (!bodyMarkdown) {
    fieldErrors.bodyMarkdown = 'Markdown body is required.'
  }

  if (!isBlogPostSide(rawSide)) {
    fieldErrors.side = 'Select a valid side.'
  }

  if (!isBlogPostStatus(rawStatus)) {
    fieldErrors.status = 'Select a valid status.'
  }

  if (coverImageUrl && !isValidCoverImageUrl(coverImageUrl)) {
    fieldErrors.coverImageUrl = 'Cover image URL must be an absolute http(s) URL or a root-relative path.'
  }

  if (coverImageUrl && !coverImageAlt) {
    fieldErrors.coverImageAlt = 'Cover image alt text is required when an image URL is provided.'
  }

  if (coverImageAlt && !coverImageUrl) {
    fieldErrors.coverImageUrl = 'Cover image URL is required when alt text is provided.'
  }

  if (publishedAtInput && !isValidDateTime(publishedAtInput)) {
    fieldErrors.publishedAt = 'Published at must be a valid date/time.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      fieldErrors,
      values,
    }
  }

  const nowIso = new Date().toISOString()
  const publishedAt = values.status === 'published'
    ? (publishedAtInput
      ? new Date(publishedAtInput).toISOString()
      : (options.existingPublishedAt ?? nowIso))
    : null

  return {
    success: true,
    values,
    input: {
      title,
      slug,
      summary,
      bodyMarkdown,
      side: values.side as BlogPostSide,
      status: values.status as BlogPostStatus,
      publishedAt,
      updatedAt: nowIso,
      coverImageUrl: coverImageUrl || null,
      coverImageAlt: coverImageAlt || null,
    },
  }
}
