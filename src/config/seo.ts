import type { SEOPresetMap } from '~/types/seo'

/**
 * Route-level SEO metadata presets for all implemented pages.
 * Central source of truth for page titles, descriptions, and imagery.
 *
 * Each preset:
 * - Has a unique, descriptive title reflecting page purpose
 * - Includes a search-friendly description specific to page content
 * - Specifies OG type (defaults to 'website' if omitted)
 * - Uses optional image overrides where semantically distinct
 *
 * Pathname is injected per-route when building metadata with buildMetadata().
 */
export const seoPresets: SEOPresetMap = {
	home: {
		title: 'Full-Stack Engineer & Film Producer',
		description:
			"Explore Alden Gillespy's work spanning software architecture, maintainable systems, and visual storytelling.",
		type: 'website',
	},
	about: {
		title: 'About My Approach',
		description:
			'Learn about my philosophy on thoughtful digital craftsmanship, the intersection of design and engineering, and how I build experiences that last.',
		type: 'website',
	},
	resume: {
		title: 'Resume & Professional Background',
		description:
			'Senior Software Engineer and Production Storyteller. Full technical background, experience across startups and agencies, and core competencies in systems design.',
		type: 'website',
	},
	contact: {
		title: 'Get In Touch',
		description:
			'Inquire about engineering work, production projects, or focused collaborations. Start with email for project briefs and role discussions.',
		type: 'website',
	},
	blog: {
		title: 'Writing on Systems, Stories & Craft',
		description:
			'Essays and process notes on architecture decisions, production craft, editorial judgment, and where engineering and storytelling intersect.',
		type: 'website',
	},
	engineering: {
		title: 'Engineering Work & Case Studies',
		description:
			'Selected software projects showcasing system design, implementation tradeoffs, and long-term maintainability across platforms and teams.',
		type: 'website',
	},
	production: {
		title: 'Production Projects & Visual Work',
		description:
			'Film, photo, and campaign work demonstrating framing, coverage, pacing, tone, and the craft behind visual storytelling.',
		type: 'website',
	},
}
