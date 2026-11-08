/**
 * Seed data from BUILD.md §2 "Seed data" table (palette/zone/proposed verbatim).
 * `name` = the display name the UI actually shows in the rail + spectrum (BUILD.md leaves
 * `name` unspecified in the seed table; the rail/chips in v6-engine-r2.html show "Alden",
 * "The Bolt", "Night Signal"). `tagline` = the spectrum chip description from the source home.
 */
export const venturesSeed = [
  {
    name: 'Alden',
    slug: 'house',
    zone: 'neutral' as const,
    order: 0,
    tagline: null,
    palette: { key: '#6A7688', hi: '#8CA0FF', deep: '#161B23', lift: '#F1F4F7', on: '#FFFFFF' },
    proposed: false,
  },
  {
    name: 'Memrey',
    slug: 'memrey',
    zone: 'engineering' as const,
    order: 1,
    tagline: 'AI photo archive. Plum ground, rising sun.',
    palette: { key: '#5B2470', hi: '#FF8A3D', deep: '#2A0F3A', lift: '#F4ECF8', on: '#FFFFFF' },
    proposed: false,
  },
  {
    name: 'Rotavox',
    slug: 'rotavox',
    zone: 'engineering' as const,
    order: 2,
    tagline: 'Music scheduling for radio.',
    // The product brand, from rotavox-website/src/styles/tokens.css: ink #0B0B0C, paper
    // #F2EFE6, volt #D4FF00. Its one hard rule — volt is legal only on ink — so light mode
    // uses ink as the key (with volt type inside it, the brand's "console" chip) and dark
    // mode flips the key to volt on the ink ground.
    palette: {
      key: '#0B0B0C',
      hi: '#D4FF00',
      deep: '#0B0B0C',
      lift: '#F2EFE6',
      on: '#D4FF00',
      keyDark: '#D4FF00',
      hiDark: '#E2FF45',
      onDark: '#0B0B0C',
    },
    links: [{ label: 'rotavox.com', url: 'https://rotavox.com' }],
    proposed: false,
  },
  {
    name: 'Andacity',
    slug: 'andacity',
    zone: 'engineering' as const,
    order: 3,
    tagline: 'Discovery-first travel planning.',
    // Brand blue from andacity.com's theme-color (#2563EB).
    palette: { key: '#2563EB', hi: '#4F86FF', deep: '#0A1A3A', lift: '#EAF1FE', on: '#FFFFFF' },
    // No public link while andacity.com hosts the development build (not production).
    links: [],
    proposed: false,
  },
  {
    name: 'The Bolt',
    slug: 'bolt',
    zone: 'media' as const,
    order: 4,
    tagline: 'Molten orange. A station, built end to end.',
    palette: { key: '#FF3B1E', hi: '#FF7A45', deep: '#1A0904', lift: '#FFEDE9', on: '#1A0904' },
    // Launched — live at thebolt.stream.
    links: [{ label: 'thebolt.stream', url: 'https://thebolt.stream' }],
    proposed: false,
  },
  // "Night Signal" was retired at network level (superseded by the CLUBFM network standard —
  // it survives only as an overnight show on THE TOP), so it no longer has a venture row;
  // seed/index.ts deletes the old one.
  {
    name: 'Shadowcat',
    slug: 'shadowcat',
    zone: 'media' as const,
    order: 6,
    tagline: 'Films and photography.',
    palette: { key: '#E2A03C', hi: '#FFD08A', deep: '#120C04', lift: '#FBF3E5', on: '#241703' },
    links: [{ label: 'YouTube', url: 'https://youtube.com/@ShadowcatPictures' }],
    proposed: true,
  },
]
