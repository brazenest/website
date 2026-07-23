import type { APIRoute } from 'astro'
import { caseStudies, films, posts } from '../lib/content'

/**
 * /sitemap.xml — generated from the same content the pages build from, so it never goes
 * stale (add a venture/film/post and its URL appears here on the next build). Astro's static
 * output pre-renders this endpoint to a plain dist/sitemap.xml. robots.txt points here.
 */
const SITE = 'https://aldengillespy.com'

export const GET: APIRoute = () => {
  const paths = [
    '/',
    '/about',
    '/engineering',
    '/media',
    '/contact',
    '/blog',
    ...caseStudies.filter((c) => c.venture).map((c) => `/engineering/${c.venture}`),
    ...films.filter((f) => f.venture).map((f) => `/media/${f.venture}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ]

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    paths.map((p) => `  <url><loc>${SITE}${p}</loc></url>`).join('\n') +
    `\n</urlset>\n`

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
