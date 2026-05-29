import { query } from '~/lib/db'
import { isMissingBlogPostsTableError } from './shared'

type PublishedBlogSlugRow = {
  slug: string
}

export async function getPublishedBlogSlugs(): Promise<string[]> {
  try {
    const { rows } = await query<PublishedBlogSlugRow>(
      `
        SELECT slug
        FROM blog_posts
        WHERE status = $1
          AND published_at IS NOT NULL
        ORDER BY published_at DESC
      `,
      ['published'],
    )

    return rows.map((row) => row.slug)
  } catch (error) {
    if (isMissingBlogPostsTableError(error)) {
      return []
    }

    throw error
  }
}
