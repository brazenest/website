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
  excerpt: string | null
  category: PostCategory | null
  readTime: number | null
  relatedVenture: string | null // venture slug
  body: RichText
}

export interface SiteMeta {
  proofNumbers: { value: string; label: string }[]
  contactEmail: string | null
  ctaText: string | null
  nav: { label: string; href: string }[]
  social: { label: string; url: string }[]
}
