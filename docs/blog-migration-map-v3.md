# Blog Migration Map - v3

This document records the live-schema migration plan for moving legacy blog data into the v3 `blog_posts` table inside the same PostgreSQL database.

## Live Schema Inspection Summary

Inspected against the configured PostgreSQL database on March 21, 2026.

### Tables discovered

- Legacy source tables: `posts`, `categories`, `tags`
- v3 destination table: `blog_posts`
- Not present in the live schema: author tables, media tables, blog section tables, join tables such as `post_tags` or `blog_post_tags`

### Row counts at inspection time

- `posts`: 16
- `categories`: 4
- `tags`: 0
- `blog_posts`: 3

### Legacy data profile

- Visible legacy posts: 13
- Hidden legacy posts: 3
- Slug collisions with existing `blog_posts`: none
- Legacy `dek` and `excerpt` differ: 0 rows
- Posts with non-empty tag relations: 0 rows
- Live `posts` table includes `dek` and `tags smallint[]`
- Live `posts` table does not include an `image` column

## Table Inventory

### Legacy `posts`

- `id` smallint primary key
- `slug` varchar not null
- `title` varchar not null
- `excerpt` varchar not null
- `date` timestamp without time zone not null
- `body` text not null
- `visible` smallint default `1`
- `readtime` smallint default `-1`
- `category` varchar not null default `engineering`
- `dek` varchar nullable
- `tags` smallint[] default empty array

### Legacy `categories`

- `id` smallint primary key
- `slug` varchar unique not null
- `name` varchar not null

### Legacy `tags`

- `id` smallint primary key
- `slug` varchar not null

### v3 `blog_posts`

- `id` bigint identity primary key
- `legacy_post_id` smallint unique
- `slug` text unique not null
- `title` text not null
- `summary` text not null
- `body_markdown` text not null
- `side` text not null
- `status` text not null
- `published_at` timestamptz nullable
- `updated_at` timestamptz nullable
- `cover_image_url` text nullable
- `cover_image_alt` text nullable
- `legacy_category_slug` text nullable
- `legacy_category_name` text nullable
- `legacy_tag_slugs` text[] not null default empty array
- `legacy_readtime` smallint nullable
- `created_at` timestamptz not null default `now()`

## Migration Strategy

- Runtime: TypeScript script executed with `pnpm tsx`
- Connection: direct `pg` client using the same `DATABASE_URL` environment contract as the app
- Execution mode: wraps all writes in a single transaction
- Dry-run mode: performs full schema inspection, transformation planning, collision analysis, and count validation without mutating the database
- Idempotency strategy: preserve each legacy `posts.id` in `blog_posts.legacy_post_id` and upsert on that key
- Slug collision strategy: preserve the original slug when available; if a slug is already occupied in `blog_posts`, rename deterministically to `{slug}-legacy-{legacy_id}` and record the redirect requirement in script output

## Category Mapping

| legacy category | v3 side       | rationale                                                         |
| --------------- | ------------- | ----------------------------------------------------------------- |
| `engineering`   | `engineering` | direct match                                                      |
| `cinematic`     | `production`  | editorial rename from legacy cinematic work to v3 production work |
| `process`       | `bridge`      | process-oriented writing spans both disciplines                   |
| `other`         | `bridge`      | closest available non-domain-specific v3 bucket                   |

## Field Mapping Matrix

| old table.column                     | destination table | destination column     | transform rule                                                                                                  | null/default handling             | notes                                                                                     |
| ------------------------------------ | ----------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------- |
| `posts.id`                           | `blog_posts`      | `legacy_post_id`       | preserve as the migration identity key                                                                          | fail if null                      | enables idempotent reruns via upsert                                                      |
| `posts.slug`                         | `blog_posts`      | `slug`                 | trim and preserve; if occupied, rename to `{slug}-legacy-{id}`                                                  | fail if blank after trim          | current inspection found no collisions                                                    |
| `posts.title`                        | `blog_posts`      | `title`                | trim and preserve                                                                                               | fail if blank after trim          | title is required by current UI and SEO                                                   |
| `posts.dek`                          | `blog_posts`      | `summary`              | primary summary source                                                                                          | fallback to `excerpt` if blank    | live inspection found `dek` and `excerpt` identical for all rows                          |
| `posts.excerpt`                      | `blog_posts`      | `summary`              | fallback summary source                                                                                         | used only when `dek` is blank     | retained in the map for explicitness                                                      |
| `posts.body`                         | `blog_posts`      | `body_markdown`        | decode escaped `\n` sequences, normalize line endings to LF, and trim whitespace; preserve markdown/inline HTML | fail if blank after normalization | semantic text is preserved rather than reserialized                                       |
| `posts.visible`                      | `blog_posts`      | `status`               | map non-zero to `published`, zero/null to `draft`                                                               | treat null as draft               | matches current public query contract                                                     |
| `posts.date`                         | `blog_posts`      | `published_at`         | set when mapped status is `published`                                                                           | null for draft rows               | preserves original publish chronology for visible posts                                   |
| `posts.date`                         | `blog_posts`      | `created_at`           | reuse as best-available creation time                                                                           | fail if null                      | legacy schema has no separate created timestamp                                           |
| `posts.date`                         | `blog_posts`      | `updated_at`           | reuse as best-available modification time                                                                       | fail if null                      | legacy schema has no separate updated timestamp                                           |
| `posts.category`                     | `blog_posts`      | `side`                 | map via category-to-side table above                                                                            | fail if category is unmapped      | v3 requires `engineering`, `production`, or `bridge`                                      |
| `posts.category`                     | `blog_posts`      | `legacy_category_slug` | preserve raw legacy category slug                                                                               | fail if missing                   | keeps migration provenance available                                                      |
| `categories.name`                    | `blog_posts`      | `legacy_category_name` | left join through `posts.category = categories.slug`                                                            | allow null if orphaned            | live schema currently enforces the FK, so null is not expected                            |
| `posts.tags` + `tags.slug`           | `blog_posts`      | `legacy_tag_slugs`     | resolve tag ids through `tags` and store tag slug array                                                         | normalize to empty array          | live inspection found zero tag rows and empty tag arrays everywhere                       |
| `posts.readtime`                     | `blog_posts`      | `legacy_readtime`      | preserve positive values only                                                                                   | map `-1` or null to null          | current v3 UI does not render read time yet                                               |
| historical `posts.image` expectation | `blog_posts`      | `cover_image_url`      | set null because the live PostgreSQL source table has no image column                                           | null                              | the historical audit mentioned an image field, but live schema inspection did not find it |
| no legacy source                     | `blog_posts`      | `cover_image_alt`      | set null                                                                                                        | null                              | destination supports it, source does not                                                  |

## Dependent Relation Handling

- There is no normalized destination table for blog tags in v3 yet.
- There is no destination author, media, or section table in the live schema.
- To avoid dropping related semantics during migration:
  - legacy category slug is preserved in `legacy_category_slug`
  - legacy category display name is preserved in `legacy_category_name`
  - resolved legacy tag slugs are preserved in `legacy_tag_slugs`
  - legacy readtime is preserved in `legacy_readtime`

## Validation Rules

The migration script validates the following before reporting success:

- legacy source row count matches migrated destination row count
- visible legacy row count matches migrated `published` destination row count
- every migrated row has a non-null slug and title
- migrated slugs remain unique in `blog_posts`
- migrated timestamps preserve the legacy `date` value intentionally:
  - `created_at = posts.date`
  - `updated_at = posts.date`
  - `published_at = posts.date` when `visible <> 0`
- migrated rows preserve category and tag metadata
- spot-check reads using the same published filter as the public app contract and confirm markdown paragraph splitting works on migrated bodies

## CLI

```bash
pnpm tsx scripts/inspect-blog-schema.ts
pnpm tsx scripts/migrate-legacy-blog.ts --dry-run
pnpm tsx scripts/migrate-legacy-blog.ts --execute
```

## Notes

- `--dry-run` is non-mutating and intended for planning, counts, and collision review.
- `--execute` is the one-time transactional copy/transform path.
- If a future run encounters a slug collision with a pre-existing v3 post, the migration script will rename the imported row deterministically and print the redirect requirement so the redirect matrix can be updated explicitly.
