import type { GlobalConfig } from 'payload'

export const SiteMeta: GlobalConfig = {
  slug: 'site-meta',
  access: { read: () => true },
  fields: [
    {
      name: 'proofNumbers',
      type: 'array',
      admin: { description: '⚠ author to verify — BUILD.md §8.1' },
      fields: [
        { name: 'value', type: 'text' },
        { name: 'label', type: 'text' },
      ],
    },
    { name: 'contactEmail', type: 'text' },
    { name: 'ctaText', type: 'text' },
    {
      name: 'nav',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'social',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      admin: {
        description:
          'Site-wide search/social defaults. Every page can override these; anything left blank here falls back to the values hard-coded in astro/src/lib/seo.ts.',
      },
      fields: [
        {
          name: 'titleSuffix',
          type: 'text',
          admin: {
            description:
              'Appended to every page title, e.g. " — Alden Gillespy". Pages whose title already ends with it are left alone, so it is never doubled.',
          },
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          admin: { description: 'Used when a page supplies no description of its own. Aim for 150–160 characters.' },
        },
        {
          name: 'defaultKeywords',
          type: 'array',
          admin: {
            description:
              'Site-wide terms, merged into every page\'s own list. NOTE: Google and Bing have ignored <meta name="keywords"> for years — these are carried into the JSON-LD `keywords` property too, which does get read.',
          },
          fields: [{ name: 'term', type: 'text', required: true }],
        },
        {
          name: 'twitterSite',
          type: 'text',
          admin: { description: 'X/Twitter handle including the @, e.g. "@aldengillespy". Leave blank to omit the tag.' },
        },
        {
          name: 'jobTitle',
          type: 'text',
          admin: { description: 'Used in the Person structured data, e.g. "Software Engineer & Video Producer".' },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Site-wide social card (1200×630). Leave blank to use the generated house-palette card at /og/site.png.',
          },
        },
      ],
    },
  ],
}
