/**
 * One-time blog database setup.
 *
 * Creates the `blog_posts` table (canonical schema, matching
 * scripts/restore-blog-backup.ts) if it does not exist, and seeds a single
 * published welcome post ONLY when the table is empty. Safe to re-run.
 *
 * Connects directly via DATABASE_URL (plain pg, NOT Hyperdrive). Run it once per
 * database — point DATABASE_URL at each one:
 *
 *   # preview / dev database
 *   DATABASE_URL="postgres://USER:PASS@HOST:5432/aldengillespy_dev" \
 *     npx tsx scripts/setup-blog-db.ts
 *
 *   # production database
 *   DATABASE_URL="postgres://USER:PASS@HOST:5432/aldengillespy" \
 *     npx tsx scripts/setup-blog-db.ts
 *
 * Pass --no-seed to only create the table without the welcome post.
 */
import 'dotenv/config'
import { Client, type ClientConfig } from 'pg'

const CREATE_TABLE = `
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
`

const SEED_POST = {
  slug: 'hello-world',
  title: 'Hello from the new site',
  summary:
    'A short first note to confirm the blog is live. Real writing on engineering and production work is on the way.',
  body_markdown:
    '# Hello\n\nThis is the first post on the rebuilt site. More to come — notes on the products I\'m building and the systems behind them.\n',
  side: 'engineering',
  status: 'published',
}

function getClientConfig(): ClientConfig {
  const connectionString = process.env.DATABASE_URL?.trim()
  if (!connectionString) {
    throw new Error('DATABASE_URL must be set before setting up the blog database.')
  }

  // Enable TLS when the connection asks for it (hosted providers usually do).
  let sslMode: string | undefined
  try {
    sslMode = new URL(connectionString).searchParams.get('sslmode')?.toLowerCase() ?? undefined
  } catch {
    sslMode = undefined
  }
  const wantsSsl = sslMode === 'require' || sslMode === 'verify-ca' || sslMode === 'verify-full'

  return {
    connectionString,
    ...(wantsSsl
      ? { ssl: { rejectUnauthorized: process.env.PGSSLREJECTUNAUTHORIZED === 'true' } }
      : {}),
  }
}

async function main() {
  const seed = !process.argv.includes('--no-seed')
  const client = new Client(getClientConfig())
  await client.connect()

  try {
    await client.query(CREATE_TABLE)
    console.log('✓ blog_posts table is ready')

    if (!seed) {
      console.log('· --no-seed passed; skipping welcome post')
      return
    }

    const { rows } = await client.query<{ n: number }>(
      'SELECT COUNT(*)::int AS n FROM blog_posts',
    )
    if (rows[0].n > 0) {
      console.log(`· table already has ${rows[0].n} post(s); no seed inserted`)
      return
    }

    await client.query(
      `
        INSERT INTO blog_posts
          (slug, title, summary, body_markdown, side, status, published_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
      `,
      [
        SEED_POST.slug,
        SEED_POST.title,
        SEED_POST.summary,
        SEED_POST.body_markdown,
        SEED_POST.side,
        SEED_POST.status,
      ],
    )
    console.log(`✓ seeded welcome post "${SEED_POST.slug}"`)
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error('Blog DB setup failed:', error instanceof Error ? error.message : error)
  process.exit(1)
})
