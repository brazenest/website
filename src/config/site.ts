import type { SiteConfig } from '~/types/seo'

/**
 * Global site configuration.
 * Single source of truth for all metadata defaults across the site.
 */
export const siteConfig: SiteConfig = {
  siteName: 'Alden Gillespy',
  siteUrl: 'https://aldengillespy.com', // Placeholder production domain
  defaultTitle:
    'Alden Gillespy — Full-Stack Engineer & Film Producer',
  titleTemplate: (title: string) => `${title} — Alden Gillespy`,
  defaultDescription:
    'Full-stack engineer and film producer exploring the intersection of technology and storytelling.',
  defaultOGImage: {
    url: '/assets/og-image.jpg', // Relative path will be made absolute in buildMetadata
    width: 1200,
    height: 630,
    alt: 'Alden Gillespy',
    type: 'image/jpeg',
  },
  twitterHandle: '@aldengillespy', // Remove @ if not needed for meta tags
}
