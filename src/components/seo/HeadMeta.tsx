import { component$ } from '@builder.io/qwik'
import type { SEOMetadata } from '~/types/seo'

/**
 * Presentational component documenting the SEO metadata structure.
 * Renders key SEO fields as HTML meta tags for clarity and validation.
 *
 * This component is used in the root document head to ensure all normalized
 * metadata from buildMetadata() is properly emitted to the browser.
 *
 * Note: The actual meta tag rendering in production is handled by Qwik City's
 * DocumentHead system (via useDocumentHead() in root.tsx). This component
 * serves as documentation of the metadata flow and can be used for debugging.
 */
export const HeadMeta = component$<{ metadata: SEOMetadata }>(
  ({ metadata }) => {
    return (
      <>
        {/* Primary title and description */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Canonical URL */}
        <meta name="canonical" content={metadata.canonical} />
        <link rel="canonical" href={metadata.canonical} />

        {/* Open Graph - required core tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content={metadata.type} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:site_name" content="Alden Gillespy" />
        <meta property="og:image" content={metadata.image.url} />

        {/* Open Graph - optional dimensions and alt */}
        {metadata.image.width && (
          <meta property="og:image:width" content={metadata.image.width.toString()} />
        )}
        {metadata.image.height && (
          <meta property="og:image:height" content={metadata.image.height.toString()} />
        )}
        {metadata.image.alt && <meta property="og:image:alt" content={metadata.image.alt} />}

        {/* Twitter Card - required core tags */}
        <meta name="twitter:card" content={metadata.twitterCard} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image.url} />

        {/* Article metadata (if applicable) */}
        {metadata.type === 'article' && metadata.publishedTime && (
          <meta property="article:published_time" content={metadata.publishedTime} />
        )}
        {metadata.type === 'article' && metadata.modifiedTime && (
          <meta property="article:modified_time" content={metadata.modifiedTime} />
        )}
      </>
    )
  }
)
