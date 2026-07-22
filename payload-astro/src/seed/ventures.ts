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
    palette: { key: '#0F7A52', hi: '#38D08C', deep: '#05261A', lift: '#E9F7F0', on: '#FFFFFF' },
    links: [{ label: 'rotavox.com', url: 'https://rotavox.com' }],
    // Real product, live at rotavox.com — colour confirmed (⚠ verify #0F7A52 matches the brand).
    proposed: false,
  },
  {
    name: 'Soldera',
    slug: 'soldera',
    zone: 'engineering' as const,
    order: 3,
    tagline: 'An AI listing assistant.',
    palette: { key: '#C81B7A', hi: '#FF6CB6', deep: '#2A0620', lift: '#FDE9F4', on: '#FFFFFF' },
    proposed: true,
  },
  {
    name: 'The Bolt',
    slug: 'bolt',
    zone: 'media' as const,
    order: 4,
    tagline: 'Molten orange. A station, built end to end.',
    palette: { key: '#FF3B1E', hi: '#FF7A45', deep: '#1A0904', lift: '#FFEDE9', on: '#1A0904' },
    proposed: false,
  },
  {
    name: 'Night Signal',
    slug: 'signal',
    zone: 'media' as const,
    order: 5,
    tagline: 'The network the stations sit inside.',
    palette: { key: '#00E8D0', hi: '#7DF7EA', deep: '#04201E', lift: '#E4FBF8', on: '#04211E' },
    proposed: false,
  },
  {
    name: 'Shadowcat',
    slug: 'shadowcat',
    zone: 'media' as const,
    order: 6,
    tagline: 'Films and photography.',
    palette: { key: '#E2A03C', hi: '#FFD08A', deep: '#120C04', lift: '#FBF3E5', on: '#241703' },
    proposed: true,
  },
]
