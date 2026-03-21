import { type RequestHandler } from '@builder.io/qwik-city'
import { siteConfig } from '~/config/site'

/**
 * robots.txt endpoint for search engine crawlers.
 *
 * Declares baseline crawl policy and references the canonical sitemap
 * for crawl discovery and indexation guidance.
 *
 * Policy:
 * - Allows all crawlers to access the site normally
 * - References the centralized sitemap for discovery
 * - Declares host explicitly for multi-domain awareness
 *
 * Endpoint: GET /robots.txt
 * Content-Type: text/plain
 */
export const onGet: RequestHandler = async (requestEvent) => {
  // Construct absolute sitemap URL from production domain
  const sitemapUrl = `${siteConfig.siteUrl}/sitemap.xml`

  // Extract host from siteUrl (e.g., aldengillespy.com from https://aldengillespy.com)
  const siteUrlObj = new URL(siteConfig.siteUrl)
  const host = siteUrlObj.hostname

  // Build robots.txt content
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
Host: ${host}`

  // Return with correct content type
  requestEvent.headers.set('Content-Type', 'text/plain; charset=utf-8')
  throw requestEvent.text(200, robotsTxt)
}
