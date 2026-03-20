import { query } from '~/lib/db'
import type { BlogPostRecord } from '~/types/content'
import { BLOG_POST_PUBLIC_COLUMNS, type BlogPostRow, mapBlogPostRow } from './shared'

export async function getBlogPostBySlug(slug: string): Promise<BlogPostRecord | null> {
  const { rows } = await query<BlogPostRow>(
    `
      SELECT ${BLOG_POST_PUBLIC_COLUMNS}
      FROM blog_posts
      WHERE slug = $1
        AND status = $2
        AND published_at IS NOT NULL
      LIMIT 1
    `,
    [slug, 'published']
  )

  const post = rows[0]

  return post ? mapBlogPostRow(post) : null
}