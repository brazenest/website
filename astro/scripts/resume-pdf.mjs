/**
 * `pnpm run resume:pdf` — prints the built /resume page to PDF (v6.3).
 *
 * The HTML résumé is the source of truth; this makes the downloadable copy FROM it, so the
 * two can't drift. Run after `astro build`: it serves dist/ with `astro preview`, prints
 * /resume with headless Chrome (the page's @media print rules lay it out on US Letter), and
 * writes the result to BOTH dist/resume.pdf (this deploy) and public/resume.pdf (committed,
 * so a plain `astro build` still ships a current PDF).
 *
 * Chrome binary: $CHROME, else the first of google-chrome / chromium / chromium-browser.
 */
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PORT = Number(process.env.RESUME_PDF_PORT || 4329)
const URL = `http://127.0.0.1:${PORT}/resume`
const OUT_DIST = path.join(ROOT, 'dist', 'resume.pdf')
const OUT_PUBLIC = path.join(ROOT, 'public', 'resume.pdf')

function findChrome() {
  if (process.env.CHROME) return process.env.CHROME
  for (const bin of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser']) {
    if (spawnSync('which', [bin]).status === 0) return bin
  }
  throw new Error('No Chrome/Chromium found — set CHROME=/path/to/chrome')
}

async function waitFor(url, ms = 20000) {
  const until = Date.now() + ms
  while (Date.now() < until) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 300))
  }
  throw new Error(`preview server never answered at ${url}`)
}

// build.format may emit either dist/resume.html or dist/resume/index.html.
await fs
  .access(path.join(ROOT, 'dist', 'resume.html'))
  .catch(() => fs.access(path.join(ROOT, 'dist', 'resume', 'index.html')))
  .catch(() => {
    throw new Error('dist has no /resume page — run `astro build` first.')
  })

const server = spawn('npx', ['astro', 'preview', '--host', '127.0.0.1', '--port', String(PORT)], {
  cwd: ROOT,
  stdio: 'ignore',
  detached: true,
})

try {
  await waitFor(URL)
  const tmp = path.join(ROOT, 'dist', '.resume.tmp.pdf')
  const result = spawnSync(
    findChrome(),
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--no-pdf-header-footer',
      '--run-all-compositor-stages-before-draw',
      '--virtual-time-budget=8000',
      `--print-to-pdf=${tmp}`,
      URL,
    ],
    { encoding: 'utf8' },
  )
  if (result.status !== 0) throw new Error(`chrome exited ${result.status}: ${result.stderr}`)
  await fs.copyFile(tmp, OUT_DIST)
  await fs.copyFile(tmp, OUT_PUBLIC)
  await fs.rm(tmp)
  const { size } = await fs.stat(OUT_PUBLIC)
  console.log(`[resume:pdf] wrote dist/resume.pdf + public/resume.pdf (${(size / 1024).toFixed(0)} KB)`)
} finally {
  try {
    process.kill(-server.pid)
  } catch {}
}
