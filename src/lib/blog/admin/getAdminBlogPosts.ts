import { query } from '~/lib/db'
import type { BlogPostAdminRecord } from '~/types/content'
import { BLOG_POST_PUBLIC_COLUMNS, type BlogPostRow, mapBlogPostRows } from '../shared'

export async function getAdminBlogPosts(): Promise<BlogPostAdminRecord[]> {
  const { rows } = await query<BlogPostRow>(
    `
      SELECT ${BLOG_POST_PUBLIC_COLUMNS}
      FROM blog_posts
      ORDER BY COALESCE(updated_at, created_at) DESC, created_at DESC
    `,
  )

  return mapBlogPostRows(rows)
}
