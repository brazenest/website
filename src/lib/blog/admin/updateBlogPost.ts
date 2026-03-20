import { query, type QueryValue } from '~/lib/db'
import type { BlogPostAdminRecord, UpdateBlogPostInput } from '~/types/content'
import { BLOG_POST_PUBLIC_COLUMNS, type BlogPostRow, mapBlogPostRow } from '../shared'

export async function updateBlogPost(input: UpdateBlogPostInput): Promise<BlogPostAdminRecord | null> {
  const values: QueryValue[] = [
    input.id,
    input.title,
    input.slug,
    input.summary,
    input.bodyMarkdown,
    input.side,
    input.status,
    input.publishedAt,
    input.updatedAt,
    input.coverImageUrl,
    input.coverImageAlt,
  ]

  const { rows } = await query<BlogPostRow>(
    `
      UPDATE blog_posts
      SET
        title = $2,
        slug = $3,
        summary = $4,
        body_markdown = $5,
        side = $6,
        status = $7,
        published_at = $8,
        updated_at = $9,
        cover_image_url = $10,
        cover_image_alt = $11
      WHERE id = $1
      RETURNING ${BLOG_POST_PUBLIC_COLUMNS}
    `,
    values,
  )

  const post = rows[0]

  return post ? mapBlogPostRow(post) : null
}
