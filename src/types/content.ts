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
  id: string
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

export const MINIMAL_ADMIN_BLOG_ROUTES = [
  '/admin',
  '/admin/blog',
  '/admin/blog/new',
  '/admin/blog/[id]',
] as const

export type MinimalAdminBlogRoute = (typeof MINIMAL_ADMIN_BLOG_ROUTES)[number]

export const BLOG_POST_AUTHORING_FIELDS = [
  'title',
  'slug',
  'summary',
  'body_markdown',
  'side',
  'status',
  'published_at',
  'cover_image_url',
  'cover_image_alt',
] as const

export type BlogPostAuthoringField = (typeof BLOG_POST_AUTHORING_FIELDS)[number]

export type BlogPostAuthoringRecord = {
  id: string
  title: string
  slug: string
  summary: string
  bodyMarkdown: string
  side: BlogPostSide
  status: BlogPostStatus
  publishedAt: string | null
  updatedAt: string | null
  coverImageUrl: string | null
  coverImageAlt: string | null
}

export type BlogPostAdminRecord = BlogPostRecord

export type BlogPostAuthoringValues = {
  title: string
  slug: string
  summary: string
  bodyMarkdown: string
  side: BlogPostSide
  status: BlogPostStatus
  publishedAt: string | null
  updatedAt: string | null
  coverImageUrl: string | null
  coverImageAlt: string | null
}

export type CreateBlogPostInput = BlogPostAuthoringValues

export type UpdateBlogPostInput = BlogPostAuthoringValues & {
  id: string
}

export type BlogPostFormFieldName =
  | 'title'
  | 'slug'
  | 'summary'
  | 'bodyMarkdown'
  | 'side'
  | 'status'
  | 'publishedAt'
  | 'coverImageUrl'
  | 'coverImageAlt'

export type BlogPostFormValues = {
  title: string
  slug: string
  summary: string
  bodyMarkdown: string
  side: BlogPostSide
  status: BlogPostStatus
  publishedAt: string
  coverImageUrl: string
  coverImageAlt: string
}

export type BlogPostFormFieldErrorMap = Partial<Record<BlogPostFormFieldName, string>>

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
