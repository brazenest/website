import type { SiteConfig } from '~/types/seo'

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
  
  // Structured data identity fields
  personFullName: 'Alden Gillespy',
  personDescription:
    'Full-stack engineer and visual storyteller exploring the intersection of technology and craft.',
  personJobTitle: 'Senior Software Engineer and Film Producer',
  personImage: '/assets/og-image.jpg',
  personSameAs: [
    'https://www.linkedin.com/in/alden-gillespy/',
    'https://github.com/brazenest',
  ],
}
