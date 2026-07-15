/**
 * Typed accessors for the JSON that `pnpm run export` writes into src/data (BUILD.md §6).
 * The Astro pages read ONLY from here — never from Payload directly (it's build-time only).
 */
import venturesJson from '../data/ventures.json'
import caseStudiesJson from '../data/case-studies.json'
import filmsJson from '../data/films.json'
import postsJson from '../data/posts.json'
import siteMetaJson from '../data/site-meta.json'

import type { Venture, CaseStudy, Film, Post, SiteMeta } from '../data/types'

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

/**
 * Where a rail/spectrum segment points. Mostly derivable (`/#<slug>`) so a new venture gets
 * a sensible anchor with no code change; a few slugs map onto shared home sections.
 * memrey/shadowcat will re-point to their own pages (/memrey, /media) in steps 5–6.
 */
export function ventureHref(slug: string): string {
  const special: Record<string, string> = {
    house: '/',
    memrey: '/#engineering',
    signal: '/#bolt',
    shadowcat: '/#media',
  }
  return special[slug] ?? `/#${slug}`
}

/** Title-case the zone for a chip's corner label. */
export function zoneLabel(zone: string): string {
  return zone.charAt(0).toUpperCase() + zone.slice(1)
}
