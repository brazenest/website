/**
 * Typed accessors for the JSON that `pnpm run export` writes into src/data (BUILD.md §6).
 * The Astro pages read ONLY from here — never from Payload directly (it's build-time only).
 */
import venturesJson from '../data/ventures.json'
import caseStudiesJson from '../data/case-studies.json'
import filmsJson from '../data/films.json'
import postsJson from '../data/posts.json'
import siteMetaJson from '../data/site-meta.json'

import type { Venture, CaseStudy, Film, Post, PostCategory, SiteMeta } from '../data/types'

export const ventures = venturesJson as Venture[]
export const caseStudies = caseStudiesJson as CaseStudy[]
export const films = filmsJson as Film[]
export const posts = postsJson as Post[]
export const siteMeta = siteMetaJson as SiteMeta

export const venturesBySlug: Record<string, Venture> = Object.fromEntries(
  ventures.map((v) => [v.slug, v]),
)

/** Ventures in rail order, grouped by zone — the spine's three clusters (BUILD.md §4). */
export function venturesByZone() {
  const sorted = [...ventures].sort((a, b) => a.order - b.order)
  return {
    neutral: sorted.filter((v) => v.zone === 'neutral'),
    engineering: sorted.filter((v) => v.zone === 'engineering'),
    media: sorted.filter((v) => v.zone === 'media'),
  }
}

/** The six real ventures shown in the home spectrum — house (Alden himself) is excluded. */
export function spectrumVentures() {
  return [...ventures].filter((v) => v.slug !== 'house').sort((a, b) => a.order - b.order)
}

export const caseStudiesByVentureSlug: Record<string, CaseStudy> = Object.fromEntries(
  caseStudies.filter((c) => c.venture).map((c) => [c.venture as string, c]),
)

export function caseStudyHref(ventureSlug: string): string | null {
  return caseStudiesByVentureSlug[ventureSlug] ? `/engineering/${ventureSlug}` : null
}

export const filmsByVentureSlug: Record<string, Film> = Object.fromEntries(
  films.filter((f) => f.venture).map((f) => [f.venture as string, f]),
)

export function filmHref(ventureSlug: string): string | null {
  return filmsByVentureSlug[ventureSlug] ? `/media/${ventureSlug}` : null
}

/**
 * Where a rail/spectrum segment points. A venture with a real case study or film page gets
 * that page automatically; everything else falls back to its home-page anchor — so a new
 * venture gets a sensible link with no code change, and adding its case study/film later
 * re-points the rail with no code change either.
 */
export function ventureHref(slug: string): string {
  if (slug === 'house') return '/'
  const dest = caseStudyHref(slug) ?? filmHref(slug)
  if (dest) return dest
  const specialAnchors: Record<string, string> = { signal: '/#bolt' }
  return specialAnchors[slug] ?? `/#${slug}`
}

/** Title-case the zone for a chip's corner label. */
export function zoneLabel(zone: string): string {
  return zone.charAt(0).toUpperCase() + zone.slice(1)
}

/**
 * Blog posts live under /blog/posts/<slug>. Every link goes through here so the prefix is
 * stated once — /blog/<slug> and the pre-v6 /blog/articles/<slug> both 301 here from
 * public/_redirects.
 */
export function postHref(slug: string): string {
  return `/blog/posts/${slug}`
}

/** Display names for the legacy editorial categories (the old `categories` table). */
const POST_CATEGORY_LABELS: Record<PostCategory, string> = {
  engineering: 'Engineering',
  cinematic: 'Cinematic',
  process: 'Process',
  other: 'Other Topics',
}

export function categoryLabel(category: PostCategory): string {
  return POST_CATEGORY_LABELS[category] ?? category
}

/** Published posts, newest first. The export already filters drafts and sorts. */
export function publishedPosts(): Post[] {
  return [...posts]
    .filter((p) => p.publishedAt)
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime())
}

/** A link that should open in a new tab: off-site, or a downloadable doc (résumé PDF). */
export function isExternalHref(href: string): boolean {
  return /^https?:\/\//.test(href) || /\.(pdf|docx?)$/i.test(href)
}
