import type { BlogPostSide, BlogPostRecord } from '~/types/content'

const BLOG_SIDE_LABEL: Record<BlogPostSide, string> = {
  engineering: 'Side 1 · Engineering',
  production: 'Side 2 · Production',
  bridge: 'Bridge · Cross-disciplinary',
}

export type PublishedBlogListItem = Pick<
  BlogPostRecord,
  'slug' | 'title' | 'summary' | 'side' | 'coverImageUrl' | 'coverImageAlt'
> & {
  publishedDate: string
}

export const formatBlogDate = (date: string) => {
  const parsedDate = date.includes('T') ? new Date(date) : new Date(`${date}T00:00:00`)

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate)
}

export const getBlogSideLabel = (side: BlogPostSide) => {
  return BLOG_SIDE_LABEL[side]
}

export const toPublishedBlogListItem = (post: BlogPostRecord): PublishedBlogListItem => {
  return {
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    side: post.side,
    publishedDate: post.publishedAt ?? post.createdAt,
    coverImageUrl: post.coverImageUrl,
    coverImageAlt: post.coverImageAlt,
  }
}