import type { DocumentHead } from '@builder.io/qwik-city'
import { buildMetadata } from './buildMetadata'
import { metadataToDocumentHead } from './metadataToDocumentHead'
import { seoPresets } from '~/config/seo'

/**
 * Pre-computed DocumentHead metadata for static routes.
 * These routes have deterministic, compile-time-knowable metadata.
 * Pre-computing eliminates unnecessary runtime function calls during SSR.
 */

export const staticHeads = {
  home: metadataToDocumentHead(
    buildMetadata({
      ...seoPresets.home,
      pathname: '/',
    })
  ),

  about: metadataToDocumentHead(
    buildMetadata({
      ...seoPresets.about,
      pathname: '/about',
    })
  ),

  resume: metadataToDocumentHead(
    buildMetadata({
      ...seoPresets.resume,
      pathname: '/resume',
    })
  ),

  contact: metadataToDocumentHead(
    buildMetadata({
      ...seoPresets.contact,
      pathname: '/contact',
    })
  ),

  blog: metadataToDocumentHead(
    buildMetadata({
      ...seoPresets.blog,
      pathname: '/blog',
    })
  ),

  engineering: metadataToDocumentHead(
    buildMetadata({
      ...seoPresets.engineering,
      pathname: '/engineering',
    })
  ),

  production: metadataToDocumentHead(
    buildMetadata({
      ...seoPresets.production,
      pathname: '/production',
    })
  ),
} as const satisfies Record<string, DocumentHead>
