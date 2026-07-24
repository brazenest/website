import { config as loadEnv } from 'dotenv'
loadEnv()

import { venturesSeed } from './ventures'
import { memreyCaseStudySeed } from './memrey'
import { rotavoxCaseStudySeed } from './rotavox'
import { andacityCaseStudySeed } from './andacity'
import { shadowcatFilmSeed } from './films'
import { siteMetaSeed } from './site-meta'
import { postsSeed } from './posts'
import { normalizeLegacyMarkdown } from './markdown'

async function run() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  const { totalDocs: userCount } = await payload.count({ collection: 'users' })
  if (userCount === 0) {
    const email = process.env.SEED_ADMIN_EMAIL || 'ag@aldengillespy.com'
    const password = process.env.SEED_ADMIN_PASSWORD || 'change-me-immediately'
    await payload.create({ collection: 'users', data: { email, password } })
    payload.logger.info(`Created admin user ${email} — log in and change the password.`)
  } else {
    payload.logger.info(`${userCount} user(s) already exist — skipping admin user creation.`)
  }

  const ventureIds: Record<string, number | string> = {}
  for (const venture of venturesSeed) {
    const existing = await payload.find({
      collection: 'ventures',
      where: { slug: { equals: venture.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      const updated = await payload.update({
        collection: 'ventures',
        id: existing.docs[0].id,
        data: venture,
      })
      ventureIds[venture.slug] = updated.id
      payload.logger.info(`Updated venture: ${venture.slug}`)
    } else {
      const created = await payload.create({ collection: 'ventures', data: venture })
      ventureIds[venture.slug] = created.id
      payload.logger.info(`Created venture: ${venture.slug}`)
    }
  }

  /** Upserts a single doc in `collection` keyed by its `venture` relationship. */
  async function upsertByVenture(collection: 'case-studies' | 'films', ventureSlug: string, data: Record<string, unknown>) {
    const ventureId = ventureIds[ventureSlug]
    const existing = await payload.find({
      collection,
      where: { venture: { equals: ventureId } },
      limit: 1,
    })
    const docData = { venture: ventureId, ...data }
    if (existing.docs.length > 0) {
      await payload.update({ collection, id: existing.docs[0].id, data: docData })
      payload.logger.info(`Updated ${collection}: ${ventureSlug}`)
    } else {
      await payload.create({ collection, data: docData })
      payload.logger.info(`Created ${collection}: ${ventureSlug}`)
    }
  }

  // Soldera was demoted from a spectrum venture to the "in build" list — remove its
  // orphaned venture + case study so it drops out of the spectrum/rail and no page builds.
  // (Upserts don't delete; this keeps the DB in sync with the seed.)
  for (const slug of ['soldera']) {
    const v = await payload.find({ collection: 'ventures', where: { slug: { equals: slug } }, limit: 1 })
    if (v.docs.length) {
      const cs = await payload.find({ collection: 'case-studies', where: { venture: { equals: v.docs[0].id } }, limit: 1 })
      if (cs.docs.length) await payload.delete({ collection: 'case-studies', id: cs.docs[0].id })
      await payload.delete({ collection: 'ventures', id: v.docs[0].id })
      payload.logger.info(`Removed demoted venture: ${slug}`)
    }
  }

  await upsertByVenture('case-studies', 'memrey', memreyCaseStudySeed)
  await upsertByVenture('case-studies', 'rotavox', rotavoxCaseStudySeed)
  await upsertByVenture('case-studies', 'andacity', andacityCaseStudySeed)
  await upsertByVenture('films', 'shadowcat', shadowcatFilmSeed)

  // Blog archive (src/seed/posts.ts). Bodies are markdown in the seed and are converted
  // here with Payload's own converter, so the stored richText matches what the Lexical
  // admin editor produces.
  //
  // Posts are CREATE-ONLY by default: once a post exists, Payload is the authority and a
  // re-seed must not clobber an edit made in the admin (the same trap that used to wipe
  // siteMeta). SEED_POSTS=1 forces a re-import from the seed.
  const { convertMarkdownToLexical, editorConfigFactory } = await import('@payloadcms/richtext-lexical')
  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const forcePosts = process.env.SEED_POSTS === '1'
  let postsCreated = 0
  let postsUpdated = 0
  let postsPreserved = 0

  for (const post of postsSeed) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0 && !forcePosts) {
      postsPreserved++
      continue
    }

    const data = {
      legacyId: post.legacyId,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      category: post.category,
      status: post.status,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      body: convertMarkdownToLexical({
        editorConfig,
        markdown: normalizeLegacyMarkdown(post.bodyMarkdown, (warning) =>
          payload.logger.warn(`[posts] ${post.slug}: dropped unrenderable image ${warning.detail}`),
        ),
      }),
    }

    if (existing.docs.length > 0) {
      await payload.update({ collection: 'posts', id: existing.docs[0].id, data })
      postsUpdated++
    } else {
      await payload.create({ collection: 'posts', data })
      postsCreated++
    }
  }

  payload.logger.info(
    `Posts: ${postsCreated} created, ${postsUpdated} re-imported, ${postsPreserved} preserved${
      postsPreserved && !forcePosts ? ' (SEED_POSTS=1 to overwrite)' : ''
    }.`,
  )

  // siteMeta is ADMIN-OWNED: nav/social/contact are edited in Payload, then `pnpm run
  // export` pulls them into the static build. So only seed it on a fresh/empty DB — never
  // overwrite existing values (that would silently clobber admin edits on every re-seed,
  // which is exactly what used to wipe the social links). Force with SEED_SITEMETA=1.
  const existingMeta = await payload.findGlobal({ slug: 'site-meta' })
  if (process.env.SEED_SITEMETA === '1' || !(existingMeta?.nav && existingMeta.nav.length)) {
    await payload.updateGlobal({ slug: 'site-meta', data: siteMetaSeed })
    payload.logger.info('Seeded siteMeta global.')
  } else {
    payload.logger.info('siteMeta already populated — preserved (SEED_SITEMETA=1 to overwrite).')
  }

  payload.logger.info('Seed complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
