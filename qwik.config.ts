/**
 * Qwik City Build Configuration
 *
 * CURRENT BUILD STRATEGY
 * =======================
 * This project uses Vite + Qwik City to generate a client-side SPA
 * deployed to dist/ with static asset caching optimization.
 *
 * BUILD OUTPUT
 * ============
 * Running `qwik build` produces:
 * - /dist directory with chunked JavaScript and CSS
 * - All assets versioned with content hashes for CDN caching
 * - Vendor chunk (node_modules) isolated for stable caching
 * - Framework chunk (Qwik runtime) isolated for independent updates
 * - Application chunks for page-specific code
 *
 * ASSET ORGANIZATION
 * ===================
 * /dist
 *   /fonts       - Web font files with content hashing
 *   /styles      - CSS files with content hashing
 *   /assets      - Static images and other assets
 *   /*.js        - JavaScript chunks (qwikloader, framework, vendor, app code)
 *   /*.json      - Metadata files (qwik manifest, bundle graph)
 *
 * CACHE STRATEGY
 * ===============
 * All assets are served with content hashing for immutable caching:
 * - Each file name contains content hash (e.g., style-mjIS2WrX.css)
 * - Hash changes = new content (bust all caches)
 * - Hash unchanged = same content (use cached version indefinitely)
 *
 * DEPLOYMENT
 * ==========
 * The entire /dist directory can be deployed to:
 * - Static file hosts (GitHub Pages, Netlify, Vercel)
 * - CDNs (Cloudflare, AWS CloudFront)
 * - Any HTTP server treating /dist as the root directory
 *
 * Recommended Cache Headers (set by deployment host):
 * - /dist/styles/*, /dist/fonts/*, /dist/assets/* → max-age=31536000 (1 year)
 * - /dist/*.js → max-age=31536000 (1 year, content-hashed)
 * - / (index.html) → no-cache (revalidate to detect app updates)
 *
 * FUTURE: Static Prerendering
 * If static HTML prerendering becomes a requirement, add a Qwik static adapter
 * and configure route enumeration in vite.config.ts. Currently using client-side
 * rendering which provides flexibility for dynamic content and optimal UX.
 */

export default {};
