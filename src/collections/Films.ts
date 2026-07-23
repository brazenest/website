import type { CollectionConfig } from 'payload'

export const Films: CollectionConfig = {
  slug: 'films',
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  fields: [
    {
      name: 'venture',
      type: 'relationship',
      relationTo: 'ventures',
      required: true,
      admin: { description: 'Drives the page colour (BUILD.md §3d).' },
    },
    { name: 'title', type: 'text', required: true },
    { name: 'logline', type: 'text' },
    { name: 'year', type: 'text' },
    { name: 'runtime', type: 'text' },
    { name: 'camera', type: 'text' },
    {
      name: 'youtubeId',
      type: 'text',
      admin: { description: 'Replaces self-hosted video entirely; rendered as a click-to-load facade.' },
    },
    {
      name: 'credits',
      type: 'array',
      fields: [
        { name: 'role', type: 'text' },
        { name: 'name', type: 'text' },
      ],
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'gradeGraded', type: 'upload', relationTo: 'media' },
    { name: 'gradeRaw', type: 'upload', relationTo: 'media' },
    {
      name: 'stills',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    {
      name: 'services',
      type: 'array',
      admin: { description: '"What I make"' },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'note', type: 'text' },
      ],
    },
  ],
}
