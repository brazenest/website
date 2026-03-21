# Case Study Image System

Project case studies use generated SVG key art rather than legacy screenshots or posters.

## Goals

- keep the visual language aligned with the current site
- avoid depending on old product screenshots that do not match the v3 brand
- make future project-image generation repeatable

## Command

```bash
pnpm run generate:case-study-images
```

This script writes project key art into `public/media/engineering/` and `public/media/production/`.

## Direction

- Engineering images use a cool palette, structured geometry, and systems-oriented motifs.
- Production images use a warmer palette, cinematic framing cues, and motion/composition motifs.
- Each image includes:
  - section label
  - project title
  - one-line strategic subtitle

## Update Flow

1. Edit `scripts/generate-case-study-images.mjs`.
2. Add or revise the relevant config entry.
3. Run `pnpm run generate:case-study-images`.
4. Verify the affected case-study pages in the browser.
