import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const outputRoot = path.resolve(process.cwd(), 'public/media')

const palettes = {
  engineering: {
    background: ['#07111f', '#10233d'],
    accent: '#38bdf8',
    accentAlt: '#22c55e',
    text: '#e2e8f0',
    panel: '#0b1220',
  },
  production: {
    background: ['#1a0f12', '#3f1d24'],
    accent: '#f59e0b',
    accentAlt: '#fb7185',
    text: '#fff7ed',
    panel: '#221316',
  },
}

const imageConfigs = [
  {
    category: 'engineering',
    fileName: 'andacity-booking-system.svg',
    eyebrow: 'Engineering Case Study',
    title: 'Andacity Booking System',
    subtitle: 'Canonical query contracts for dependable booking search',
    motif: 'query-grid',
  },
  {
    category: 'engineering',
    fileName: 'timeshare-search-rentals.svg',
    eyebrow: 'Engineering Case Study',
    title: 'Timeshare Search & Rentals',
    subtitle: 'Dense listings redesigned for comparison and trust',
    motif: 'listing-columns',
  },
  {
    category: 'engineering',
    fileName: 'ancestry-dna-kit-activation.svg',
    eyebrow: 'Engineering Case Study',
    title: 'Ancestry DNA Kit Activation',
    subtitle: 'High-trust flow design with explicit state and calm validation',
    motif: 'state-ladder',
  },
  {
    category: 'production',
    fileName: 'bellagio-fountain-film.svg',
    eyebrow: 'Production Case Study',
    title: 'Bellagio Fountain Film',
    subtitle: 'Live-performance coverage shaped into a coherent visual sequence',
    motif: 'fountain-arcs',
  },
]

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function wrapLines(text, maxCharacters) {
  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word
    if (nextLine.length > maxCharacters && currentLine) {
      lines.push(currentLine)
      currentLine = word
      continue
    }

    currentLine = nextLine
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

function renderMotif(name, palette) {
  switch (name) {
    case 'query-grid':
      return `
        <g opacity="0.9">
          <rect x="120" y="150" width="280" height="120" rx="20" fill="${palette.accent}" opacity="0.14"/>
          <rect x="430" y="150" width="220" height="120" rx="20" fill="${palette.accentAlt}" opacity="0.14"/>
          <rect x="680" y="150" width="400" height="120" rx="20" fill="${palette.accent}" opacity="0.12"/>
          <rect x="120" y="300" width="460" height="150" rx="24" fill="${palette.panel}" opacity="0.78"/>
          <rect x="610" y="300" width="470" height="150" rx="24" fill="${palette.panel}" opacity="0.78"/>
          <path d="M220 210H330" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.8"/>
          <path d="M520 210H590" stroke="${palette.accentAlt}" stroke-width="8" stroke-linecap="round" opacity="0.8"/>
          <path d="M760 210H980" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.75"/>
          <path d="M220 360H500" stroke="${palette.text}" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
          <path d="M220 400H420" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
          <path d="M710 360H980" stroke="${palette.text}" stroke-width="8" stroke-linecap="round" opacity="0.5"/>
          <path d="M710 400H930" stroke="${palette.accentAlt}" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
        </g>`
    case 'listing-columns':
      return `
        <g opacity="0.92">
          <rect x="135" y="140" width="260" height="290" rx="28" fill="${palette.panel}" opacity="0.82"/>
          <rect x="425" y="140" width="260" height="290" rx="28" fill="${palette.panel}" opacity="0.82"/>
          <rect x="715" y="140" width="350" height="290" rx="28" fill="${palette.panel}" opacity="0.82"/>
          <path d="M180 190H310" stroke="${palette.text}" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
          <path d="M180 235H270" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.75"/>
          <path d="M180 280H340" stroke="${palette.text}" stroke-width="8" stroke-linecap="round" opacity="0.45"/>
          <path d="M470 190H600" stroke="${palette.text}" stroke-width="8" stroke-linecap="round" opacity="0.6"/>
          <path d="M470 235H560" stroke="${palette.accentAlt}" stroke-width="8" stroke-linecap="round" opacity="0.75"/>
          <path d="M470 280H640" stroke="${palette.text}" stroke-width="8" stroke-linecap="round" opacity="0.45"/>
          <rect x="770" y="188" width="240" height="44" rx="22" fill="${palette.accent}" opacity="0.18"/>
          <path d="M770 285H990" stroke="${palette.text}" stroke-width="8" stroke-linecap="round" opacity="0.48"/>
          <path d="M770 330H960" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.72"/>
        </g>`
    case 'state-ladder':
      return `
        <g opacity="0.94">
          <path d="M260 160V420" stroke="${palette.accent}" stroke-width="8" stroke-dasharray="10 14" opacity="0.72"/>
          <path d="M600 160V420" stroke="${palette.accentAlt}" stroke-width="8" stroke-dasharray="10 14" opacity="0.72"/>
          <path d="M940 160V420" stroke="${palette.accent}" stroke-width="8" stroke-dasharray="10 14" opacity="0.72"/>
          <rect x="170" y="150" width="180" height="78" rx="20" fill="${palette.panel}" opacity="0.86"/>
          <rect x="510" y="240" width="180" height="78" rx="20" fill="${palette.panel}" opacity="0.86"/>
          <rect x="850" y="330" width="180" height="78" rx="20" fill="${palette.panel}" opacity="0.86"/>
          <circle cx="260" cy="188" r="18" fill="${palette.accent}" opacity="0.7"/>
          <circle cx="600" cy="278" r="18" fill="${palette.accentAlt}" opacity="0.7"/>
          <circle cx="940" cy="368" r="18" fill="${palette.accent}" opacity="0.7"/>
        </g>`
    case 'schema-blocks':
      return `
        <g opacity="0.9">
          <rect x="150" y="150" width="280" height="140" rx="24" fill="${palette.panel}" opacity="0.82"/>
          <rect x="470" y="120" width="240" height="110" rx="22" fill="${palette.accent}" opacity="0.14"/>
          <rect x="470" y="260" width="240" height="110" rx="22" fill="${palette.accentAlt}" opacity="0.14"/>
          <rect x="750" y="150" width="300" height="220" rx="24" fill="${palette.panel}" opacity="0.82"/>
          <path d="M430 220H470" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.7"/>
          <path d="M710 175H750" stroke="${palette.accentAlt}" stroke-width="8" stroke-linecap="round" opacity="0.7"/>
          <path d="M710 315H750" stroke="${palette.accent}" stroke-width="8" stroke-linecap="round" opacity="0.7"/>
        </g>`
    case 'signal-timeline':
      return `
        <g opacity="0.92">
          <path d="M120 300H1080" stroke="${palette.text}" stroke-width="4" opacity="0.26"/>
          <circle cx="240" cy="300" r="30" fill="${palette.accent}" opacity="0.3"/>
          <circle cx="500" cy="300" r="30" fill="${palette.accentAlt}" opacity="0.3"/>
          <circle cx="760" cy="300" r="30" fill="${palette.accent}" opacity="0.3"/>
          <circle cx="960" cy="300" r="30" fill="${palette.accentAlt}" opacity="0.3"/>
          <rect x="195" y="170" width="90" height="72" rx="18" fill="${palette.panel}" opacity="0.86"/>
          <rect x="455" y="350" width="90" height="72" rx="18" fill="${palette.panel}" opacity="0.86"/>
          <rect x="715" y="170" width="90" height="72" rx="18" fill="${palette.panel}" opacity="0.86"/>
          <rect x="915" y="350" width="90" height="72" rx="18" fill="${palette.panel}" opacity="0.86"/>
        </g>`
    case 'fountain-arcs':
      return `
        <g opacity="0.92">
          <path d="M140 360C220 240 320 180 420 360" stroke="${palette.accent}" stroke-width="10" fill="none" opacity="0.78"/>
          <path d="M330 390C430 180 570 100 690 390" stroke="${palette.accentAlt}" stroke-width="10" fill="none" opacity="0.72"/>
          <path d="M600 370C700 210 850 130 1020 370" stroke="${palette.accent}" stroke-width="10" fill="none" opacity="0.78"/>
          <circle cx="245" cy="262" r="10" fill="${palette.accent}" opacity="0.82"/>
          <circle cx="515" cy="188" r="10" fill="${palette.accentAlt}" opacity="0.82"/>
          <circle cx="820" cy="218" r="10" fill="${palette.accent}" opacity="0.82"/>
        </g>`
    case 'profile-frame':
      return `
        <g opacity="0.92">
          <rect x="170" y="120" width="320" height="300" rx="28" fill="${palette.panel}" opacity="0.84"/>
          <circle cx="330" cy="235" r="70" fill="${palette.accent}" opacity="0.2"/>
          <path d="M280 270C295 238 320 220 330 220C340 220 365 238 380 270" stroke="${palette.text}" stroke-width="8" stroke-linecap="round" opacity="0.64"/>
          <rect x="580" y="150" width="420" height="54" rx="27" fill="${palette.accent}" opacity="0.16"/>
          <rect x="580" y="230" width="350" height="18" rx="9" fill="${palette.text}" opacity="0.46"/>
          <rect x="580" y="270" width="390" height="18" rx="9" fill="${palette.text}" opacity="0.46"/>
          <rect x="580" y="310" width="300" height="18" rx="9" fill="${palette.accentAlt}" opacity="0.6"/>
        </g>`
    case 'format-grid':
      return `
        <g opacity="0.92">
          <rect x="150" y="150" width="250" height="280" rx="24" fill="${palette.panel}" opacity="0.82"/>
          <rect x="450" y="190" width="260" height="200" rx="24" fill="${palette.panel}" opacity="0.82"/>
          <rect x="760" y="130" width="220" height="320" rx="24" fill="${palette.panel}" opacity="0.82"/>
          <rect x="205" y="205" width="140" height="170" rx="18" fill="${palette.accent}" opacity="0.16"/>
          <rect x="515" y="240" width="130" height="100" rx="16" fill="${palette.accentAlt}" opacity="0.18"/>
          <rect x="815" y="190" width="110" height="200" rx="16" fill="${palette.accent}" opacity="0.16"/>
        </g>`
    default:
      return ''
  }
}

function buildSvg(config) {
  const palette = palettes[config.category]
  const titleLines = wrapLines(config.title, 22)
  const titleMarkup = titleLines
    .map((line, index) => {
      const y = 480 + (index * 58)
      return `<text x="86" y="${y}" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="800" fill="${palette.text}">${escapeXml(line)}</text>`
    })
    .join('')
  const subtitleY = 480 + (titleLines.length * 58) + 24

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(config.title)}</title>
  <desc id="desc">${escapeXml(config.subtitle)}</desc>
  <defs>
    <linearGradient id="grad-${escapeXml(config.fileName.replace('.svg', ''))}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${palette.background[0]}" />
      <stop offset="100%" stop-color="${palette.background[1]}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#grad-${escapeXml(config.fileName.replace('.svg', ''))})"/>
  <circle cx="140" cy="120" r="190" fill="${palette.accent}" opacity="0.08"/>
  <circle cx="1080" cy="570" r="230" fill="${palette.accentAlt}" opacity="0.08"/>
  <rect x="86" y="78" width="270" height="40" rx="20" fill="${palette.panel}" opacity="0.9"/>
  <text x="221" y="104" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="${palette.text}" opacity="0.88">${escapeXml(config.eyebrow)}</text>
  ${renderMotif(config.motif, palette)}
  <g>
    ${titleMarkup}
    <text x="86" y="${subtitleY}" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="500" fill="${palette.text}" opacity="0.82">${escapeXml(config.subtitle)}</text>
  </g>
</svg>`
}

async function main() {
  for (const config of imageConfigs) {
    const outputDir = path.join(outputRoot, config.category)
    await mkdir(outputDir, { recursive: true })
    const outputPath = path.join(outputDir, config.fileName)
    await writeFile(outputPath, buildSvg(config), 'utf8')
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})