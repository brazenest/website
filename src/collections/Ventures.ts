import type { CollectionConfig } from 'payload'

import { contrastRatio } from '../lib/contrast'

export const Ventures: CollectionConfig = {
  slug: 'ventures',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'zone', 'order', 'proposed'],
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    {
      name: 'zone',
      type: 'select',
      required: true,
      options: [
        { label: 'Neutral', value: 'neutral' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Media', value: 'media' },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
    { name: 'tagline', type: 'text' },
    {
      name: 'palette',
      type: 'group',
      fields: [
        { name: 'key', type: 'text', required: true, admin: { description: 'hex, e.g. #5B2470' } },
        { name: 'hi', type: 'text', required: true, admin: { description: 'second colour / dark-mode accent' } },
        { name: 'deep', type: 'text', required: true, admin: { description: 'deep ground' } },
        { name: 'lift', type: 'text', required: true, admin: { description: 'pale wash ground' } },
        {
          name: 'on',
          type: 'text',
          admin: {
            description:
              'Optional override for the text colour on key. Must clear 4.5:1 contrast against key — it snaps, never interpolates. Leave blank to compute at export.',
          },
          hooks: {
            beforeChange: [
              ({ value, siblingData, req }) => {
                if (value && siblingData?.key) {
                  const ratio = contrastRatio(siblingData.key, value)
                  if (ratio < 4.5) {
                    req.payload.logger.warn(
                      `[ventures] palette.on override "${value}" only clears ${ratio.toFixed(2)}:1 against key "${siblingData.key}" (needs 4.5:1) — it will render but fails the contrast rule.`,
                    )
                  }
                }
                return value
              },
            ],
          },
        },
        {
          name: 'keyDark',
          type: 'text',
          admin: {
            description:
              'Optional dark-mode key. For a brand whose key only works on one ground — e.g. Rotavox: ink in light mode, volt on ink in dark (volt is never legal on a light surface).',
          },
        },
        { name: 'hiDark', type: 'text', admin: { description: 'Optional dark-mode second colour (defaults to hi).' } },
        {
          name: 'onDark',
          type: 'text',
          admin: { description: 'Optional text colour on keyDark. Leave blank to compute at export (4.5:1 snap).' },
        },
      ],
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'proposed',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Colour is an unconfirmed proposal — author to confirm or replace.' },
    },
  ],
}
