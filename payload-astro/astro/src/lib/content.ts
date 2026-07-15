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
