import type { CollectionConfig } from 'payload'

/**
 * Blog posts — the authoring surface for /blog and /blog/posts/<slug>.
 *
 * Carries every field the pre-v6 `articles` table held (see src/seed/posts.ts), so the
 * legacy archive imports without loss: category, read time and draft/publish state are all
 * first-class here rather than being flattened away at import.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'kebab-case. Becomes the URL: /blog/posts/<slug>. Changing it breaks inbound links — add a rule to astro/public/_redirects if you do.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      index: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Only published posts are written out by `pnpm run export` — drafts never reach a build.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      index: true,
      admin: { position: 'sidebar', description: 'Sorts the blog index, newest first.' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'engineering',
      index: true,
      options: [
        { label: 'Engineering', value: 'engineering' },
        { label: 'Cinematic', value: 'cinematic' },
        { label: 'Process', value: 'process' },
        { label: 'Other Topics', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'readTime',
      type: 'number',
      min: 1,
      admin: { position: 'sidebar', description: 'Minutes. Leave blank to omit it from the page.' },
    },
    { name: 'excerpt', type: 'textarea' },
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
    {
      name: 'legacyId',
      type: 'number',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Primary key from the pre-v6 `articles` table. Set by the import; keeps re-seeding idempotent.',
      },
    },
  ],
}
