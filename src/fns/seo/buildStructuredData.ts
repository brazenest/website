import type { PersonStructuredData, WebSiteStructuredData } from '~/types/seo'
import { siteConfig } from '~/config/site'

/**
 * Ensure an image URL is absolute.
 */
function ensureAbsoluteUrl(url: string): string {
	if (!url.startsWith('http://') && !url.startsWith('https://')) {
		return `${siteConfig.siteUrl}${url.startsWith('/') ? '' : '/'}${url}`
	}
	return url
}

/**
 * Build a valid JSON-LD Person schema for the site author/creator.
 *
 * @returns Complete Person schema object
 */
export function buildPersonStructuredData(): PersonStructuredData {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: siteConfig.personFullName || siteConfig.siteName,
		url: siteConfig.siteUrl,
		...(siteConfig.personDescription && {
			description: siteConfig.personDescription,
		}),
		...(siteConfig.personJobTitle && {
			jobTitle: siteConfig.personJobTitle,
		}),
		...(siteConfig.personImage && {
			image: ensureAbsoluteUrl(siteConfig.personImage),
		}),
		...(siteConfig.personSameAs && siteConfig.personSameAs.length > 0 && {
			sameAs: siteConfig.personSameAs,
		}),
	}
}

/**
 * Build a valid JSON-LD WebSite schema for the site.
 *
 * @returns Complete WebSite schema object
 */
export function buildWebSiteStructuredData(): WebSiteStructuredData {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteConfig.siteName,
		url: siteConfig.siteUrl,
		...(siteConfig.defaultDescription && {
			description: siteConfig.defaultDescription,
		}),
		...(siteConfig.defaultOGImage && {
			image: ensureAbsoluteUrl(siteConfig.defaultOGImage.url),
		}),
	}
}
