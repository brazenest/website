import type { BlogPostSide } from '~/types/content'

type BlogCoverPalette = {
  accent: string
  accentSoft: string
  accentWarm: string
  tint: string
  tintStrong: string
  ink: string
  muted: string
  label: string
}

type BlogCoverSpec = {
  side: BlogPostSide
  titleLines: string[]
  descriptor: string
  alt: string
  motif: string
}

const SIDE_LABEL: Record<BlogPostSide, string> = {
  engineering: 'ENGINEERING NOTE',
  production: 'PRODUCTION NOTE',
  bridge: 'BRIDGE ESSAY',
}

const SIDE_PALETTE: Record<BlogPostSide, BlogCoverPalette> = {
  engineering: {
    accent: '#2563eb',
    accentSoft: '#60a5fa',
    accentWarm: '#22d3ee',
    tint: '#eff6ff',
    tintStrong: '#dbeafe',
    ink: '#0f172a',
    muted: '#475569',
    label: '#1d4ed8',
  },
  production: {
    accent: '#f59e0b',
    accentSoft: '#fbbf24',
    accentWarm: '#fb923c',
    tint: '#fff7ed',
    tintStrong: '#ffedd5',
    ink: '#1c1917',
    muted: '#57534e',
    label: '#b45309',
  },
  bridge: {
    accent: '#2563eb',
    accentSoft: '#f59e0b',
    accentWarm: '#0f172a',
    tint: '#f8fafc',
    tintStrong: '#e7e5e4',
    ink: '#171717',
    muted: '#44403c',
    label: '#334155',
  },
}

const BLOG_COVER_SPECS: Record<string, BlogCoverSpec> = {
  'vibe-coded-site-with-chatgpt-codex-and-github-copilot-in-one-day': {
    side: 'engineering',
    titleLines: ['Vibe-Coding', 'a Site in', 'One Day'],
    descriptor: 'Chat panels, repo flow, and a fast build sprint.',
    alt: 'Editorial cover illustration showing layered chat panels, browser windows, and engineering workflow lines for a post about building a site in one day with AI tools.',
    motif: 'vibe-code',
  },
  'working-with-chatgpt-generative-ai-copilot-interaction-rules-part-3': {
    side: 'engineering',
    titleLines: ['Golden Rules', 'for AI Copilot', 'Interaction · Part 3'],
    descriptor: 'Dialogue rhythm, signal cleanup, and attention discipline.',
    alt: 'Editorial cover illustration with mirrored chat panes and signal lines for a post about advanced AI copilot interaction rules.',
    motif: 'ai-rules-3',
  },
  'working-with-chatgpt-generative-ai-copilot-interaction-rules-part-2': {
    side: 'engineering',
    titleLines: ['Golden Rules', 'for AI Copilot', 'Interaction · Part 2'],
    descriptor: 'Prompt structure, control surfaces, and branching paths.',
    alt: 'Editorial cover illustration with a structured prompt tree and control cards for a post about AI copilot prompt structure.',
    motif: 'ai-rules-2',
  },
  'working-with-chatgpt-generative-ai-copilot-interaction-rules-part-1': {
    side: 'engineering',
    titleLines: ['Golden Rules', 'for AI Copilot', 'Interaction · Part 1'],
    descriptor: 'Authority, specificity, and clean instruction stacks.',
    alt: 'Editorial cover illustration with stacked instruction cards and directional guides for a post about authority and specificity in AI collaboration.',
    motif: 'ai-rules-1',
  },
  'best-practices-naming-conventions-in-react-code-development': {
    side: 'engineering',
    titleLines: ['React Naming', 'Conventions', 'That Scale'],
    descriptor: 'Taxonomy blocks, aliases, and clean shared structure.',
    alt: 'Editorial cover illustration with connected naming blocks and taxonomy rows for a post about React naming conventions.',
    motif: 'naming',
  },
  'shadowcat-pictures-youtube-video-bellagio-fountains-airbus-boeing': {
    side: 'production',
    titleLines: ['Shadowcat', 'Pictures', 'on YouTube'],
    descriptor: 'Film frame geometry, playback marks, and lens motion.',
    alt: 'Editorial cover illustration with a cinematic frame, play icon, and lens rings for a post introducing Shadowcat Pictures on YouTube.',
    motif: 'film',
  },
  'millenials-toys-r-us-death-by-bad-leveraged-buyout': {
    side: 'bridge',
    titleLines: ['Toys “R” Us,', 'Debt Stacks,', 'and Collapse'],
    descriptor: 'Retail blocks, structural load, and a failing support line.',
    alt: 'Editorial cover illustration with stacked toy-like blocks and collapsing financial supports for a post about the Toys “R” Us collapse.',
    motif: 'retail',
  },
  'how-use-chrome-lighthouse-improve-site-performance-page-speed': {
    side: 'engineering',
    titleLines: ['Lighthouse', 'and Performance', 'Discipline'],
    descriptor: 'Beacon arcs, audit bars, and visible optimization paths.',
    alt: 'Editorial cover illustration with a lighthouse beam and performance bars for a post about using Lighthouse to improve site performance.',
    motif: 'lighthouse',
  },
  'why-need-react-for-site-ui-contextual-awareness': {
    side: 'engineering',
    titleLines: ['React for', 'Context-Aware', 'Interfaces'],
    descriptor: 'A central component with context orbiting in layers.',
    alt: 'Editorial cover illustration with a central interface node and orbiting context signals for a post about React and contextual awareness.',
    motif: 'react-context',
  },
  'why-tdd-it-takes-the-guesswork-out-of-debugging': {
    side: 'engineering',
    titleLines: ['TDD and', 'the Debugging', 'Feedback Loop'],
    descriptor: 'Red, green, refactor arranged as a tight cycle.',
    alt: 'Editorial cover illustration with a red-green-refactor loop for a post about test-driven development.',
    motif: 'tdd',
  },
  'a-new-reason-why-you-should-ditch-email': {
    side: 'bridge',
    titleLines: ['Why You Should', 'Ditch Email', 'for Good'],
    descriptor: 'Envelope traces, open tracking, and quiet surveillance.',
    alt: 'Editorial cover illustration with an envelope, tracking dots, and signal rings for a post about ditching email.',
    motif: 'email',
  },
  'cell-network-location-privacy-calea-carpenter-united-states': {
    side: 'bridge',
    titleLines: ['Location', 'Privacy and', 'Cell Networks'],
    descriptor: 'Tower geometry, signal rings, and a contested map pin.',
    alt: 'Editorial cover illustration with a cell tower, map pin, and signal rings for a post about location privacy.',
    motif: 'privacy',
  },
  'what-creates-net-neutrality-market-forces-or-the-fcc': {
    side: 'bridge',
    titleLines: ['Net Neutrality,', 'Market Forces,', 'and the FCC'],
    descriptor: 'Parallel lanes, throttling gates, and balancing nodes.',
    alt: 'Editorial cover illustration with network lanes and balancing nodes for a post about net neutrality.',
    motif: 'neutrality',
  },
  'variable-fonts-safari-11-support-macos-and-ios-font-wars': {
    side: 'bridge',
    titleLines: ['Variable Fonts', 'and Safari 11', 'Support'],
    descriptor: 'Axis sliders, glyph frames, and typographic motion.',
    alt: 'Editorial cover illustration with a variable-font axis system and letterform guides for a post about OpenType variable fonts.',
    motif: 'variable-font',
  },
  'postgres-schema-design-for-scale': {
    side: 'engineering',
    titleLines: ['Schema Design', 'for Scalable', 'Content Systems'],
    descriptor: 'Relational blocks, indexed paths, and durable boundaries.',
    alt: 'Editorial cover illustration with structured data blocks and relation lines for a post about PostgreSQL schema design.',
    motif: 'schema',
  },
  'single-shoot-multiple-deliverables': {
    side: 'production',
    titleLines: ['One Shoot,', 'Many', 'Deliverables'],
    descriptor: 'Framing windows, format crops, and coverage planning.',
    alt: 'Editorial cover illustration with cinematic framing windows for a post about planning one shoot for many deliverables.',
    motif: 'coverage',
  },
  'revision-as-method': {
    side: 'bridge',
    titleLines: ['Revision as', 'a First-Class', 'Concern'],
    descriptor: 'Layered versions, edit marks, and controlled iteration.',
    alt: 'Editorial cover illustration with layered revision sheets and version marks for a post about revision as a first-class concern.',
    motif: 'revision',
  },
}

const BLOG_COVER_VERSION = '2'

export function getBlogGeneratedCoverUrl(slug: string) {
  return `/media/blog/${slug}/cover.svg?v=${BLOG_COVER_VERSION}`
}

export function getBlogGeneratedCover(slug: string, title: string, side: BlogPostSide) {
  const spec = BLOG_COVER_SPECS[slug]

  return {
    url: getBlogGeneratedCoverUrl(slug),
    alt: spec?.alt ?? `Editorial cover illustration for ${title}`,
    side: spec?.side ?? side,
  }
}

export function renderBlogCoverSvg(slug: string) {
  const spec = BLOG_COVER_SPECS[slug] ?? createFallbackSpec(slug)
  const palette = SIDE_PALETTE[spec.side]
  const label = SIDE_LABEL[spec.side]

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 800" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(spec.titleLines.join(' '))}</title>
  <desc id="desc">${escapeXml(spec.alt)}</desc>
  <defs>
    <linearGradient id="bg-gradient" x1="6%" y1="4%" x2="96%" y2="100%">
      <stop offset="0%" stop-color="#fbfaf7" />
      <stop offset="48%" stop-color="${palette.tint}" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <radialGradient id="glow-left" cx="14%" cy="12%" r="60%">
      <stop offset="0%" stop-color="${palette.accentSoft}" stop-opacity="0.24" />
      <stop offset="100%" stop-color="${palette.accentSoft}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="glow-right" cx="84%" cy="82%" r="56%">
      <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.18" />
      <stop offset="100%" stop-color="${palette.accent}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="stage-surface" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.93" />
      <stop offset="60%" stop-color="#ffffff" stop-opacity="0.84" />
      <stop offset="100%" stop-color="${palette.tint}" stop-opacity="0.9" />
    </linearGradient>
    <linearGradient id="accent-rule" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${palette.accent}" />
      <stop offset="100%" stop-color="${palette.accentSoft}" />
    </linearGradient>
    <filter id="paper-noise" x="-20%" y="-20%" width="140%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="8" />
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.045 0"
      />
    </filter>
    <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="${palette.ink}" flood-opacity="0.12" />
    </filter>
    <pattern id="micro-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="${palette.ink}" stroke-opacity="0.05" stroke-width="1" />
    </pattern>
    <clipPath id="stage-clip">
      <rect x="76" y="76" width="1448" height="648" rx="52" />
    </clipPath>
  </defs>
  <rect width="1600" height="800" fill="url(#bg-gradient)" />
  <rect width="1600" height="800" fill="url(#glow-left)" />
  <rect width="1600" height="800" fill="url(#glow-right)" />
  <rect width="1600" height="800" fill="#ffffff" filter="url(#paper-noise)" opacity="0.34" />
  <g filter="url(#soft-shadow)">
    <rect x="76" y="76" width="1448" height="648" rx="52" fill="url(#stage-surface)" stroke="${palette.ink}" stroke-opacity="0.08" />
  </g>
  <g clip-path="url(#stage-clip)">
    ${renderAmbientField(spec.side, palette)}
    <rect x="76" y="76" width="1448" height="648" fill="url(#micro-grid)" opacity="0.55" />
    <rect x="1044" y="96" width="12" height="610" rx="6" fill="url(#accent-rule)" opacity="0.9" />
    <g transform="translate(-320 8) scale(1.04)">
      ${renderMotif(spec.motif, palette)}
    </g>
  </g>
  <g>
    <rect x="126" y="108" width="212" height="38" rx="19" fill="#ffffff" fill-opacity="0.7" stroke="${palette.ink}" stroke-opacity="0.08" />
    <circle cx="154" cy="127" r="6" fill="${palette.accent}" />
    <text x="174" y="133" fill="${palette.label}" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="0.16em">${label}</text>
    <path d="M126 684H338" stroke="${palette.ink}" stroke-opacity="0.1" stroke-width="2" />
    <path d="M126 700H274" stroke="url(#accent-rule)" stroke-width="8" stroke-linecap="round" opacity="0.92" />
    <path d="M294 700H376" stroke="${palette.accentSoft}" stroke-width="8" stroke-linecap="round" opacity="0.65" />
  </g>
</svg>`
}

function createFallbackSpec(slug: string): BlogCoverSpec {
  const words = slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))

  const lines: string[] = []

  for (let index = 0; index < words.length; index += 3) {
    lines.push(words.slice(index, index + 3).join(' '))
  }

  return {
    side: 'bridge',
    titleLines: lines.slice(0, 3),
    descriptor: 'Editorial system cover generated for this blog post.',
    alt: `Editorial cover illustration for ${words.join(' ')}`,
    motif: 'revision',
  }
}

function renderMotif(motif: string, palette: BlogCoverPalette) {
  switch (motif) {
    case 'vibe-code':
      return `
  <g transform="translate(930 142)">
    <rect x="0" y="0" width="252" height="168" rx="26" fill="${palette.tintStrong}" stroke="${palette.accent}" stroke-opacity="0.18" />
    <rect x="292" y="42" width="236" height="152" rx="24" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.42" />
    <rect x="78" y="244" width="320" height="204" rx="30" fill="#ffffff" stroke="${palette.ink}" stroke-opacity="0.08" />
    <circle cx="36" cy="36" r="9" fill="${palette.accent}" />
    <circle cx="66" cy="36" r="9" fill="${palette.accentSoft}" />
    <circle cx="96" cy="36" r="9" fill="${palette.accentWarm}" />
    <path d="M34 86H214M34 118H192M34 150H168" stroke="${palette.ink}" stroke-opacity="0.22" stroke-width="12" stroke-linecap="round" />
    <path d="M324 88H476M324 122H504M324 156H452" stroke="${palette.ink}" stroke-opacity="0.18" stroke-width="12" stroke-linecap="round" />
    <path d="M128 518C172 470 232 446 308 446C384 446 448 474 500 530" fill="none" stroke="${palette.accent}" stroke-width="16" stroke-linecap="round" />
    <circle cx="130" cy="518" r="18" fill="${palette.accent}" />
    <circle cx="500" cy="530" r="18" fill="${palette.accentSoft}" />
    <path d="M216 276H338M216 316H354M216 356H316" stroke="${palette.ink}" stroke-opacity="0.18" stroke-width="14" stroke-linecap="round" />
    <path d="M110 440L172 384" stroke="${palette.accentWarm}" stroke-width="12" stroke-linecap="round" />
  </g>`
    case 'ai-rules-1':
      return `
  <g transform="translate(932 136)">
    <rect x="40" y="0" width="418" height="120" rx="26" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.34" />
    <rect x="0" y="148" width="500" height="132" rx="28" fill="${palette.tintStrong}" stroke="${palette.accent}" stroke-opacity="0.22" />
    <rect x="72" y="312" width="388" height="120" rx="26" fill="#ffffff" stroke="${palette.ink}" stroke-opacity="0.08" />
    <path d="M132 62H362M132 204H394M132 346H340" stroke="${palette.ink}" stroke-opacity="0.18" stroke-width="14" stroke-linecap="round" />
    <path d="M250 120V148M250 280V312" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round" />
    <path d="M230 290L250 320L270 290" fill="none" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="520" cy="210" r="72" fill="${palette.tint}" />
    <circle cx="520" cy="210" r="34" fill="${palette.accent}" fill-opacity="0.9" />
  </g>`
    case 'ai-rules-2':
      return `
  <g transform="translate(924 142)">
    <rect x="160" y="0" width="220" height="102" rx="24" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.24" />
    <rect x="0" y="186" width="182" height="110" rx="24" fill="${palette.tintStrong}" />
    <rect x="198" y="186" width="182" height="110" rx="24" fill="#ffffff" stroke="${palette.ink}" stroke-opacity="0.08" />
    <rect x="396" y="186" width="182" height="110" rx="24" fill="${palette.tintStrong}" />
    <rect x="98" y="370" width="182" height="110" rx="24" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.28" />
    <rect x="298" y="370" width="182" height="110" rx="24" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.28" />
    <path d="M270 102V142M270 142H91V186M270 142V186M270 142H487V186M190 296V332H190V370M390 296V332H390V370" fill="none" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M214 50H328M36 236H146M234 236H344M432 236H542M136 420H244M336 420H444" stroke="${palette.ink}" stroke-opacity="0.18" stroke-width="14" stroke-linecap="round" />
  </g>`
    case 'ai-rules-3':
      return `
  <g transform="translate(924 138)">
    <rect x="0" y="42" width="234" height="172" rx="28" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.36" />
    <rect x="344" y="42" width="234" height="172" rx="28" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.28" />
    <rect x="94" y="290" width="390" height="176" rx="34" fill="${palette.tintStrong}" />
    <path d="M44 364C116 300 200 268 296 268C392 268 476 302 548 366" fill="none" stroke="${palette.accent}" stroke-width="14" stroke-linecap="round" />
    <path d="M42 110H180M42 146H164M388 110H526M388 146H510M146 344H430M146 384H392M146 424H446" stroke="${palette.ink}" stroke-opacity="0.18" stroke-width="14" stroke-linecap="round" />
    <circle cx="292" cy="364" r="26" fill="#ffffff" stroke="${palette.accentWarm}" stroke-width="10" />
    <circle cx="292" cy="364" r="8" fill="${palette.accentWarm}" />
  </g>`
    case 'naming':
      return `
  <g transform="translate(918 138)">
    <rect x="0" y="40" width="180" height="86" rx="22" fill="${palette.tintStrong}" />
    <rect x="214" y="40" width="180" height="86" rx="22" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.34" />
    <rect x="428" y="40" width="180" height="86" rx="22" fill="${palette.tintStrong}" />
    <rect x="106" y="220" width="396" height="118" rx="30" fill="#ffffff" stroke="${palette.ink}" stroke-opacity="0.08" />
    <rect x="28" y="420" width="172" height="90" rx="22" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.22" />
    <rect x="218" y="420" width="172" height="90" rx="22" fill="${palette.tintStrong}" />
    <rect x="408" y="420" width="172" height="90" rx="22" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.28" />
    <path d="M90 126V172H304V220M304 338V378H114V420M304 338V378H304V420M304 338V378H494V420" fill="none" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M34 82H146M248 82H360M462 82H574M164 280H444M66 470H160M256 470H350M446 470H540" stroke="${palette.ink}" stroke-opacity="0.18" stroke-width="12" stroke-linecap="round" />
  </g>`
    case 'film':
      return `
  <g transform="translate(918 128)">
    <rect x="12" y="24" width="584" height="420" rx="36" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.18" />
    <rect x="44" y="56" width="520" height="356" rx="28" fill="${palette.tintStrong}" />
    <path d="M194 158L194 310L334 234Z" fill="${palette.accent}" />
    <circle cx="446" cy="234" r="96" fill="none" stroke="${palette.accentWarm}" stroke-opacity="0.7" stroke-width="16" />
    <circle cx="446" cy="234" r="54" fill="none" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="14" />
    <path d="M82 456H526" stroke="${palette.ink}" stroke-opacity="0.08" stroke-width="18" stroke-linecap="round" />
    <rect x="62" y="486" width="136" height="74" rx="20" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.34" />
    <rect x="230" y="486" width="136" height="74" rx="20" fill="${palette.tintStrong}" />
    <rect x="398" y="486" width="136" height="74" rx="20" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.24" />
  </g>`
    case 'retail':
      return `
  <g transform="translate(922 130)">
    <rect x="0" y="378" width="564" height="22" rx="11" fill="${palette.ink}" fill-opacity="0.08" />
    <rect x="46" y="274" width="118" height="104" rx="20" fill="${palette.tintStrong}" />
    <rect x="180" y="220" width="134" height="158" rx="22" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.28" />
    <rect x="332" y="158" width="154" height="220" rx="24" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.24" transform="rotate(-6 332 158)" />
    <path d="M88 458C152 436 214 426 274 426C364 426 450 448 532 492" fill="none" stroke="${palette.accent}" stroke-width="14" stroke-linecap="round" />
    <path d="M516 492L542 490L528 516" fill="none" stroke="${palette.accent}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M92 306H118M214 286H280M362 264H444" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="12" stroke-linecap="round" />
    <circle cx="488" cy="112" r="56" fill="${palette.tint}" />
    <path d="M458 112H518M488 82V142" stroke="${palette.accentWarm}" stroke-width="12" stroke-linecap="round" />
  </g>`
    case 'lighthouse':
      return `
  <g transform="translate(930 126)">
    <path d="M284 70L392 338H176Z" fill="${palette.tintStrong}" />
    <rect x="246" y="214" width="76" height="226" rx="24" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.22" />
    <path d="M284 90L520 0V180L284 140Z" fill="${palette.accentSoft}" fill-opacity="0.32" />
    <path d="M284 122L598 30V234L284 170Z" fill="${palette.accent}" fill-opacity="0.18" />
    <rect x="56" y="476" width="146" height="26" rx="13" fill="${palette.tintStrong}" />
    <rect x="56" y="526" width="264" height="26" rx="13" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.3" />
    <rect x="56" y="576" width="388" height="26" rx="13" fill="${palette.tintStrong}" />
    <circle cx="284" cy="168" r="32" fill="${palette.accent}" />
  </g>`
    case 'react-context':
      return `
  <g transform="translate(926 132)">
    <circle cx="284" cy="274" r="94" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.24" stroke-width="16" />
    <circle cx="284" cy="274" r="38" fill="${palette.tintStrong}" />
    <circle cx="104" cy="144" r="44" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.3" stroke-width="12" />
    <circle cx="478" cy="124" r="52" fill="${palette.tintStrong}" />
    <circle cx="520" cy="374" r="46" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.22" stroke-width="12" />
    <circle cx="132" cy="438" r="54" fill="${palette.tintStrong}" />
    <path d="M146 170C184 198 214 218 246 242M430 152C394 190 368 212 332 240M470 342C424 324 390 314 346 296M178 420C212 376 230 350 250 310" fill="none" stroke="${palette.accent}" stroke-width="12" stroke-linecap="round" />
    <path d="M182 540H386M210 580H520" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="14" stroke-linecap="round" />
  </g>`
    case 'tdd':
      return `
  <g transform="translate(932 138)">
    <rect x="28" y="56" width="158" height="92" rx="24" fill="#fee2e2" />
    <rect x="214" y="56" width="158" height="92" rx="24" fill="#dcfce7" />
    <rect x="400" y="56" width="158" height="92" rx="24" fill="${palette.tintStrong}" />
    <text x="80" y="113" fill="#991b1b" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700">TEST</text>
    <text x="272" y="113" fill="#166534" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700">CODE</text>
    <text x="424" y="113" fill="${palette.label}" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="700">REFACTOR</text>
    <path d="M152 204C244 182 338 184 432 210" fill="none" stroke="${palette.accent}" stroke-width="14" stroke-linecap="round" />
    <path d="M438 198L462 210L438 222" fill="none" stroke="${palette.accent}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M466 286C384 342 296 354 202 328" fill="none" stroke="${palette.accentSoft}" stroke-width="14" stroke-linecap="round" />
    <path d="M210 316L188 326L206 344" fill="none" stroke="${palette.accentSoft}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M124 392H494M124 444H438M124 496H474" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="14" stroke-linecap="round" />
  </g>`
    case 'email':
      return `
  <g transform="translate(926 132)">
    <rect x="76" y="124" width="428" height="282" rx="30" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.22" stroke-width="12" />
    <path d="M92 152L292 292L490 152" fill="none" stroke="${palette.accentSoft}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M92 378L226 268M490 378L358 268" fill="none" stroke="${palette.ink}" stroke-opacity="0.14" stroke-width="12" stroke-linecap="round" />
    <circle cx="544" cy="132" r="22" fill="${palette.accentWarm}" />
    <circle cx="592" cy="178" r="14" fill="${palette.accent}" />
    <circle cx="618" cy="230" r="10" fill="${palette.accentSoft}" />
    <path d="M548 132C586 160 608 194 620 234" fill="none" stroke="${palette.accentWarm}" stroke-width="10" stroke-linecap="round" />
    <path d="M116 486H498M116 536H426" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="14" stroke-linecap="round" />
  </g>`
    case 'privacy':
      return `
  <g transform="translate(926 124)">
    <path d="M296 110L350 248H242Z" fill="${palette.tintStrong}" />
    <rect x="272" y="242" width="48" height="186" rx="18" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.24" />
    <path d="M296 118C198 150 130 214 92 308M296 118C396 146 466 214 504 308" fill="none" stroke="${palette.accent}" stroke-width="14" stroke-linecap="round" />
    <path d="M296 170C234 188 186 228 158 284M296 170C358 188 406 228 434 284" fill="none" stroke="${palette.accentSoft}" stroke-width="12" stroke-linecap="round" />
    <path d="M456 458C456 530 400 588 328 628C256 588 200 530 200 458C200 392 252 340 328 340C404 340 456 392 456 458Z" fill="#ffffff" fill-opacity="0.86" stroke="${palette.accentWarm}" stroke-width="12" />
    <circle cx="328" cy="454" r="48" fill="${palette.tintStrong}" />
  </g>`
    case 'neutrality':
      return `
  <g transform="translate(924 132)">
    <path d="M42 156H224C260 156 282 190 320 190H544" fill="none" stroke="${palette.accent}" stroke-width="18" stroke-linecap="round" />
    <path d="M42 248H188C228 248 254 212 304 212H544" fill="none" stroke="${palette.accentSoft}" stroke-width="18" stroke-linecap="round" />
    <path d="M42 340H214C258 340 286 378 334 378H544" fill="none" stroke="${palette.accentWarm}" stroke-opacity="0.78" stroke-width="18" stroke-linecap="round" />
    <rect x="238" y="118" width="86" height="302" rx="32" fill="#ffffff" stroke="${palette.ink}" stroke-opacity="0.08" />
    <circle cx="280" cy="210" r="26" fill="${palette.tintStrong}" />
    <circle cx="280" cy="294" r="26" fill="${palette.tintStrong}" />
    <circle cx="280" cy="378" r="26" fill="${palette.tintStrong}" />
    <circle cx="88" cy="156" r="16" fill="${palette.accent}" />
    <circle cx="88" cy="248" r="16" fill="${palette.accentSoft}" />
    <circle cx="88" cy="340" r="16" fill="${palette.accentWarm}" />
    <circle cx="510" cy="190" r="18" fill="${palette.accent}" />
    <circle cx="510" cy="212" r="18" fill="${palette.accentSoft}" />
    <circle cx="510" cy="378" r="18" fill="${palette.accentWarm}" />
  </g>`
    case 'variable-font':
      return `
  <g transform="translate(918 124)">
    <rect x="40" y="54" width="248" height="364" rx="30" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.22" />
    <path d="M132 344L198 126H230L298 344H248L230 286H162L144 344Z" fill="${palette.ink}" fill-opacity="0.88" transform="translate(-28 0)" />
    <path d="M440 120V356M380 176H500M388 298H480" fill="none" stroke="${palette.accentSoft}" stroke-width="14" stroke-linecap="round" />
    <circle cx="440" cy="176" r="18" fill="${palette.accentSoft}" />
    <circle cx="440" cy="298" r="18" fill="${palette.accent}" />
    <path d="M356 468H548M356 520H500M356 572H564" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="14" stroke-linecap="round" />
    <rect x="348" y="60" width="228" height="334" rx="28" fill="${palette.tintStrong}" fill-opacity="0.56" />
  </g>`
    case 'schema':
      return `
  <g transform="translate(922 128)">
    <rect x="0" y="60" width="184" height="118" rx="24" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.32" />
    <rect x="218" y="60" width="184" height="118" rx="24" fill="${palette.tintStrong}" />
    <rect x="108" y="244" width="184" height="118" rx="24" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.24" />
    <rect x="326" y="244" width="184" height="118" rx="24" fill="#ffffff" stroke="${palette.ink}" stroke-opacity="0.08" />
    <rect x="218" y="430" width="184" height="118" rx="24" fill="${palette.tintStrong}" />
    <path d="M92 178V214H200V244M310 178V214H310V244M200 362V396H310V430M418 362V396H310" fill="none" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M36 110H148M254 110H366M144 294H256M362 294H474M254 480H366" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="12" stroke-linecap="round" />
  </g>`
    case 'coverage':
      return `
  <g transform="translate(920 126)">
    <rect x="36" y="36" width="510" height="320" rx="34" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.22" />
    <rect x="96" y="94" width="210" height="164" rx="22" fill="${palette.tintStrong}" />
    <rect x="276" y="126" width="198" height="144" rx="22" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.3" />
    <rect x="176" y="220" width="236" height="168" rx="24" fill="none" stroke="${palette.accentWarm}" stroke-width="12" />
    <circle cx="294" cy="214" r="58" fill="${palette.accent}" fill-opacity="0.2" />
    <circle cx="294" cy="214" r="18" fill="${palette.accent}" />
    <path d="M86 448H520M86 504H454M86 560H390" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="14" stroke-linecap="round" />
  </g>`
    case 'revision':
      return `
  <g transform="translate(924 128)">
    <rect x="88" y="86" width="362" height="246" rx="30" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.3" transform="rotate(-5 88 86)" />
    <rect x="118" y="118" width="362" height="246" rx="30" fill="${palette.tintStrong}" transform="rotate(2 118 118)" />
    <rect x="150" y="148" width="362" height="246" rx="30" fill="#ffffff" stroke="${palette.accent}" stroke-opacity="0.24" />
    <path d="M216 218H424M216 258H392M216 298H446" stroke="${palette.ink}" stroke-opacity="0.16" stroke-width="14" stroke-linecap="round" />
    <path d="M476 464C416 500 350 516 278 516C214 516 162 500 120 468" fill="none" stroke="${palette.accent}" stroke-width="14" stroke-linecap="round" />
    <path d="M120 468L138 450L140 478" fill="none" stroke="${palette.accent}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M476 464L456 446L450 472" fill="none" stroke="${palette.accent}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
    <rect x="454" y="502" width="100" height="26" rx="13" fill="${palette.tintStrong}" />
    <rect x="336" y="542" width="218" height="26" rx="13" fill="#ffffff" stroke="${palette.accentSoft}" stroke-opacity="0.3" />
  </g>`
    default:
      return renderMotif('revision', palette)
  }
}

function renderAmbientField(side: BlogPostSide, palette: BlogCoverPalette) {
  switch (side) {
    case 'engineering':
      return `
  <g opacity="0.56">
    <rect x="122" y="170" width="334" height="210" rx="30" fill="#ffffff" fill-opacity="0.64" stroke="${palette.accent}" stroke-opacity="0.14" />
    <rect x="168" y="430" width="268" height="150" rx="28" fill="${palette.tintStrong}" fill-opacity="0.52" />
    <path d="M154 226H370M154 262H334M154 298H390M154 334H286" stroke="${palette.ink}" stroke-opacity="0.14" stroke-width="12" stroke-linecap="round" />
    <path d="M218 586C268 520 338 486 430 484" fill="none" stroke="${palette.accentSoft}" stroke-width="12" stroke-linecap="round" />
    <path d="M470 190V544M520 240V594" stroke="${palette.accent}" stroke-opacity="0.14" stroke-width="2" />
  </g>`
    case 'production':
      return `
  <g opacity="0.56">
    <circle cx="302" cy="278" r="146" fill="${palette.accentSoft}" fill-opacity="0.16" />
    <circle cx="302" cy="278" r="84" fill="none" stroke="${palette.accentWarm}" stroke-opacity="0.34" stroke-width="18" />
    <rect x="130" y="148" width="380" height="268" rx="34" fill="#ffffff" fill-opacity="0.5" stroke="${palette.ink}" stroke-opacity="0.1" />
    <rect x="162" y="178" width="316" height="208" rx="26" fill="${palette.tintStrong}" fill-opacity="0.54" />
    <path d="M170 540H500M204 586H452" stroke="${palette.ink}" stroke-opacity="0.14" stroke-width="14" stroke-linecap="round" />
  </g>`
    case 'bridge':
      return `
  <g opacity="0.56">
    <circle cx="224" cy="250" r="116" fill="${palette.accentSoft}" fill-opacity="0.12" />
    <circle cx="416" cy="422" r="126" fill="${palette.accent}" fill-opacity="0.08" />
    <circle cx="246" cy="250" r="34" fill="#ffffff" fill-opacity="0.8" stroke="${palette.accentSoft}" stroke-opacity="0.34" stroke-width="10" />
    <circle cx="406" cy="420" r="34" fill="#ffffff" fill-opacity="0.8" stroke="${palette.accent}" stroke-opacity="0.28" stroke-width="10" />
    <path d="M276 268C322 300 344 334 372 388" fill="none" stroke="${palette.ink}" stroke-opacity="0.14" stroke-width="12" stroke-linecap="round" />
    <path d="M126 544H434M166 590H498" stroke="${palette.ink}" stroke-opacity="0.14" stroke-width="14" stroke-linecap="round" />
  </g>`
  }
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
