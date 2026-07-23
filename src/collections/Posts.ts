import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'publishedAt', type: 'date' },
    { name: 'excerpt', type: 'text' },
    {
      name: 'relatedVenture',
      type: 'relationship',
      relationTo: 'ventures',
      admin: {
        description:
          'Load-bearing: how a post inherits its venture\'s colour (BUILD.md §3d). Template itself is deferred design (§7).',
      },
    },
    { name: 'body', type: 'richText' },
  ],
}
