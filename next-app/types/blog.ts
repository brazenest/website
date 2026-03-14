export type BlogPostIdModel = number
export type BlogPostSlugModel = string
export type BlogPostTitleModel = string
export type BlogPostExcerptModel = string
export type BlogPostDekModel = string
export type BlogPostDateModel = Date
export type BlogPostReadtimeModel = number
export type BlogPostBodyModel = string
export type BlogPostCategoryModel = 'engineering' | 'cinematic' | 'process' | 'other'
export type BlogPostTagModel = {
  name: string
  slug: string
}
export type BlogPostImageModel = string
export type BlogPostHrefModel = string
export type BlogPostModel = {
  id: BlogPostIdModel,
  slug: BlogPostSlugModel,
  title: BlogPostTitleModel,
  dek: BlogPostDekModel,
  category: BlogPostCategoryModel,
  image: BlogPostImageModel,
  date: BlogPostDateModel,
  readtime: BlogPostReadtimeModel,
  body: BlogPostBodyModel,
}

export type DB_PostModel = {
  id: BlogPostIdModel
  slug: BlogPostSlugModel
  title: BlogPostTitleModel
  excerpt: BlogPostExcerptModel
  dek: BlogPostDekModel
  date: BlogPostDateModel
  body: BlogPostBodyModel
  visible: boolean
  readtime: BlogPostReadtimeModel
  category: BlogPostCategoryModel
  tags: number[]
  image: BlogPostImageModel
}

export type DB_TagModel = BlogPostTagModel & {
  id: number
}
