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
    { value: '03', label: 'radio stations built, brand through playout' },
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
    { label: 'Résumé', href: '/resume.pdf' },
  ],
  // NOTE: siteMeta is admin-owned — the seed only populates it on a FRESH/empty DB and
  // never overwrites afterward (see seed/index.ts). Keep these in sync with Payload as the
  // version-controlled default for a clean setup.
  social: [
    { label: 'Résumé (PDF)', url: '/resume.pdf' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/alden-gillespy' },
    { label: 'GitHub', url: 'https://github.com/brazenest' },
  ],
}
