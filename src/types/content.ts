export type SEO = {
  title: string
  description: string
}

export type EngineeringSection = {
  title: string
  content: string
}

export type EngineeringProject = {
  id: string
  title: string
  slug: string
  description: string
  cardDescriptor?: string
  cardHighlight?: string
  techStack: string[]
  sections: EngineeringSection[]
  seo?: SEO
  image?: string
}

export type EngineeringHeroContent = {
  headline: string
  byline?: string
  description: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

export type SystemThinkingItem = {
  title: string
  description: string
}

export type MediaItem = {
  type: 'image' | 'video'
  src: string
  alt?: string
  /**
   * Poster image for video media
   * Used as a lightweight preview before/instead of loading the full video
   * Enables poster-first strategy for better perceived performance
   */
  poster?: string
}

export type ProductionSection = {
  title: string
  content?: string
  media?: MediaItem[]
}

export type ProductionProject = {
  id: string
  title: string
  slug: string
  description: string
  cardContext?: string
  cardDemonstrates?: string
  media: MediaItem[]
  sections: ProductionSection[]
  seo?: SEO
  image?: string
}

export type ProductionHeroContent = {
  headline: string
  byline?: string
  description: string
  primaryCtaLabel: string
  primaryCtaHref: string
}

export type ProcessItem = {
  title: string
  description: string
}

export type HeroContent = {
  name: string
  headline: string
  description: string
}

export type SideLinkCardContent = {
  title: string
  description: string
  href: string
  ctaLabel: string
  themeHint: 'engineering' | 'production'
}

export type AboutPreviewContent = {
  eyebrow?: string
  heading: string
  description: string
  href: string
  ctaLabel: string
}

export type AboutContent = {
  title: string
  intro: string
  paragraphs: string[]
}

export type BlogPostSide = 'engineering' | 'production' | 'bridge'

export type BlogPostStatus = 'draft' | 'published'

export type BlogPostRecord = {
  id: number
  slug: string
  title: string
  summary: string
  bodyMarkdown: string
  side: BlogPostSide
  status: BlogPostStatus
  publishedAt: string | null
  updatedAt: string | null
  coverImageUrl: string | null
  coverImageAlt: string | null
  createdAt: string
}

export type StaticBlogPostSection = {
  title: string
  paragraphs: string[]
}

export type StaticBlogPost = {
  title: string
  slug: string
  date: string
  summary: string
  side: BlogPostSide
  published: boolean
  sections: StaticBlogPostSection[]
}

export type ResumeEntry = {
  title: string
  organization: string
  start: string
  end?: string
  description: string[]
}
