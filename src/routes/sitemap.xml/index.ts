import { type RequestHandler } from '@builder.io/qwik-city'
import { getSitemapEntries } from '~/fns/seo/getSitemapEntries'

/**
 * Sitemap XML endpoint for search engine crawl discovery.
 *
 * Derives sitemap entries from centralized SEO preset inventory (seo.ts).
 * Returns a standards-compliant XML sitemap with absolute canonical URLs.
 *
 * Each entry includes:
 * - `loc`: Absolute URL (required)
 * - `changefreq`: Update frequency (optional)
 * - `priority`: Crawl priority (optional, 0.0-1.0)
 *
 * Endpoint: GET /sitemap.xml
 * Content-Type: application/xml
 */
export const onGet: RequestHandler = async (requestEvent) => {
  // Get all sitemap entries from centralized config
  const entries = getSitemapEntries()

  // Build XML sitemap strings
  const urlElements = entries
    .map((entry) => {
      const lines = [`    <url>`, `      <loc>${escapeXml(entry.loc)}</loc>`]

      if (entry.changefreq) {
        lines.push(`      <changefreq>${entry.changefreq}</changefreq>`)
      }

      if (entry.priority !== undefined) {
        lines.push(`      <priority>${entry.priority.toFixed(1)}</priority>`)
      }

      lines.push(`    </url>`)
      return lines.join('\n')
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`

  // Set content type header and return XML
  requestEvent.headers.set('Content-Type', 'application/xml; charset=utf-8')
  throw requestEvent.json(200, xml)
}

/**
 * Escape XML special characters to prevent injection or parsing errors.
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
