import 'dotenv/config'
import { Client } from 'pg'

const LEGACY_AND_V3_TABLES = ['blog_posts', 'posts', 'categories', 'tags'] as const

function getSslConfig(databaseUrl: string) {
  const envSslMode = process.env.PGSSLMODE?.trim().toLowerCase()
  const urlSslMode = (() => {
    try {
      return new URL(databaseUrl).searchParams.get('sslmode')?.trim().toLowerCase()
    } catch {
      return undefined
    }
  })()

  const sslMode = envSslMode ?? urlSslMode

  if (!sslMode || !['require', 'verify-ca', 'verify-full'].includes(sslMode)) {
    return undefined
  }

  return {
    rejectUnauthorized: process.env.PGSSLREJECTUNAUTHORIZED !== 'false',
  }
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL?.trim()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL must be set before inspecting the blog schema.')
  }

  return databaseUrl
}

async function main() {
  const databaseUrl = getDatabaseUrl()
  const client = new Client({
    connectionString: databaseUrl,
    ssl: getSslConfig(databaseUrl),
  })

  await client.connect()

  try {
    const tables = await client.query<{
      table_name: string
    }>(
      `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = ANY($1::text[])
        ORDER BY table_name
      `,
      [Array.from(LEGACY_AND_V3_TABLES)],
    )

    const columns = await client.query<{
      table_name: string
      column_name: string
      data_type: string
      is_nullable: 'YES' | 'NO'
      column_default: string | null
    }>(
      `
        SELECT table_name, column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = ANY($1::text[])
        ORDER BY table_name, ordinal_position
      `,
      [Array.from(LEGACY_AND_V3_TABLES)],
    )

    const constraints = await client.query<{
      table_name: string
      constraint_name: string
      constraint_type: string
      column_name: string | null
      foreign_table_name: string | null
      foreign_column_name: string | null
    }>(
      `
        SELECT
          tc.table_name,
          tc.constraint_name,
          tc.constraint_type,
          kcu.column_name,
          ccu.table_name AS foreign_table_name,
          ccu.column_name AS foreign_column_name
        FROM information_schema.table_constraints tc
        LEFT JOIN information_schema.key_column_usage kcu
          ON tc.constraint_name = kcu.constraint_name
         AND tc.table_schema = kcu.table_schema
        LEFT JOIN information_schema.constraint_column_usage ccu
          ON tc.constraint_name = ccu.constraint_name
         AND tc.table_schema = ccu.table_schema
        WHERE tc.table_schema = 'public'
          AND tc.table_name = ANY($1::text[])
        ORDER BY tc.table_name, tc.constraint_name, kcu.ordinal_position NULLS FIRST
      `,
      [Array.from(LEGACY_AND_V3_TABLES)],
    )

    const counts = await client.query<{
      table_name: string
      row_count: string
    }>(
      `
        SELECT 'blog_posts' AS table_name, COUNT(*)::text AS row_count FROM blog_posts
        UNION ALL
        SELECT 'posts', COUNT(*)::text FROM posts
        UNION ALL
        SELECT 'categories', COUNT(*)::text FROM categories
        UNION ALL
        SELECT 'tags', COUNT(*)::text FROM tags
      `,
    )

    const quality = await client.query<{
      total_posts: number
      visible_posts: number
      hidden_posts: number
      posts_without_tags: number
      dek_differs_from_excerpt: number
    }>(
      `
        SELECT
          COUNT(*)::int AS total_posts,
          COUNT(*) FILTER (WHERE COALESCE(visible, 0) <> 0)::int AS visible_posts,
          COUNT(*) FILTER (WHERE COALESCE(visible, 0) = 0)::int AS hidden_posts,
          COUNT(*) FILTER (WHERE tags IS NULL OR cardinality(tags) = 0)::int AS posts_without_tags,
          COUNT(*) FILTER (WHERE COALESCE(dek, '') <> COALESCE(excerpt, ''))::int AS dek_differs_from_excerpt
        FROM posts
      `,
    )

    const categories = await client.query<{
      category: string
      count: number
    }>(
      `
        SELECT category, COUNT(*)::int AS count
        FROM posts
        GROUP BY category
        ORDER BY category
      `,
    )

    console.log('# Blog Schema Inspection')
    console.log('')
    console.log('## Tables')
    for (const row of tables.rows) {
      console.log(`- ${row.table_name}`)
    }

    console.log('')
    console.log('## Row Counts')
    for (const row of counts.rows) {
      console.log(`- ${row.table_name}: ${row.row_count}`)
    }

    console.log('')
    console.log('## Legacy Data Profile')
    console.log(`- visible posts: ${quality.rows[0].visible_posts}`)
    console.log(`- hidden posts: ${quality.rows[0].hidden_posts}`)
    console.log(`- posts without tags: ${quality.rows[0].posts_without_tags}`)
    console.log(`- rows where dek differs from excerpt: ${quality.rows[0].dek_differs_from_excerpt}`)

    console.log('')
    console.log('## Category Distribution')
    for (const row of categories.rows) {
      console.log(`- ${row.category}: ${row.count}`)
    }

    console.log('')
    console.log('## Columns')
    for (const row of columns.rows) {
      console.log(
        `- ${row.table_name}.${row.column_name}: ${row.data_type} | nullable=${row.is_nullable} | default=${row.column_default ?? 'null'}`,
      )
    }

    console.log('')
    console.log('## Constraints')
    for (const row of constraints.rows) {
      const relation = row.foreign_table_name
        ? ` -> ${row.foreign_table_name}.${row.foreign_column_name}`
        : ''
      console.log(
        `- ${row.table_name}.${row.column_name ?? '*'}: ${row.constraint_type} (${row.constraint_name})${relation}`,
      )
    }
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})