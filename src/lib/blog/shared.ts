import type { BlogPostRecord, BlogPostSide, BlogPostStatus } from '~/types/content'

type TimestampValue = Date | string | null

export type BlogPostRow = {
  id: string
  slug: string
  title: string
  summary: string
  body_markdown: string
  side: BlogPostSide
  status: BlogPostStatus
  published_at: TimestampValue
  updated_at: TimestampValue
  cover_image_url: string | null
  cover_image_alt: string | null
  created_at: Date | string
}

export const BLOG_POST_PUBLIC_COLUMNS = `
  id::text AS id,
  slug,
  title,
  summary,
  body_markdown,
  side,
  status,
  published_at,
  updated_at,
  cover_image_url,
  cover_image_alt,
  created_at
`

function toIsoString(value: TimestampValue): string | null {
  if (!value) {
    return null
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  return new Date(value).toISOString()
}

export function mapBlogPostRow(row: BlogPostRow): BlogPostRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    bodyMarkdown: row.body_markdown,
    side: row.side,
    status: row.status,
    publishedAt: toIsoString(row.published_at),
    updatedAt: toIsoString(row.updated_at),
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt,
    createdAt: toIsoString(row.created_at) ?? new Date(0).toISOString(),
  }
}