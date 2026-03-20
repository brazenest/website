import type { SEOInput, SEOImage, SEOMetadata } from '~/types/seo'
import { siteConfig } from '~/config/site'

/**
 * Normalize a string or SEOImage into a full SEOImage object.
 */
function normalizeImage(image: SEOImage | string): SEOImage {
  if (typeof image === 'string') {
    return {
      url: image,
    }
  }
  return image
}

/**
 * Build absolute URL from pathname.
 */
function buildAbsoluteUrl(pathname: string): string {
  const cleanPathname = pathname.startsWith('/')
    ? pathname
    : `/${pathname}`
  return `${siteConfig.siteUrl}${cleanPathname}`.replace(/\/$/, '') || siteConfig.siteUrl
}

function ensureAbsoluteUrl(urlOrPath: string): string {
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    return urlOrPath
  }

  return buildAbsoluteUrl(urlOrPath)
}

/**
 * Ensure image URLs are absolute.
 */
function ensureAbsoluteImageUrl(image: SEOImage): SEOImage {
  let url = image.url
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `${siteConfig.siteUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
  return {
    ...image,
    url,
  }
}

/**
 * Build complete, normalized SEO metadata from input and defaults.
 *
 * Responsibilities:
 * - Merge page-level input with site defaults
 * - Apply title templating
 * - Ensure absolute URLs
 * - Normalize images into full OG format
 * - Derive canonical URL if not provided
 * - Provide fallbacks for all fields
 *
 * @param input Page-level SEO customizations
 * @returns Complete, normalized metadata ready for rendering
 */
export function buildMetadata(input: SEOInput): SEOMetadata {
  // Build absolute URL from pathname
  const url = buildAbsoluteUrl(input.pathname)

  // Determine title
  const title = input.title
    ? siteConfig.titleTemplate(input.title)
    : siteConfig.defaultTitle

  // Determine description
  const description = input.description ?? siteConfig.defaultDescription

  // Determine type
  const type = input.type ?? 'website'

  // Determine twitter card
  const twitterCard = input.twitterCard ?? 'summary_large_image'

  // Determine canonical URL
  const canonical = input.canonical ? ensureAbsoluteUrl(input.canonical) : url

  // Collect and normalize images
  const imagesList: SEOImage[] = []

  // Add single image if provided
  if (input.image) {
    imagesList.push(normalizeImage(input.image))
  }

  // Add multiple images if provided
  if (input.images && input.images.length > 0) {
    imagesList.push(
      ...input.images.map(normalizeImage)
    )
  }

  // Add default image if no images provided
  if (imagesList.length === 0) {
    imagesList.push(siteConfig.defaultOGImage)
  }

  // Ensure all image URLs are absolute
  const images = imagesList.map(ensureAbsoluteImageUrl)

  // Primary image is the first one
  const image = images[0]

  return {
    title,
    description,
    url,
    canonical,
    type,
    image,
    images,
    twitterCard,
    publishedTime: input.publishedTime,
    modifiedTime: input.modifiedTime,
  }
}
