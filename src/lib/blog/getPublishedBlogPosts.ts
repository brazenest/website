import { query } from '~/lib/db'
import type { BlogPostRecord } from '~/types/content'
import { BLOG_POST_PUBLIC_COLUMNS, type BlogPostRow, mapBlogPostRow } from './shared'

export async function getPublishedBlogPosts(): Promise<BlogPostRecord[]> {
  const { rows } = await query<BlogPostRow>(
    `
      SELECT ${BLOG_POST_PUBLIC_COLUMNS}
      FROM blog_posts
      WHERE status = $1
        AND published_at IS NOT NULL
      ORDER BY published_at DESC
    `,
    ['published']
  )

  return rows.map(mapBlogPostRow)
}