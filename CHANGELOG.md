# Changelog

All notable changes to this project are documented here.

## v4.3.2 - 2026-07-05

### Added
- The current release version is shown in the site footer next to the
  copyright (muted), as a quiet build/version signal.
- Real portrait (autumn-aspens photo) now represents Alden on the About and
  Resume pages, replacing the placeholder webcam selfie for a consistent face
  across professional surfaces.

### Changed
- The color-mode toggle now offers three choices — System, Light, and Dark —
  so visitors can explicitly return to following their OS preference (the
  default when unset). The full control is a segmented three-option switch; the
  compact mobile control cycles System → Light → Dark.
- An explicit light/dark choice now persists indefinitely again; the 24h expiry
  introduced in v4.3.1 has been removed.

## v4.3.1 - 2026-07-05

### Fixed
- Dark mode on `/packages`: the hero, the three tier cards, the "Not ready for a
  full build" cards, and the "Productized enough" band/cards no longer render
  light-on-light — they now use the semantic dark surface/text tokens.

### Changed
- An explicit light/dark theme choice now expires after 24h, so the site returns
  to following the visitor's system preference.

## v4.3.0 - 2026-07-05

### Added
- Cloudflare Pages deployment (SSR on Workers) with a Hyperdrive-backed Postgres
  binding, a separate dev/preview database, and GitHub auto-deploy docs.
- System-preference dark mode with an explicit light/dark toggle override.

### Changed
- Rebrand to "Builder, Producer, and Founder" identity and the calmer neutral
  palette (`--impact` demoted to a neutral; red reserved for high-intent CTAs).
- Email delivery moved from Amazon SES to Resend (dependency-free HTTP client).

## v0.1.1 - 2026-05-26

### Added
- Generated and integrated new CTA artwork for better right-column negative-space usage:
  - `public/media/generated/cta-consultation-workspace.png`
- Added optional telephone field to the teardown request form.

### Changed
- Standardized bottom CTA sections across key pages with consistent:
  - width (`content` container),
  - vertical spacing/separation,
  - panel/layout structure,
  - button hierarchy,
  - right-column image usage where applicable.
- Updated production discipline palette to a more premium brass-gold tone and propagated the change through relevant tokens and surfaces.
- Improved hero consistency with:
  - sheen overlays,
  - inversion behavior refinements,
  - contrast corrections for light and dark variants.
- Refined Packages page composition and hierarchy, including value-section presentation and CTA conformity.
- Improved Contact page teardown block readability and separation from surrounding content.
- Added resume visual cue system with left-border discipline signaling:
  - engineering (blue),
  - production (gold),
  - mixed/combined (neutral).
- Updated case-study page bottom CTAs to match the shared CTA spec.

### Notes
- This is a minor point release focused on visual system coherence, contrast/accessibility tuning, and consistent emphasis patterns across templates.
