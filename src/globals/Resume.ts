import type { GlobalConfig } from 'payload'

/**
 * Résumé (v6.3) — the authoring surface for /resume and the downloadable /resume.pdf.
 *
 * The web page is the canonical résumé: real HTML, indexable, accessible, and styled to print
 * cleanly on US Letter. The PDF is generated FROM that page (`pnpm --dir astro run resume:pdf`),
 * so the two can never disagree. Admin-owned like `about`: the seed only fills an empty global.
 */
export const Resume: GlobalConfig = {
  slug: 'resume',
  label: 'Résumé',
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true, defaultValue: 'Alden Gillespy' },
    { name: 'headline', type: 'text', admin: { description: 'One line under the name.' } },
    { name: 'location', type: 'text' },
    { name: 'summary', type: 'textarea' },
    {
      name: 'contact',
      type: 'array',
      admin: { description: 'Shown in the header, in order. Leave href blank for plain text.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'experience',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'organization', type: 'text', required: true },
        { name: 'timeframe', type: 'text' },
        { name: 'context', type: 'text', admin: { description: 'e.g. "Remote · Contract".' } },
        { name: 'bullets', type: 'array', fields: [{ name: 'text', type: 'textarea', required: true }] },
      ],
    },
    {
      name: 'ventures',
      type: 'array',
      admin: { description: 'Independent products (Radiant Ventures).' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'category', type: 'text' },
        { name: 'status', type: 'text' },
        { name: 'tagline', type: 'textarea' },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'items', type: 'text', admin: { description: 'Comma-separated.' } },
      ],
    },
    {
      name: 'education',
      type: 'array',
      admin: {
        description:
          '⚠ Rows are only shown when "verified" is ticked — the institution/degree details were flagged for verification (see the About notes).',
      },
      fields: [
        { name: 'credential', type: 'text', required: true },
        { name: 'institution', type: 'text' },
        { name: 'timeframe', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'verified', type: 'checkbox', defaultValue: false },
      ],
    },
  ],
}
