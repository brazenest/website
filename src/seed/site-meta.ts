/**
 * siteMeta seed — BUILD.md §2 (siteMeta global) + §8.1.
 * ⚠ The proof numbers (09/01/06/03/02) are flagged in BUILD.md §8.1 as "author to verify".
 * They render as seeded; confirm the counts before launch.
 */
export const siteMetaSeed = {
  proofNumbers: [
    { value: '09', label: 'products I own and operate' },
    { value: '01', label: 'engineer on all of them — start to finish' },
    { value: '06', label: 'years shipping production software' },
    { value: '01', label: 'radio station on air, brand through playout' },
    { value: '02', label: 'national platforms — Ancestry, NBCUniversal' },
  ],
  contactEmail: 'ag@aldengillespy.com',
  ctaText: "Let's build something that lasts.",
  // Header nav. "Engineering"/"Media" point at the category landing pages, which list
  // every project in that zone and link out to each dedicated page. Résumé is just a nav
  // link — editable here in Payload admin; point href at an uploaded/hosted PDF (or drop
  // one at astro/public/resume.pdf). External/PDF hrefs open in a new tab (see Base.astro).
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Engineering', href: '/engineering' },
    { label: 'Media', href: '/media' },
    { label: 'Blog', href: '/blog' },
    { label: 'Résumé', href: '/resume' },
  ],
  // NOTE: siteMeta is admin-owned — the seed only populates it on a FRESH/empty DB and
  // never overwrites afterward (see seed/index.ts). Keep these in sync with Payload as the
  // version-controlled default for a clean setup.
  social: [
    { label: 'Résumé (PDF)', url: '/resume.pdf' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alden-gillespy' },
    { label: 'GitHub', url: 'https://github.com/brazenest' },
  ],
  seo: siteMetaSeoSeed(),
}

/**
 * Site-wide search/social defaults (v6.2). Deliberately BROAD — these are merged into every
 * page, so anything specific belongs on the page itself (astro/src/lib/seo.ts owns the
 * per-page term sets) or on the document in the admin. Backfilled onto an existing DB
 * without touching any other siteMeta field — see the seo backfill in seed/index.ts.
 */
export function siteMetaSeoSeed() {
  return {
    titleSuffix: ' — Alden Gillespy',
    defaultDescription:
      'Alden Gillespy builds and operates software products end to end — and shoots the films. Engineering case studies, cinematic work, and working notes on both.',
    defaultKeywords: [
      { term: 'Alden Gillespy' },
      { term: 'software engineer' },
      { term: 'product engineer' },
      { term: 'video producer' },
      { term: 'Radiant Ventures' },
    ],
    // ⚠ author to verify — no X/Twitter handle was on record at v6.2. Blank omits the tag
    // entirely (twitter:card still works without it).
    twitterSite: null,
    jobTitle: 'Software Engineer & Video Producer',
  }
}
