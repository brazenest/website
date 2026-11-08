/**
 * Resolves a MediaRef from the export (src/data/*.json) to the bundled image module in
 * src/assets/media, so pages can hand it to astro:assets' <Image>.
 *
 * Astro needs a STATIC glob to bundle the uploads, and the export copies every referenced
 * upload into that folder, so one glob here serves every page. A ref whose file is missing
 * (export run against a different media dir, file deleted by hand) resolves to null — the
 * caller decides whether that means "omit" or "fall back".
 */
import type { MediaRef } from '../data/types'

const uploads = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/media/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true },
)

export function mediaImage(ref: MediaRef | null | undefined): ImageMetadata | null {
  if (!ref?.filename) return null
  return uploads[`../assets/media/${ref.filename}`]?.default ?? null
}

/** The refs that actually resolve to a bundled file, in order. */
export function resolvedImages(refs: (MediaRef | null)[]): { ref: MediaRef; image: ImageMetadata }[] {
  return refs
    .map((ref) => (ref ? { ref, image: mediaImage(ref) } : null))
    .filter((x): x is { ref: MediaRef; image: ImageMetadata } => !!x?.image)
}
