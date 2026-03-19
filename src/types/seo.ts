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
  twitterHandle?: string	// Structured data identity fields
  personFullName?: string
  personDescription?: string
  personJobTitle?: string
  personImage?: string
  personSameAs?: string[]
}
/**
 * Unique page identifier for route-aware SEO presets.
 * Maps known pages to their canonical metadata.
 */
export type SEOPageKey =
  | 'home'
  | 'about'
  | 'resume'
  | 'contact'
  | 'blog'
  | 'engineering'
  | 'production'

/**
 * Preset metadata for a specific page.
 * Omits `pathname` which is provided per-route when building metadata.
 */
export type SEOPreset = Omit<SEOInput, 'pathname'>

/**
 * Typed mapping from page identifiers to their metadata presets.
 * Central source of truth for all route-level SEO text and imagery.
 */
export type SEOPresetMap = Record<SEOPageKey, SEOPreset>

/**
 * Generic structured data value for JSON-LD.
 * Can be a string, number, boolean, or object (including arrays and nested structures).
 */
export type StructuredDataValue =
  | string
  | number
  | boolean
  | null
  | StructuredDataObject
  | StructuredDataValue[]

/**
 * Structured data object compatible with JSON-LD format.
 */
export type StructuredDataObject = {
  [key: string]: StructuredDataValue
}

/**
 * JSON-LD Person schema fields for the site author/creator.
 */
export type PersonStructuredData = StructuredDataObject & {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string
  url: string
  description?: string
  jobTitle?: string
  image?: string
  sameAs?: string[]
}

/**
 * JSON-LD WebSite schema for the site itself.
 */
export type WebSiteStructuredData = StructuredDataObject & {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  description?: string
  image?: string
}

/**
 * Input for building a CreativeWork (project) schema.
 * Flexible enough for portfolio items, case studies, and project showcases.
 */
export type ProjectStructuredDataInput = {
  title: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  keywords?: string[]
  section?: string
  excerpt?: string
  authorName?: string
}

/**
 * Input for building an Article schema.
 * Covers blog posts, essays, and longform content.
 */
export type ArticleStructuredDataInput = {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  keywords?: string[]
  excerpt?: string
  authorName?: string
  articleBody?: string
}

/**
 * JSON-LD CreativeWork schema for portfolio/project pages.
 */
export type CreativeWorkStructuredData = StructuredDataObject & {
  '@context': 'https://schema.org'
  '@type': 'CreativeWork'
  name: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  keywords?: string
  articleSection?: string
  about?: string
  author?: StructuredDataObject
}

/**
 * JSON-LD Article schema for blog posts and longform content.
 */
export type ArticleStructuredData = StructuredDataObject & {
  '@context': 'https://schema.org'
  '@type': 'Article'
  headline: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  keywords?: string
  articleBody?: string
  author?: StructuredDataObject
}