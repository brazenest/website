/**
 * DEPRECATED: Use buildTitle() from this file only.
 * Centralized metadata building moved to:
 * - ~/fns/seo/buildMetadata.ts
 * - ~/fns/seo/buildStructuredData.ts
 * - ~/fns/seo/metadataToDocumentHead.ts
 */

export type SEOProps = {
	title: string
	description: string
}

export const buildTitle = (title: string) => {
	return `${title} — Alden Gillespy`
}