# TASK-129 - Audit PostgreSQL Blog Schema and Align It to the v3 Blog Content Model

## Scope and Sources

This audit compares:

- the current v3 blog route, content, SEO, and structured-data contract in the active Qwik site
- the legacy database-backed blog implementation recovered from git history

Important constraint:

- there is no current PostgreSQL schema artifact in the checked-out workspace
- the only schema dump recovered from history is `db-backup.sql` from commit `5697058`
- that dump is MySQL-flavored SQL, not PostgreSQL DDL
- the legacy application code was configured to talk to PostgreSQL via `pg` and a `postgresql://...` connection string

Because of that mismatch, the database model below should be treated as the best recoverable snapshot of the old relational blog shape, not as a trustworthy current PostgreSQL source of truth.

## Current v3 Launch Contract

The current v3 blog implementation expects the following fields and behaviors.

### Content model currently used by the site

From `src/types/content.ts`:

- `title`
- `slug`
- `date`
- `summary`
- `side`: `engineering | production | bridge`
- `published`: boolean
- `sections`: array of `{ title, paragraphs[] }`

### Blog index requirements

From `src/routes/blog/index.tsx` and `src/components/blog/PublishedBlogList.tsx`:

- list only published posts
- sort newest first
- display side label
- display publish date
- display title
- display summary/excerpt
- link by slug

### Blog detail requirements

From `src/routes/blog/[slug]/index.tsx`:

- look up a published post by slug
- render title
- render publish date
- render side label
- render summary
- render longform body as ordered sections and paragraphs
- hide unpublished posts from the public route

### SEO and structured-data requirements already present in the codebase

From `src/types/seo.ts`, `src/fns/seo/buildStructuredData.ts`, and `src/fns/seo/metadataToDocumentHead.ts`:

- article pages support `publishedTime`
- article pages support `modifiedTime`
- article JSON-LD supports:
  - `title`
  - `description`
  - `url`
  - `image`
  - `datePublished`
  - `dateModified`
  - `keywords`
  - `articleBody`
  - author object derived from site config unless overridden
- OG metadata supports image URL and image alt text

### Sitemap and prerender constraints

From `src/lib/prerender-routes.ts` and `src/fns/seo/getSitemapEntries.ts`:

- published blog detail routes are prerenderable when slugs are enumerable
- current sitemap generation only includes static pages from the SEO preset inventory
- dynamic blog post URLs are not currently emitted to the sitemap

## Recovered Legacy Relational Schema

Recovered from git history:

- SQL dump: `db-backup.sql` in commit `5697058`
- DB connector: `next-app/lib/db.ts` in commit `9538f99`
- DB URL helper: `next-app/functions/getDatabaseUrl.ts` in commit `9538f99`
- query layer: `next-app/functions/getBlogPostsFromDB.ts` in commit `9538f99`
- API route: `next-app/app/api/posts/route.ts` in commit `9538f99`
- legacy row types: `next-app/types/blog.ts` in commit `9538f99`

### Tables identified

#### `categories`

Columns:

- `id` smallint, primary key, auto increment
- `slug` varchar(255), unique, not null
- `name` varchar(255), not null

Observed seed values:

- `engineering`
- `cinematic`
- `process`
- `other`

#### `posts`

Columns:

- `id` smallint, primary key, auto increment
- `slug` varchar(255), not null
- `title` varchar(255), not null
- `excerpt` varchar(255), not null
- `date` datetime, not null
- `body` text, not null
- `visible` tinyint(1), default `1`
- `readtime` tinyint(4), default `-1`
- `category` varchar(255), not null, default `engineering`
- `tags` varchar(255), not null, default empty string
- `image` varchar(255), nullable

Indexes and relationships:

- primary key on `posts.id`
- non-unique index `category_on_categories` on `posts.category`
- old query layer joined `posts.category = categories.slug`
- no foreign key constraint is present in the recovered SQL dump

### Publication-state behavior in the legacy code

The legacy application used `visible` as the public visibility flag.

- public reads filtered on `posts.visible = true` or equivalent
- hidden posts were optionally retrievable with `showHidden=true`
- inserts defaulted to a visible/published posture unless application logic changed it later

### Tags behavior in the legacy code

The recovered state is internally inconsistent:

- the SQL dump stores `posts.tags` as a `varchar(255)`
- legacy TypeScript types modeled `tags` as `number[]`
- the helper `getTags()` queried a separate `tags` table by numeric IDs
- no `tags` table appears in the recovered SQL dump

This means the legacy tag model cannot be treated as reliable without a newer schema artifact.

### Author behavior in the legacy code

No author table, author foreign key, or author columns were found in the recovered schema or the old post query.

The current v3 SEO implementation already has a site-level canonical author identity via site config, which is enough for v3 launch unless multi-author publishing is explicitly required.

## Schema-to-v3 Comparison

### What already fits

- Stable post identifier exists: `posts.id`
- Slug exists: `posts.slug`
- Title exists: `posts.title`
- Description/excerpt exists: `posts.excerpt`
- Publish date exists: `posts.date`
- Longform body exists: `posts.body`
- Cover image reference exists: `posts.image`
- Publication state exists in practice: `posts.visible`
- Category-like classification exists: `posts.category` joined to `categories.slug`

### What is missing for v3 launch alignment

- No `updated_at` or equivalent modified timestamp
- No cover image alt text field
- No canonical publication-status field with explicit semantics such as `draft` or `published`
- No trustworthy tag schema despite code references to tags
- No body structure that maps naturally to the current `sections[]` model
- No explicit constraint guaranteeing slug uniqueness on `posts.slug`
- No explicit foreign key from `posts.category` to `categories.slug`
- No current PostgreSQL DDL artifact to validate actual deployed column types or constraints

### What does not align cleanly with v3

#### Category vocabulary mismatch

Legacy categories:

- `engineering`
- `cinematic`
- `process`
- `other`

Current v3 sides:

- `engineering`
- `production`
- `bridge`

This is not a cosmetic rename. The old category set encodes a different editorial model.

- `cinematic` maps roughly to `production`
- `process` overlaps both sides and does not map cleanly
- `other` is outside the current v3 IA and should not survive as a public launch taxonomy without a strong content justification
- `bridge` is required by v3 but does not exist in the old schema vocabulary

#### Publication-state semantics are too weak

`visible` is an output flag, not a durable editorial state model.

For v3 launch, a single canonical state field is sufficient, but it should be explicit. Recommended values:

- `draft`
- `published`

That keeps the launch scope small while avoiding the ambiguity of `visible`.

#### The legacy body shape is too flat

The current v3 detail route renders structured sections. The legacy schema stores one unstructured `body` blob.

For launch, the database does not need a full CMS block system, but it does need one of these clear contracts:

- store canonical markdown in one `body_markdown` field and parse it into sections at render time, or
- store a simple structured JSON body such as section title plus paragraph arrays

The first option is lower scope and more practical for v3.

#### Tags are not launch-ready

The recovered implementation shows unresolved drift between SQL, types, and helper functions.

Since the current v3 site does not require tags for routing or UI, tags should not be introduced into the launch schema unless there is already validated production content that needs them.

### What should be renamed or normalized

Recommended launch-normalized field names:

- `date` -> `published_at`
- `visible` -> `status`
- `excerpt` -> `summary`
- `image` -> `cover_image_url` or `cover_image_asset`
- add `cover_image_alt`
- add `updated_at`
- replace `category` with `side`

Recommended launch shape:

- `id`
- `slug`
- `title`
- `summary`
- `body_markdown`
- `side`
- `status`
- `published_at`
- `updated_at`
- `cover_image_url` or asset reference
- `cover_image_alt`

Optional only if already justified by real content:

- `tags`

Not recommended for v3 launch:

- revision tables
- workflow states beyond `draft` and `published`
- approval flows
- multi-author modeling
- speculative admin metadata

## Recommended v3-Aligned PostgreSQL Model

Use one primary table for launch.

### `blog_posts`

Recommended columns:

- `id` UUID or big integer primary key
- `slug` text not null unique
- `title` text not null
- `summary` text not null
- `body_markdown` text not null
- `side` text not null
- `status` text not null
- `published_at` timestamptz null
- `updated_at` timestamptz null
- `cover_image_url` text null
- `cover_image_alt` text null
- `created_at` timestamptz not null default now()

Recommended constraints:

- unique index on `slug`
- check constraint on `side` limited to `engineering`, `production`, `bridge`
- check constraint on `status` limited to `draft`, `published`
- check constraint that `published_at` is not null when `status = 'published'`

Why this is the right launch scope:

- matches the current route contract closely
- supports current and near-term SEO needs
- keeps the public filtering rule simple
- leaves room for later tags or richer media without forcing them now

## Alignment Plan

### 1. Freeze the canonical launch vocabulary

Decide and document that the public blog taxonomy is:

- `engineering`
- `production`
- `bridge`

Do not carry forward `cinematic`, `process`, or `other` as public-facing launch states unless content has already been intentionally remapped.

### 2. Normalize the legacy schema into one launch-ready post table

Replace the old `posts` plus `categories` coupling with a single explicit launch model centered on `blog_posts.side`.

Reasoning:

- the current site only needs one justified classification dimension
- splitting side into a separate table adds unnecessary launch complexity
- the old `categories` table encoded obsolete editorial vocabulary

### 3. Promote publication state to a canonical status field

Use `status` instead of `visible`.

Reasoning:

- clearer semantics in code and queries
- supports draft filtering and published routing without special cases
- avoids future confusion around private-but-visible or preview-only meanings

### 4. Add modified-date support now

Include `updated_at` in the schema even if the first wave of posts does not use it heavily.

Reasoning:

- already supported by the SEO metadata and JSON-LD utilities
- low schema cost
- prevents a second migration just to support `article:modified_time`

### 5. Add cover-image alt text now

If cover images are allowed, alt text should be first-class in the model.

Reasoning:

- the SEO layer already supports image alt text
- accessibility and social metadata benefit immediately
- avoids shipping an image field that is semantically incomplete

### 6. Keep author handling site-level for launch

Do not add author tables or per-post author relations unless a real multi-author requirement appears.

Reasoning:

- current structured data already derives author from canonical site identity
- single-author site does not need relational author complexity at launch

### 7. Defer tags until content and UI justify them

Do not migrate the old tag concept into v3 launch by default.

Reasoning:

- recovered implementation is inconsistent
- current routes and UI do not depend on tags
- launch scope is better served by reliable `side` classification only

## Follow-up Ticket Set

### 1. Schema migration / refactor

Suggested ticket:

- `TASK-130 - Create v3-aligned PostgreSQL blog_posts schema`

Acceptance:

- add `blog_posts` table with launch fields and constraints
- enforce unique slug
- enforce valid `side` values
- enforce valid `status` values
- include `published_at`, `updated_at`, `cover_image_alt`
- document whether old data is migrated or archived

### 2. Query and data-layer integration

Suggested ticket:

- `TASK-131 - Implement database-backed blog post queries for v3`

Acceptance:

- create query helpers for:
  - list published posts ordered by `published_at DESC`
  - fetch one published post by slug
  - optionally fetch drafts for local or admin-only inspection
- map DB rows into the v3 route shape
- parse `body_markdown` into the renderable body model expected by the site

### 3. Blog index wiring

Suggested ticket:

- `TASK-132 - Wire blog index to database-backed published posts`

Acceptance:

- `/blog` renders from live query results instead of static TypeScript content
- ordering matches current behavior
- unpublished posts remain excluded from the public index
- title, summary, side, date, and slug render without UI changes

### 4. Blog detail wiring

Suggested ticket:

- `TASK-133 - Wire blog detail route to database-backed published posts`

Acceptance:

- `/blog/[slug]` resolves via database lookup
- unpublished or missing posts do not render as public articles
- body content renders from canonical stored content
- no redesign of the current page structure

### 5. SEO and Article JSON-LD wiring

Suggested ticket:

- `TASK-134 - Map live blog data into article metadata and JSON-LD`

Acceptance:

- blog detail head includes description from `summary`
- article metadata includes `publishedTime`
- `modifiedTime` is emitted when `updated_at` is present
- JSON-LD article builder receives image, alt-capable OG metadata, and article body when available
- canonical author remains site-level unless requirements change

### 6. Sitemap reconciliation

Suggested ticket:

- `TASK-135 - Add dynamic blog post URLs to sitemap generation`

Acceptance:

- sitemap includes all published blog post URLs
- draft URLs are excluded
- sitemap stays aligned with the same published-post query used by routing/prerendering
- no hardcoded slug inventory remains

## Final Assessment

### What is fully understood

- the current v3 site contract for blog index, detail, SEO, and structured data
- the recoverable legacy relational blog shape
- the major drift between the old model and the current v3 launch model
- the fact that the repo does not currently contain a trustworthy PostgreSQL schema artifact

### Primary gaps blocking direct live-data wiring today

- no checked-in PostgreSQL DDL source of truth
- legacy taxonomy does not match v3 side taxonomy
- no modified timestamp
- no image alt text
- no reliable tag model
- no body format decision aligned to current section rendering
- sitemap does not yet include dynamic blog URLs

### Concrete conclusion

The project is ready to proceed with database wiring once the schema is normalized to a single v3-aligned `blog_posts` model and the live query layer adopts the current route contract.

The key move is not to recreate the legacy blog database exactly. The key move is to preserve only the parts that serve the current v3 site:

- stable identity
- clean slugs
- concise summaries
- canonical publication state
- structured longform content source
- image reference plus alt text
- explicit side classification aligned to the current information architecture
