import type { BlogArticleSEOFields, SEOInput, SEOPresetMap, SEOPageKey } from '~/types/seo'

/**
 * Route pathname mapping for canonical pages.
 * Ties SEO preset keys to their corresponding route paths.
 */
export const routePathnames: Record<SEOPageKey, string> = {
	home: '/',
	about: '/about',
	resume: '/resume',
	contact: '/contact',
	packages: '/packages',
	blog: '/blog',
	engineering: '/engineering',
	production: '/production',
}

/**
 * Route-level SEO metadata presets for all implemented pages.
 * Central source of truth for page titles, descriptions, and imagery.
 *
 * Each preset:
 * - Has a unique, descriptive title reflecting page purpose
 * - Includes a search-friendly description specific to page content
 * - Specifies OG type (defaults to 'website' if omitted)
 * - Uses optional image overrides where semantically distinct
 * - Includes sitemap configuration (includeSitemap, changefreq, priority)
 *
 * Pathname is injected per-route when building metadata with buildMetadata().
 */
export const seoPresets: SEOPresetMap = {
	home: {
		title: 'Full-Stack Engineer & Film Producer',
		description:
			"Explore Alden Gillespy's work spanning software architecture, maintainable systems, and visual storytelling.",
		type: 'website',
		includeSitemap: true,
		changefreq: 'weekly',
		priority: 1.0,
	},
	about: {
		title: 'About My Approach',
		description:
			'Learn about my philosophy on thoughtful digital craftsmanship, the intersection of design and engineering, and how I build experiences that last.',
		type: 'website',
		includeSitemap: true,
		changefreq: 'monthly',
		priority: 0.8,
	},
	resume: {
		title: 'Resume & Professional Background',
		description:
			'Senior Software Engineer and Production Storyteller. Full technical background, experience across startups and agencies, and core competencies in systems design.',
		type: 'website',
		includeSitemap: true,
		changefreq: 'monthly',
		priority: 0.8,
	},
	contact: {
		title: 'Get In Touch',
		description:
			'Inquire about engineering work, production projects, or focused collaborations. Start with email for project briefs and role discussions.',
		type: 'website',
		includeSitemap: true,
		changefreq: 'yearly',
		priority: 0.7,
	},
	blog: {
		title: 'Writing on Systems, Stories & Craft',
		description:
			'Essays and process notes on architecture decisions, production craft, editorial judgment, and where engineering and storytelling intersect.',
		type: 'website',
		includeSitemap: true,
		changefreq: 'weekly',
		priority: 0.8,
	},
	engineering: {
		title: 'Engineering Work & Case Studies',
		description:
			'Selected software projects showcasing system design, implementation tradeoffs, and long-term maintainability across platforms and teams.',
		type: 'website',
		includeSitemap: true,
		changefreq: 'monthly',
		priority: 0.9,
	},
	production: {
		title: 'Production Projects & Visual Work',
		description:
			'Film, photo, and campaign work demonstrating framing, coverage, pacing, tone, and the craft behind visual storytelling.',
		type: 'website',
		includeSitemap: true,
		changefreq: 'monthly',
		priority: 0.9,
	},
	packages: {
		title: 'Website Packages for Professionals',
		description:
			'Productized website solutions designed for self-marketed professionals. Foundation, Growth, and Authority tiers combining performance, visual craft, and conversion.',
		type: 'website',
		includeSitemap: true,
		changefreq: 'monthly',
		priority: 0.8,
	},
}

export const blogArticleSeoFallback = {
	title: 'Blog Post',
	description: 'Writing by Alden Gillespy across engineering and production practice.',
	type: 'article',
} as const satisfies Omit<SEOInput, 'pathname'>

export function buildBlogArticleSEOInput(post: BlogArticleSEOFields): SEOInput {
	return {
		...blogArticleSeoFallback,
		title: post.title,
		description: post.summary,
		pathname: `/blog/${post.slug}`,
		image: post.coverImageUrl
			? {
				url: post.coverImageUrl,
				...(post.coverImageAlt ? { alt: post.coverImageAlt } : {}),
			}
			: undefined,
		publishedTime: post.publishedAt ?? undefined,
		modifiedTime: post.updatedAt ?? undefined,
	}
}
