# Redirect Audit - v3 Launch

This audit inventories verified legacy public HTML routes recovered from git history and maps them to the v3 launch surface.

## Evidence Sources

- `_old/app/*` snapshot recovered from commit `0a86b8ab87e08c52a8e0ea9b6d49aa5d3204a4c1`
- `next-app/app/*` snapshot recovered from commit `9538f9942ef2013e659d4ff0855c9afbe5e8705e`
- Current v3 routes under `src/routes/*`

## Excluded From The Matrix

- `/admin`, `/add-article`, and other operational authoring pages
- `/api/*` endpoints used for form or content operations
- Internal framework files and draft-only local paths

## Legacy Route Matrix

| old path                           | old content/page purpose                                           | v3 status      | v3 destination                              | notes                                                                                                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------ | -------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /                                  | Legacy homepage                                                    | unchanged      | /                                           | Verified in both legacy snapshots: `_old/app/page.tsx` and later `next-app/app/page.tsx`.                                                                                                |
| /about                             | Legacy about page                                                  | unchanged      | /about                                      | Verified in both legacy snapshots: `_old/app/about/page.tsx` and later `next-app/app/about/page.tsx`.                                                                                    |
| /blog/articles                     | Older blog index listing articles from the `_old/app` site.        | redirect       | /blog                                       | Verified in `_old/app/blog/articles/page.tsx`; v3 canonicalizes the index to `/blog`.                                                                                                    |
| /blog/articles/[slug]              | Older article detail route under the `_old/app` site.              | redirect       | /blog/[slug]                                | Verified in `_old/app/blog/articles/[slug]/page.tsx`; slug identity remains canonical in v3.                                                                                             |
| /blog/posts                        | Transitional blog index used by the later `next-app` site.         | redirect       | /blog                                       | Verified in `next-app/app/blog/posts/page.tsx`; v3 collapses the list route to `/blog`.                                                                                                  |
| /blog/posts/[slug]                 | Transitional blog detail route used immediately before v3.         | redirect       | /blog/[slug]                                | Verified in `next-app/app/blog/posts/[slug]/page.tsx`; this is the launch-critical redirect path.                                                                                        |
| /contact                           | Older public contact page with a contact form.                     | unchanged      | /contact                                    | Verified in `_old/app/contact/page.tsx`.                                                                                                                                                 |
| /resume                            | Legacy resume page from the later `next-app` snapshot.             | unchanged      | /resume                                     | Verified in `next-app/app/resume/page.tsx`.                                                                                                                                              |
| /work                              | Mixed work index combining engineering and cinematic case studies. | needs-decision | n/a                                         | Verified in `_old/app/work/page.tsx`. v3 split work into `/engineering` and `/production`, so no single redirect target is defensible from code alone.                                   |
| /work/ancestry-dna-activation      | Detailed DNA kit activation case study.                            | gone           | n/a                                         | Verified in `_old/app/work/ancestry-dna-activation/page.tsx`. No matching v3 case study exists, so this should return `410` if preserved at the edge.                                    |
| /work/dna-activation               | Earlier DNA activation case study route.                           | gone           | n/a                                         | Verified in `_old/app/work/dna-activation/page.tsx`. This is an older alias/variant of removed DNA activation content with no v3 replacement.                                            |
| /work/shadowcat-bellagio           | Bellagio fountains production case study.                          | redirect       | /production/projects/bellagio-fountain-film | Verified in `_old/app/work/shadowcat-bellagio/page.tsx`. The v3 Bellagio project is the closest direct continuation of the same work.                                                    |
| /work/shadowcat-bellagio-fountains | Expanded Bellagio fountains production case study variant.         | redirect       | /production/projects/bellagio-fountain-film | Verified in `_old/app/work/shadowcat-bellagio-fountains/page.tsx`. This points at the same Bellagio project now published under the production project slug.                             |
| /work/timeshare-platform           | Engineering case study for a timeshare sales and rentals platform. | needs-decision | n/a                                         | Verified in `_old/app/work/timeshare-platform/page.tsx`. It may relate to v3 travel-booking work, but the rename and framing change are too large to assert equivalence from code alone. |
| /work/timeshare-search-rentals     | Engineering case study for dense listings, search, and booking.    | needs-decision | n/a                                         | Verified in `_old/app/work/timeshare-search-rentals/page.tsx`. Similar domain to the new booking case study, but not provably the same published artifact.                               |

## Launch Redirect Rules Confirmed In Code

- `/blog/posts/[slug]` -> `/blog/[slug]` (permanent)
- `/blog/articles/[slug]` -> `/blog/[slug]` (permanent)
- `/blog/posts` -> `/blog` (permanent)
- `/blog/articles` -> `/blog` (permanent)
- `/work/shadowcat-bellagio` -> `/production/projects/bellagio-fountain-film` (permanent)
- `/work/shadowcat-bellagio-fountains` -> `/production/projects/bellagio-fountain-film` (permanent)

## Notes

- `gone` entries should prefer `410 Gone` at the edge if those paths are kept in the server or CDN configuration.
- `needs-decision` entries should not receive a guessed redirect before product sign-off.
- No blanket redirect-to-home rule is present in the application redirect layer.
