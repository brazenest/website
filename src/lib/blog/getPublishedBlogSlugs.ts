import { query } from '~/lib/db'

type PublishedBlogSlugRow = {
  slug: string
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const { rows } = await query<PublishedBlogSlugRow>(
    `
      SELECT slug
      FROM blog_posts
      WHERE status = $1
        AND published_at IS NOT NULL
      ORDER BY published_at DESC
    `,
    ['published']
  )

  return rows.map((row) => row.slug)
}