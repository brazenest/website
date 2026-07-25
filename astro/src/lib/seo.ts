/**
 * Search + social metadata (v6.2). One place that decides what every page claims about
 * itself, so titles, descriptions, canonicals, cards and structured data can't drift apart.
 *
 * Layering, least specific to most:
 *   1. FALLBACK below — compiled-in, guarantees a sane tag even on an empty CMS.
 *   2. siteMeta.seo — site-wide, authorable in the Payload admin.
 *   3. PAGE_KEYWORDS / the props each page passes to Base.astro — page-specific.
 *   4. A document's own seo group (posts) — the author's last word, always wins.
 *
 * A NOTE ON <meta name="keywords">: Google dropped it as a ranking signal in 2009 and Bing
 * treats it at best as a spam signal. It is emitted here because it was asked for and it is
 * harmless — but the terms are deliberately ALSO routed somewhere that is actually read:
 * the JSON-LD `keywords` property, article:tag on posts, and (most importantly) the titles
 * and descriptions below, which are the tags that genuinely move rankings.
 */
import { siteMeta } from './content'
import type { Post, PostCategory } from '../data/types'

/** Must match `site` in astro.config.mjs and SITE in pages/sitemap.xml.ts. */
export const SITE = 'https://aldengillespy.com'

/** Compiled-in floor, used only where the CMS has nothing to say. */
const FALLBACK = {
  titleSuffix: ' — Alden Gillespy',
  description:
    'Alden Gillespy builds and operates software products end to end — and shoots the films. Engineering case studies, cinematic work, and working notes on both.',
  jobTitle: 'Software Engineer & Video Producer',
}

const seoMeta = siteMeta.seo ?? {
  titleSuffix: null,
  defaultDescription: null,
  defaultKeywords: [],
  twitterSite: null,
  jobTitle: null,
  ogImage: null,
}

export const titleSuffix = seoMeta.titleSuffix || FALLBACK.titleSuffix
export const defaultDescription = seoMeta.defaultDescription || FALLBACK.description
export const twitterSite = seoMeta.twitterSite || null
export const jobTitle = seoMeta.jobTitle || FALLBACK.jobTitle

/**
 * Per-page target terms. These live in code rather than the CMS because the pages
 * themselves live in code — a page and the terms it goes after ship together.
 *
 * The split is deliberate: /about chases the NAME, /engineering chases the technology,
 * /media chases the craft, /contact chases hiring intent. Pages that competed for the same
 * terms would only cannibalise each other.
 */
export const PAGE_KEYWORDS = {
  home: [
    'software engineer portfolio',
    'full-stack engineer',
    'product engineer',
    'founder engineer',
    'Salt Lake City software engineer',
  ],
  engineering: [
    'software engineering portfolio',
    'engineering case studies',
    'full-stack development',
    'TypeScript engineer',
    'React engineer',
    'product engineering',
  ],
  media: [
    'video production',
    'cinematography',
    'film production Utah',
    'commercial video producer',
    'Shadowcat Pictures',
  ],
  blog: [
    'software engineering blog',
    'web development blog',
    'engineering essays',
    'developer writing',
  ],
  about: [
    'Alden Gillespy bio',
    'about Alden Gillespy',
    'software engineer biography',
    'full-stack product builder',
  ],
  contact: [
    'hire software engineer',
    'contact Alden Gillespy',
    'freelance software engineer',
    'video production inquiry',
  ],
} as const

/** Terms a blog post inherits from its category when the author has named none. */
const CATEGORY_KEYWORDS: Record<PostCategory, string[]> = {
  engineering: ['software engineering', 'web development', 'programming'],
  cinematic: ['video production', 'filmmaking', 'cinematography'],
  process: ['engineering process', 'developer tooling', 'best practices'],
  other: ['technology', 'commentary'],
}

/** Merge term lists, trim, drop blanks, and de-duplicate case-insensitively (order kept). */
export function mergeKeywords(...lists: (readonly string[] | undefined | null)[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const list of lists) {
    for (const raw of list ?? []) {
      const term = (raw ?? '').trim()
      if (!term) continue
      const k = term.toLowerCase()
      if (seen.has(k)) continue
      seen.add(k)
      out.push(term)
    }
  }
  return out
}

/**
 * Search results cut a title around here. Past it, appending the brand suffix buys nothing —
 * it is the part that gets truncated away.
 */
const TITLE_BUDGET = 60

/**
 * Append the site suffix, unless:
 *   - the title already carries the name (else /about reads "About Alden Gillespy — …
 *     — Alden Gillespy"), or
 *   - the title has already spent the whole budget. Several of the legacy post titles run
 *     to 80+ characters; bolting the brand onto the end of those only adds weight to a
 *     string that is already being clipped. The real fix for those is a shorter
 *     seo.metaTitle authored per post in the admin, which overrides this entirely.
 */
export function buildTitle(title: string): string {
  const t = title.trim()
  const name = titleSuffix.replace(/^\s*[—-]\s*/, '').trim()
  if (!t) return name
  if (name && t.toLowerCase().includes(name.toLowerCase())) return t
  if (t.length >= TITLE_BUDGET) return t
  return t + titleSuffix
}

/** Absolute URL for a site-relative path. Social tags and canonicals must never be relative. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return new URL(path, SITE).href
}

/**
 * Canonical URL for a pathname.
 *
 * Astro builds with `format: 'file'`, which means the build-time router reports the OUTPUT
 * filename — '/about.html', '/index.html' — not the URL the page is served at. Emitting
 * that verbatim would canonicalise every page to a path that no link, redirect or sitemap
 * entry uses, and split ranking signals across two URLs for the same page. So: drop the
 * extension, collapse index to root, and drop any trailing slash, leaving exactly the form
 * used by the nav, public/_redirects and pages/sitemap.xml.ts.
 */
export function canonicalFor(pathname: string): string {
  const clean = pathname
    .replace(/\/index\.html$/, '/')
    .replace(/\.html$/, '')
    .replace(/\/+$/, '')
  return absoluteUrl(clean || '/')
}

/** Where a page's generated social card lives. Kept in step with pages/og/[...slug].png.ts. */
export function ogImageFor(key: string): string {
  return absoluteUrl(`/og/${key}.png`)
}

/** Clamp a description to a length search results won't cut mid-word. */
export function clampDescription(text: string, max = 160): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max - 1)
  const at = cut.lastIndexOf(' ')
  return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[,;:.\s]+$/, '') + '…'
}

// ---------------------------------------------------------------------------------------
// Structured data. Emitted as JSON-LD, which IS read by search engines — this is where the
// keyword work actually earns something.
// ---------------------------------------------------------------------------------------

const PERSON_ID = `${SITE}/#person`

/** The Person entity every page points at, so the site resolves to one identity. */
export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Alden Gillespy',
    url: SITE,
    jobTitle,
    sameAs: siteMeta.social
      .map((s) => s.url)
      .filter((u) => /^https?:\/\//.test(u)),
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE}/#website`,
    url: SITE,
    name: 'Alden Gillespy',
    description: defaultDescription,
    publisher: { '@id': PERSON_ID },
  }
}

/** A crumb trail for a nested page. Pass [{name, path}, …] from the site root inward. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  }
}

/**
 * dateModified deliberately falls back to the publish date rather than Payload's updatedAt.
 * updatedAt records the last DATABASE write — the v6.1 archive import stamped all thirteen
 * posts at once, and every re-seed touches them again. Publishing that as a revision date
 * would tell search engines a 2017 essay was rewritten this morning, which is both untrue
 * and the kind of freshness signal that gets discounted. If genuine revision dates are
 * wanted later, add an explicit `revisedAt` field to the Posts collection and read it here.
 */
function modifiedDate(post: Post): string | undefined {
  return post.publishedAt || undefined
}

export function blogPostingSchema(post: Post, url: string, image: string, keywords: string[]) {
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    headline: post.title,
    description: post.excerpt || defaultDescription,
    url,
    image,
    datePublished: post.publishedAt || undefined,
    dateModified: modifiedDate(post),
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    mainEntityOfPage: url,
    keywords: keywords.join(', '),
    articleSection: post.category ?? undefined,
  }
}

/** Terms for a post: the author's own, else its category's, plus the title's own words. */
export function postKeywords(post: Post): string[] {
  return mergeKeywords(
    post.seo?.keywords,
    post.category ? CATEGORY_KEYWORDS[post.category] : [],
    seoMeta.defaultKeywords,
  )
}

/** Wrap one or more schema nodes into a single @graph document. */
export function jsonLdGraph(...nodes: object[]) {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes })
}

/** Site-wide terms, exposed so pages can merge them into their own list. */
export const siteKeywords: string[] = seoMeta.defaultKeywords ?? []

/**
 * The site-wide social card. EVERY og:image on the site is a /og/*.png, including the ones
 * backed by a real upload — the endpoint composites the uploaded photo to exactly 1200×630
 * itself. Uploads otherwise pass through Astro's asset pipeline, which content-hashes the
 * filename; a card URL that changes whenever the source is re-encoded is a card URL that
 * social platforms keep re-scraping and caching against the wrong page.
 */
export const siteOgImage: string = ogImageFor('site')
