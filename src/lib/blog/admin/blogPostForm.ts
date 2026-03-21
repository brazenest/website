import type {
  BlogPostAdminRecord,
  BlogPostFormFieldErrorMap,
  BlogPostFormValues,
  BlogPostSide,
  BlogPostStatus,
  BlogPostAuthoringValues,
} from '~/types/content'
import { validateAndNormalizeBlogPostForm } from './validators'

export type BlogPostFormFieldErrors = BlogPostFormFieldErrorMap

export type BlogPostFormFailure = {
  success: false
  formError?: string
  fieldErrors: BlogPostFormFieldErrors
  values: BlogPostFormValues
}

export const DEFAULT_BLOG_POST_FORM_VALUES: BlogPostFormValues = {
  title: '',
  slug: '',
  summary: '',
  bodyMarkdown: '',
  side: 'engineering',
  status: 'draft',
  publishedAt: '',
  coverImageUrl: '',
  coverImageAlt: '',
}

export const BLOG_POST_SIDE_OPTIONS: BlogPostSide[] = ['engineering', 'production', 'bridge']
export const BLOG_POST_STATUS_OPTIONS: BlogPostStatus[] = ['draft', 'published']

function toDatetimeLocalValue(value: string | null): string {
  if (!value) {
    return ''
  }

  return new Date(value).toISOString().slice(0, 16)
}

export function getBlogPostFormValuesFromRecord(post: BlogPostAdminRecord): BlogPostFormValues {
  return {
    title: post.title,
    slug: post.slug,
    summary: post.summary,
    bodyMarkdown: post.bodyMarkdown,
    side: post.side,
    status: post.status,
    publishedAt: toDatetimeLocalValue(post.publishedAt),
    coverImageUrl: post.coverImageUrl ?? '',
    coverImageAlt: post.coverImageAlt ?? '',
  }
}

export function parseBlogPostFormInput(
  formData: FormData,
  options: {
    existingPublishedAt?: string | null
  } = {},
): BlogPostFormFailure | { values: BlogPostFormValues; input: BlogPostAuthoringValues } {
  const result = validateAndNormalizeBlogPostForm(formData, options)

  if (!result.success) {
    return result
  }

  return result
}
