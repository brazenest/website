import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Payload } from 'payload'

/**
 * Version-controlled source images for seed-owned content (film frames, product screens).
 * They live in src/seed/assets — NOT /media, which is Payload's gitignored upload dir — so a
 * fresh clone can rebuild the media library from the repo alone.
 */
const ASSETS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'assets')

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
}

/**
 * Upload `assets/<relPath>` into the media collection, keyed by its basename. Idempotent: an
 * existing doc with that filename is reused (only its alt text is refreshed), so relationships
 * pointing at it survive a re-seed and the library never fills with duplicates.
 *
 * Do NOT re-send the file on update: Payload sees the name already on disk and saves the new
 * upload as "<name>-1", renaming the doc — the next seed then can't find it and creates a
 * duplicate. To replace an image, give the asset a new filename.
 */
export async function upsertSeedMedia(payload: Payload, relPath: string, alt: string): Promise<number | string> {
  const name = path.basename(relPath)
  const mimetype = MIME[path.extname(name).toLowerCase()]
  if (!mimetype) throw new Error(`[media] unsupported file type: ${relPath}`)

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: name } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    const doc = existing.docs[0]
    if (doc.alt !== alt) await payload.update({ collection: 'media', id: doc.id, data: { alt } })
    return doc.id
  }

  const data = await fs.readFile(path.join(ASSETS_DIR, relPath))
  const file = { data, mimetype, name, size: data.length }
  const created = await payload.create({ collection: 'media', data: { alt }, file })
  payload.logger.info(`[media] uploaded ${name}`)
  return created.id
}

/** Upload several and return their ids as an upload-array field value ([{image: id}]). */
export async function seedImageArray(
  payload: Payload,
  items: { file: string; alt: string }[],
): Promise<{ image: number | string }[]> {
  const out: { image: number | string }[] = []
  for (const it of items) out.push({ image: await upsertSeedMedia(payload, it.file, it.alt) })
  return out
}
