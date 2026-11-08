import type { GlobalConfig } from 'payload'

/**
 * About — the authoring surface for /about (BUILD.md §7, design pass).
 *
 * Content-only global, mirrored into the static build by `pnpm run export`. Social links
 * and the contact email are NOT duplicated here — the About page reads those from the
 * siteMeta global (single source of truth). This global owns the page's narrative: the
 * introduction, the long-form bio, the two-discipline framing (engineering / cinematic),
 * professional experience, working principles, a dated "now" line, and curated
 * selected-work cross-links.
 *
 * ⚠ Much of the seeded copy is flagged "author to verify" (see the ABOUT handoff §19 —
 * titles, dates, metrics, education, and gated employers). Nothing unverified is stated as
 * a hard metric in the seed; confirm and fill specifics here in the admin before launch.
 */
export const About: GlobalConfig = {
  slug: 'about',
  access: { read: () => true },
  fields: [
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description:
          'SEO / social-card description for /about (~150–160 chars). Falls back to intro if blank.',
      },
    },
    {
      name: 'keywords',
      type: 'array',
      admin: { description: 'Search terms for /about. Merged with the site-wide defaults on siteMeta.seo.' },
      fields: [{ name: 'term', type: 'text', required: true }],
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Portrait for the top of /about, and the page\'s social card. Upload at least 1200px on the long edge — Astro generates the responsive sizes at build. The whole photo block is omitted while this is empty, so the page never renders a placeholder face.',
      },
    },
    {
      name: 'profilePhotoCaption',
      type: 'text',
      admin: {
        description: 'Optional line under the portrait — e.g. where and when it was taken. Hidden if blank.',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: { description: 'e.g. "Salt Lake City, Utah". ⚠ verify exact wording. Shown under the H1.' },
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: {
        description:
          'One or two sentences up top — the dual-identity lead-in above the bio. Plain text; keep it tight.',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      admin: { description: 'Long-form bio. Renders as the main prose column.' },
    },
    {
      name: 'interludes',
      type: 'array',
      admin: {
        description:
          'Full-width images that break up the long page. Pick an image, a caption, and which section it follows. Several can follow the same section — they sit side by side.',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text', admin: { description: 'Optional line under the image.' } },
        {
          name: 'after',
          type: 'select',
          required: true,
          defaultValue: 'bio',
          options: [
            { label: 'After the bio', value: 'bio' },
            { label: 'After the two disciplines', value: 'disciplines' },
            { label: 'After experience', value: 'experience' },
            { label: 'After "How I work"', value: 'principles' },
          ],
        },
      ],
    },
    {
      name: 'disciplines',
      type: 'array',
      maxRows: 2,
      admin: {
        description:
          'The two sides of the work — engineering and cinematic production. Two entries; each renders as a column with its capability points.',
      },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Engineering & product" / "Cinematic production".' } },
        { name: 'tagline', type: 'text', admin: { description: 'One line under the label.' } },
        {
          name: 'accent',
          type: 'select',
          defaultValue: 'engineering',
          options: [
            { label: 'Engineering (blue)', value: 'engineering' },
            { label: 'Media (cinematic)', value: 'media' },
          ],
          admin: { description: 'Which zone palette tints this column.' },
        },
        { name: 'points', type: 'array', fields: [{ name: 'text', type: 'text' }] },
      ],
    },
    {
      name: 'experience',
      type: 'array',
      admin: {
        description:
          'Professional roles, newest first. ⚠ verify titles/dates and only include employers cleared for publication (see handoff §4, §19).',
      },
      fields: [
        { name: 'org', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'period', type: 'text', admin: { description: 'e.g. "2023–2025".' } },
        { name: 'summary', type: 'textarea' },
        { name: 'stack', type: 'text', admin: { description: 'Comma-separated technologies shown as a caption.' } },
      ],
    },
    {
      name: 'principles',
      type: 'array',
      admin: { description: 'A few working/product principles (handoff §10). Keep to 3–5.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      name: 'now',
      type: 'group',
      admin: {
        description:
          'A short "what I\'m working on right now" line. Leave text blank to hide the whole block.',
      },
      fields: [
        { name: 'text', type: 'textarea' },
        {
          name: 'updated',
          type: 'date',
          admin: { description: 'Shown next to the Now line so readers know how current it is.' },
        },
      ],
    },
    {
      name: 'selectedWork',
      type: 'array',
      admin: {
        description:
          'Curated doors into the rest of the site. Order here is the order shown. href can be internal (/engineering) or external.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'blurb', type: 'text', admin: { description: 'One-line description under the label.' } },
      ],
    },
  ],
}
