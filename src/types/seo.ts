/**
 * SEO Image representation for Open Graph and other meta tags.
 */
export type SEOImage = {
  url: string
  width?: number
  height?: number
  alt?: string
  type?: string
}

/**
 * Input for the metadata builder function.
 * Page-level customizations that override site defaults.
 */
export type SEOInput = {
  title?: string
  description?: string
  pathname: string
  type?: 'website' | 'article'
  image?: SEOImage | string
  images?: (SEOImage | string)[]
  publishedTime?: string
  modifiedTime?: string
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player'
  canonical?: string
}

/**
 * Complete, normalized SEO metadata for a page.
 * All fields are guaranteed to be present with sensible defaults.
 */
export type SEOMetadata = {
  title: string
  description: string
  url: string
  canonical: string
  type: 'website' | 'article'
  image: SEOImage
  images: SEOImage[]
  publishedTime?: string
  modifiedTime?: string
  twitterCard: 'summary' | 'summary_large_image' | 'app' | 'player'
}

/**
 * Global site configuration.
 * Single source of truth for all metadata defaults.
 */
export type SiteConfig = {
  siteName: string
  siteUrl: string
  defaultTitle: string
  titleTemplate: (title: string) => string
  defaultDescription: string
  defaultOGImage: SEOImage
  twitterHandle?: string
}
