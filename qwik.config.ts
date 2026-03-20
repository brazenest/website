/**
 * Qwik City Build Configuration
 *
 * STATIC PRERENDERING
 * ===================
 * This site uses a fully static content model and is configured for complete
 * static prerendering at build time. All enumerable routes are rendered to
 * static HTML files, enabling deployment to any CDN or static file host.
 *
 * Prerendered Routes:
 * - Static: /, /about, /resume, /blog, /engineering, /production, /contact
 * - Dynamic (blog): /blog/[slug] for all published blog posts
 * - Dynamic (engineering): /engineering/projects/[slug] for all projects
 * - Dynamic (production): /production/projects/[slug] for all projects
 * - Special: /robots.txt, /sitemap.xml
 *
 * Route enumeration: src/lib/prerender-routes.ts
 *
 * BUILD OUTPUT
 * ============
 * Running `qwik build` produces:
 * - /dist directory with complete static HTML for every route
 * - All assets versioned with content hashes for long-term CDN caching
 * - No server-side rendering or Node.js runtime required for production
 *
 * DEPLOYMENT
 * ==========
 * The entire /dist directory can be deployed to:
 * - Static file hosts (GitHub Pages, Netlify, Vercel)
 * - CDNs (Cloudflare, AWS S3, etc.)
 * - Any HTTP server treating /dist as the root directory
 *
 * Cache Headers:
 * - /build/* and /assets/* - Cache-Control: max-age=31536000 (1 year)
 * - /*.html - Cache-Control: no-cache (revalidate on each request)
 */

export default {};
