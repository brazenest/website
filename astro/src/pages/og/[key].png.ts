/**
 * /og/<key>.png — every social card on the site, pre-rendered to PNG at build (v6.2).
 *
 * Astro's static output turns this endpoint into real files in dist/og/, so the cards cost
 * nothing at request time and need no Functions (BUILD.md §1, §8). One endpoint owns all of
 * them so that every og:image is guaranteed to exist, be exactly 1200×630, and keep a stable
 * URL — social platforms cache aggressively against the URL, so it must not carry a content
 * hash the way Astro's asset pipeline names things.
 *
 * Two sources, one output size:
 *   - a real upload (a post's coverImage, the About portrait) → cover-cropped to 1200×630
 *   - nothing uploaded → the generated composition from lib/coverArt.ts
 */
import type { APIRoute, GetStaticPaths } from 'astro'
import path from 'node:path'
import sharp from 'sharp'
import { buildCover, coverSvg, COVER_W, COVER_H } from '../../lib/coverArt'
import type { Palette } from '../../lib/coverArt'
import { publishedPosts, venturesBySlug, caseStudies, films, about, coverFor } from '../../lib/content'
import type { MediaRef } from '../../data/types'

/**
 * Uploads land here via `pnpm run export` (src/export/index.ts copies them in).
 *
 * Resolved from cwd, NOT from import.meta.url: this endpoint is bundled into
 * dist/.prerender/ before it runs, so a module-relative path would point at dist/assets/
 * — which doesn't exist yet. Both build entry points (`pnpm --dir astro run build` and
 * `pnpm run build` inside astro/) put cwd at the astro package root.
 */
const MEDIA_DIR = path.resolve(process.cwd(), 'src/assets/media')

interface CardProps {
  /** Seed for the generated composition — keeps each card's geometry stable and distinct. */
  seed: string
  palette: Palette
  /** When set, this image is used instead of the generated art. */
  source: MediaRef | null
  /** Astro's GetStaticPathsItem requires props to be index-signature compatible. */
  [key: string]: unknown
}

const housePalette = () => venturesBySlug.house.palette

export const getStaticPaths: GetStaticPaths = () => {
  const paths: { params: { key: string }; props: CardProps }[] = []

  const add = (key: string, seed: string, palette: Palette, source: MediaRef | null = null) =>
    paths.push({ params: { key }, props: { seed, palette, source } })

  // Site-wide + the fixed pages.
  add('site', 'aldengillespy', housePalette())
  add('home', 'home', housePalette())
  add('blog', 'blog', housePalette())
  add('contact', 'contact', housePalette())
  add('about', 'about', housePalette(), about.profilePhoto)
  add('resume', 'resume', housePalette(), about.profilePhoto)
  // The two category pages borrow the colour of the first venture in their zone, matching
  // what the page itself tints to on arrival.
  add('engineering', 'engineering', venturesBySlug.andacity?.palette ?? housePalette())
  add('media', 'media', venturesBySlug.shadowcat?.palette ?? housePalette())

  // One card per case study / film, in its own venture's colour world.
  for (const c of caseStudies) {
    if (!c.venture) continue
    const v = venturesBySlug[c.venture]
    if (v) add(`engineering-${c.venture}`, c.venture, v.palette)
  }
  for (const f of films) {
    if (!f.venture) continue
    const v = venturesBySlug[f.venture]
    if (v) add(`media-${f.venture}`, f.venture, v.palette, f.heroImage)
  }

  // One card per post, resolved through the SAME helper the pages use — so a shared link and
  // the page it opens always show the same picture, whether that came from the post, from its
  // category's default, or from generated art.
  for (const p of publishedPosts()) {
    const c = coverFor(p)
    add(`post-${p.slug}`, c.seed, c.palette, c.image)
  }

  return paths
}

export const GET: APIRoute = async ({ props }) => {
  const { seed, palette, source } = props as unknown as CardProps

  const generated = () => sharp(Buffer.from(coverSvg(buildCover(seed, palette)))).png().toBuffer()

  let png: Buffer
  if (source) {
    try {
      // Cover-crop the upload to the card's aspect so faces aren't squashed and no letterbox
      // bars appear. `position: 'attention'` keeps the most salient region — for a portrait,
      // the face — rather than blindly centring.
      png = await sharp(path.join(MEDIA_DIR, source.filename))
        .resize(COVER_W, COVER_H, { fit: 'cover', position: 'attention' })
        .png()
        .toBuffer()
    } catch (err) {
      // A referenced upload that never made it into src/assets/media (an export run against
      // a different media dir, a file deleted by hand) must not take the whole deploy down.
      // Fall back to generated art and say so loudly in the build log.
      console.warn(
        `[og] could not read upload "${source.filename}" — falling back to generated art. ${(err as Error).message}`,
      )
      png = await generated()
    }
  } else {
    png = await generated()
  }

  // In a static build these headers are advisory only — the endpoint is pre-rendered to a
  // file and Cloudflare Pages serves it under the rules in public/_headers, which is where
  // the real caching policy for /og/* lives.
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  })
}
