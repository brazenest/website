/**
 * `npm run export` — BUILD.md §6. Reads Payload's local API (no server needed) and writes:
 *   1. Every collection + the siteMeta global as JSON into the Astro repo (astro/src/data).
 *   2. Uploaded media into an Astro-imported assets location (astro/src/assets/media) so
 *      Astro's image pipeline optimizes them at build — originals are never shipped as-is.
 *   3. The venture colour-token stylesheet (§3a) generated from the ventures collection.
 *
 * This is the whole author loop: edit in the local Payload admin, run this script, commit,
 * push — Cloudflare Pages builds Astro into pure static assets.
 */
import { config as loadEnv } from 'dotenv'
loadEnv()

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { contrastRatio, pickOnColor } from '../lib/contrast'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const PAYLOAD_ROOT = path.resolve(dirname, '..', '..')
const ASTRO_ROOT = path.resolve(PAYLOAD_ROOT, 'astro')
const MEDIA_SRC_DIR = path.resolve(PAYLOAD_ROOT, 'media')
const DATA_OUT_DIR = path.resolve(ASTRO_ROOT, 'src/data')
const MEDIA_OUT_DIR = path.resolve(ASTRO_ROOT, 'src/assets/media')
const STYLES_OUT_DIR = path.resolve(ASTRO_ROOT, 'src/styles')

type MediaDoc = {
  id: string | number
  filename?: string | null
  alt?: string | null
  width?: number | null
  height?: number | null
}

type MediaRef = { filename: string; alt: string; width: number | null; height: number | null } | null

function isMediaDoc(value: unknown): value is MediaDoc {
  return (
    typeof value === 'object' &&
    value !== null &&
    'filename' in value &&
    'id' in value &&
    typeof (value as Record<string, unknown>).filename !== 'undefined'
  )
}

async function copyMediaFiles(mediaDocs: Map<string, MediaDoc>) {
  await fs.mkdir(MEDIA_OUT_DIR, { recursive: true })
  let copied = 0
  for (const doc of mediaDocs.values()) {
    if (!doc.filename) continue
    const src = path.join(MEDIA_SRC_DIR, doc.filename)
    const dest = path.join(MEDIA_OUT_DIR, doc.filename)
    try {
      await fs.copyFile(src, dest)
      copied++
    } catch (err) {
      console.warn(`[export] could not copy media "${doc.filename}" — ${(err as Error).message}`)
    }
  }
  return copied
}

/** Replaces a populated media relationship with a lean {filename, alt} ref and records it for copying. */
function resolveMedia(value: unknown, mediaDocs: Map<string, MediaDoc>): MediaRef {
  if (!isMediaDoc(value)) return null
  mediaDocs.set(String(value.id), value)
  return {
    filename: value.filename!,
    alt: value.alt || '',
    width: value.width ?? null,
    height: value.height ?? null,
  }
}

function ventureSlug(value: unknown): string | null {
  if (typeof value === 'string') return null
  if (typeof value === 'object' && value !== null && 'slug' in value) {
    return String((value as Record<string, unknown>).slug)
  }
  return null
}

async function run() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../payload.config')
  const payload = await getPayload({ config })

  const mediaDocs = new Map<string, MediaDoc>()

  await fs.mkdir(DATA_OUT_DIR, { recursive: true })
  await fs.mkdir(STYLES_OUT_DIR, { recursive: true })

  // ---- ventures ------------------------------------------------------------
  const ventures = (await payload.find({ collection: 'ventures', limit: 1000, sort: 'order' })).docs
  const ventureExport = ventures.map((v) => ({
    id: v.id,
    name: v.name,
    slug: v.slug,
    zone: v.zone,
    order: v.order,
    tagline: v.tagline || null,
    palette: v.palette,
    links: (v.links || []).map((l: any) => ({ label: l.label, url: l.url })),
    proposed: v.proposed,
  }))
  await fs.writeFile(
    path.join(DATA_OUT_DIR, 'ventures.json'),
    JSON.stringify(ventureExport, null, 2) + '\n',
  )

  // ---- case studies ----------------------------------------------------------
  const caseStudies = (
    await payload.find({ collection: 'case-studies', limit: 1000, depth: 2 })
  ).docs
  const caseStudyExport = caseStudies.map((c: any) => ({
    id: c.id,
    venture: ventureSlug(c.venture),
    role: c.role || null,
    timeline: c.timeline || null,
    status: c.status || null,
    hook: c.hook || null,
    stack: (c.stack || []).map((s: any) => s.value),
    identityNote: c.identityNote || null,
    problem: c.problem
      ? { drop: c.problem.drop || null, body: c.problem.body || null }
      : null,
    built: (c.built || []).map((b: any) => ({ lead: b.lead, body: b.body })),
    // A Payload `group` always returns an object, so an unfilled queryTrace is a truthy
    // empty shell. Only emit it when there's an actual query, else the page renders an
    // empty "One query" section (case studies without a trace must omit it cleanly).
    queryTrace: c.queryTrace && c.queryTrace.query
      ? {
          query: c.queryTrace.query || null,
          steps: (c.queryTrace.steps || []).map((s: any) => ({
            no: s.no,
            name: s.name,
            description: s.description || null,
            io: s.io || null,
          })),
          resultCount: c.queryTrace.resultCount || null,
          resultTime: c.queryTrace.resultTime || null,
          failureNote: c.queryTrace.failureNote || null,
        }
      : null,
    decisions: (c.decisions || []).map((d: any) => ({ question: d.question, answer: d.answer })),
    screens: (c.screens || []).map((s: any) => resolveMedia(s.image, mediaDocs)),
    results: (c.results || []).map((r: any) => ({ value: r.value, label: r.label })),
    resultsCaveat: c.resultsCaveat || null,
  }))
  await fs.writeFile(
    path.join(DATA_OUT_DIR, 'case-studies.json'),
    JSON.stringify(caseStudyExport, null, 2) + '\n',
  )

  // ---- films -----------------------------------------------------------------
  const films = (await payload.find({ collection: 'films', limit: 1000, depth: 2 })).docs
  const filmExport = films.map((f: any) => ({
    id: f.id,
    venture: ventureSlug(f.venture),
    title: f.title,
    logline: f.logline || null,
    year: f.year || null,
    runtime: f.runtime || null,
    camera: f.camera || null,
    youtubeId: f.youtubeId || null,
    credits: (f.credits || []).map((c: any) => ({ role: c.role, name: c.name })),
    heroImage: resolveMedia(f.heroImage, mediaDocs),
    gradeGraded: resolveMedia(f.gradeGraded, mediaDocs),
    gradeRaw: resolveMedia(f.gradeRaw, mediaDocs),
    stills: (f.stills || []).map((s: any) => resolveMedia(s.image, mediaDocs)),
    services: (f.services || []).map((s: any) => ({ title: s.title, note: s.note })),
  }))
  await fs.writeFile(path.join(DATA_OUT_DIR, 'films.json'), JSON.stringify(filmExport, null, 2) + '\n')

  // ---- posts -------------------------------------------------------------------
  const posts = (await payload.find({ collection: 'posts', limit: 1000, depth: 2 })).docs
  const postExport = posts.map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    publishedAt: p.publishedAt || null,
    excerpt: p.excerpt || null,
    relatedVenture: ventureSlug(p.relatedVenture),
    body: p.body || null,
  }))
  await fs.writeFile(path.join(DATA_OUT_DIR, 'posts.json'), JSON.stringify(postExport, null, 2) + '\n')

  // ---- site meta global ----------------------------------------------------------
  const siteMeta = (await payload.findGlobal({ slug: 'site-meta' })) as any
  const siteMetaExport = {
    proofNumbers: (siteMeta.proofNumbers || []).map((n: any) => ({ value: n.value, label: n.label })),
    contactEmail: siteMeta.contactEmail || null,
    ctaText: siteMeta.ctaText || null,
    nav: (siteMeta.nav || []).map((n: any) => ({ label: n.label, href: n.href })),
    social: (siteMeta.social || []).map((s: any) => ({ label: s.label, url: s.url })),
  }
  await fs.writeFile(
    path.join(DATA_OUT_DIR, 'site-meta.json'),
    JSON.stringify(siteMetaExport, null, 2) + '\n',
  )

  // ---- media files -----------------------------------------------------------------
  const copiedCount = await copyMediaFiles(mediaDocs)

  // ---- venture token stylesheet (§3a) — the engine's blocks, generated from data --------
  const cssLines = ventureExport.map((v) => {
    const { key, hi, deep, lift } = v.palette
    let on = v.palette.on
    if (on) {
      const ratio = contrastRatio(key, on)
      if (ratio < 4.5) {
        console.warn(
          `[export] venture "${v.slug}" palette.on "${on}" only clears ${ratio.toFixed(2)}:1 against key "${key}" (needs 4.5:1) — using it anyway per admin override.`,
        )
      }
    } else {
      on = pickOnColor(key)
    }
    const proposedComment = v.proposed ? ' /* PROPOSED */' : ''
    return `[data-work="${v.slug}"]{--w-key:${key};--w-hi:${hi};--w-deep:${deep};--w-lift:${lift};--w-on:${on}}${proposedComment}`
  })
  const css = `/* AUTO-GENERATED by \`pnpm run export\` from the ventures collection — do not edit by hand. */\n${cssLines.join('\n')}\n`
  await fs.writeFile(path.join(STYLES_OUT_DIR, 'venture-tokens.generated.css'), css)

  console.log(`[export] wrote ${ventureExport.length} ventures, ${caseStudyExport.length} case studies, ${filmExport.length} films, ${postExport.length} posts`)
  console.log(`[export] copied ${copiedCount}/${mediaDocs.size} referenced media file(s)`)
  console.log(`[export] generated venture-tokens.generated.css (${ventureExport.length} blocks)`)
  console.log('[export] done')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
