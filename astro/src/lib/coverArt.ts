/**
 * Generated cover art (v6.2). Blog posts inherited no imagery from the pre-v6 archive, and
 * commissioning 13 photographs was never the answer — so a post's art is DERIVED from the
 * site's own colour system instead.
 *
 * The composition is a topographic contour field — see buildCover for the geometry and for
 * why it replaced the first attempt. Its shape is a deterministic function of the post's
 * slug, so a given post's art never changes between builds and no two posts look alike.
 *
 * ONE geometry, three consumers:
 *   - CoverArt.astro inlines it as SVG in the page (real CSS, scales freely)
 *   - pages/og/[key].png.ts rasterizes it to a 1200x630 PNG for social cards
 *   - src/seed/category-covers.ts renders the four category defaults and uploads them into
 *     Payload's media library, so the art exists as real, swappable assets in the admin
 * All three call buildCover(), so what an author sees in Payload, what a reader sees on the
 * page, and what a social platform scrapes are the same picture.
 *
 * DEPENDENCY-FREE BY CONTRACT. This module must not import content.ts or any generated JSON:
 * the seed imports it across the package boundary and runs BEFORE `pnpm run export` has
 * written those files. Colour comes in as an argument; nothing is looked up here.
 *
 * Deliberately TEXT-FREE. The site's faces ship as woff2 only, which neither librsvg (sharp's
 * SVG backend) nor satori can embed — any text here would silently rasterize in whatever font
 * the build container happened to have. The words live in og:title / og:description, which is
 * where every social platform renders them anyway.
 */
export const COVER_W = 1200
export const COVER_H = 630

export interface Palette {
  key: string
  hi: string
  deep: string
  lift: string
  on: string
}

/** FNV-1a. Small, dependency-free, and stable across Node versions — the art must not drift. */
function hash(seed: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

/** A deterministic 0..1 stream drawn from the seed hash — same seed, same sequence, forever. */
function rng(seed: string) {
  let s = hash(seed) || 1
  return () => {
    // xorshift32
    s ^= s << 13
    s >>>= 0
    s ^= s >>> 17
    s ^= s << 5
    s >>>= 0
    return s / 0xffffffff
  }
}

/** One closed contour ring: a polygon already resolved to viewBox coordinates. */
export interface Contour {
  points: string
  stroke: string
  opacity: number
}

export interface Cover {
  palette: Palette
  ground: string
  contours: Contour[]
}

const TAU = Math.PI * 2
const RINGS = 18
const RING_STEP = 30
/** Segments per ring. 64 is where the curve stops looking faceted at card size. */
const RING_RES = 64
/** Rings inside this index take the brighter highlight colour, giving the form a centre. */
const CORE_RINGS = 5

/* ---------------------------------------------------------------------------------------
 * BRIGHTNESS
 *
 * The first cut of this drew `key` rings from 0.13 opacity onto raw `palette.deep`, and was
 * close to illegible: measured mean luminance 0.06–0.13 with the outer rings at 3.0:1 against
 * the ground. Two things caused it — the ground was effectively black, and the widest rings
 * (the ones covering most of the frame) used the DARKER of the two tones at the LOWEST
 * opacity. Both are fixed below, and the constants are named so the floor stays visible to
 * anyone changing them.
 *
 * The palettes' `deep` values are page-background colours; they are meant to sit behind text,
 * not to be artwork. Lifting the ground toward `key` keeps each card in its venture's colour
 * world while getting it off black. Target band: mean luminance ~0.22–0.35 across every
 * palette, outer rings ≥3:1 against the ground.
 * ------------------------------------------------------------------------------------- */

/** How far the ground is lifted from `deep` toward `key`. 0 = the old near-black. */
const GROUND_LIFT = 0.45
/**
 * Minimum relative luminance for the finished ground.
 *
 * Lifting toward `key` alone is not enough for every palette: Memrey's key is a dark plum
 * (luminance 0.047), so its lifted ground landed at 0.024 while the other six sat at
 * 0.051–0.151 — one card noticeably murkier than the rest with nothing in the code saying
 * why. Rather than special-case a slug, any ground under this floor is nudged toward the
 * palette's own pale `lift` tone until it clears, which raises brightness without leaving
 * the venture's hue. New ventures are covered automatically.
 */
const GROUND_MIN_LUM = 0.05
/** Opacity of the outermost ring. The old 0.13 floor is what made the art vanish. */
const RING_OPACITY_MIN = 0.55
/** Opacity of the innermost ring. */
const RING_OPACITY_MAX = 0.95
const RING_WIDTH = 2.5

/** Blend two #rrggbb colours. t=0 → a, t=1 → b. */
function mixHex(a: string, b: string, t: number): string {
  const parse = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
  const [ar, ag, ab] = parse(a)
  const [br, bg, bb] = parse(b)
  const ch = (x: number, y: number) =>
    Math.round(Math.max(0, Math.min(255, x + (y - x) * t)))
      .toString(16)
      .padStart(2, '0')
  return `#${ch(ar, br)}${ch(ag, bg)}${ch(ab, bb)}`
}

/** WCAG relative luminance of an #rrggbb colour. */
function relLuminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** The card's background: lifted off `deep`, then floored so no palette renders as mud. */
function groundFor(palette: Palette): string {
  const base = mixHex(palette.deep, palette.key, GROUND_LIFT)
  if (relLuminance(base) >= GROUND_MIN_LUM) return base
  for (let t = 0.05; t <= 0.6; t += 0.05) {
    const lifted = mixHex(base, palette.lift, t)
    if (relLuminance(lifted) >= GROUND_MIN_LUM) return lifted
  }
  return mixHex(base, palette.lift, 0.6)
}

/**
 * Lay out the composition: nested offset contours, like a topographic slice.
 *
 * Chosen over the earlier colour-block-plus-rail arrangement, which read as heraldry — a flag
 * asking to be decoded for a meaning it did not carry. Contours are unambiguously TEXTURE:
 * decorative by intent, with nothing to interpret. They also stay quiet enough to sit behind
 * a headline, which the flat colour fields did not.
 *
 * Each ring is a circle perturbed by three sine harmonics whose phases come from the seed, so
 * the form is organic rather than concentric, stable for a given post, and different for every
 * other one. Rings are stretched 1.5× horizontally to suit the 1200×630 frame.
 */
export function buildCover(seed: string, palette: Palette): Cover {
  const rand = rng(seed)

  const cx = COVER_W * (0.3 + rand() * 0.4)
  const cy = COVER_H * (0.3 + rand() * 0.4)
  const phase = [rand() * TAU, rand() * TAU, rand() * TAU]

  const contours: Contour[] = []
  // Outermost first, so the brighter core rings paint last and stay crisp.
  for (let i = RINGS; i >= 1; i--) {
    const base = i * RING_STEP
    const pts: string[] = []
    for (let a = 0; a <= RING_RES; a++) {
      const t = (a / RING_RES) * TAU
      const r =
        base *
        (1 + 0.16 * Math.sin(t * 2 + phase[0]) + 0.09 * Math.sin(t * 3 + phase[1]) + 0.05 * Math.sin(t * 5 + phase[2]))
      pts.push(`${(cx + Math.cos(t) * r * 1.5).toFixed(1)},${(cy + Math.sin(t) * r).toFixed(1)}`)
    }
    contours.push({
      points: pts.join(' '),
      // Both tones are on the bright side of the palette — `key` is too close to the ground
      // to carry the outer rings, which cover most of the frame.
      stroke: i < CORE_RINGS ? palette.lift : palette.hi,
      // Rings fade outward so the form reads as depth rather than as a flat pattern, but the
      // fade bottoms out at RING_OPACITY_MIN rather than trailing off to nothing.
      opacity: RING_OPACITY_MIN + (RING_OPACITY_MAX - RING_OPACITY_MIN) * (1 - i / RINGS),
    })
  }

  return { palette, ground: groundFor(palette), contours }
}

/**
 * Serialize a cover to an SVG document. `inline` omits the xmlns and pixel dimensions so the
 * markup can be dropped straight into a page and sized by CSS; the raster path needs the
 * standalone form.
 *
 * vector-effect is deliberately NOT used for the stroke width: librsvg (sharp's SVG backend,
 * which rasterizes the social cards) ignores it, so the on-page and OG renderings would drift.
 */
export function coverSvg(cover: Cover, opts: { inline?: boolean } = {}): string {
  const { ground, contours } = cover

  const open = opts.inline
    ? `<svg viewBox="0 0 ${COVER_W} ${COVER_H}" preserveAspectRatio="xMidYMid slice" role="presentation" focusable="false">`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="${COVER_W}" height="${COVER_H}" viewBox="0 0 ${COVER_W} ${COVER_H}">`

  const rings = contours
    .map(
      (c) =>
        `<polygon points="${c.points}" fill="none" stroke="${c.stroke}" stroke-width="${RING_WIDTH}" opacity="${c.opacity.toFixed(3)}"/>`,
    )
    .join('')

  return open + `<rect width="${COVER_W}" height="${COVER_H}" fill="${ground}"/>` + rings + `</svg>`
}
