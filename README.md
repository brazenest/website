# Personal Site v3

Full-featured Qwik + Fastify production site for alden.dev.

### Implementation Complete

- ✅ Qwik 1.19.2 + Qwik City with SSR/SSG
- ✅ TypeScript 5.4.5 + Vite 7.3.1 multi-stage build (SSG blocker resolved)
- ✅ Tailwind CSS 4.2.1 with v4 engine
- ✅ Full routing: home, about, engineering, production, blog, contact, resume
- ✅ Dynamic routes for blog posts and project details
- ✅ **Blog backed by PostgreSQL database** (3 launch posts seeded and verified)
- ✅ Structured data (Person, WebSite, Article, CreativeWork schemas)
- ✅ Accessibility verified (skip links, landmarks, ARIA labels, motion preferences)
- ✅ Responsive design and mobile navigation
- ✅ Environment-based configuration with ORIGIN, PORT, HOST, DATABASE_URL
- ✅ Production Docker build with multi-stage optimization
- ✅ Static site generation (SSG) with full route prerendering

## Development Setup

### Prerequisites

- Node.js 20+ (specified in Dockerfile)
- pnpm 8+ (package manager)
- PostgreSQL 12+ (if running blog locally; optional for development)

### Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
# Server configuration
ORIGIN=http://localhost:4173      # URL for SSR/prerendering
PORT=3000                         # Fastify server port
HOST=0.0.0.0                      # Bind address
NODE_ENV=production

# Database configuration (for blog functionality)
DATABASE_URL=postgresql://user:password@host:port/database  # Optional; falls back to static data
```

### Running Locally

**Development mode** (with live reload):

```bash
pnpm install
pnpm run dev
```

Then visit [http://localhost:5173/](http://localhost:5173/)

**Production build** (static prerendering + SSG):

```bash
pnpm run build
```

This executes:

1. `build.types` — TypeScript type checking
2. `build.client` — Vite client bundle
3. `lint` — ESLint validation
4. `build.server` — SSR bundle + Fastify adapter
5. SSG Phase — Prerender all routes to static HTML

**Serving production build**:

```bash
pnpm run serve
```

Then visit [http://localhost:3000/](http://localhost:3000/)

## Build Notes

### Known Configuration

- **Minification**: Currently disabled in production build
  - Reason: Workaround for Qwik SSG initialization incompatibility with esbuild
  - Impact: ~2-3x larger pre-gzip bundles; ~15-30 KB increase post-gzip
  - Status: Stable and acceptable for v3.0.0; see [Performance Audit](./docs/performance-audit.md#18-task-138) for details
  - Future: Re-enable after investigating esbuild/Qwik root cause

### Blog Database Integration

The blog system is database-backed (PostgreSQL) for content management:

- **Schema**: `blog_posts` table with published flag, timestamps, markdown content
- **Connectivity**: Environment-driven config; SSL/TLS support via `PGSSLMODE`
- **Content**: 3 launch posts seeded in PostgreSQL
- **Routing**: Dynamic `/blog/[slug]` routes query database at build time (SSG enumeration)
- **SEO**: Sitemap automatically includes published blog slugs from database

For local development without a database, the system can fall back to static content (configured in `src/lib/db.ts`).

## Fastify Server

This app has a minimal [Fastify server](https://fastify.dev/) implementation. The production server serves prerendered static HTML and handles dynamic requests (if any).

The build pipeline produces:

- Static HTML files (one per route)
- Versioned JS/CSS chunks with content hashing (immutable caching)
- Optimized async Qwik component bundles
