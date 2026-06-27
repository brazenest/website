import type { SEOInput, SEOPresetMap, SEOPageKey } from "~/types/seo";
import type { BlogPostRecord } from "~/types/content";

/**
 * Route pathname mapping for canonical pages.
 * Ties SEO preset keys to their corresponding route paths.
 */
export const routePathnames: Record<SEOPageKey, string> = {
  home: "/",
  about: "/about",
  resume: "/resume",
  work: "/work",
  "for-hire": "/for-hire",
  blog: "/blog",
  contact: "/contact",
  packages: "/packages",
  engineering: "/engineering",
  production: "/production",
};

/**
 * Route-level SEO metadata presets for all implemented pages.
 * Central source of truth for page titles, descriptions, and imagery.
 *
 * Each preset:
 * - Has a unique, descriptive title reflecting page purpose
 * - Includes a search-friendly description specific to page content
 * - Specifies OG type (defaults to 'website' if omitted)
 * - Uses optional image overrides where semantically distinct
 * - Includes sitemap configuration (includeSitemap, changefreq, priority)
 *
 * Pathname is injected per-route when building metadata with buildMetadata().
 */
export const seoPresets: SEOPresetMap = {
  home: {
    title: "Alden Gillespy — Builder, Producer, and Founder",
    description:
      "Home base for Alden Gillespy — software engineer, media producer, and independent founder building products, websites, and stories.",
    type: "website",
    includeSitemap: true,
    changefreq: "weekly",
    priority: 1.0,
  },
  about: {
    title: "About Alden Gillespy — Website Systems, Positioning & Production",
    description:
      "Learn how Alden Gillespy combines software engineering, positioning, and production work across websites, web systems, and visual storytelling.",
    type: "website",
    includeSitemap: true,
    changefreq: "monthly",
    priority: 0.8,
  },
  resume: {
    title:
      "Resume — Alden Gillespy | Senior Software Engineer and Production Storyteller",
    description:
      "Senior Software Engineer and Production Storyteller. Full technical background across startups and agencies, with experience in systems design, implementation, and cross-disciplinary delivery.",
    type: "website",
    includeSitemap: true,
    changefreq: "monthly",
    priority: 0.8,
  },
  contact: {
    title: "Contact Alden Gillespy — Website Builds, Teardowns & Production",
    description:
      "Reach out about website builds, redesigns, teardowns, technical cleanup, production work, or cross-disciplinary web and media projects.",
    type: "website",
    includeSitemap: true,
    changefreq: "yearly",
    priority: 0.7,
  },
  engineering: {
    title: "Engineering Services — Websites & Web Systems | Alden Gillespy",
    description:
      "Engineering services and case studies for fast websites, maintainable web systems, search-ready structure, and useful product surfaces.",
    type: "website",
    includeSitemap: true,
    changefreq: "monthly",
    priority: 0.9,
  },
  production: {
    title:
      "Production Services — Video, Profiles & Visual Stories | Alden Gillespy",
    description:
      "Founder profiles, service explainers, campaign assets, interviews, and production case studies by Alden Gillespy.",
    type: "website",
    includeSitemap: true,
    changefreq: "monthly",
    priority: 0.9,
  },
  blog: {
    title: "Writing on Systems, Stories & Craft | Alden Gillespy",
    description:
      "Essays and process notes on architecture decisions, production craft, editorial judgment, and where engineering and storytelling intersect.",
    type: "website",
    includeSitemap: true,
    changefreq: "weekly",
    priority: 0.8,
  },
  work: {
    title:
      "Work — Web Systems, Engineering & Production Case Studies | Alden Gillespy",
    description:
      "Selected case studies across web systems, software engineering, and production, including project context, roles, and decisions behind the work.",
    type: "website",
    includeSitemap: false,
    changefreq: "monthly",
    priority: 0.9,
  },
  "for-hire": {
    title:
      "For Hire — Engineering & Production Client Work | Alden Gillespy",
    description:
      "Client work across web engineering and media production. Case studies, services, and how to start a project with Alden Gillespy.",
    type: "website",
    includeSitemap: true,
    changefreq: "monthly",
    priority: 0.9,
  },
  packages: {
    title:
      "Website Packages for Professionals and Small Teams | Alden Gillespy",
    description:
      "Structured website packages for independent professionals, local service businesses, and small teams who need a clear, maintainable web presence.",
    type: "website",
    includeSitemap: true,
    changefreq: "monthly",
    priority: 0.8,
  },
};

export const blogArticleSeoFallback = {
  title: "Blog Post",
  description:
    "Writing by Alden Gillespy across engineering and production practice.",
  type: "article",
} as const satisfies Omit<SEOInput, "pathname">;

type BlogArticleSEOFields = Pick<
  BlogPostRecord,
  | "title"
  | "summary"
  | "slug"
  | "coverImageUrl"
  | "coverImageAlt"
  | "publishedAt"
  | "updatedAt"
>;

export function buildBlogArticleSEOInput(post: BlogArticleSEOFields): SEOInput {
  return {
    ...blogArticleSeoFallback,
    title: post.title,
    description: post.summary,
    pathname: `/blog/${post.slug}`,
    image: post.coverImageUrl
      ? {
          url: post.coverImageUrl,
          ...(post.coverImageAlt ? { alt: post.coverImageAlt } : {}),
        }
      : undefined,
    publishedTime: post.publishedAt ?? undefined,
    modifiedTime: post.updatedAt ?? undefined,
  };
}
