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
  ],
}
