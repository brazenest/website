import type { BlogPostSide, BlogPostStatus } from '../../../../types/content'

export type LegacyBlogSourceTable = 'posts' | 'categories' | 'tags'

export type LegacyBlogFieldMapRow = {
  sourceTable: LegacyBlogSourceTable
  sourceColumn: string
  destinationTable: 'blog_posts'
  destinationColumn: string | null
  transformRule: string
  nullHandling: string
  notes: string
}

export type LegacyCategorySlug = 'engineering' | 'cinematic' | 'process' | 'other'

export type LegacyBlogSourcePost = {
  id: number
  slug: string
  title: string
  excerpt: string
  dek: string | null
  date: Date | string
  body: string
  visible: number | null
  readtime: number | null
  category: LegacyCategorySlug
  category_name: string | null
  tag_slugs: string[] | null
}

export type PlannedMigratedBlogPost = {
  legacyPostId: number
  sourceSlug: string
  targetSlug: string
  title: string
  summary: string
  bodyMarkdown: string
  side: BlogPostSide
  status: BlogPostStatus
  publishedAt: Date | null
  updatedAt: Date
  createdAt: Date
  coverImageUrl: null
  coverImageAlt: null
  legacyCategorySlug: LegacyCategorySlug
  legacyCategoryName: string | null
  legacyTagSlugs: string[]
  legacyReadtime: number | null
}

export const LEGACY_BLOG_SOURCE_TABLES: LegacyBlogSourceTable[] = ['posts', 'categories', 'tags']

export const REQUIRED_DESTINATION_COLUMNS = [
  'legacy_post_id',
  'slug',
  'title',
  'summary',
  'body_markdown',
  'side',
  'status',
  'published_at',
  'updated_at',
  'cover_image_url',
  'cover_image_alt',
  'legacy_category_slug',
  'legacy_category_name',
  'legacy_tag_slugs',
  'legacy_readtime',
  'created_at',
] as const

export const CATEGORY_TO_SIDE_MAP: Record<LegacyCategorySlug, BlogPostSide> = {
  engineering: 'engineering',
  cinematic: 'production',
  process: 'bridge',
  other: 'bridge',
}

export const legacyBlogFieldMap: LegacyBlogFieldMapRow[] = [
  {
    sourceTable: 'posts',
    sourceColumn: 'id',
    destinationTable: 'blog_posts',
    destinationColumn: 'legacy_post_id',
    transformRule: 'Preserve the legacy primary key as the idempotent migration key.',
    nullHandling: 'Required; fail if null.',
    notes: 'Used to make reruns safe via upsert on legacy identity.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'slug',
    destinationTable: 'blog_posts',
    destinationColumn: 'slug',
    transformRule:
      'Trim and preserve the legacy slug when available; if the slug is already occupied in blog_posts, append `-legacy-{id}` deterministically.',
    nullHandling: 'Required; fail if empty after trimming.',
    notes: 'Preserves canonical URLs where possible and emits redirect requirements when collisions force a rename.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'title',
    destinationTable: 'blog_posts',
    destinationColumn: 'title',
    transformRule: 'Trim and preserve as-is.',
    nullHandling: 'Required; fail if empty after trimming.',
    notes: 'No title normalization beyond whitespace trimming.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'excerpt',
    destinationTable: 'blog_posts',
    destinationColumn: 'summary',
    transformRule:
      'Fallback summary source only if `dek` is null or blank. In the inspected live data, `dek` and `excerpt` are identical for all rows.',
    nullHandling: 'Fallback to `dek`; fail if both are empty.',
    notes: 'Kept in the mapping because the old schema exposes both fields.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'dek',
    destinationTable: 'blog_posts',
    destinationColumn: 'summary',
    transformRule: 'Primary summary source for v3. Trim and use when present.',
    nullHandling: 'Fallback to `excerpt` when null or blank.',
    notes: 'The inspected live database shows no `dek`/`excerpt` divergence.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'body',
    destinationTable: 'blog_posts',
    destinationColumn: 'body_markdown',
    transformRule:
      'Decode legacy escaped newline sequences, normalize line endings to LF, and trim surrounding whitespace; preserve markdown or inline HTML as-is rather than flattening to plain text.',
    nullHandling: 'Required; fail if empty after normalization.',
    notes: 'One inspected legacy row contains inline HTML; the rest are plain text or markdown-like content.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'visible',
    destinationTable: 'blog_posts',
    destinationColumn: 'status',
    transformRule: 'Map non-zero values to `published`, zero/null values to `draft`.',
    nullHandling: 'Treat null as `draft` only when encountered.',
    notes: 'The public app contract filters on `status = published` and non-null `published_at`.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'date',
    destinationTable: 'blog_posts',
    destinationColumn: 'published_at',
    transformRule: 'Use as `published_at` only when the mapped status is `published`.',
    nullHandling: 'Set null for draft rows.',
    notes: 'The same timestamp is also reused for `created_at` and `updated_at` because the legacy schema exposes no separate lifecycle timestamps.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'date',
    destinationTable: 'blog_posts',
    destinationColumn: 'created_at',
    transformRule: 'Reuse the legacy `date` as best-available creation timestamp.',
    nullHandling: 'Required; fail if null.',
    notes: 'Preserves chronology for older imported posts.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'date',
    destinationTable: 'blog_posts',
    destinationColumn: 'updated_at',
    transformRule: 'Reuse the legacy `date` as best-available modification timestamp.',
    nullHandling: 'Required; fail if null.',
    notes: 'The old schema has no independent updated timestamp.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'category',
    destinationTable: 'blog_posts',
    destinationColumn: 'side',
    transformRule:
      'Map `engineering -> engineering`, `cinematic -> production`, `process -> bridge`, and `other -> bridge`.',
    nullHandling: 'Required; fail if category is unmapped.',
    notes: 'This is the canonical taxonomy bridge from legacy editorial categories into the v3 side model.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'category',
    destinationTable: 'blog_posts',
    destinationColumn: 'legacy_category_slug',
    transformRule: 'Preserve the raw legacy category slug.',
    nullHandling: 'Required; fail if missing.',
    notes: 'Retained so migration provenance and future taxonomy analysis remain possible.',
  },
  {
    sourceTable: 'categories',
    sourceColumn: 'name',
    destinationTable: 'blog_posts',
    destinationColumn: 'legacy_category_name',
    transformRule: 'Left join from `posts.category = categories.slug` and preserve the category label when present.',
    nullHandling: 'Allow null if a legacy post references an orphaned category slug.',
    notes: 'The inspected live schema keeps the foreign key intact, so null is not expected in normal operation.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'tags',
    destinationTable: 'blog_posts',
    destinationColumn: 'legacy_tag_slugs',
    transformRule: 'Resolve `smallint[]` tag ids through the legacy `tags` table and store the resulting slug array.',
    nullHandling: 'Normalize null to an empty array.',
    notes: 'The inspected live database currently has zero tag rows and every post has an empty tag array.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'readtime',
    destinationTable: 'blog_posts',
    destinationColumn: 'legacy_readtime',
    transformRule: 'Preserve the stored smallint read-time value when positive; otherwise store null.',
    nullHandling: 'Normalize sentinel values such as `-1` to null.',
    notes: 'Current v3 rendering does not expose read time, so this is retained as migration metadata.',
  },
  {
    sourceTable: 'posts',
    sourceColumn: 'image',
    destinationTable: 'blog_posts',
    destinationColumn: 'cover_image_url',
    transformRule: 'No transform available because the live PostgreSQL `posts` table does not contain an `image` column.',
    nullHandling: 'Set null.',
    notes: 'The recovered historical audit referenced an old image field, but live schema inspection confirms it is absent from the current source table.',
  },
  {
    sourceTable: 'tags',
    sourceColumn: 'slug',
    destinationTable: 'blog_posts',
    destinationColumn: 'legacy_tag_slugs',
    transformRule: 'Aggregate related tag slugs onto the parent post row.',
    nullHandling: 'Empty array when no tag rows are linked.',
    notes: 'There is no v3 join table for blog tags yet, so relation data is preserved on the migrated post row.',
  },
]

export function mapLegacyCategoryToSide(category: LegacyCategorySlug): BlogPostSide {
  return CATEGORY_TO_SIDE_MAP[category]
}

export function normalizeLegacySlug(slug: string): string {
  return slug.trim()
}

export function pickLegacySummary(post: Pick<LegacyBlogSourcePost, 'dek' | 'excerpt'>): string {
  const dek = post.dek?.trim()

  if (dek) {
    return dek
  }

  return post.excerpt.trim()
}

export function normalizeLegacyBody(body: string): string {
  return body
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n?/g, '\n')
    .trim()
}

export function mapLegacyVisibilityToStatus(visible: number | null): BlogPostStatus {
  return visible && visible !== 0 ? 'published' : 'draft'
}

export function normalizeLegacyReadtime(readtime: number | null): number | null {
  if (typeof readtime !== 'number' || readtime <= 0) {
    return null
  }

  return readtime
}

export function buildLegacyCollisionSlug(slug: string, legacyPostId: number): string {
  return `${slug}-legacy-${legacyPostId}`
}