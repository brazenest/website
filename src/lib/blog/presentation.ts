import type { BlogPostRecord, BlogPostSide } from '~/types/content'

export type PublishedBlogListItem = {
  slug: string
  title: string
  summary: string
  side: BlogPostSide
  publishedDate: string | null
  coverImageUrl?: string | null
  coverImageAlt?: string | null
}

export function formatBlogDate(value: string | null): string {
  if (!value) {
    return 'Unpublished'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function toPublishedBlogListItem(post: BlogPostRecord): PublishedBlogListItem {
  return {
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    side: post.side,
    publishedDate: post.publishedAt,
    coverImageUrl: post.coverImageUrl,
    coverImageAlt: post.coverImageAlt,
  }
}

export function getBlogSideLabel(side: BlogPostSide): string {
  switch (side) {
    case 'engineering':
      return 'Engineering'
    case 'production':
      return 'Production'
    case 'bridge':
      return 'Bridge'
  }
}
