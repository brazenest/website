import type {
  PersonStructuredData,
  WebSiteStructuredData,
  ProjectStructuredDataInput,
  ArticleStructuredDataInput,
  CreativeWorkStructuredData,
  ArticleStructuredData,
} from '~/types/seo'
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

/**
 * Build a valid JSON-LD CreativeWork schema for a project/portfolio page.
 *
 * @param input Project-level metadata
 * @returns Complete CreativeWork schema object
 */
export function buildProjectStructuredData(input: ProjectStructuredDataInput): CreativeWorkStructuredData {
  const author = {
    '@type': 'Person',
    name: input.authorName || siteConfig.personFullName || siteConfig.siteName,
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: input.title,
    description: input.description,
    url: ensureAbsoluteUrl(input.url),
    ...(input.image && {
      image: ensureAbsoluteUrl(input.image),
    }),
    ...(input.datePublished && {
      datePublished: input.datePublished,
    }),
    ...(input.dateModified && {
      dateModified: input.dateModified,
    }),
    ...(input.keywords && input.keywords.length > 0 && {
      keywords: input.keywords.join(', '),
    }),
    ...(input.section && {
      articleSection: input.section,
    }),
    ...(input.excerpt && {
      about: input.excerpt,
    }),
    author,
  }
}

/**
 * Build a valid JSON-LD Article schema for a blog post or longform content.
 *
 * @param input Article-level metadata
 * @returns Complete Article schema object
 */
export function buildArticleStructuredData(input: ArticleStructuredDataInput): ArticleStructuredData {
  const author = {
    '@type': 'Person',
    name: input.authorName || siteConfig.personFullName || siteConfig.siteName,
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: ensureAbsoluteUrl(input.url),
    ...(input.image && {
      image: ensureAbsoluteUrl(input.image),
    }),
    datePublished: input.datePublished,
    ...(input.dateModified && {
      dateModified: input.dateModified,
    }),
    ...(input.keywords && input.keywords.length > 0 && {
      keywords: input.keywords.join(', '),
    }),
    ...(input.articleBody && {
      articleBody: input.articleBody,
    }),
    author,
  }
}
