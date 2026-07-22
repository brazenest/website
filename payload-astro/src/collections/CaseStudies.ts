import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: { useAsTitle: 'venture' },
  access: { read: () => true },
  fields: [
    {
      name: 'venture',
      type: 'relationship',
      relationTo: 'ventures',
      required: true,
      admin: { description: 'Drives the page colour (BUILD.md §3d).' },
    },
    { name: 'role', type: 'text' },
    { name: 'timeline', type: 'text' },
    { name: 'status', type: 'text' },
    {
      name: 'hook',
      type: 'text',
      admin: { description: 'One line under the wordmark — the human stakes of the problem.' },
    },
    {
      name: 'stack',
      type: 'array',
      fields: [{ name: 'value', type: 'text' }],
    },
    {
      name: 'identityNote',
      type: 'text',
      admin: { description: 'e.g. "Daybreak — deep plum ground…"' },
    },
    {
      name: 'problem',
      type: 'group',
      fields: [
        { name: 'drop', type: 'text' },
        { name: 'body', type: 'richText' },
      ],
    },
    {
      name: 'built',
      type: 'array',
      fields: [
        { name: 'lead', type: 'text' },
        { name: 'body', type: 'text' },
      ],
    },
    {
      name: 'queryTrace',
      type: 'group',
      admin: { description: 'The centerpiece — query in, steps out, result, failure note.' },
      fields: [
        { name: 'query', type: 'text' },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'no', type: 'text' },
            { name: 'name', type: 'text' },
            { name: 'description', type: 'richText' },
            { name: 'io', type: 'textarea', admin: { description: 'Preserves line breaks.' } },
          ],
        },
        { name: 'resultCount', type: 'text' },
        { name: 'resultTime', type: 'text' },
        { name: 'failureNote', type: 'richText' },
      ],
    },
    {
      name: 'decisions',
      type: 'array',
      admin: { description: '"Three things I didn\'t build" log.' },
      fields: [
        { name: 'question', type: 'text' },
        { name: 'answer', type: 'richText' },
      ],
    },
    {
      name: 'screens',
      type: 'array',
      admin: { description: 'Hard-crop UI images.' },
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
    {
      name: 'results',
      type: 'array',
      admin: { description: 'e.g. 5 / 1 / <1s / 0' },
      fields: [
        { name: 'value', type: 'text' },
        { name: 'label', type: 'text' },
      ],
    },
    { name: 'resultsCaveat', type: 'text' },
  ],
}
