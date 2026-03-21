import type { SiteConfig } from '~/types/seo'

const releaseDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

/**
 * Update this object for each production release.
 *
 * - `version` should match the public release label you want to show on the site.
 * - `releasedOn` must stay in ISO 8601 `YYYY-MM-DD` form so it can be reused in metadata.
 */
export const releaseInfo = {
  version: '3.0.0',
  releasedOn: '2026-03-21',
} as const

export function formatReleaseDate(isoDate: string): string {
  return releaseDateFormatter.format(new Date(`${isoDate}T00:00:00.000Z`))
}

export const releaseLabel = `v${releaseInfo.version}`
export const releaseDateLabel = formatReleaseDate(releaseInfo.releasedOn)

/**
 * Global site configuration.
 * Single source of truth for all metadata defaults across the site.
 */
export const siteConfig: SiteConfig = {
  siteName: 'Alden Gillespy',
  siteUrl: 'https://aldengillespy.com', // Production domain
  defaultTitle:
    'Alden Gillespy — Full-Stack Engineer & Film Producer',
  titleTemplate: (title: string) => `${title} — Alden Gillespy`,
  defaultDescription:
    'Full-stack engineer and film producer exploring the intersection of technology and storytelling.',
  defaultOGImage: {
    url: '/assets/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Alden Gillespy',
    type: 'image/jpeg',
  },
  twitterHandle: '@aldengillespy',

  // Canonical entity identity — source of truth for person representation across site
  personFullName: 'Alden Gillespy',
  personGivenName: 'Alden',
  personFamilyName: 'Gillespy',
  canonicalIdentity: 'Alden Gillespy is a software engineer and video producer exploring the intersection of technology and storytelling.',
  canonicalRole: 'Full-stack software engineer and video producer',
  personDescription:
    'Full-stack engineer and visual storyteller exploring the intersection of technology and craft.',
  personJobTitle: 'Senior Software Engineer and Film Producer',
  personImage: '/assets/og-image.jpg',
  personSameAs: [
    'https://www.linkedin.com/in/alden-gillespy/',
    'https://github.com/brazenest',
  ],
}
