import 'dotenv/config'
import { Client } from 'pg'
import { getMarkdownParagraphs } from '../src/lib/blog/markdown'
import {
  LEGACY_BLOG_SOURCE_TABLES,
  REQUIRED_DESTINATION_COLUMNS,
  buildLegacyCollisionSlug,
  mapLegacyCategoryToSide,
  mapLegacyVisibilityToStatus,
  normalizeLegacyBody,
  normalizeLegacyReadtime,
  normalizeLegacySlug,
  pickLegacySummary,
  type LegacyBlogSourcePost,
  type PlannedMigratedBlogPost,
} from '../src/lib/server/blog/migrations/legacy-blog-field-map'

type Mode = 'dry-run' | 'execute'

type ExistingDestinationPost = {
  id: string
  slug: string
  legacy_post_id: number | null
}

type SchemaInspection = {
  sourceTables: string[]
  destinationColumns: string[]
  destinationHasLegacyPostId: boolean
}

type MigrationPlan = {
  plannedPosts: PlannedMigratedBlogPost[]
  slugCollisions: Array<{
    legacyPostId: number
    sourceSlug: string
    targetSlug: string
  }>
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL?.trim()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL must be set before running the legacy blog migration.')
  }

  return databaseUrl
}

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

function parseMode(argv: string[]): Mode {
  const hasDryRun = argv.includes('--dry-run')
  const hasExecute = argv.includes('--execute')

  if (hasDryRun === hasExecute) {
    throw new Error('Pass exactly one of `--dry-run` or `--execute`.')
  }

  return hasExecute ? 'execute' : 'dry-run'
}

async function inspectSchema(client: Client): Promise<SchemaInspection> {
  const sourceTables = await client.query<{ table_name: string }>(
    `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_name = ANY($1::text[])
      ORDER BY table_name
    `,
    [Array.from(LEGACY_BLOG_SOURCE_TABLES)],
  )

  const destinationColumns = await client.query<{ column_name: string }>(
    `
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = 'blog_posts'
      ORDER BY ordinal_position
    `,
  )

  return {
    sourceTables: sourceTables.rows.map((row) => row.table_name),
    destinationColumns: destinationColumns.rows.map((row) => row.column_name),
    destinationHasLegacyPostId: destinationColumns.rows.some(
      (row) => row.column_name === 'legacy_post_id',
    ),
  }
}

function assertSchemaInspection(schema: SchemaInspection) {
  const missingSourceTables = LEGACY_BLOG_SOURCE_TABLES.filter(
    (tableName) => !schema.sourceTables.includes(tableName),
  )

  if (missingSourceTables.length > 0) {
    throw new Error(`Missing required legacy tables: ${missingSourceTables.join(', ')}`)
  }

  const missingDestinationColumns = REQUIRED_DESTINATION_COLUMNS.filter(
    (columnName) =>
      !schema.destinationColumns.includes(columnName) &&
      !['legacy_post_id', 'legacy_category_slug', 'legacy_category_name', 'legacy_tag_slugs', 'legacy_readtime'].includes(columnName),
  )

  if (missingDestinationColumns.length > 0) {
    throw new Error(`Missing required destination columns: ${missingDestinationColumns.join(', ')}`)
  }
}

async function ensureDestinationMigrationColumns(client: Client) {
  await client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS legacy_post_id SMALLINT`)
  await client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS legacy_category_slug TEXT`)
  await client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS legacy_category_name TEXT`)
  await client.query(
    `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS legacy_tag_slugs TEXT[] NOT NULL DEFAULT '{}'::TEXT[]`,
  )
  await client.query(`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS legacy_readtime SMALLINT`)
  await client.query(
    `CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_legacy_post_id_key ON blog_posts (legacy_post_id)`,
  )
}

async function loadLegacyPosts(client: Client): Promise<LegacyBlogSourcePost[]> {
  const result = await client.query<LegacyBlogSourcePost>(`
    SELECT
      p.id,
      p.slug,
      p.title,
      p.excerpt,
      p.dek,
      p.date,
      p.body,
      p.visible,
      p.readtime,
      p.category,
      c.name AS category_name,
      COALESCE(ARRAY_REMOVE(ARRAY_AGG(t.slug ORDER BY t.id), NULL), '{}'::text[]) AS tag_slugs
    FROM posts p
    LEFT JOIN categories c ON c.slug = p.category
    LEFT JOIN tags t ON t.id = ANY(COALESCE(p.tags, '{}'::smallint[]))
    GROUP BY p.id, p.slug, p.title, p.excerpt, p.dek, p.date, p.body, p.visible, p.readtime, p.category, c.name
    ORDER BY p.date DESC, p.id DESC
  `)

  return result.rows
}

async function loadExistingDestinationPosts(
  client: Client,
  destinationHasLegacyPostId: boolean,
): Promise<ExistingDestinationPost[]> {
  const query = destinationHasLegacyPostId
    ? `
        SELECT id::text AS id, slug, legacy_post_id
        FROM blog_posts
      `
    : `
        SELECT id::text AS id, slug, NULL::smallint AS legacy_post_id
        FROM blog_posts
      `

  const result = await client.query<ExistingDestinationPost>(query)

  return result.rows
}

function buildMigrationPlan(
  legacyPosts: LegacyBlogSourcePost[],
  existingDestinationPosts: ExistingDestinationPost[],
): MigrationPlan {
  const existingByLegacyId = new Map<number, ExistingDestinationPost>()
  const reservedSlugs = new Set<string>()

  for (const row of existingDestinationPosts) {
    if (row.legacy_post_id !== null) {
      existingByLegacyId.set(row.legacy_post_id, row)
      continue
    }

    reservedSlugs.add(row.slug)
  }

  const plannedPosts: PlannedMigratedBlogPost[] = []
  const slugCollisions: MigrationPlan['slugCollisions'] = []

  for (const legacyPost of legacyPosts) {
    const sourceSlug = normalizeLegacySlug(legacyPost.slug)

    if (!sourceSlug) {
      throw new Error(`Legacy post ${legacyPost.id} is missing a slug after normalization.`)
    }

    const title = legacyPost.title.trim()

    if (!title) {
      throw new Error(`Legacy post ${legacyPost.id} is missing a title after trimming.`)
    }

    const summary = pickLegacySummary(legacyPost)

    if (!summary) {
      throw new Error(`Legacy post ${legacyPost.id} is missing both dek and excerpt.`)
    }

    const bodyMarkdown = normalizeLegacyBody(legacyPost.body)

    if (!bodyMarkdown) {
      throw new Error(`Legacy post ${legacyPost.id} is missing body content after normalization.`)
    }

    const status = mapLegacyVisibilityToStatus(legacyPost.visible)
    const existingRow = existingByLegacyId.get(legacyPost.id)
    let targetSlug = sourceSlug

    const slugBelongsToDifferentRow = reservedSlugs.has(sourceSlug)

    if (slugBelongsToDifferentRow) {
      targetSlug = buildLegacyCollisionSlug(sourceSlug, legacyPost.id)
      slugCollisions.push({
        legacyPostId: legacyPost.id,
        sourceSlug,
        targetSlug,
      })
    }

    while (reservedSlugs.has(targetSlug)) {
      targetSlug = `${buildLegacyCollisionSlug(sourceSlug, legacyPost.id)}-${slugCollisions.length + 1}`
    }

    if (!existingRow || existingRow.slug !== targetSlug) {
      reservedSlugs.add(targetSlug)
    }

    const timestamp = new Date(legacyPost.date)

    plannedPosts.push({
      legacyPostId: legacyPost.id,
      sourceSlug,
      targetSlug,
      title,
      summary,
      bodyMarkdown,
      side: mapLegacyCategoryToSide(legacyPost.category),
      status,
      publishedAt: status === 'published' ? timestamp : null,
      updatedAt: timestamp,
      createdAt: timestamp,
      coverImageUrl: null,
      coverImageAlt: null,
      legacyCategorySlug: legacyPost.category,
      legacyCategoryName: legacyPost.category_name,
      legacyTagSlugs: legacyPost.tag_slugs ?? [],
      legacyReadtime: normalizeLegacyReadtime(legacyPost.readtime),
    })
  }

  return {
    plannedPosts,
    slugCollisions,
  }
}

function validatePlannedPosts(plannedPosts: PlannedMigratedBlogPost[], legacyPosts: LegacyBlogSourcePost[]) {
  const visibleLegacyCount = legacyPosts.filter((post) => mapLegacyVisibilityToStatus(post.visible) === 'published').length
  const plannedPublishedCount = plannedPosts.filter((post) => post.status === 'published').length
  const uniqueTargetSlugs = new Set(plannedPosts.map((post) => post.targetSlug))

  if (plannedPosts.length !== legacyPosts.length) {
    throw new Error('Planned row count does not match legacy source count.')
  }

  if (plannedPublishedCount !== visibleLegacyCount) {
    throw new Error('Published legacy count does not match planned published destination count.')
  }

  if (uniqueTargetSlugs.size !== plannedPosts.length) {
    throw new Error('Planned target slugs are not unique.')
  }

  for (const post of plannedPosts) {
    if (!post.targetSlug || !post.title) {
      throw new Error(`Planned post ${post.legacyPostId} is missing slug or title.`)
    }
  }
}

async function upsertMigratedPosts(client: Client, plannedPosts: PlannedMigratedBlogPost[]) {
  for (const post of plannedPosts) {
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
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
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
          legacy_readtime = EXCLUDED.legacy_readtime,
          created_at = EXCLUDED.created_at
      `,
      [
        post.legacyPostId,
        post.targetSlug,
        post.title,
        post.summary,
        post.bodyMarkdown,
        post.side,
        post.status,
        post.publishedAt,
        post.updatedAt,
        post.coverImageUrl,
        post.coverImageAlt,
        post.legacyCategorySlug,
        post.legacyCategoryName,
        post.legacyTagSlugs,
        post.legacyReadtime,
        post.createdAt,
      ],
    )
  }
}

async function validateMigratedRows(client: Client, legacyPosts: LegacyBlogSourcePost[]) {
  const destination = await client.query<{
    migrated_total: number
    migrated_published: number
    migrated_draft: number
    missing_slug: number
    missing_title: number
    duplicate_slug_count: number
    missing_category_metadata: number
    missing_tag_array: number
  }>(
    `
      SELECT
        COUNT(*)::int AS migrated_total,
        COUNT(*) FILTER (WHERE status = 'published' AND published_at IS NOT NULL)::int AS migrated_published,
        COUNT(*) FILTER (WHERE status = 'draft' AND published_at IS NULL)::int AS migrated_draft,
        COUNT(*) FILTER (WHERE slug IS NULL OR slug = '')::int AS missing_slug,
        COUNT(*) FILTER (WHERE title IS NULL OR title = '')::int AS missing_title,
        COUNT(*)::int - COUNT(DISTINCT slug)::int AS duplicate_slug_count,
        COUNT(*) FILTER (WHERE legacy_category_slug IS NULL OR legacy_category_slug = '')::int AS missing_category_metadata,
        COUNT(*) FILTER (WHERE legacy_tag_slugs IS NULL)::int AS missing_tag_array
      FROM blog_posts
      WHERE legacy_post_id IS NOT NULL
    `,
  )

  const timestampRows = await client.query<{
    legacy_post_id: number
    source_date: Date | string
    created_at: Date | string
    updated_at: Date | string
    published_at: Date | string | null
    status: 'draft' | 'published'
  }>(
    `
      SELECT
        b.legacy_post_id,
        p.date AS source_date,
        b.created_at,
        b.updated_at,
        b.published_at,
        b.status
      FROM blog_posts b
      INNER JOIN posts p ON p.id = b.legacy_post_id
    `,
  )

  const timestampChecks = timestampRows.rows.reduce(
    (summary, row) => {
      const sourceTime = new Date(row.source_date).getTime()

      if (new Date(row.created_at).getTime() !== sourceTime) {
        summary.mismatched_created_at += 1
      }

      if (new Date(row.updated_at).getTime() !== sourceTime) {
        summary.mismatched_updated_at += 1
      }

      if (row.status === 'published') {
        if (!row.published_at || new Date(row.published_at).getTime() !== sourceTime) {
          summary.mismatched_published_at += 1
        }
      }

      return summary
    },
    {
      mismatched_created_at: 0,
      mismatched_updated_at: 0,
      mismatched_published_at: 0,
    },
  )

  const compatibilityCandidates = legacyPosts
    .filter((post) => mapLegacyVisibilityToStatus(post.visible) === 'published')
    .sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime())

  const compatibilitySlugs = [
    compatibilityCandidates[0]?.slug,
    compatibilityCandidates.at(-1)?.slug,
    compatibilityCandidates.find((post) => post.body.includes('## '))?.slug,
  ].filter((slug): slug is string => Boolean(slug))

  const compatibilityRows = compatibilitySlugs.length
    ? await client.query<{
      slug: string
      body_markdown: string
    }>(
      `
          SELECT slug, body_markdown
          FROM blog_posts
          WHERE slug = ANY($1::text[])
            AND status = 'published'
            AND published_at IS NOT NULL
          ORDER BY slug
        `,
      [compatibilitySlugs],
    )
    : { rows: [] }

  const paragraphCounts = compatibilityRows.rows.map((row) => ({
    slug: row.slug,
    paragraphs: getMarkdownParagraphs(row.body_markdown).length,
  }))

  return {
    destination: destination.rows[0],
    timestampChecks,
    paragraphCounts,
  }
}

function printReport(mode: Mode, report: {
  sourceCount: number
  sourcePublishedCount: number
  existingDestinationCount: number
  plannedCount: number
  plannedPublishedCount: number
  slugCollisions: MigrationPlan['slugCollisions']
  validation?: Awaited<ReturnType<typeof validateMigratedRows>>
}) {
  console.log(`# Legacy Blog Migration Report (${mode})`)
  console.log('')
  console.log(`- source posts: ${report.sourceCount}`)
  console.log(`- source published posts: ${report.sourcePublishedCount}`)
  console.log(`- existing destination posts before migration: ${report.existingDestinationCount}`)
  console.log(`- planned migrated posts: ${report.plannedCount}`)
  console.log(`- planned migrated published posts: ${report.plannedPublishedCount}`)
  console.log(`- slug collisions requiring fallback slugs: ${report.slugCollisions.length}`)

  if (report.slugCollisions.length > 0) {
    console.log('')
    console.log('## Slug Collision Redirect Requirements')
    for (const collision of report.slugCollisions) {
      console.log(`- ${collision.sourceSlug} -> ${collision.targetSlug} (legacy id ${collision.legacyPostId})`)
    }
  }

  if (!report.validation) {
    return
  }

  console.log('')
  console.log('## Validation')
  console.log(`- migrated rows in destination: ${report.validation.destination.migrated_total}`)
  console.log(`- migrated published rows: ${report.validation.destination.migrated_published}`)
  console.log(`- migrated draft rows: ${report.validation.destination.migrated_draft}`)
  console.log(`- migrated rows missing slug: ${report.validation.destination.missing_slug}`)
  console.log(`- migrated rows missing title: ${report.validation.destination.missing_title}`)
  console.log(`- duplicate migrated slug count: ${report.validation.destination.duplicate_slug_count}`)
  console.log(`- migrated rows missing category metadata: ${report.validation.destination.missing_category_metadata}`)
  console.log(`- migrated rows missing tag arrays: ${report.validation.destination.missing_tag_array}`)
  console.log(`- created_at mismatches: ${report.validation.timestampChecks.mismatched_created_at}`)
  console.log(`- updated_at mismatches: ${report.validation.timestampChecks.mismatched_updated_at}`)
  console.log(`- published_at mismatches on published rows: ${report.validation.timestampChecks.mismatched_published_at}`)

  if (report.validation.paragraphCounts.length > 0) {
    console.log('')
    console.log('## Compatibility Spot Checks')
    for (const row of report.validation.paragraphCounts) {
      console.log(`- ${row.slug}: ${row.paragraphs} paragraphs after markdown splitting`)
    }
  }
}

async function main() {
  const mode = parseMode(process.argv.slice(2))
  const databaseUrl = getDatabaseUrl()
  const client = new Client({
    connectionString: databaseUrl,
    ssl: getSslConfig(databaseUrl),
  })

  await client.connect()

  try {
    if (mode === 'execute') {
      await client.query('BEGIN')
      await ensureDestinationMigrationColumns(client)
    }

    const schema = await inspectSchema(client)
    assertSchemaInspection(schema)

    const legacyPosts = await loadLegacyPosts(client)
    const existingDestinationPosts = await loadExistingDestinationPosts(
      client,
      mode === 'execute' ? true : schema.destinationHasLegacyPostId,
    )

    const sourcePublishedCount = legacyPosts.filter(
      (post) => mapLegacyVisibilityToStatus(post.visible) === 'published',
    ).length

    const plan = buildMigrationPlan(legacyPosts, existingDestinationPosts)
    validatePlannedPosts(plan.plannedPosts, legacyPosts)

    let validation: Awaited<ReturnType<typeof validateMigratedRows>> | undefined

    if (mode === 'execute') {
      await upsertMigratedPosts(client, plan.plannedPosts)
      validation = await validateMigratedRows(client, legacyPosts)
      await client.query('COMMIT')
    }

    printReport(mode, {
      sourceCount: legacyPosts.length,
      sourcePublishedCount,
      existingDestinationCount: existingDestinationPosts.length,
      plannedCount: plan.plannedPosts.length,
      plannedPublishedCount: plan.plannedPosts.filter((post) => post.status === 'published').length,
      slugCollisions: plan.slugCollisions,
      validation,
    })
  } catch (error) {
    if (mode === 'execute') {
      await client.query('ROLLBACK')
    }

    throw error
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})