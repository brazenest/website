import type { SitemapEntry, SEOPageKey } from '~/types/seo'
import { siteConfig } from '~/config/site'
import { seoPresets, routePathnames } from '~/config/seo'
import { engineeringProjects } from '~/content/engineering/projects'
import { productionProjects } from '~/content/production/projects'
import { getPublishedBlogRouteEntries } from '~/lib/blog/getPublishedBlogRouteEntries'

/**
 * Build absolute URL from pathname.
 */
function buildAbsoluteUrl(pathname: string): string {
  const cleanPathname = pathname.startsWith('/')
    ? pathname
    : `/${pathname}`
  return `${siteConfig.siteUrl}${cleanPathname}`.replace(/\/$/, '') || siteConfig.siteUrl
}

/**
 * Extract and normalize sitemap entries from centralized SEO config.
 *
 * This function:
 * - Iterates through all SEO presets
 * - Filters only sitemap-eligible pages (includeSitemap flag)
 * - Maps each to a sitemap entry with absolute canonical URL
 * - Includes optional changefreq and priority when present
 *
 * The sitemap is always derived from the shared SEO inventory, never hardcoded.
 * This ensures sitemap discovery stays synchronized with actual site structure.
 *
 * @returns Array of sitemap entries ready for XML serialization
 */
export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = []

  // Iterate through all SEO preset keys
  const pageKeys = Object.keys(seoPresets) as SEOPageKey[]

  for (const pageKey of pageKeys) {
    const preset = seoPresets[pageKey]
    const pathname = routePathnames[pageKey]

    // Skip pages marked as not included in sitemap
    if (preset.includeSitemap === false) {
      continue
    }

    // Build absolute URL from pathname
    const loc = buildAbsoluteUrl(pathname)

    // Create sitemap entry with optional fields
    const entry: SitemapEntry = {
      loc,
      ...(preset.changefreq && { changefreq: preset.changefreq }),
      ...(preset.priority !== undefined && { priority: preset.priority }),
    }

    entries.push(entry)
  }

  // Engineering + production project case studies. These are static content
  // routes (see prerender-routes.ts), so they can always be enumerated.
  for (const project of engineeringProjects) {
    entries.push({
      loc: buildAbsoluteUrl(`/engineering/projects/${project.slug}`),
      changefreq: 'monthly',
      priority: 0.7,
    })
  }

  for (const project of productionProjects) {
    entries.push({
      loc: buildAbsoluteUrl(`/production/projects/${project.slug}`),
      changefreq: 'monthly',
      priority: 0.7,
    })
  }

  // Published blog posts (dynamic, from the database). Degrade gracefully: a DB
  // outage should still yield a valid sitemap of the static routes above rather
  // than a 500. (getPublishedBlogRouteEntries already returns [] when the
  // blog_posts table is absent.)
  try {
    const blogEntries = await getPublishedBlogRouteEntries()
    for (const post of blogEntries) {
      entries.push({
        loc: buildAbsoluteUrl(`/blog/${post.slug}`),
        lastmod: post.lastModified,
        changefreq: 'monthly',
        priority: 0.6,
      })
    }
  } catch {
    /* DB unreachable — omit blog posts, keep the rest of the sitemap valid */
  }

  return entries
}
