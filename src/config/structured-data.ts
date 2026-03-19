import type { StructuredDataPresetMap } from '~/types/seo'

/**
 * Route-level structured data presets for pages that should emit JSON-LD.
 *
 * Each preset declares:
 * - The schema kind (project, article, or none)
 * - Core metadata (title, description, image)
 * - Optional metadata (keywords, dates, section)
 *
 * For dynamic routes, presets serve as templates; actual values are merged
 * at the route level or during route rendering.
 *
 * For static routes, presets include the full pathname.
 */
export const structuredDataPresets: StructuredDataPresetMap = {
  blog: {
    kind: 'none',
    pathname: '/blog',
    title: 'Writing on Systems, Stories & Craft',
    description:
      'Essays and process notes on architecture decisions, production craft, editorial judgment, and where engineering and storytelling intersect.',
  },

  'blog-article': {
    kind: 'article',
    title: '[Article Title]',
    description: '[Article summary/excerpt]',
    datePublished: '[ISO date string]',
    keywords: ['engineering', 'production', 'craft'],
    excerpt: '[Brief excerpt for open graph]',
  },

  engineering: {
    kind: 'none',
    pathname: '/engineering',
    title: 'Engineering Work & Case Studies',
    description:
      'Selected software projects showcasing system design, implementation tradeoffs, and long-term maintainability across platforms and teams.',
  },

  'engineering-project': {
    kind: 'project',
    title: '[Project Name]',
    description: '[Project description covering problem and solution]',
    section: 'Engineering',
    keywords: ['architecture', 'systems', 'design'],
    excerpt: '[Key architectural insight or highlight]',
  },

  production: {
    kind: 'none',
    pathname: '/production',
    title: 'Production Projects & Visual Work',
    description:
      'Film, photo, and campaign work demonstrating framing, coverage, pacing, tone, and the craft behind visual storytelling.',
  },

  'production-project': {
    kind: 'project',
    title: '[Project Name]',
    description: '[Project description covering creative challenge and approach]',
    section: 'Production',
    keywords: ['filmmaking', 'visual', 'craft'],
    excerpt: '[Key production insight or creative decision]',
  },
}
