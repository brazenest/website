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
  // In the source SPA, "Engineering"/"Media" route straight to the flagship case study/film
  // (that page IS the zone route) — not to a same-page anchor. Matches that once
  // /engineering/memrey (step 5) and /media/shadowcat (step 6) exist.
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Engineering', href: '/engineering/memrey' },
    { label: 'Media', href: '/media/shadowcat' },
  ],
  social: [
    { label: 'Résumé (PDF)', url: '#' },
    { label: 'LinkedIn', url: '#' },
    { label: 'GitHub', url: '#' },
  ],
}
