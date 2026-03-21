import { query } from '~/lib/db'

type PublishedBlogRouteEntryRow = {
  slug: string
  updated_at: Date | string | null
  published_at: Date | string | null
  created_at: Date | string
}

export type PublishedBlogRouteEntry = {
  slug: string
  lastModified: string
}

function toIsoString(value: Date | string | null): string | null {
  if (!value) {
    return null
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  return new Date(value).toISOString()
}

export async function getPublishedBlogRouteEntries(): Promise<PublishedBlogRouteEntry[]> {
  const { rows } = await query<PublishedBlogRouteEntryRow>(
    `
      SELECT
        slug,
        updated_at,
        published_at,
        created_at
      FROM blog_posts
      WHERE status = $1
        AND published_at IS NOT NULL
      ORDER BY published_at DESC, created_at DESC
    `,
    ['published'],
  )

  return rows.map((row) => ({
    slug: row.slug,
    lastModified: toIsoString(row.updated_at)
      ?? toIsoString(row.published_at)
      ?? toIsoString(row.created_at)
      ?? new Date(0).toISOString(),
  }))
}