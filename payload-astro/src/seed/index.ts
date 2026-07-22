import { config as loadEnv } from 'dotenv'
loadEnv()

import { venturesSeed } from './ventures'
import { memreyCaseStudySeed } from './memrey'
import { rotavoxCaseStudySeed } from './rotavox'
import { solderaCaseStudySeed } from './soldera'
import { faultLinesSeed } from './films'
import { siteMetaSeed } from './site-meta'

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

  await upsertByVenture('case-studies', 'memrey', memreyCaseStudySeed)
  await upsertByVenture('case-studies', 'rotavox', rotavoxCaseStudySeed)
  await upsertByVenture('case-studies', 'soldera', solderaCaseStudySeed)
  await upsertByVenture('films', 'shadowcat', faultLinesSeed)

  await payload.updateGlobal({ slug: 'site-meta', data: siteMetaSeed })
  payload.logger.info('Seeded siteMeta global.')

  payload.logger.info('Seed complete.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
