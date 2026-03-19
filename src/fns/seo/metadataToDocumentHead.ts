import type { DocumentHead } from '@builder.io/qwik-city'
import type { SEOMetadata } from '~/types/seo'

/**
 * Convert normalized SEO metadata into Qwik DocumentHead format.
 * Generates meta tags for title, description, canonical URL, OG, and Twitter.
 *
 * @param metadata Complete, normalized SEO metadata from buildMetadata()
 * @returns DocumentHead object ready for Qwik route export
 */
export function metadataToDocumentHead(metadata: SEOMetadata): DocumentHead {
  const meta = [
    {
      name: 'description',
      content: metadata.description,
    },
    {
      name: 'canonical',
      content: metadata.canonical,
    },
    // Open Graph
    {
      property: 'og:title',
      content: metadata.title,
    },
    {
      property: 'og:description',
      content: metadata.description,
    },
    {
      property: 'og:url',
      content: metadata.url,
    },
    {
      property: 'og:type',
      content: metadata.type,
    },
    {
      property: 'og:image',
      content: metadata.image.url,
    },
    ...(metadata.image.width
      ? [
        {
          property: 'og:image:width',
          content: metadata.image.width.toString(),
        },
      ]
      : []),
    ...(metadata.image.height
      ? [
        {
          property: 'og:image:height',
          content: metadata.image.height.toString(),
        },
      ]
      : []),
    ...(metadata.image.alt
      ? [
        {
          property: 'og:image:alt',
          content: metadata.image.alt,
        },
      ]
      : []),
    // Twitter
    {
      name: 'twitter:card',
      content: metadata.twitterCard,
    },
    {
      name: 'twitter:title',
      content: metadata.title,
    },
    {
      name: 'twitter:description',
      content: metadata.description,
    },
    {
      name: 'twitter:image',
      content: metadata.image.url,
    },
    // Article-specific
    ...(metadata.type === 'article' && metadata.publishedTime
      ? [
        {
          property: 'article:published_time',
          content: metadata.publishedTime,
        },
      ]
      : []),
    ...(metadata.type === 'article' && metadata.modifiedTime
      ? [
        {
          property: 'article:modified_time',
          content: metadata.modifiedTime,
        },
      ]
      : []),
  ]

  // Filter out undefined values and cast to proper types
  const cleanedMeta = (
    meta as Array<Record<string, any>>
  ).filter((m) => m.content !== undefined && m.content !== null)

  return {
    title: metadata.title,
    meta: cleanedMeta as any[],
  }
}
