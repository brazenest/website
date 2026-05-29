# Route Architecture Audit

**Generated:** March 20, 2026  
**Purpose:** Complete mapping of all routes, their content imports, and SEO/metadata configuration.

---

## Overview

Your website uses a **centralized SEO configuration strategy** combined with:

- **Static routes** (7): Use pre-computed metadata via `staticHeads.ts`
- **Dynamic routes** (3): Generate metadata at request-time using route parameters
- **API endpoints** (2): `robots.txt` and `sitemap.xml` — dynamically generated from SEO config

All page-level metadata originates from `src/config/seo.ts` (seoPresets), ensuring single source of truth.

## Planned Private Admin Routes (v3.0.0 Minimal Scope)

These routes are intentionally excluded from the public route inventory, sitemap, and navigation. They define the launch-only authoring surface for database-backed blog management.

| Route              | Purpose                   | Data Target     | Notes                                                        |
| ------------------ | ------------------------- | --------------- | ------------------------------------------------------------ |
| `/admin`           | Private admin entry point | N/A             | Server-side auth gate required before rendering child routes |
| `/admin/blog`      | Minimal post index        | `blog_posts`    | Lists posts and exposes create/edit navigation only          |
| `/admin/blog/new`  | Create post form          | `blog_posts`    | Minimal authoring contract only                              |
| `/admin/blog/[id]` | Edit existing post        | `blog_posts.id` | Supports post edits and draft/publish toggle only            |

**Scope Constraint**

- Included in v3.0.0: create post, edit post, draft/publish toggle
- Excluded in v3.0.0: revisions, autosave, rich media library, delete/archive, taxonomy management, preview pipeline, and non-blog CMS features

**Access Posture**

- All `/admin` routes stay server-side and non-public by default
- No header/footer links, no sitemap entries, and no public discovery path
- Apply `noindex, nofollow` metadata to the full admin route group
- Use Fastify HTTP Basic Auth at the server layer for the full `/admin` prefix

---

## Static Routes (Pre-Computed Metadata)

These routes use **compile-time metadata** defined in `staticHeads.ts`. No dynamic computation or parameters required.

### 1. Homepage `/`

| Attribute             | Value                                                             |
| --------------------- | ----------------------------------------------------------------- |
| **Route File**        | [`src/routes/index.tsx`](src/routes/index.tsx)                    |
| **Content Imports**   | `heroContent` from `~/content/identity/hero`                      |
|                       | `aboutPreviewContent` from `~/content/identity/about-preview`     |
|                       | `sideLinkCards` from `~/content/identity/side-links`              |
| **Metadata Strategy** | `staticHeads.home` (pre-computed)                                 |
| **SEO Config**        | `seoPresets.home` in `src/config/seo.ts`                          |
| **Title**             | "Full-Stack Engineer & Film Producer"                             |
| **Description**       | "Explore Alden Gillespy's work spanning software architecture..." |
| **Sitemap**           | ✓ Included (priority: 1.0, changefreq: weekly)                    |
| **Components**        | HomeHero, AboutPreview, SideSelector                              |

---

### 2. About Page `/about`

| Attribute             | Value                                                              |
| --------------------- | ------------------------------------------------------------------ |
| **Route File**        | [`src/routes/about/index.tsx`](src/routes/about/index.tsx)         |
| **Content Imports**   | `aboutPageContent` from `~/content/about`                          |
| **Metadata Strategy** | `staticHeads.about` (pre-computed)                                 |
| **SEO Config**        | `seoPresets.about` in `src/config/seo.ts`                          |
| **Title**             | "About My Approach"                                                |
| **Description**       | "Learn about my philosophy on thoughtful digital craftsmanship..." |
| **Sitemap**           | ✓ Included (priority: 0.8, changefreq: monthly)                    |
| **Additional**        | Scroll reveal animations enabled                                   |

---

### 3. Blog Index `/blog`

| Attribute             | Value                                                    |
| --------------------- | -------------------------------------------------------- |
| **Route File**        | [`src/routes/blog/index.tsx`](src/routes/blog/index.tsx) |
| **Content Imports**   | `blogPageContent` from `~/content/blog`                  |
| **Metadata Strategy** | `staticHeads.blog` (pre-computed)                        |
| **SEO Config**        | `seoPresets.blog` in `src/config/seo.ts`                 |
| **Title**             | "Writing on Systems, Stories & Craft"                    |
| **Description**       | "Essays and process notes on architecture decisions..."  |
| **Sitemap**           | ✓ Included (priority: 0.8, changefreq: weekly)           |
| **Components**        | PublishedBlogList, DraftBlogList                         |

---

### 4. Contact Page `/contact`

| Attribute             | Value                                                          |
| --------------------- | -------------------------------------------------------------- |
| **Route File**        | [`src/routes/contact/index.tsx`](src/routes/contact/index.tsx) |
| **Content Imports**   | `contactPageContent` from `~/content/contact`                  |
| **Metadata Strategy** | `staticHeads.contact` (pre-computed)                           |
| **SEO Config**        | `seoPresets.contact` in `src/config/seo.ts`                    |
| **Title**             | "Get In Touch"                                                 |
| **Description**       | "Inquire about engineering work, production projects..."       |
| **Sitemap**           | ✓ Included (priority: 0.7, changefreq: yearly)                 |

---

### 5. Engineering Index `/engineering`

| Attribute             | Value                                                                  |
| --------------------- | ---------------------------------------------------------------------- |
| **Route File**        | [`src/routes/engineering/index.tsx`](src/routes/engineering/index.tsx) |
| **Content Imports**   | `engineeringHeroContent` from `~/content/engineering/hero`             |
|                       | `engineeringProjects` from `~/content/engineering/projects`            |
| **Metadata Strategy** | `staticHeads.engineering` (pre-computed)                               |
| **SEO Config**        | `seoPresets.engineering` in `src/config/seo.ts`                        |
| **Title**             | "Engineering Work & Case Studies"                                      |
| **Description**       | "Selected software projects showcasing system design..."               |
| **Sitemap**           | ✓ Included (priority: 0.9, changefreq: monthly)                        |
| **Components**        | ProjectGrid, SystemThinkingSection, EngineeringCTASection              |

---

### 6. Production Index `/production`

| Attribute             | Value                                                                |
| --------------------- | -------------------------------------------------------------------- |
| **Route File**        | [`src/routes/production/index.tsx`](src/routes/production/index.tsx) |
| **Content Imports**   | `productionHeroContent` from `~/content/production/hero`             |
|                       | `productionProjects` from `~/content/production/projects`            |
| **Metadata Strategy** | `staticHeads.production` (pre-computed)                              |
| **SEO Config**        | `seoPresets.production` in `src/config/seo.ts`                       |
| **Title**             | "Production Projects & Visual Work"                                  |
| **Description**       | "Film, photo, and campaign work demonstrating framing..."            |
| **Sitemap**           | ✓ Included (priority: 0.9, changefreq: monthly)                      |
| **Components**        | MediaGrid, ProductionStorySection, ProductionCTASection              |

---

### 7. Resume Page `/resume`

| Attribute             | Value                                                        |
| --------------------- | ------------------------------------------------------------ |
| **Route File**        | [`src/routes/resume/index.tsx`](src/routes/resume/index.tsx) |
| **Content Imports**   | `resumePageContent` from `~/content/resume`                  |
| **Metadata Strategy** | `staticHeads.resume` (pre-computed)                          |
| **SEO Config**        | `seoPresets.resume` in `src/config/seo.ts`                   |
| **Title**             | "Resume & Professional Background"                           |
| **Description**       | "Senior Software Engineer and Production Storyteller..."     |
| **Sitemap**           | ✓ Included (priority: 0.8, changefreq: monthly)              |
| **Additional**        | Scroll reveal animations enabled                             |

---

## Dynamic Routes (Request-Time Metadata)

These routes generate metadata at request time based on URL parameters and content lookups.

### 1. Blog Post Detail `/blog/[slug]`

| Attribute                   | Value                                                                      |
| --------------------------- | -------------------------------------------------------------------------- |
| **Route File**              | [`src/routes/blog/[slug]/index.tsx`](src/routes/blog/[slug]/index.tsx)     |
| **Content Lookup**          | `getPublishedBlogPostBySlug(params.slug)` from `~/content/blog/posts`      |
| **Metadata Strategy**       | **Dynamic** (computed in `head()` function)                                |
| **SEO Functions Used**      | • `buildTitle()` — builds page title                                       |
|                             | • `buildArticleStructuredData()` — generates Article schema                |
| **Dynamic Metadata Fields** | • `title` from post.title                                                  |
|                             | • `description` from post.summary                                          |
|                             | • `datePublished` from post.date                                           |
|                             | • `keywords` from post.side                                                |
| **Structured Data**         | Article schema (JSON-LD) injected as `<script type="application/ld+json">` |
| **404 Handling**            | Fallback metadata if post not found                                        |
| **Sitemap**                 | ✗ NOT included (dynamic routes typically excluded)                         |

---

### 2. Engineering Project Detail `/engineering/projects/[slug]`

| Attribute                   | Value                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Route File**              | [`src/routes/engineering/projects/[slug]/index.tsx`](src/routes/engineering/projects/[slug]/index.tsx) |
| **Content Lookup**          | `engineeringProjects.find((item) => item.slug === params.slug)`                                        |
| **Metadata Strategy**       | **Dynamic** (computed in `head()` function)                                                            |
| **SEO Functions Used**      | • `buildMetadata()` — builds standard metadata                                                         |
|                             | • `metadataToDocumentHead()` — converts to DocumentHead                                                |
|                             | • `buildProjectStructuredData()` — generates CreativeWork schema                                       |
| **Dynamic Metadata Fields** | • `title` from project.seo?.title or project.title                                                     |
|                             | • `description` from project.seo?.description or project.description                                   |
|                             | • `image` from project.image                                                                           |
|                             | • `pathname` injected from params.slug                                                                 |
| **Per-Project SEO**         | Projects can override title/description via `project.seo` object                                       |
| **Structured Data**         | CreativeWork schema (JSON-LD) injected as `<script type="application/ld+json">`                        |
| **404 Handling**            | Fallback metadata if project not found                                                                 |
| **Sitemap**                 | ✗ NOT included (dynamic routes typically excluded)                                                     |

---

### 3. Production Project Detail `/production/projects/[slug]`

| Attribute                   | Value                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Route File**              | [`src/routes/production/projects/[slug]/index.tsx`](src/routes/production/projects/[slug]/index.tsx) |
| **Content Lookup**          | `productionProjects.find((item) => item.slug === params.slug)`                                       |
| **Metadata Strategy**       | **Dynamic** (computed in `head()` function)                                                          |
| **SEO Functions Used**      | • `buildMetadata()` — builds standard metadata                                                       |
|                             | • `metadataToDocumentHead()` — converts to DocumentHead                                              |
|                             | • `buildProjectStructuredData()` — generates CreativeWork schema                                     |
| **Dynamic Metadata Fields** | • `title` from project.seo?.title or project.title                                                   |
|                             | • `description` from project.seo?.description or project.description                                 |
|                             | • `image` from project.image                                                                         |
|                             | • `section` hardcoded to "Production"                                                                |
| **Per-Project SEO**         | Projects can override title/description via `project.seo` object                                     |
| **Structured Data**         | CreativeWork schema (JSON-LD) injected as `<script type="application/ld+json">`                      |
| **404 Handling**            | Fallback metadata if project not found                                                               |
| **Sitemap**                 | ✗ NOT included (dynamic routes typically excluded)                                                   |

---

## API Endpoints (Dynamic Generation)

### 1. Robots.txt `/robots.txt`

| Attribute             | Value                                                              |
| --------------------- | ------------------------------------------------------------------ |
| **Route File**        | [`src/routes/robots.txt/index.ts`](src/routes/robots.txt/index.ts) |
| **Type**              | RequestHandler (text/plain endpoint)                               |
| **Generation**        | Dynamic — computed at request time                                 |
| **Purpose**           | Declares crawl policy and sitemap location for search engines      |
| **Content**           | • User-agent wildcard (allows all crawlers)                        |
|                       | • Sitemap reference: `/sitemap.xml`                                |
|                       | • Host declaration from `siteConfig.siteUrl`                       |
| **Config Dependency** | `siteConfig` from `~/config/site`                                  |
| **Content-Type**      | `text/plain; charset=utf-8`                                        |

---

### 2. Sitemap.xml `/sitemap.xml`

| Attribute             | Value                                                                |
| --------------------- | -------------------------------------------------------------------- |
| **Route File**        | [`src/routes/sitemap.xml/index.ts`](src/routes/sitemap.xml/index.ts) |
| **Type**              | RequestHandler (application/xml endpoint)                            |
| **Generation**        | Dynamic — calls `getSitemapEntries()` at request time                |
| **Purpose**           | Standards-compliant XML sitemap for crawl discovery                  |
| **Content Source**    | Derived from `seoPresets` in `src/config/seo.ts`                     |
| **Included Entries**  | • Home (priority: 1.0)                                               |
|                       | • About (priority: 0.8)                                              |
|                       | • Blog (priority: 0.8)                                               |
|                       | • Contact (priority: 0.7)                                            |
|                       | • Engineering (priority: 0.9)                                        |
|                       | • Production (priority: 0.9)                                         |
|                       | • Resume (priority: 0.8)                                             |
| **Per-Entry Fields**  | • `<loc>` (absolute URL)                                             |
|                       | • `<changefreq>` (optional)                                          |
|                       | • `<priority>` (optional)                                            |
| **Dynamic Entries**   | Only includes pages where `includeSitemap: true`                     |
| **Content-Type**      | `application/xml; charset=utf-8`                                     |
| **Config Dependency** | `siteConfig.siteUrl` for absolute URL construction                   |

---

## Metadata Architecture

### Central Configuration: `src/config/seo.ts`

**Source of truth for all page-level metadata:**

```typescript
seoPresets: SEOPresetMap = {
  home: { title, description, type, includeSitemap, changefreq, priority }
  about: { ... }
  resume: { ... }
  contact: { ... }
  blog: { ... }
  engineering: { ... }
  production: { ... }
}

routePathnames: Record<SEOPageKey, string> = {
  home: '/',
  about: '/about',
  ...
}
```

### Metadata Flow

1. **Static Routes**
   - Metadata computed **at build time** via `staticHeads.ts`
   - Uses `buildMetadata()` + `metadataToDocumentHead()`
   - Result pre-computed in `DocumentHead` object
   - Exported as named export (`head: DocumentHead`)
   - Zero runtime overhead during SSR

2. **Dynamic Routes**
   - Metadata computed **at request time** in `head()` function
   - Receives `DocumentHeadProps` with route `params`
   - Looks up content by slug
   - Calls `buildMetadata()` + `metadataToDocumentHead()`
   - Injects structured data (JSON-LD) as additional script
   - Fallback metadata for 404 cases
   - Return type: `DocumentHead`

3. **Structured Data**
   - **Static routes**: No JSON-LD (deterministic content)
   - **Blog posts**: Article schema (custom fields: title, description, datePublished, keywords)
   - **Projects**: CreativeWork schema (custom fields: title, description, image, section)
   - Injected as `<script type="application/ld+json">` in DocumentHead

### SEO Functions: `src/fns/seo/`

| Function                       | Purpose                                              | Usage            |
| ------------------------------ | ---------------------------------------------------- | ---------------- |
| `buildMetadata()`              | Transform SEO preset + pathname into metadata object | All routes       |
| `metadataToDocumentHead()`     | Convert metadata to Qwik DocumentHead                | All routes       |
| `buildTitle()`                 | Prepend site name to page title                      | Dynamic routes   |
| `buildArticleStructuredData()` | Generate Article JSON-LD schema                      | Blog routes      |
| `buildProjectStructuredData()` | Generate CreativeWork JSON-LD schema                 | Project routes   |
| `getSitemapEntries()`          | Extract sitemap-eligible entries from seoPresets     | Sitemap endpoint |

---

## Content File Mapping

### Static Route Content

| Route          | Content File                                | Structure                     |
| -------------- | ------------------------------------------- | ----------------------------- |
| `/` (home)     | `src/content/identity/hero.ts`              | heroContent object            |
|                | `src/content/identity/about-preview.ts`     | aboutPreviewContent object    |
|                | `src/content/identity/side-links.ts`        | sideLinkCards array           |
| `/about`       | `src/content/about/index.ts`                | aboutPageContent object       |
| `/blog`        | `src/content/blog/index.ts`                 | blogPageContent object        |
| `/contact`     | `src/content/contact/index.ts`              | contactPageContent object     |
| `/engineering` | `src/content/engineering/hero.ts`           | engineeringHeroContent object |
|                | `src/content/engineering/projects/index.ts` | engineeringProjects array     |
| `/production`  | `src/content/production/hero.ts`            | productionHeroContent object  |
|                | `src/content/production/projects/index.ts`  | productionProjects array      |
| `/resume`      | `src/content/resume/index.ts`               | resumePageContent object      |

### Dynamic Route Content

| Route                          | Content File                                | Lookup Method                                          |
| ------------------------------ | ------------------------------------------- | ------------------------------------------------------ |
| `/blog/[slug]`                 | `src/content/blog/posts.ts`                 | `getPublishedBlogPostBySlug(slug)`                     |
| `/engineering/projects/[slug]` | `src/content/engineering/projects/index.ts` | `engineeringProjects.find(item => item.slug === slug)` |
| `/production/projects/[slug]`  | `src/content/production/projects/index.ts`  | `productionProjects.find(item => item.slug === slug)`  |

---

## Sitemap Inclusion Summary

| Route                      | Included | Priority | Changefreq |
| -------------------------- | -------- | -------- | ---------- |
| Home `/`                   | ✓        | 1.0      | weekly     |
| Engineering `/engineering` | ✓        | 0.9      | monthly    |
| Production `/production`   | ✓        | 0.9      | monthly    |
| About `/about`             | ✓        | 0.8      | monthly    |
| Blog `/blog`               | ✓        | 0.8      | weekly     |
| Resume `/resume`           | ✓        | 0.8      | monthly    |
| Contact `/contact`         | ✓        | 0.7      | yearly     |
| Blog posts (dynamic)       | ✗        | —        | —          |
| Project details (dynamic)  | ✗        | —        | —          |

---

## Architecture Highlights

### ✓ Best Practices Observed

1. **Centralized Configuration**: All page metadata lives in `src/config/seo.ts`
2. **Single Source of Truth**: SEO presets drive both static generation and sitemap endpoints
3. **Type Safety**: Using TypeScript types (`SEOPageKey`, `SEOPresetMap`, `SitemapEntry`)
4. **Pre-Computation Strategy**: Static routes use pre-computed metadata (zero runtime overhead)
5. **Structured Data**: JSON-LD schemas for rich snippets (Article, CreativeWork)
6. **Fallback Handling**: Dynamic routes handle 404 cases gracefully
7. **Per-Project SEO Overrides**: Projects can customize title/description via `project.seo`
8. **Dynamic Routing**: Proper slug-based URLs with content lookup pattern
9. **Standards Compliance**: Robots.txt and sitemap.xml follow standards exactly

### Architecture Gaps & Audit Findings

| Issue                          | Severity | Notes                                           |
| ------------------------------ | -------- | ----------------------------------------------- |
| Dynamic routes not in sitemap  | Low      | Standard practice (crawlers discover via links) |
| No per-project structured data | Medium   | Consider: ProjectSchema with author, date, tags |
| Manual slug synchronization    | Low      | slugs must match between content and routes     |
| No hreflang tags               | Low      | Consider if multi-language support planned      |
| No Open Graph images           | Low      | Could enhance social sharing                    |

---

## Key Files Quick Reference

```
Configuration
├── src/config/seo.ts                 ← SEO presets & route pathnames
├── src/config/site.ts               ← siteConfig (siteUrl, etc)
└── src/config/structured-data.ts    ← Schema definitions

Routes
├── src/routes/index.tsx             ← Home (static)
├── src/routes/about/index.tsx       ← About (static)
├── src/routes/blog/index.tsx        ← Blog index (static)
├── src/routes/blog/[slug]/index.tsx → Blog detail (dynamic)
├── src/routes/contact/index.tsx     ← Contact (static)
├── src/routes/engineering/index.tsx ← Engineering (static)
├── src/routes/engineering/projects/[slug]/index.tsx → Engineering detail (dynamic)
├── src/routes/production/index.tsx  ← Production (static)
├── src/routes/production/projects/[slug]/index.tsx → Production detail (dynamic)
├── src/routes/resume/index.tsx      ← Resume (static)
├── src/routes/robots.txt/index.ts   → Robots endpoint
└── src/routes/sitemap.xml/index.ts  → Sitemap endpoint

SEO Functions
├── src/fns/seo/buildMetadata.ts → Assembles metadata
├── src/fns/seo/metadataToDocumentHead.ts → Converts to DocumentHead
├── src/fns/seo/buildStructuredData.ts → Generates JSON-LD schemas
├── src/fns/seo/getSitemapEntries.ts → Extracts sitemap entries
└── src/fns/seo/staticHeads.ts → Pre-computed static metadata

Content
├── src/content/identity/
├── src/content/about/
├── src/content/blog/
├── src/content/contact/
├── src/content/engineering/
├── src/content/production/
└── src/content/resume/
```

---

## Audit Recommendations

### High Priority

- [ ] **Document per-project SEO pattern**: Ensure team knows projects can override title/description
- [ ] **Validate all dynamic slugs**: Ensure blog post slugs and project slugs are unique and match content

### Medium Priority

- [ ] **Add description field validation**: Ensure meta descriptions are 150-160 chars
- [ ] **Implement per-project structured data**: Add fields to project schema (author, date, tags)
- [ ] **Add Open Graph images**: Consider `project.image` usage in OG tags

### Low Priority

- [ ] **Consider dynamic sitemap generation**: For high-volume dynamic content (if blog/projects expand)
- [ ] **Add canonical link generation**: Ensure canonical URLs are explicit in all routes
- [ ] **Plan for hreflang tags**: If multi-language versions planned
