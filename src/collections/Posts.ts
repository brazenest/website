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
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional. Leave blank and the post gets generated cover art instead — a colour composition derived from its category (or relatedVenture) and slug, so no post is ever imageless. Upload one to override that.',
      },
    },
    {
      name: 'seo',
      type: 'group',
      admin: {
        description: 'Per-post search/social overrides. Everything here is optional and falls back sensibly.',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: { description: 'Overrides the <title>. Falls back to the post title. Keep under ~60 characters.' },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: { description: 'Overrides the meta/social description. Falls back to the excerpt. Aim for 150–160 characters.' },
        },
        {
          name: 'keywords',
          type: 'array',
          admin: { description: 'Post-specific terms. Merged with the site-wide defaults and emitted as article:tag as well.' },
          fields: [{ name: 'term', type: 'text', required: true }],
        },
      ],
    },
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
