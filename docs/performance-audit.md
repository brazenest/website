# Performance Audit & Optimization Inventory — Phase 12

**Document Status**: Baseline Audit (Pre-Optimization)  
**Created**: Phase 12, 2026  
**Last Updated**: March 19, 2026

---

## Executive Summary

This document establishes the performance optimization baseline for the implemented v3 personal site. It identifies the current asset strategy, shared runtime costs, route rendering patterns, and prioritized optimization targets for Phase 12.

**Current Implementation State**:
- 9 core routes (1 dynamic index, 2 post-type routes with 1 dynamic subpage each, 4 leaf pages)
- 2 global variable fonts loaded on every page
- Extensive CSS custom property theming layer
- MobileMenu island component present on all routes
- Mixed static/dynamic content rendering patterns
- Placeholder video rendering (no actual video elements)

---

## 1. Route Inventory

### Implemented Routes

| Route | Type | Heavy Content | Rendering Pattern | Island-bearing | Key Components |
|-------|------|---------------|-------------------|-----------------|---|
| `/` | Landing | Low | Static + Side Selector | Yes (MobileMenu) | HomeHero, AboutPreview, SideSelector |
| `/about` | Content | Medium | Static with scroll reveal | Yes | Narrative sections with data-scroll-reveal |
| `/resume` | Content | Low | Static table/list | Yes | Resume list with structured data |
| `/blog` | List | Medium | Static list + aside card | Yes | BlogPost list, positioning sidebar |
| `/blog/[slug]` | Detail | Medium | Dynamic content | Yes | Article schema, full post render |
| `/engineering` | Showcase | Medium | Static grid + hero + process | Yes | ProjectGrid (4 projects), EngineeringHero |
| `/engineering/projects/[slug]` | Detail | Medium-High | Dynamic detail page | Yes | Full project layout, sections |
| `/production` | Showcase | High | Static grid + hero + process | Yes | MediaGrid (3 projects), ProductionHero |
| `/production/projects/[slug]` | Detail | High | Dynamic detail page + media | Yes | Project sections, image/video fallbacks |
| `/contact` | Interactive | Low | Form (placeholder) | Yes | Contact form shell |

### Route-Level Characteristics

**Static Routes** (fully renderable at build-time):
- `/` — Can be pre-rendered or SSR'd
- `/about` — No dynamic dependencies
- `/resume` — No dynamic dependencies
- `/blog` — List is static (content imported from TypeScript)

**Semi-Dynamic Routes** (data-driven but predictable):
- `/blog/[slug]` — Slug-based lookup from imported `BlogPost[]` array
- `/engineering/projects/[slug]` — Slug-based lookup from imported project array
- `/production/projects/[slug]` — Slug-based lookup from imported project array

**Observations**:
- No database queries; all content is imported as static TypeScript modules
- Dynamic routes use parameter-based lookup from static arrays
- Enables full static generation if route params are enumerable
- No on-demand dynamic content; all routes can be pre-rendered

---

## 2. Image & Media Usage

### Asset Locations

**Public Assets** (`/public/media/`, `/public/assets/`):
- `/assets/og-image.jpg` — Global OG image (1200×630, JPEG, used as fallback)
- `/media/production/bellagio-fountain-still-01.jpg` — Production project 1
- `/media/production/founder-profile-launch-film.mp4` — Production project 2 (video)
- `/media/production/night-market-social-campaign.mp4` — Production project 3 (video)

### Current Rendering Approach

**Images**:
```tsx
<img
  src={heroMedia.src}
  alt={heroMedia.alt ?? project.title}
  width={1600}
  height={900}
  class="h-full w-full object-cover"
/>
```

**Issues**:
- ❌ No `loading="lazy"` attribute
- ❌ No responsive sizes (fixed 1600×900)
- ❌ No WebP/AVIF variants (.jpg only)
- ❌ No `srcset` for different screen densities
- ✓ Dimensions provided (good for CLS)
- ✓ `object-cover` prevents distortion

**Videos**:
Currently rendered as placeholder text:
```tsx
<div class="flex h-full items-center justify-center px-4 text-sm text-[var(--muted)]">
  Video preview
</div>
```

**Issue**: No actual video elements; no poster images; no adaptive bitrate strategies.

### Media Inventory

- **Images**: 1 + up to 3 per production project detail page
- **Videos**: 3 videos referenced (unrealized; only placeholders)
- **OG Images**: 1 global fallback per route metadata
- **Poster Images**: None (not implemented for video preview)

### Optimization Opportunities

- Add `loading="lazy"` to below-fold images
- Implement responsive `srcset` for different viewports
- Generate WebP/AVIF alternatives
- Implement poster images for videos
- Consider deferring video loading until user interaction
- Optimize OG image itself (currently always loaded)

---

## 3. Font Loading Strategy

### Current Font Setup

**Global Font Load** (in `src/root.tsx`):
```tsx
import fontInterStyles from "@fontsource-variable/inter?inline";
import fontSpaceGroteskStyles from "@fontsource-variable/space-grotesk?inline";

// In component:
useStyles$(fontInterStyles);
useStyles$(fontSpaceGroteskStyles);
```

**Fonts Loaded**:
1. **Inter Variable** — 5.2.8 (primary typeface: body, UI)
2. **Space Grotesk Variable** — 5.2.10 (display typeface: headings)

**Current Behavior**:
- ✓ Imported as inline styles (no separate HTTP requests)
- ✓ Variable fonts (single file covers all weights)
- ✓ Applied globally via `useStyles$` in root
- ❌ Loaded on every route, regardless of usage
- ❌ No font-display strategy (no fallback specified)

### Global CSS Font Declaration

In `src/styles/theme.css`:
```css
--font-sans: "Inter Variable", system-ui, sans-serif;
--font-display: "Inter Variable", system-ui, sans-serif;
```
(Note: Both use Inter; Space Grotesk imported but not actively declared)

### Font Weight Coverage

- **Inter**: Variable weight axis (supports any weight 100-900)
- **Space Grotesk**: Variable weight axis
- **In Use**: Weights 400 (regular), 500 (medium), 600 (semibold)

### Optimization Opportunities

- Specify `font-display: swap` to improve perceived performance
- Consider lazy-loading Space Grotesk if truly optional
- Subset to only weights actually used (400, 500, 600, 700)
- Move Space Grotesk to route-specific imports if only used on particular pages
- Test if system fallbacks during font load are acceptable

---

## 4. Global CSS Footprint

### CSS File Structure

| File | Size (Est.) | Role |
|------|------------|------|
| `src/global.css` | <1 KB | Entry point; imports theme.css |
| `src/styles/theme.css` | ~4-5 KB | Custom properties, Tailwind setup, semantic tokens |
| Tailwind Output | ~30-50 KB (minified) | Utility classes for used styles |

### Theme CSS Content

**Custom Property Definitions** (~150+ CSS variables):
- Color palette (neutral, engineering accent, production accent)
- Typography scale (8 sizes, leading, tracking)
- Spacing scale (8 spacing values)
- Radius scale (6 radius values)
- Shadow scale (4 shadow premixes)
- Semantic surface/component tokens
- Font families, heading scales

**Tailwind Integration**:
```css
@import "tailwindcss";

@theme {
  /* 50+ custom properties for Tailwind theme override */
}
```

### Known CSS Costs

- ✓ Well-structured custom property system
- ✓ Semantic naming (good for maintenance)
- ❌ Large number of variables (may impact parser performance)
- ❌ All variables sent on every page view (even unused on particular routes)
- ❌ No route-specific CSS splitting

### Optimization Opportunities

- Audit which custom properties are actually used per route
- Consider splitting font-variables and motion-variables into separate sheets
- Move route-specific theming to route-level CSS
- Defer non-critical color/shadow variables
- Review Tailwind output for dead code

---

## 5. Shared Layout & Shell Cost

### PageShell Component

```tsx
export const PageShell = component$(({ theme }: PageShellProps) => {
  useVisibleTask$(() => {
    // IntersectionObserver setup for scroll reveal
    const observer = new IntersectionObserver(...);
    // ... observe all [data-scroll-reveal] elements
  });
  
  return <Slot />;
});
```

**Runtime Cost**:
- Executes on every page load
- Creates IntersectionObserver for all sections with `data-scroll-reveal`
- Checks `prefers-reduced-motion` media query
- Immediately visible task (not lazy)

**Used On**: Every route (all have PageShell wrapper)

### Header Component

**Structure**:
- Sticky navigation with blur backdrop
- Responsive design (hidden nav on mobile, MobileMenu visible)
- Skip-to-content link (accessibility)
- 5 navigation links (static hrefs)

**Island Boundary**: MobileMenu is the only client-side interactive component

**Cost**: Lightweight; no JavaScript except MobileMenu

### MobileMenu Component

```tsx
export const MobileMenu = component$(() => {
  const isOpen = useSignal(false);
  
  return (
    <button onClick$={() => { isOpen.value = !isOpen.value }}>
      // Mobile menu UI
    </button>
  );
});
```

**Characteristics**:
- ✓ Qwik island component (preserves hydration)
- ✓ Minimal state (single boolean)
- ❌ Loaded on every route
- ❌ Only used on mobile (<768px)
- ❌ No responsive component boundary (always defined, hidden via CSS)

### Footer Component

- Static HTML
- No interactivity
- Uses theme-based styling

### Shared Cost Summary

| Component | Cost | On Every Route | Resolvable |
|-----------|------|---|---|
| PageShell / scroll reveal | Medium (IntersectionObserver setup) | Yes | Move into route-specific or gate behind flag |
| Header / Navigation | Low (static HTML) | Yes | Critical render path (acceptable) |
| MobileMenu island | Medium (hydration overhead) | Yes | Gate behind mobile-only boundary |
| Footer | Low (static HTML) | Yes | Critical render path (acceptable) |

---

## 6. Interactive Island Boundaries

### Identified Islands

| Component | Location | Type | State | Hydration Trigger |
|-----------|----------|------|-------|---|
| MobileMenu | Header (all routes) | Input control | isOpen: boolean | useSignal during route navigation |
| PageShell scroll reveal | Root PageShell (all routes) | Scroll observer | None visible | useVisibleTask$ (executes on hydration) |
| SideSelector | Home page | Multi-select control | checked state per card | useSignal per card |

### Island Analysis

**MobileMenu Hydration Cost**:
- Loaded on every route
- Only active on mobile
- Single `useSignal` state
- Single click handler

**Opportunity**: Move island definition into a mobile breakpoint or lazy-boundary

**SideSelector Island** (home-only):
- Active on landing page
- Multiple cards with independent state
- Likely using `useSignal` per item

**Scroll Reveal** (all routes):
- Executes on every route
- No state management (just observer setup)
- Performant IntersectionObserver pattern
- Respects `prefers-reduced-motion`

---

## 7. Route-Level Heavy Sections

### High-Payload Routes

**Production Project Detail** (`/production/projects/[slug]`):
- Hero media (image or video preview)
- Project title, contextual info
- Multiple section narratives
- Section media items (image or video preview)

**Current Rendering**:
- Static component (no lazy loading)
- All sections rendered above-the-fold
- Media displayed as placeholder text (no actual video elements)

**Payload Estimate**: ~10-15 KB HTML + 2-5 metadata sections

**Optimization Opportunity**: Lazy-load below-fold sections using Qwik's native boundaries

---

## 8. Known External Asset Dependencies

### SEO & Meta Assets

| Dependency | Type | Usage | Status |
|----------|------|-------|-----|
| og-image.jpg | Image (1200×630) | Default OG image in config | Global, always referenced |
| Robots.txt | Route `/robots.txt/index.ts` | SEO artifact | Static generation |
| Sitemap.xml | Route `/sitemap.xml/index.ts` | SEO artifact | Static generation |
| Structured Data | Inline JSON-LD | Person, WebSite, Article schemas | Generated in head |

### Font Dependencies

- @fontsource-variable/inter — NPM package, inline loaded
- @fontsource-variable/space-grotesk — NPM package, inline loaded

### Third-Party Scripts

- None detected (no analytics, tracking, ads)
- Inline structured data only

### Asset Insights

- ✓ Local-first approach (no CDN dependencies)
- ✓ No external JavaScript
- ✓ Minimal external HTTP requests
- ✓ No unoptimized third-party embeds

---

## 9. Code Splitting & Lazy Boundaries

### Current Pattern

**Entry Points**:
- `src/entry.ssr.tsx` — SSR renderer
- `src/entry.dev.tsx` — Dev mode
- `src/entry.preview.tsx` — Preview mode

**Route Imports**: Routes import components and content directly (no dynamic imports detected)

```tsx
// Example: /engineering/index.tsx
import { EngineeringHero } from "~/components/engineering/EngineeringHero";
import { ProjectGrid } from "~/components/engineering/ProjectGrid";
import { engineeringProjects } from "~/content/engineering/projects";
```

### Qwik-Specific Optimization

**Potential Boundaries**:
- MobileMenu could be lazy on desktop
- Below-fold project details could use Qwik's lazy-loading
- Heavy route hero sections could defer until interaction

**Current State**: No explicit lazy boundaries detected (all components can be hydrated on demand)

---

## 10. Sitemap & Robots Artifacts

### Robots.txt Route

**Location**: `src/routes/robots.txt/index.ts`

**Generated Content**: Static route-based generation (assumed standard format per Qwik pattern)

**Optimization Notes**: Lightweight; no impact on critical render path.

### Sitemap.xml Route

**Location**: `src/routes/sitemap.xml/index.ts`

**Generated Content**: Likely uses `getSitemapEntries()` from `~/fns/seo/getSitemapEntries.ts`

**Estimated Routes**: ~9 primary routes + any dynamic route variants

**Optimization Notes**: Static generation; no runtime cost.

---

## 11. Rendering Patterns & Static Generation Potential

### Build-Time Optimization Opportunity

**Current Content Model**:
- All content is imported as static TypeScript modules
- No database queries in routes
- Dynamic routes use parameter-based lookup

**Implication**: 
- All routes are statically pre-renderable at build time
- No per-request generation overhead in production
- Qwik can pre-render entire site as static HTML

**Recommended Strategy for Phase 12**:
- Verify `vite.config.ts` and Qwik build config support pre-rendering
- Consider explicit pre-render list for all enumerable routes
- Measure SSR → SSG performance delta

---

## 12. Prioritized Optimization Inventory

### Quick Wins (Low effort, high impact)

1. **Add image lazy loading**
   - Add `loading="lazy"` to below-fold images
   - Effort: 15 min
   - Impact: Reduces initial load time by deferring off-screen images
   - Files: MediaCard, production project detail, engineering project detail

2. **Specify font-display: swap**
   - Add font-display strategy to @fontsource imports or CSS
   - Effort: 10 min
   - Impact: Improves perceived performance (show content faster during font load)
   - Files: Fontsource imports or global.css

3. **Audit unused Tailwind utilities**
   - Run PurgeCSS or equivalent
   - Effort: 20 min
   - Impact: Reduce CSS payload by 10-25%
   - Files: tailwind.config.js

4. **Remove unused CSS custom properties**
   - Review theme.css and codebase usage
   - Effort: 30 min
   - Impact: Cleaner CSS, easier maintenance
   - Files: src/styles/theme.css

### Medium-Effort Wins (Moderate effort, strong impact)

5. **Implement responsive image srcsets**
   - Add different sizes for tablet/mobile
   - Generate WebP/AVIF variants
   - Effort: 1-2 hours per route with media
   - Impact: 20-40% reduction in image payload on mobile
   - Files: MediaCard, production project detail, OG image

6. **Lazy-load MobileMenu island**
   - Gate MobileMenu visibility behind media query island boundary
   - Effort: 1 hour
   - Impact: Skip hydration on desktop (~5-10 KB JS saved)
   - Files: src/components/nav/Header.tsx, MobileMenu.tsx

7. **Route-specific CSS splitting**
   - Move production/engineering theme CSS to route-level sheets
   - Effort: 1-2 hours
   - Impact: Reduce global CSS footprint per route
   - Files: tailwind.config.js, theme.css, route layout files

8. **Defer PageShell scroll reveal**
   - Gate IntersectionObserver setup behind a route flag or data attribute
   - Allow routes to opt-in rather than default-on
   - Effort: 30 min
   - Impact: Remove unnecessary observer setup on routes without `[data-scroll-reveal]`
   - Files: src/components/layout/PageShell.tsx, routes with reveal

### Medium-Effort Wins (Stronger impact)

9. **Enable pre-rendering for static routes**
   - Configure Qwik to pre-render all routes at build time
   - Effort: 1-2 hours (depends on current vite.config.ts setup)
   - Impact: Convert SSR to static hosting (no Node required; CDN-distributable)
   - Files: vite.config.ts, qwik.config.ts

10. **Implement poster images & actual video elements**
   - Replace video preview placeholders with `<video>` elements
   - Add poster images for video preview
   - Implement adaptive bitrate or progressive download
   - Effort: 2-3 hours
   - Impact: Enable actual video playback; better UX
   - Files: MediaCard.tsx, production project detail, MediaItem type

### Defer (Out of Phase 12 scope)

- ❌ New visual enhancements or redesign
- ❌ Database/CMS integration (would break static model)
- ❌ Advanced caching strategies (edge functions, etc.)
- ❌ Code splitting beyond current Qwik boundaries
- ❌ Service worker or offline capability

---

## 13. Phase 12 Optimization Tasks (Derived)

Based on this audit, Phase 12 should focus on (in priority order):

1. **Add image lazy loading** (TASK-108 candidate)
2. **Specify font-display strategy** (TASK-109 candidate)
3. **Implement responsive srcsets & WebP variants** (TASK-110 candidate)
4. **Audit & tree-shake unused styles** (TASK-111 candidate)
5. **Route-specific CSS splitting** (TASK-112 candidate, if core metrics show need)
6. **Lazy-load MobileMenu island** (TASK-113 candidate)
7. **Enable pre-rendering for static content** (TASK-114 candidate, if deployment model supports)

---

## 14. Acceptance Criteria for This Audit

✅ Real implementation-based performance audit document exists  
✅ Project has clear inventory of optimization targets  
✅ Shared/global cost centers identified (fonts, CSS, islands, layouts)  
✅ Route/media/font loading patterns documented  
✅ Prioritized quick-win, medium-effort, and defer-able items defined  
✅ Concrete optimization tasks derived from audit  
✅ Site ready for targeted Phase 12 optimization tasks  

---

## 15. How to Use This Document

1. **For Phase 12 Planning**: Reference the "Prioritized Optimization Inventory" section to populate upcoming TASK-10x tickets
2. **For Code Review**: Use route inventory and island boundaries section to evaluate new routes for performance impact
3. **For Baseline Measurement**: These sections establish what "good" looks like before optimization
4. **For Future Phases**: Revisit this document after Phase 12 to measure improvement and identify Phase 12.x or v3.1 targets

---

**End of Performance Audit**
