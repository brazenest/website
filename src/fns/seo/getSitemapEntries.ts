import type { SitemapEntry, SEOPageKey } from '~/types/seo'
import { siteConfig } from '~/config/site'
import { seoPresets, routePathnames } from '~/config/seo'
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

  const blogEntries = await getPublishedBlogRouteEntries()

  for (const entry of blogEntries) {
    entries.push({
      loc: buildAbsoluteUrl(`/blog/${entry.slug}`),
      lastmod: entry.lastModified,
      changefreq: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
