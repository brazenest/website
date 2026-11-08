import { config as loadEnv } from 'dotenv'
loadEnv()

import { venturesSeed } from './ventures'
import { memreyCaseStudySeed } from './memrey'
import { rotavoxCaseStudySeed, rotavoxScreenFiles } from './rotavox'
import { andacityCaseStudySeed } from './andacity'
import { shadowcatFilmSeed, shadowcatFilmImages } from './films'
import { upsertSeedMedia, seedImageArray } from './media'
import { siteMetaSeed, siteMetaSeoSeed } from './site-meta'
import { aboutSeed, aboutKeywordsSeed } from './about'
import { resumeSeed } from './resume'
import { postsSeed } from './posts'
import { normalizeLegacyMarkdown } from './markdown'
import { CATEGORY_SEED, seedCategoryCovers } from './category-covers'

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
  // Night Signal was retired at network level (v6.3) — same treatment.
  for (const slug of ['soldera', 'signal']) {
    const v = await payload.find({ collection: 'ventures', where: { slug: { equals: slug } }, limit: 1 })
    if (v.docs.length) {
      const cs = await payload.find({ collection: 'case-studies', where: { venture: { equals: v.docs[0].id } }, limit: 1 })
      if (cs.docs.length) await payload.delete({ collection: 'case-studies', id: cs.docs[0].id })
      await payload.delete({ collection: 'ventures', id: v.docs[0].id })
      payload.logger.info(`Removed demoted venture: ${slug}`)
    }
  }

  await upsertByVenture('case-studies', 'memrey', memreyCaseStudySeed)
  // Seed-owned imagery (src/seed/assets): uploaded idempotently by filename, then wired in.
  const rotavoxScreens = await seedImageArray(payload, rotavoxScreenFiles)
  await upsertByVenture('case-studies', 'rotavox', { ...rotavoxCaseStudySeed, screens: rotavoxScreens })
  await upsertByVenture('case-studies', 'andacity', andacityCaseStudySeed)
  const filmHero = await upsertSeedMedia(payload, shadowcatFilmImages.hero.file, shadowcatFilmImages.hero.alt)
  const filmStills = await seedImageArray(payload, shadowcatFilmImages.stills)
  await upsertByVenture('films', 'shadowcat', {
    ...shadowcatFilmSeed,
    heroImage: filmHero,
    stills: filmStills,
    // The Grade block is gone from the page; clear its placeholders too.
    gradeGraded: null,
    gradeRaw: null,
  })

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

  // about is ADMIN-OWNED, same rule as siteMeta: seed only on a fresh/empty DB, never
  // overwrite admin edits on re-seed. Force with SEED_ABOUT=1.
  const existingAbout = await payload.findGlobal({ slug: 'about' })
  if (process.env.SEED_ABOUT === '1' || !(existingAbout?.bio)) {
    await payload.updateGlobal({ slug: 'about', data: aboutSeed })
    payload.logger.info('Seeded about global.')
  } else {
    payload.logger.info('about already populated — preserved (SEED_ABOUT=1 to overwrite).')
  }

  // v6.2 BACKFILL — the seo group on siteMeta and the keywords on about are NEW fields on
  // globals that are otherwise admin-owned and preserved above. A plain re-seed would never
  // reach them on an existing DB, and forcing SEED_SITEMETA=1 would clobber real admin edits
  // (the contact email, for one, already diverges from the seed). So fill in ONLY what is
  // still empty, and leave every other field exactly as the admin left it.
  const metaNow = (await payload.findGlobal({ slug: 'site-meta' })) as any
  if (!metaNow?.seo?.titleSuffix && !metaNow?.seo?.defaultDescription) {
    // Payload returns an unfilled group as an object of nulls, so a plain spread of the
    // live value over the seed would overwrite every default with null. Take the seed only
    // where the admin has genuinely left the field empty.
    const live = metaNow?.seo || {}
    const seeded: Record<string, unknown> = siteMetaSeoSeed()
    const merged: Record<string, unknown> = { ...seeded }
    for (const [k, v] of Object.entries(live)) {
      if (v !== null && v !== undefined && !(Array.isArray(v) && v.length === 0)) merged[k] = v
    }
    await payload.updateGlobal({
      slug: 'site-meta',
      // Spread the live doc first so nothing else is touched — updateGlobal is a full write.
      data: { ...metaNow, seo: merged },
    })
    payload.logger.info('Backfilled siteMeta.seo defaults (other fields untouched).')
  } else {
    payload.logger.info('siteMeta.seo already populated — preserved.')
  }

  const aboutNow = (await payload.findGlobal({ slug: 'about' })) as any
  if (!aboutNow?.keywords?.length) {
    await payload.updateGlobal({ slug: 'about', data: { ...aboutNow, keywords: aboutKeywordsSeed() } })
    payload.logger.info('Backfilled about.keywords (other fields untouched).')
  } else {
    payload.logger.info('about.keywords already populated — preserved.')
  }

  // v6.3 — ABOUT INTERLUDES. New field on an admin-owned global: fill it only while empty,
  // reusing the film frames + Cockpit screen uploaded above, so the long page gets image
  // breaks out of the box. Once the admin edits the list, a re-seed leaves it alone.
  const aboutForInterludes = (await payload.findGlobal({ slug: 'about' })) as any
  if (!aboutForInterludes?.interludes?.length) {
    await payload.updateGlobal({
      slug: 'about',
      data: {
        ...aboutForInterludes,
        interludes: [
          { image: filmStills[2].image, caption: 'Con Te Partiro — Shadowcat Pictures, 2024', after: 'bio' },
          { image: rotavoxScreens[0].image, caption: 'Rotavox — the week grid, scheduling The BOLT', after: 'disciplines' },
          { image: filmStills[3].image, caption: 'Con Te Partiro — shot, cut and graded solo', after: 'disciplines' },
        ],
      },
    })
    payload.logger.info('Backfilled about.interludes (other fields untouched).')
  } else {
    payload.logger.info('about.interludes already populated — preserved.')
  }

  // v6.2 — BLOG CATEGORIES. Each category owns an accent venture and a default cover, so a
  // post with no coverImage of its own still gets artwork. The four defaults are generated
  // by the same code the front-end uses and uploaded as real media documents, which is what
  // makes them visible and swappable in the admin rather than invisible build-time output.
  //
  // Per-row preservation: a row whose defaultCover the author has already pointed somewhere
  // keeps it. Only empty slots are filled, so replacing a generated cover with a photograph
  // survives every subsequent re-seed.
  const palettesBySlug: Record<string, any> = Object.fromEntries(
    venturesSeed.map((v) => [v.slug, v.palette]),
  )
  const existingCats = (await payload.findGlobal({ slug: 'blog-categories' })) as any
  const rows: any[] = Array.isArray(existingCats?.categories) ? existingCats.categories : []
  const byValue = new Map(rows.map((r) => [r.value, r]))
  const missing = CATEGORY_SEED.filter((c) => {
    const row = byValue.get(c.value)
    return !row || !row.defaultCover
  })

  if (missing.length === 0) {
    payload.logger.info(`Blog categories already populated — preserved (${rows.length} rows).`)
  } else {
    const coverIds = await seedCategoryCovers(payload, palettesBySlug)
    const merged = CATEGORY_SEED.map((c) => {
      const row = byValue.get(c.value) || {}
      const venture = ventureIds[c.venture]
      return {
        value: c.value,
        label: row.label || c.label,
        // A relationship comes back populated (an object) at depth>0; keep whatever the
        // author chose, normalized to an id.
        accentVenture:
          (typeof row.accentVenture === 'object' && row.accentVenture?.id) || row.accentVenture || venture,
        defaultCover:
          (typeof row.defaultCover === 'object' && row.defaultCover?.id) ||
          row.defaultCover ||
          coverIds[c.value] ||
          null,
      }
    })
    await payload.updateGlobal({ slug: 'blog-categories', data: { categories: merged } })
    payload.logger.info(`Seeded blog categories — filled ${missing.length} default cover(s).`)
  }

  // v6.3 — the "Résumé" nav item pointed at the PDF; /resume is a page again. Targeted
  // migration on the admin-owned siteMeta: retarget ONLY that one link, touch nothing else.
  const metaForNav = (await payload.findGlobal({ slug: 'site-meta' })) as any
  if (Array.isArray(metaForNav?.nav) && metaForNav.nav.some((n: any) => n.href === '/resume.pdf')) {
    await payload.updateGlobal({
      slug: 'site-meta',
      data: {
        ...metaForNav,
        nav: metaForNav.nav.map((n: any) => (n.href === '/resume.pdf' ? { ...n, href: '/resume' } : n)),
      },
    })
    payload.logger.info('Retargeted the Résumé nav link to /resume.')
  }

  // résumé is ADMIN-OWNED (v6.3): seed only into an empty global. Force with SEED_RESUME=1.
  const existingResume = (await payload.findGlobal({ slug: 'resume' })) as any
  if (process.env.SEED_RESUME === '1' || !existingResume?.experience?.length) {
    await payload.updateGlobal({ slug: 'resume', data: resumeSeed })
    payload.logger.info('Seeded resume global.')
  } else {
    payload.logger.info('resume already populated — preserved (SEED_RESUME=1 to overwrite).')
  }

  payload.logger.info('Seed complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
