import type { BlogPostAdminRecord, BlogPostSide, BlogPostStatus } from '~/types/content'

export type BlogPostRow = {
  id: string
  title: string
  slug: string
  summary: string
  body_markdown: string
  side: BlogPostSide
  status: BlogPostStatus
  published_at: Date | string | null
  updated_at: Date | string | null
  created_at: Date | string | null
  cover_image_url: string | null
  cover_image_alt: string | null
}

export const BLOG_POST_PUBLIC_COLUMNS = `
  id,
  title,
  slug,
  summary,
  body_markdown,
  side,
  status,
  published_at,
  updated_at,
  created_at,
  cover_image_url,
  cover_image_alt
`.trim()

function toIsoString(value: Date | string | null): string | null {
  if (!value) {
    return null
  }

  return value instanceof Date ? value.toISOString() : new Date(value).toISOString()
}

export function mapBlogPostRow(row: BlogPostRow): BlogPostAdminRecord {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    bodyMarkdown: row.body_markdown,
    side: row.side,
    status: row.status,
    publishedAt: toIsoString(row.published_at),
    updatedAt: toIsoString(row.updated_at),
    createdAt: toIsoString(row.created_at),
    coverImageUrl: row.cover_image_url,
    coverImageAlt: row.cover_image_alt,
  }
}

export function mapBlogPostRows(rows: BlogPostRow[]): BlogPostAdminRecord[] {
  return rows.map(mapBlogPostRow)
}

export function isMissingBlogPostsTableError(error: unknown) {
  return (
    typeof error === 'object'
    && error !== null
    && 'code' in error
    && error.code === '42P01'
  )
}
