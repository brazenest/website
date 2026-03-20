# Release Readiness Checklist — v3.0.0

**Document Status**: Release Readiness Matrix  
**Created**: March 20, 2026  
**Version**: v3.0.0  
**Next Review**: Pre-deployment validation

---

## Overview

This document serves as the canonical source of truth for all remaining verification work required before v3.0.0 launch. All blocking issues must be resolved; nice-to-have items should be completed where feasible but do not prevent deployment.

**Key Principle**: ✅ = Pass | ❌ = Fail | 🟡 = In Progress | ⏭️ = Deferred

---

## 1. Route Inventory & Completeness

**Status**: [ ] Complete

### 1.1 Core Routes — BLOCKING

- [ ] **`/`** (Homepage)
  - [ ] Hero section renders correctly
  - [ ] Side selector (Engineering | Production) functional
  - [ ] Call-to-action buttons navigate correctly
  - [ ] Metadata: Open Graph image loads

- [ ] **`/about`** (About Page)
  - [ ] Full bio content displays
  - [ ] Practice philosophy clearly explained
  - [ ] No broken links to other sections
  - [ ] Meta description accurate

- [ ] **`/engineering`** (Engineering Section)
  - [ ] Hero section displays
  - [ ] All 3+ project cards render
  - [ ] Project navigation functional
  - [ ] Tag filtering works (if applicable)

- [ ] **`/engineering/projects/[slug]`** (Engineering Project Details)
  - [ ] All project detail pages render without errors
  - [ ] Dynamic route parameters load correctly
  - [ ] Metadata generates unique titles/descriptions per project
  - [ ] Breadcrumb navigation works
  - [ ] Related projects section displays (if applicable)

- [ ] **`/production`** (Production Section)
  - [ ] Hero section displays
  - [ ] All 3+ media cards render
  - [ ] Media embedding functional (video/iframe)
  - [ ] No broken asset links

- [ ] **`/production/projects/[slug]`** (Production Project Details)
  - [ ] All project detail pages render without errors
  - [ ] Dynamic route parameters load correctly
  - [ ] Metadata generates unique titles per project
  - [ ] Video/media embeds load properly

- [ ] **`/blog`** (Blog Index)
  - [ ] Published blog posts display
  - [ ] Pagination functional (if applicable)
  - [ ] Tag filtering works (if applicable)
  - [ ] Draft posts hidden in production

- [ ] **`/blog/[slug]`** (Blog Post Detail)
  - [ ] All published posts render correctly
  - [ ] Markdown/content renders without formatting errors
  - [ ] Meta description from post excerpt
  - [ ] Navigation to previous/next posts works

- [ ] **`/resume`** (Resume Page)
  - [ ] Printable format renders correctly
  - [ ] All sections display (experience, skills, etc.)
  - [ ] Download link functional (if provided)

- [ ] **`/contact`** (Contact Page)
  - [ ] Contact form renders
  - [ ] Form submission functional (or validation in place)
  - [ ] Email notification setup verified
  - [ ] Rate limiting configured (if applicable)

- [ ] **`/sitemap.xml`** (Sitemap)
  - [ ] XML is valid and wellformed
  - [ ] All public routes included
  - [ ] Draft content excluded
  - [ ] Change frequency and priority set

- [ ] **`/robots.txt`** (Robots)
  - [ ] Disallow rules correct
  - [ ] Sitemap URL specified
  - [ ] No accidental blocking of public pages

---

## 2. Metadata & SEO Verification — BLOCKING

### 2.1 Global Configuration

- [ ] **Site Configuration** (`src/config/site.ts`)
  - [ ] `siteUrl` correct (https://aldengillespy.com)
  - [ ] `siteName` set correctly
  - [ ] Default title template applies consistently
  - [ ] Default OG image exists and is accessible
  - [ ] Twitter handle configured

- [ ] **Structured Data**
  - [ ] JSON-LD Person schema validates
  - [ ] JSON-LD Organization schema (if applicable) validates
  - [ ] All structured data passes [schema.org](https://schema.org) validation
  - [ ] Microdata markup renders in HTML source

### 2.2 Page-Level Metadata

- [ ] **Open Graph Tags** (all pages)
  - [ ] `og:title` present and unique per page
  - [ ] `og:description` present and relevant
  - [ ] `og:image` present (global or page-specific)
  - [ ] `og:type` correctly set
  - [ ] `og:url` uses canonical URLs

- [ ] **Twitter Card Tags** (all pages)
  - [ ] `twitter:card` set to `summary_large_image`
  - [ ] `twitter:title` present
  - [ ] `twitter:description` present
  - [ ] `twitter:image` present
  - [ ] `twitter:creator` set to `@aldengillespy`

- [ ] **Canonical Tags**
  - [ ] `<link rel="canonical">` present on all pages
  - [ ] Canonical URL matches production domain
  - [ ] No self-conflicting canonicals
  - [ ] Redirects have canonical to target URL

- [ ] **Meta Robots Tags**
  - [ ] `index` set on public pages
  - [ ] `noindex` set on draft/private pages (if any)
  - [ ] `follow`/`nofollow` configured per policy

### 2.3 Search Console & Analytics

- [ ] **Google Search Console**
  - [ ] Domain property activated
  - [ ] Sitemap submitted
  - [ ] Mobile usability report clean
  - [ ] Coverage report checked for errors

- [ ] **Google Analytics**
  - [ ] GA4 tag installed (or legacy UA)
  - [ ] Page views tracking correctly
  - [ ] Goal conversion tracking configured (if applicable)
  - [ ] No tracking code conflicts

---

## 3. Performance Verification — BLOCKING

### 3.1 Build & Bundle Metrics

- [ ] **Production Build**
  - [ ] `npm run build` completes without errors
  - [ ] No critical TypeScript errors (`npm run build.types`)
  - [ ] Bundle size acceptable (< 200KB gzipped for JS)
  - [ ] No console warnings in build output

- [ ] **Asset Optimization**
  - [ ] Images optimized and lazy-loaded where appropriate
  - [ ] Webp/modern formats used for images
  - [ ] Font loading strategy (variable fonts, font-display)
  - [ ] CSS critical path inlined (Qwik SSR)

### 3.2 Core Web Vitals

- [ ] **Lighthouse Audit** (Run on production)
  - [ ] Performance score ≥ 90
  - [ ] Accessibility score ≥ 90
  - [ ] Best Practices score ≥ 90
  - [ ] SEO score ≥ 90

- [ ] **In-field Performance** (if available)
  - [ ] LCP < 2.5s (Largest Contentful Paint)
  - [ ] FID < 100ms (First Input Delay) or INP < 200ms
  - [ ] CLS < 0.1 (Cumulative Layout Shift)

- [ ] **Time to Interactive**
  - [ ] First Contentful Paint < 1.5s
  - [ ] Time to Interactive < 3.5s
  - [ ] Total Blocking Time < 200ms

### 3.3 Caching & Delivery

- [ ] **Browser Caching Headers**
  - [ ] Static assets (CSS, JS, images) have long cache TTLs (1 year)
  - [ ] HTML pages have appropriate cache headers (no-cache or short TTL)
  - [ ] ETag headers configured for validation

- [ ] **CDN Configuration** (if deployed to CDN)
  - [ ] Origin headers respect cache policy
  - [ ] Gzip/Brotli compression enabled
  - [ ] Geographic distribution verified

---

## 4. Accessibility Checks — BLOCKING

### 4.1 Keyboard Navigation

- [ ] **Tab Order**
  - [ ] All interactive elements accessible via Tab key
  - [ ] Tab order logical and predictable
  - [ ] Focus visible indicator present (outline or highlight)
  - [ ] No keyboard traps (users can Tab out of all sections)

- [ ] **Focus Management**
  - [ ] Focus returns to triggering element on modal close
  - [ ] Skip links functional (if navigation present)
  - [ ] Focus trap working in modals/dialogs

### 4.2 Semantic HTML & ARIA

- [ ] **Headings**
  - [ ] Heading hierarchy correct (h1, h2, h3, etc.)
  - [ ] Only one h1 per page
  - [ ] Headings describe page sections accurately

- [ ] **Form Accessibility**
  - [ ] All form inputs have associated `<label>` elements
  - [ ] Error messages linked to form fields
  - [ ] Required fields marked with `aria-required="true"` or `required`
  - [ ] Form instructions clear

- [ ] **ARIA Labels**
  - [ ] Buttons without visible text have `aria-label`
  - [ ] Images have `alt` text (or `aria-hidden="true"` if decorative)
  - [ ] Dynamic content announcements use `aria-live` if appropriate
  - [ ] ARIA attributes valid and not conflicting

- [ ] **List Structures**
  - [ ] Navigation uses `<nav>` semantically
  - [ ] Related items in `<ul>` or `<ol>` (not divs)
  - [ ] List markup appears in generated HTML

### 4.3 Color & Contrast

- [ ] **Text Contrast**
  - [ ] All text meets WCAG AA (4.5:1) or AAA (7:1) contrast ratios
  - [ ] Body text ≥ 4.5:1 contrast with background
  - [ ] Large text (≥18pt) ≥ 3:1 contrast
  - [ ] UI controls ≥ 3:1 contrast

- [ ] **Color Not Only Cue**
  - [ ] Status indicators use text + color (not color alone)
  - [ ] Links distinguishable without relying on color alone
  - [ ] Required form fields use icon/text + color

### 4.4 Content Accessibility

- [ ] **Media Accessibility**
  - [ ] Videos have captions (if applicable)
  - [ ] Audio has transcripts (if applicable)
  - [ ] Autoplay disabled (or user can easily pause)

- [ ] **Readable Text**
  - [ ] Font size ≥ 16px (or zoom-able to equivalent)
  - [ ] Line spacing ≥ 1.5 (or configurable)
  - [ ] No justified text (or readable with justified option)

---

## 5. Content Integrity Checks — BLOCKING

### 5.1 Homepage

- [ ] **Hero Section**
  - [ ] Headline copy accurate and compelling
  - [ ] Subheading explains value proposition
  - [ ] Call-to-action buttons labeled correctly
  - [ ] Contact info/social links present

- [ ] **Side Selector**
  - [ ] "Engineering" and "Production" toggles work
  - [ ] Correct content displays for each side
  - [ ] Visual state clearly indicates which is selected

- [ ] **Preview Sections**
  - [ ] Featured projects/work visible
  - [ ] All links navigate to correct pages

### 5.2 Engineering Section

- [ ] **Hero & Overview**
  - [ ] Engineering practice explained
  - [ ] All project titles display correctly
  - [ ] Descriptions are accurate and current

- [ ] **Project Cards**
  - [ ] All 3+ projects listed
  - [ ] Project images load
  - [ ] Tag/category labels correct
  - [ ] Click navigation functional

- [ ] **Individual Projects**
  - [ ] Project title, date, description accurate
  - [ ] Technical details/technologies listed
  - [ ] Case study content complete (no placeholder text)
  - [ ] Links to live demo/GitHub functional (if applicable)

### 5.3 Production Section

- [ ] **Hero & Overview**
  - [ ] Production practice explained
  - [ ] All work titles display correctly
  - [ ] Descriptions are accurate and current

- [ ] **Media Cards**
  - [ ] All 3+ projects listed
  - [ ] Poster/thumbnail images load
  - [ ] Duration/format info correct
  - [ ] Click navigation functional

- [ ] **Individual Projects**
  - [ ] Project title, date, description accurate
  - [ ] Media embeds functional (Vimeo, YouTube, etc.)
  - [ ] Production details complete
  - [ ] Related work section populated (if applicable)

### 5.4 About Page

- [ ] **Bio Content**
  - [ ] Personal narrative complete and accurate
  - [ ] Philosophy section clearly explains approach
  - [ ] No placeholder or draft text

- [ ] **Links & Navigation**
  - [ ] Internal links to engineering/production work functional
  - [ ] External links (LinkedIn, GitHub, etc.) correct

### 5.5 Blog **(Nice-to-Have if published)**

- [ ] **Blog Index**
  - [ ] All published posts listed
  - [ ] Posts sorted correctly (newest first)
  - [ ] Excerpts display properly

- [ ] **Blog Posts**
  - [ ] Markdown rendering correct (no formatting errors)
  - [ ] Code blocks display with syntax highlighting
  - [ ] Images embedded correctly
  - [ ] No broken internal links

- [ ] **Draft Posts** (Production)
  - [ ] Draft posts excluded from public index
  - [ ] Draft pages return 404 or redirect

### 5.6 Resume Page

- [ ] **Resume Content**
  - [ ] All sections present (experience, education, skills, etc.)
  - [ ] Dates accurate
  - [ ] Current role/title correct
  - [ ] No placeholder text

- [ ] **Formatting**
  - [ ] Print layout renders cleanly
  - [ ] Breakpoints adjust for screen vs. print
  - [ ] Download functionality works (if provided)

### 5.7 Contact Page

- [ ] **Contact Form** (if applicable)
  - [ ] All fields render (name, email, message, etc.)
  - [ ] Client-side validation works (if applicable)
  - [ ] Submit button functional
  - [ ] Success/error messages display

- [ ] **Contact Information**
  - [ ] Email address correct
  - [ ] Social links functional
  - [ ] Hours/response time set (if applicable)

---

## 6. Responsive & Device Verification — BLOCKING

### 6.1 Breakpoint Testing

- [ ] **Mobile (320px - 639px)**
  - [ ] All content readable without horizontal scroll
  - [ ] Touch targets ≥ 44px (or WCAG 2.1 minimum)
  - [ ] Navigation accessible (hamburger menu if applicable)
  - [ ] Images scale properly
  - [ ] Forms usable on small screens

- [ ] **Tablet (640px - 1023px)**
  - [ ] Layout adapts correctly
  - [ ] Navigation usable
  - [ ] Multi-column layouts stack appropriately
  - [ ] No orphaned text

- [ ] **Desktop (1024px+)**
  - [ ] Layout utilizes available space
  - [ ] Side-by-side content displays cleanly
  - [ ] Hover states functional
  - [ ] Desktop-specific interactions work (if any)

### 6.2 Device Testing

- [ ] **iOS (Safari)**
  - [ ] Latest version renders correctly
  - [ ] Touch interactions work
  - [ ] Status bar doesn't obscure content
  - [ ] No rendering glitches

- [ ] **Android (Chrome)**
  - [ ] Latest version renders correctly
  - [ ] Touch interactions work
  - [ ] Safe area handled correctly
  - [ ] No rendering glitches

- [ ] **Desktop Browsers**
  - [ ] Chrome (latest)
  - [ ] Firefox (latest)
  - [ ] Safari (latest)
  - [ ] Edge (latest)

### 6.3 Orientation Testing

- [ ] **Portrait Orientation**
  - [ ] All content accessible
  - [ ] No layout breakage

- [ ] **Landscape Orientation**
  - [ ] All content accessible
  - [ ] Vertical space used efficiently
  - [ ] No overflow issues

---

## 7. Deployment & Configuration Checks — BLOCKING

### 7.1 Build & Deployment

- [ ] **Production Build**
  - [ ] `npm run build` completes successfully
  - [ ] No warnings or errors in build output
  - [ ] Output artifacts exist (`dist/` directory)
  - [ ] Build is reproducible (same build hash)

- [ ] **Type Checking**
  - [ ] `npm run build.types` passes (no TypeScript errors)
  - [ ] No `@ts-ignore` comments without justification

- [ ] **Linting & Formatting**
  - [ ] `npm run lint` passes (no ESLint errors)
  - [ ] `npm run fmt.check` passes (code formatted)
  - [ ] No critical linting warnings

### 7.2 Environment & Configuration

- [ ] **Environment Variables**
  - [ ] `.env.production` configured with correct values
  - [ ] No secrets committed to repository
  - [ ] `VITE_*` variables properly prefixed
  - [ ] All required variables present

- [ ] **Site Configuration** (`src/config/`)
  - [ ] `siteConfig` uses production domain
  - [ ] API endpoints point to production
  - [ ] Analytics IDs configured
  - [ ] SEO configuration complete

### 7.3 Server Configuration (Fastify)

- [ ] **Fastify Setup** (`adapters/fastify/`)
  - [ ] Server starts without errors
  - [ ] Routes respond correctly
  - [ ] Error handling functional
  - [ ] Logging configured appropriately

- [ ] **Headers & Security**
  - [ ] Security headers configured (CSP, X-Frame-Options, etc.)
  - [ ] CORS configured appropriately
  - [ ] HTTPS enforced (redirect HTTP → HTTPS)
  - [ ] Helmet or similar security middleware enabled

- [ ] **Cache Control Headers**
  - [ ] Static assets (JS, CSS) have long cache TTLs
  - [ ] HTML pages have appropriate cache headers
  - [ ] Service Worker (if applicable) configured

### 7.4 Deployment Platform

- [ ] **Deployment Target** (Vercel, Netlify, Docker, etc.)
  - [ ] Deployment configuration files present (if needed)
  - [ ] Build command correct
  - [ ] Start/runtime command correct
  - [ ] Node version requirement specified

- [ ] **Domain & DNS**
  - [ ] Domain DNS pointing to correct host
  - [ ] SSL/TLS certificate valid
  - [ ] Certificate auto-renewal configured (if applicable)
  - [ ] HTTPS working on production domain

### 7.5 Monitoring & Logging

- [ ] **Server Logging**
  - [ ] Logs capture errors and important events
  - [ ] Log level appropriate (not too verbose)
  - [ ] Personally identifiable information (PII) not logged

- [ ] **Error Tracking** (optional but recommended)
  - [ ] Sentry (or similar) configured
  - [ ] Errors captured and alerting functional
  - [ ] Sampling rate appropriate

---

## 8. Post-Launch Watch Items — NICE-TO-HAVE

### 8.1 First 24 Hours

- [ ] **Error Logs**
  - [ ] Monitor server error logs for exceptions
  - [ ] Check browser console for JavaScript errors
  - [ ] Review any client error reports

- [ ] **Performance Metrics**
  - [ ] Monitor Core Web Vitals dashboard
  - [ ] Spot-check page load times from multiple locations
  - [ ] Verify CDN caching is working

- [ ] **User Analytics**
  - [ ] Verify Google Analytics reporting data
  - [ ] Check for traffic spikes or anomalies
  - [ ] Monitor conversion goals (if applicable)

- [ ] **Accessibility Audit**
  - [ ] Run automated accessibility scan
  - [ ] Check for reported accessibility issues
  - [ ] Monitor user feedback

### 8.2 First Week

- [ ] **SEO Indexing**
  - [ ] Verify Google Search Console shows pages indexed
  - [ ] Check for crawl errors or blocks
  - [ ] Monitor search impression data
  - [ ] Verify sitemap submission status

- [ ] **Social Media**
  - [ ] Share announcement to social channels
  - [ ] Verify Open Graph preview displays correctly
  - [ ] Monitor engagement and clicks

- [ ] **User Feedback**
  - [ ] Review contact form submissions
  - [ ] Check email for user reports
  - [ ] Monitor social mentions

### 8.3 Ongoing Monitoring

- [ ] **Quarterly Audits**
  - [ ] Re-run Lighthouse audit
  - [ ] Check accessibility compliance
  - [ ] Review performance metrics trends
  - [ ] Audit for broken links (404s)

- [ ] **Content Updates**
  - [ ] Schedule regular content reviews
  - [ ] Update project dates as new work completes
  - [ ] Refresh blog with periodic posts
  - [ ] Keep resume current

- [ ] **Dependency Updates**
  - [ ] Monitor for security updates (npm audit)
  - [ ] Plan quarterly dependency upgrades
  - [ ] Test updates in staging before deploying

---

## Summary & Sign-Off

### Blocking Items: \_\_\_ / 7 Categories Complete

1. Route Inventory & Completeness: [ ]
2. Metadata & SEO Verification: [ ]
3. Performance Verification: [ ]
4. Accessibility Checks: [ ]
5. Content Integrity Checks: [ ]
6. Responsive & Device Verification: [ ]
7. Deployment & Configuration Checks: [ ]

### Overall Status

- **Ready for Deployment**: ⏳ (Complete all blocking items)
- **Approved By**: ********\_\_\_********
- **Approval Date**: ********\_\_\_********
- **Deployed**: ********\_\_\_********

---

## Notes & Blockers

```
[Blockers or additional notes go here]
```

---

## Related Documents

- [Performance Audit & Optimization](./performance-audit.md)
- [Phase 10 Pre-Flight](./phase-10-preflight.md)
- [Cache Strategy](./cache-strategy.md)
- [Interaction System](./interaction-system.md)
