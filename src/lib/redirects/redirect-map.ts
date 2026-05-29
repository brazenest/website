export type RedirectRule =
  | {
    type: 'exact'
    from: string
    to: string
    permanent: true
  }
  | {
    type: 'pattern'
    from: RegExp
    to: (match: RegExpMatchArray) => string
    permanent: true
  }

export type LegacyRouteAuditStatus = 'unchanged' | 'redirect' | 'gone' | 'needs-decision'

export type LegacyRouteAuditRow = {
  oldPath: string
  purpose: string
  status: LegacyRouteAuditStatus
  destination: string | null
  notes: string
}

export const redirectMap: RedirectRule[] = [
  {
    type: 'exact',
    from: '/blog/articles',
    to: '/blog',
    permanent: true,
  },
  {
    type: 'exact',
    from: '/blog/posts',
    to: '/blog',
    permanent: true,
  },
  {
    type: 'exact',
    from: '/work/shadowcat-bellagio',
    to: '/production/projects/bellagio-fountain-film',
    permanent: true,
  },
  {
    type: 'exact',
    from: '/work/shadowcat-bellagio-fountains',
    to: '/production/projects/bellagio-fountain-film',
    permanent: true,
  },
  {
    type: 'pattern',
    from: /^\/blog\/articles\/([^/]+)\/?$/,
    to: (match) => `/blog/${match[1]}`,
    permanent: true,
  },
  {
    type: 'pattern',
    from: /^\/blog\/posts\/([^/]+)\/?$/,
    to: (match) => `/blog/${match[1]}`,
    permanent: true,
  },
]

export const legacyRouteAudit: LegacyRouteAuditRow[] = [
  {
    oldPath: '/',
    purpose: 'Legacy homepage',
    status: 'unchanged',
    destination: '/',
    notes:
      'Verified in both legacy snapshots: `_old/app/page.tsx` and later `next-app/app/page.tsx`.',
  },
  {
    oldPath: '/about',
    purpose: 'Legacy about page',
    status: 'unchanged',
    destination: '/about',
    notes:
      'Verified in both legacy snapshots: `_old/app/about/page.tsx` and later `next-app/app/about/page.tsx`.',
  },
  {
    oldPath: '/blog/articles',
    purpose: 'Older blog index listing articles from the `_old/app` site.',
    status: 'redirect',
    destination: '/blog',
    notes:
      'Verified in `_old/app/blog/articles/page.tsx`; v3 canonicalizes the index to `/blog`.',
  },
  {
    oldPath: '/blog/articles/[slug]',
    purpose: 'Older article detail route under the `_old/app` site.',
    status: 'redirect',
    destination: '/blog/[slug]',
    notes:
      'Verified in `_old/app/blog/articles/[slug]/page.tsx`; slug identity remains canonical in v3.',
  },
  {
    oldPath: '/blog/posts',
    purpose: 'Transitional blog index used by the later `next-app` site.',
    status: 'redirect',
    destination: '/blog',
    notes:
      'Verified in `next-app/app/blog/posts/page.tsx`; v3 collapses the list route to `/blog`.',
  },
  {
    oldPath: '/blog/posts/[slug]',
    purpose: 'Transitional blog detail route used immediately before v3.',
    status: 'redirect',
    destination: '/blog/[slug]',
    notes:
      'Verified in `next-app/app/blog/posts/[slug]/page.tsx`; this is the launch-critical redirect path.',
  },
  {
    oldPath: '/contact',
    purpose: 'Older public contact page with a contact form.',
    status: 'unchanged',
    destination: '/contact',
    notes: 'Verified in `_old/app/contact/page.tsx`.',
  },
  {
    oldPath: '/resume',
    purpose: 'Legacy resume page from the later `next-app` snapshot.',
    status: 'unchanged',
    destination: '/resume',
    notes: 'Verified in `next-app/app/resume/page.tsx`.',
  },
  {
    oldPath: '/work',
    purpose: 'Mixed work index combining engineering and cinematic case studies.',
    status: 'needs-decision',
    destination: null,
    notes:
      'Verified in `_old/app/work/page.tsx`. v3 split work into `/engineering` and `/production`, so no single redirect target is defensible from code alone.',
  },
  {
    oldPath: '/work/ancestry-dna-activation',
    purpose: 'Detailed DNA kit activation case study.',
    status: 'gone',
    destination: null,
    notes:
      'Verified in `_old/app/work/ancestry-dna-activation/page.tsx`. No matching v3 case study exists, so this should return `410` if preserved at the edge.',
  },
  {
    oldPath: '/work/dna-activation',
    purpose: 'Earlier DNA activation case study route.',
    status: 'gone',
    destination: null,
    notes:
      'Verified in `_old/app/work/dna-activation/page.tsx`. This is an older alias/variant of removed DNA activation content with no v3 replacement.',
  },
  {
    oldPath: '/work/shadowcat-bellagio',
    purpose: 'Bellagio fountains production case study.',
    status: 'redirect',
    destination: '/production/projects/bellagio-fountain-film',
    notes:
      'Verified in `_old/app/work/shadowcat-bellagio/page.tsx`. The v3 Bellagio project is the closest direct continuation of the same work.',
  },
  {
    oldPath: '/work/shadowcat-bellagio-fountains',
    purpose: 'Expanded Bellagio fountains production case study variant.',
    status: 'redirect',
    destination: '/production/projects/bellagio-fountain-film',
    notes:
      'Verified in `_old/app/work/shadowcat-bellagio-fountains/page.tsx`. This points at the same Bellagio project now published under the production project slug.',
  },
  {
    oldPath: '/work/timeshare-platform',
    purpose: 'Engineering case study for a timeshare sales and rentals platform.',
    status: 'needs-decision',
    destination: null,
    notes:
      'Verified in `_old/app/work/timeshare-platform/page.tsx`. It may relate to v3 travel-booking work, but the rename and framing change are too large to assert equivalence from code alone.',
  },
  {
    oldPath: '/work/timeshare-search-rentals',
    purpose: 'Engineering case study for dense listings, search, and booking.',
    status: 'needs-decision',
    destination: null,
    notes:
      'Verified in `_old/app/work/timeshare-search-rentals/page.tsx`. Similar domain to the new booking case study, but not provably the same published artifact.',
  },
]