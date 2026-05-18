import type { BlogPostRecord, BlogPostSide, BlogPostStatus } from '~/types/content'
import { getBlogGeneratedCover } from './cover-art'

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

const BLOG_FALLBACK_COVER_BY_SIDE: Record<BlogPostSide, { url: string; alt: string }> = {
  engineering: {
    url: '/media/blog/engineering-launch-cover.svg',
    alt: 'Abstract engineering article cover illustration',
  },
  production: {
    url: '/media/blog/production-launch-cover.svg',
    alt: 'Abstract production article cover illustration',
  },
  bridge: {
    url: '/media/blog/bridge-launch-cover.svg',
    alt: 'Abstract cross-disciplinary article cover illustration',
  },
}

function toIsoString(value: TimestampValue): string | null {
  if (!value) {
    return null
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  return new Date(value).toISOString()
}

function resolveBlogCover(
  row: Pick<BlogPostRow, 'slug' | 'cover_image_url' | 'cover_image_alt' | 'side' | 'title'>,
) {
  const generatedCover = getBlogGeneratedCover(row.slug, row.title, row.side)
  const fallbackCover = BLOG_FALLBACK_COVER_BY_SIDE[generatedCover.side]

  if (!row.cover_image_url) {
    return generatedCover
  }

  if (
    row.cover_image_url.startsWith('http://') ||
    row.cover_image_url.startsWith('https://') ||
    row.cover_image_url.startsWith('data:')
  ) {
    return {
      url: row.cover_image_url,
      alt: row.cover_image_alt ?? row.title,
    }
  }

  if (row.cover_image_url.startsWith('/media/blog/')) {
    return {
      url: generatedCover.url,
      alt: generatedCover.alt,
    }
  }

  return fallbackCover
}

export function mapBlogPostRow(row: BlogPostRow): BlogPostRecord {
  const coverImage = resolveBlogCover(row)

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
    coverImageUrl: coverImage.url,
    coverImageAlt: coverImage.alt,
    createdAt: toIsoString(row.created_at) ?? new Date(0).toISOString(),
  }
}
