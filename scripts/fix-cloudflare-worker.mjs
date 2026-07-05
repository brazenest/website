#!/usr/bin/env node
/**
 * Post-processes the Cloudflare Pages worker entry.
 *
 * The Qwik `cloudflare-pages` adapter emits `dist/_worker.js` with a bare module
 * specifier:
 *
 *   import { fetch } from "entry.cloudflare-pages"; export default { fetch };
 *
 * Cloudflare's `_worker.js` bundler (esbuild, used by both `wrangler pages dev`
 * and `wrangler pages deploy`) interprets a bare specifier as a package import
 * and fails with "Could not resolve". The sibling entry file must be referenced
 * relatively. This rewrites the specifier to `./entry.cloudflare-pages`.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const distDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')
const workerPath = join(distDir, '_worker.js')

let source
try {
  source = readFileSync(workerPath, 'utf8')
} catch (error) {
  console.error(`[fix-cloudflare-worker] Could not read ${workerPath}: ${error.message}`)
  process.exit(1)
}

// Rewrite bare specifiers that reference sibling entry files to relative paths.
const fixed = source.replace(
  /(from\s*|import\s*)(["'])(entry\.cloudflare-pages)(["'])/g,
  (_match, keyword, openQuote, name, closeQuote) =>
    `${keyword}${openQuote}./${name}${closeQuote}`,
)

if (fixed === source) {
  console.log('[fix-cloudflare-worker] No changes needed.')
} else {
  writeFileSync(workerPath, fixed)
  console.log('[fix-cloudflare-worker] Rewrote _worker.js entry import to relative path.')
}
