import type { GlobalConfig } from 'payload'

/**
 * Blog categories — the authoring surface for what a post looks like when it brings no
 * artwork of its own (v6.2).
 *
 * Every post already carries a `category`. This global is what that category MEANS: the
 * colour world it borrows, and the default cover image it falls back to. The four defaults
 * are generated contour art, rendered by `pnpm run seed` and uploaded into the media library
 * as real documents — so they are visible in the admin, swappable for a photograph at any
 * time, and identical to what ships on the page and on the social card.
 *
 * Resolution order for a post's cover, most specific first:
 *   1. the post's own `coverImage`
 *   2. this category's `defaultCover`
 *   3. contour art generated at build from the category's accent colour (safety net only —
 *      it exists so a blank row can never leave a post imageless)
 *
 * The `value` of each row must match one of the options on Posts.category. Rows are matched
 * by that value, not by position.
 */
export const BlogCategories: GlobalConfig = {
  slug: 'blog-categories',
  label: 'Blog Categories',
  access: { read: () => true },
  admin: {
    description:
      'What each blog category means: its accent colour and its default cover image. Posts without their own coverImage inherit the default for their category.',
  },
  fields: [
    {
      name: 'categories',
      type: 'array',
      maxRows: 4,
      admin: {
        description:
          'One row per category on Posts. Seeded automatically — you normally only come here to swap a default cover for a real photograph.',
      },
      fields: [
        {
          name: 'value',
          type: 'select',
          required: true,
          options: [
            { label: 'Engineering', value: 'engineering' },
            { label: 'Cinematic', value: 'cinematic' },
            { label: 'Process', value: 'process' },
            { label: 'Other Topics', value: 'other' },
          ],
          admin: {
            description: 'Must match the category value on Posts. Rows are matched by this, not by order.',
          },
        },
        {
          name: 'label',
          type: 'text',
          admin: { description: 'Display name shown on post cards and in the post meta line.' },
        },
        {
          name: 'accentVenture',
          type: 'relationship',
          relationTo: 'ventures',
          admin: {
            description:
              "The venture whose palette this category borrows. Drives the generated cover's colour and the post page's tint. No new colours are invented — every value comes from the ventures collection.",
          },
        },
        {
          name: 'defaultCover',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'The cover every post in this category gets unless it sets its own. Seeded with generated contour art at 1200×630; replace it with a photograph whenever you have one.',
          },
        },
      ],
    },
  ],
}
