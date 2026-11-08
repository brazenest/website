/**
 * Shapes written by the Payload export at src/export/index.ts (BUILD.md §6). Kept in sync by hand —
 * re-check after changing an export transform.
 */

export type Zone = 'neutral' | 'engineering' | 'media'

export interface MediaRef {
  filename: string
  alt: string
  width: number | null
  height: number | null
}

export interface Venture {
  name: string
  slug: string
  zone: Zone
  order: number
  tagline: string | null
  palette: {
    key: string
    hi: string
    deep: string
    lift: string
    on: string
    /** Optional dark-mode overrides (null when the key works on both grounds). */
    keyDark?: string | null
    hiDark?: string | null
    onDark?: string | null
  }
  links: { label: string; url: string }[]
  proposed: boolean
}

/** Payload lexical richText — root node tree. Rendered with a lexical-to-html serializer. */
export type RichText = { root: unknown } | null

export interface CaseStudy {
  venture: string | null // venture slug
  role: string | null
  timeline: string | null
  status: string | null
  hook: string | null
  stack: string[]
  identityNote: string | null
  problem: { drop: string | null; body: RichText } | null
  built: { lead: string; body: string }[]
  queryTrace: {
    query: string | null
    steps: { no: string; name: string; description: RichText; io: string | null }[]
    resultCount: string | null
    resultTime: string | null
    failureNote: RichText
  } | null
  decisions: { question: string; answer: RichText }[]
  screens: (MediaRef | null)[]
  /** show → render screens; nda → "under NDA" notice; hidden → omit the section. */
  interface: { mode: 'show' | 'nda' | 'hidden'; note: string | null }
  results: { value: string; label: string }[]
  resultsCaveat: string | null
}

export interface Film {
  venture: string | null // venture slug
  title: string
  logline: string | null
  year: string | null
  runtime: string | null
  camera: string | null
  youtubeId: string | null
  credits: { role: string; name: string }[]
  heroImage: MediaRef | null
  gradeGraded: MediaRef | null
  gradeRaw: MediaRef | null
  stills: (MediaRef | null)[]
  services: { title: string; note: string }[]
}

/** Legacy editorial taxonomy, carried over from the pre-v6 `categories` table. */
export type PostCategory = 'engineering' | 'cinematic' | 'process' | 'other'

/** Only published posts are exported — see the posts block in src/export/index.ts. */
export interface Post {
  title: string
  slug: string
  publishedAt: string | null
  updatedAt: string | null
  excerpt: string | null
  category: PostCategory | null
  readTime: number | null
  relatedVenture: string | null // venture slug
  /** null → the page falls back to generated cover art (lib/coverArt.ts). */
  coverImage: MediaRef | null
  seo: PageSeo
  body: RichText
}

/**
 * A blog category as authored in the `blog-categories` global: what the category means
 * visually. `defaultCover` is the image every post in the category inherits unless it sets
 * its own; null falls through to build-time generated art.
 */
export interface BlogCategory {
  value: PostCategory
  label: string | null
  accentVenture: string | null // venture slug
  defaultCover: MediaRef | null
}

/** Per-document search/social overrides. Every field is optional by design. */
export interface PageSeo {
  metaTitle: string | null
  metaDescription: string | null
  keywords: string[]
}

export interface About {
  metaDescription: string | null
  keywords: string[]
  /** null → the About page omits the portrait block entirely. */
  profilePhoto: MediaRef | null
  profilePhotoCaption: string | null
  location: string | null
  intro: string | null
  bio: RichText
  /** Images placed between sections; `after` names the section each one follows. */
  interludes: {
    image: MediaRef
    caption: string | null
    after: 'bio' | 'disciplines' | 'experience' | 'principles'
  }[]
  disciplines: {
    label: string
    tagline: string | null
    accent: 'engineering' | 'media'
    points: string[]
  }[]
  experience: {
    org: string
    role: string | null
    period: string | null
    summary: string | null
    stack: string | null
  }[]
  principles: { title: string; body: string | null }[]
  now: { text: string; updated: string | null } | null
  selectedWork: { label: string; href: string; blurb: string | null }[]
}

export interface SiteMeta {
  proofNumbers: { value: string; label: string }[]
  contactEmail: string | null
  ctaText: string | null
  nav: { label: string; href: string }[]
  social: { label: string; url: string }[]
  seo: {
    titleSuffix: string | null
    defaultDescription: string | null
    defaultKeywords: string[]
    twitterSite: string | null
    jobTitle: string | null
    ogImage: MediaRef | null
  }
}

/** The `resume` global — drives /resume and the generated /resume.pdf. */
export interface Resume {
  name: string
  headline: string | null
  location: string | null
  summary: string | null
  contact: { label: string; href: string | null }[]
  experience: {
    title: string
    organization: string
    timeframe: string | null
    context: string | null
    bullets: string[]
  }[]
  ventures: { name: string; category: string | null; status: string | null; tagline: string | null; href: string | null }[]
  skills: { title: string; items: string[] }[]
  /** Verified rows only — the export drops unverified ones. */
  education: { credential: string; institution: string | null; timeframe: string | null; description: string | null }[]
}
