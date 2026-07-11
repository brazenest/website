import 'dotenv/config'
import { Client } from 'pg'

// One-off migration: repoint blog cover images from .svg to .jpg.
//
// Facebook / LinkedIn / most social scrapers refuse SVG for og:image, so blog
// shares rendered no preview image. The rasterized .jpg twins now live under
// public/media/blog/. This updates the persisted cover_image_url values so SSR
// emits the .jpg URLs. The restore-blog-backup seed script already writes .jpg
// for fresh restores; this fixes rows already in the database.
//
// Idempotent: only rewrites rows still pointing at a /media/blog/*-cover.svg URL.
// Run: DATABASE_URL=... pnpm tsx scripts/migrate-blog-covers-to-jpg.ts

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL?.trim()
  if (!databaseUrl) {
    throw new Error('DATABASE_URL must be set before migrating blog covers.')
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

async function main() {
  const databaseUrl = getDatabaseUrl()
  const client = new Client({
    connectionString: getConnectionString(databaseUrl),
    ssl: getSslConfig(databaseUrl),
  })

  await client.connect()

  try {
    await client.query('BEGIN')
    const result = await client.query<{
      slug: string
      cover_image_url: string
    }>(`
      UPDATE blog_posts
      SET cover_image_url =
        regexp_replace(cover_image_url, '-cover\\.svg$', '-cover.jpg')
      WHERE cover_image_url LIKE '/media/blog/%-cover.svg'
      RETURNING slug, cover_image_url
    `)
    await client.query('COMMIT')

    console.log({
      updated: result.rowCount,
      rows: result.rows,
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
