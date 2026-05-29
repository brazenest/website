import { query, type QueryValue } from '~/lib/db'
import type { BlogPostAdminRecord, CreateBlogPostInput } from '~/types/content'
import { BLOG_POST_PUBLIC_COLUMNS, type BlogPostRow, mapBlogPostRow } from '../shared'

export async function createBlogPost(input: CreateBlogPostInput): Promise<BlogPostAdminRecord> {
  const values: QueryValue[] = [
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
      INSERT INTO blog_posts (
        title,
        slug,
        summary,
        body_markdown,
        side,
        status,
        published_at,
        updated_at,
        cover_image_url,
        cover_image_alt
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING ${BLOG_POST_PUBLIC_COLUMNS}
    `,
    values,
  )

  return mapBlogPostRow(rows[0])
}
