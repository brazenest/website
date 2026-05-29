import { query } from '~/lib/db'
import type { BlogPostAdminRecord } from '~/types/content'
import { BLOG_POST_PUBLIC_COLUMNS, type BlogPostRow, mapBlogPostRow } from '../shared'

export async function getAdminBlogPostById(id: string): Promise<BlogPostAdminRecord | null> {
  const { rows } = await query<BlogPostRow>(
    `
      SELECT ${BLOG_POST_PUBLIC_COLUMNS}
      FROM blog_posts
      WHERE id = $1
      LIMIT 1
    `,
    [id],
  )

  const post = rows[0]

  return post ? mapBlogPostRow(post) : null
}
