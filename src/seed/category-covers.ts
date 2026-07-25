import sharp from 'sharp'
import type { Payload } from 'payload'

// Imported across the package boundary on purpose: this is the SAME generator the Astro
// front-end and the OG endpoint use, so the image an author sees in the media library is
// byte-for-byte the one that ships. coverArt.ts is dependency-free precisely so this import
// is safe before `pnpm run export` has written any JSON.
import { buildCover, coverSvg, COVER_W, COVER_H } from '../../astro/src/lib/coverArt'
import type { Palette } from '../../astro/src/lib/coverArt'

/**
 * The four blog categories and the venture whose colour world each borrows.
 *
 * Categories map onto the zone that owns them — engineering work is Andacity blue, cinematic
 * is Shadowcat amber, process is Rotavox green, and everything else takes the house slate.
 * This is the seed for the `blog-categories` global; once seeded, the mapping is authorable
 * in the admin and THAT is the source of truth (the export reads Payload, not this file).
 */
export const CATEGORY_SEED = [
  { value: 'engineering', label: 'Engineering', venture: 'andacity' },
  { value: 'cinematic', label: 'Cinematic', venture: 'shadowcat' },
  { value: 'process', label: 'Process', venture: 'rotavox' },
  { value: 'other', label: 'Other Topics', venture: 'house' },
] as const

/** Filename for a category's generated default. Stable, so re-seeding updates in place. */
const filenameFor = (value: string) => `blog-cover-${value}.png`

/**
 * Render the four category covers and upload them into the media library, returning
 * {categoryValue: mediaId}.
 *
 * Idempotent: an existing upload with the same filename is UPDATED rather than duplicated,
 * so re-running the seed refreshes the art without orphaning documents or breaking the
 * relationships that point at them. If an author has replaced a cover with a photograph, the
 * media doc is still keyed by that filename — so a re-seed would overwrite it. That is why
 * the caller only wires these in when the category row has no cover yet.
 */
export async function seedCategoryCovers(
  payload: Payload,
  palettes: Record<string, Palette>,
): Promise<Record<string, number | string>> {
  const ids: Record<string, number | string> = {}

  for (const cat of CATEGORY_SEED) {
    const palette = palettes[cat.venture]
    if (!palette) {
      payload.logger.warn(`[covers] no venture "${cat.venture}" for category "${cat.value}" — skipping`)
      continue
    }

    // Seeded by CATEGORY, not by post slug: the whole point is that one image represents the
    // category, so every post in it shares the same cover unless it overrides.
    const svg = coverSvg(buildCover(cat.value, palette))
    const png = await sharp(Buffer.from(svg)).png().toBuffer()
    const filename = filenameFor(cat.value)

    const data = {
      alt: `${cat.label} — generated contour cover art`,
    }
    const file = {
      data: png,
      mimetype: 'image/png',
      name: filename,
      size: png.length,
    }

    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      const updated = await payload.update({ collection: 'media', id: existing.docs[0].id, data, file })
      ids[cat.value] = updated.id
      payload.logger.info(`[covers] refreshed ${filename} (${COVER_W}x${COVER_H})`)
    } else {
      const created = await payload.create({ collection: 'media', data, file })
      ids[cat.value] = created.id
      payload.logger.info(`[covers] created ${filename} (${COVER_W}x${COVER_H})`)
    }
  }

  return ids
}
