import { readFileSync } from 'node:fs'
import 'dotenv/config'
import { Client } from 'pg'
import {
  mapLegacyCategoryToSide,
  mapLegacyVisibilityToStatus,
  normalizeLegacyBody,
  normalizeLegacyReadtime,
  normalizeLegacySlug,
  pickLegacySummary,
  type LegacyCategorySlug,
  type LegacyBlogSourcePost,
} from '../src/lib/server/blog/migrations/legacy-blog-field-map'

type SqlValue = string | number | null

type BackupArticleRow = [
  number,
  string,
  string,
  string,
  string,
  string,
  number | null,
  number | null,
  LegacyCategorySlug,
]

type BackupCategoryRow = [number, LegacyCategorySlug, string]

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL?.trim()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL must be set before restoring blog posts.')
  }

  return databaseUrl
}

function getSslMode(databaseUrl: string) {
  const envSslMode = process.env.PGSSLMODE?.trim().toLowerCase()

  if (envSslMode) {
    return envSslMode
  }

  try {
    return new URL(databaseUrl).searchParams.get('sslmode')?.trim().toLowerCase()
  } catch {
    return undefined
  }
}

function getConnectionString(databaseUrl: string) {
  if (getSslMode(databaseUrl) !== 'require') {
    return databaseUrl
  }

  try {
    const url = new URL(databaseUrl)
    url.searchParams.set('uselibpqcompat', 'true')
    return url.toString()
  } catch {
    return databaseUrl
  }
}

function getSslConfig(databaseUrl: string) {
  const sslMode = getSslMode(databaseUrl)

  if (!sslMode || !['require', 'verify-ca', 'verify-full'].includes(sslMode)) {
    return undefined
  }

  return {
    rejectUnauthorized:
      sslMode === 'require'
        ? process.env.PGSSLREJECTUNAUTHORIZED?.trim().toLowerCase() === 'true'
        : process.env.PGSSLREJECTUNAUTHORIZED !== 'false',
  }
}

function extractInsertValues(sql: string, tableName: string) {
  const marker = `INSERT INTO \`${tableName}\` VALUES `
  const start = sql.indexOf(marker)

  if (start === -1) {
    throw new Error(`Could not find INSERT statement for ${tableName}.`)
  }

  let inString = false
  let escaped = false
  const valuesStart = start + marker.length

  for (let index = valuesStart; index < sql.length; index += 1) {
    const char = sql[index]

    if (escaped) {
      escaped = false
      continue
    }

    if (inString && char === '\\') {
      escaped = true
      continue
    }

    if (char === "'") {
      inString = !inString
      continue
    }

    if (!inString && char === ';') {
      return sql.slice(valuesStart, index)
    }
  }

  throw new Error(`Could not find end of INSERT statement for ${tableName}.`)
}

function readSqlString(text: string, start: number) {
  let value = ''

  for (let index = start + 1; index < text.length; index += 1) {
    const char = text[index]

    if (char === '\\') {
      const next = text[index + 1]

      if (next === undefined) {
        throw new Error('Unexpected end of escaped SQL string.')
      }

      value +=
        next === 'n'
          ? '\n'
          : next === 'r'
            ? '\r'
            : next === 't'
              ? '\t'
              : next === '0'
                ? '\0'
                : next
      index += 1
      continue
    }

    if (char === "'") {
      if (text[index + 1] === "'") {
        value += "'"
        index += 1
        continue
      }

      return { value, nextIndex: index + 1 }
    }

    value += char
  }

  throw new Error('Unterminated SQL string.')
}

function parseInsertRows(valuesSql: string) {
  const rows: SqlValue[][] = []
  let row: SqlValue[] | null = null
  let token = ''

  function pushToken() {
    const trimmed = token.trim()
    token = ''

    if (!row) {
      return
    }

    if (!trimmed || trimmed.toUpperCase() === 'NULL') {
      row.push(null)
      return
    }

    const numericValue = Number(trimmed)
    row.push(Number.isFinite(numericValue) ? numericValue : trimmed)
  }

  for (let index = 0; index < valuesSql.length; index += 1) {
    const char = valuesSql[index]

    if (char === "'") {
      const parsed = readSqlString(valuesSql, index)
      row?.push(parsed.value)
      index = parsed.nextIndex - 1
      continue
    }

    if (char === '(' && !row) {
      row = []
      token = ''
      continue
    }

    if (char === ',' && row) {
      if (token.trim()) {
        pushToken()
      }
      continue
    }

    if (char === ')' && row) {
      if (token.trim()) {
        pushToken()
      }
      rows.push(row)
      row = null
      token = ''
      continue
    }

    if (row) {
      token += char
    }
  }

  return rows
}

function parseBackup(backupPath: string) {
  const sql = readFileSync(backupPath, 'utf8')
  const categoryRows = parseInsertRows(extractInsertValues(sql, 'categories')) as BackupCategoryRow[]
  const articleRows = parseInsertRows(extractInsertValues(sql, 'articles')) as BackupArticleRow[]
  const categories = new Map(categoryRows.map((row) => [row[1], row[2]]))

  return articleRows.map(
    (row): LegacyBlogSourcePost => ({
      id: row[0],
      slug: row[1],
      title: row[2],
      excerpt: row[3],
      dek: null,
      date: row[4],
      body: row[5],
      visible: row[6],
      readtime: row[7],
      category: row[8],
      category_name: categories.get(row[8]) ?? null,
      tag_slugs: [],
    }),
  )
}

function toDate(value: Date | string) {
  if (value instanceof Date) {
    return value
  }

  const normalized = value.includes('T') ? value : value.replace(' ', 'T')
  return new Date(`${normalized}Z`)
}

async function ensureBlogPostsTable(client: Client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id BIGSERIAL PRIMARY KEY,
      slug TEXT NOT NULL,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      body_markdown TEXT NOT NULL,
      side TEXT NOT NULL,
      status TEXT NOT NULL,
      published_at TIMESTAMPTZ NULL,
      updated_at TIMESTAMPTZ NULL,
      cover_image_url TEXT NULL,
      cover_image_alt TEXT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      legacy_post_id SMALLINT,
      legacy_category_slug TEXT,
      legacy_category_name TEXT,
      legacy_tag_slugs TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
      legacy_readtime SMALLINT,
      CONSTRAINT blog_posts_slug_key UNIQUE (slug),
      CONSTRAINT blog_posts_legacy_post_id_key UNIQUE (legacy_post_id),
      CONSTRAINT blog_posts_side_check CHECK (side IN ('engineering', 'production', 'bridge')),
      CONSTRAINT blog_posts_status_check CHECK (status IN ('draft', 'published')),
      CONSTRAINT blog_posts_published_at_check CHECK (status <> 'published' OR published_at IS NOT NULL)
    )
  `)
}

async function upsertPosts(client: Client, posts: LegacyBlogSourcePost[]) {
  for (const post of posts) {
    const slug = normalizeLegacySlug(post.slug)
    const status = mapLegacyVisibilityToStatus(post.visible)
    const timestamp = toDate(post.date)

    await client.query(
      `
        INSERT INTO blog_posts (
          legacy_post_id,
          slug,
          title,
          summary,
          body_markdown,
          side,
          status,
          published_at,
          updated_at,
          cover_image_url,
          cover_image_alt,
          legacy_category_slug,
          legacy_category_name,
          legacy_tag_slugs,
          legacy_readtime,
          created_at
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16
        )
        ON CONFLICT (legacy_post_id)
        DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          summary = EXCLUDED.summary,
          body_markdown = EXCLUDED.body_markdown,
          side = EXCLUDED.side,
          status = EXCLUDED.status,
          published_at = EXCLUDED.published_at,
          updated_at = EXCLUDED.updated_at,
          cover_image_url = EXCLUDED.cover_image_url,
          cover_image_alt = EXCLUDED.cover_image_alt,
          legacy_category_slug = EXCLUDED.legacy_category_slug,
          legacy_category_name = EXCLUDED.legacy_category_name,
          legacy_tag_slugs = EXCLUDED.legacy_tag_slugs,
          legacy_readtime = EXCLUDED.legacy_readtime
      `,
      [
        post.id,
        slug,
        post.title.trim(),
        pickLegacySummary(post),
        normalizeLegacyBody(post.body),
        mapLegacyCategoryToSide(post.category),
        status,
        status === 'published' ? timestamp : null,
        timestamp,
        `/media/blog/${slug}-cover.jpg`,
        post.title.trim(),
        post.category,
        post.category_name,
        post.tag_slugs ?? [],
        normalizeLegacyReadtime(post.readtime),
        timestamp,
      ],
    )
  }
}

async function main() {
  const backupPath = process.argv[2] ?? '/home/alden/Documents/backup.sql'
  const posts = parseBackup(backupPath)
  const databaseUrl = getDatabaseUrl()
  const client = new Client({
    connectionString: getConnectionString(databaseUrl),
    ssl: getSslConfig(databaseUrl),
  })

  await client.connect()

  try {
    await client.query('BEGIN')
    await ensureBlogPostsTable(client)
    await upsertPosts(client, posts)

    const summary = await client.query<{
      total: number
      published: number
      draft: number
      first_published_at: string
      last_published_at: string
    }>(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE status = 'published')::int AS published,
        COUNT(*) FILTER (WHERE status = 'draft')::int AS draft,
        MIN(published_at)::text AS first_published_at,
        MAX(published_at)::text AS last_published_at
      FROM blog_posts
    `)

    await client.query('COMMIT')

    console.log({
      restoredFrom: backupPath,
      parsedPosts: posts.length,
      ...summary.rows[0],
    })
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
