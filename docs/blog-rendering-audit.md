# Blog Rendering Audit

## Scope

- Public rendering path audited: markdown parsing, HTML generation, route wrapper structure, and prose application.
- Validation performed against live published article output served by the running site.

## Rendering Path Inventory

### Markdown Parse and Render

- Source markdown is stored in `blog_posts.body_markdown` and loaded by the public query helper.
- Public article HTML is generated in `src/lib/blog/markdown.ts`.
- The rendering path now uses a normalized token pass before HTML generation:
  - lex markdown into tokens
  - normalize heading/media/raw-HTML behavior
  - parse through a shared custom renderer

### Wrapper Application

- Public article route: `src/routes/blog/[slug]/index.tsx`
- Final public structure is now:
  - page shell
  - `main`
  - outer semantic `article`
  - article `header` with back-link, meta, title, summary, optional cover image
  - article body wrapper `.article-prose` on a body `div`
- Admin preview also uses `.article-prose` in compact mode for markup parity.

### Custom Element Mapping

- Body `h1` is normalized to `h2` to prevent duplicate article-level `h1` conflicts.
- Standalone markdown images are normalized to `figure > img` and add `figcaption` when a markdown image title exists.
- Tables are wrapped in `.article-prose__table-wrap` for mobile overflow handling.
- Raw HTML tokens are escaped instead of being injected verbatim.

## Current Output Shape

### Public Wrapper Structure

- `main` contains three sections on article pages:
  - article header section
  - article body section
  - next-step CTA section
- The markdown body itself renders as a single `.article-prose` `div` container with direct block children.

### Published Content Spot Checks

- Short article:
  - `/blog/single-shoot-multiple-deliverables`
  - body rendered as three paragraphs inside `.article-prose`
- Long article:
  - `/blog/why-need-react-for-site-ui-contextual-awareness`
  - `h2: 3`, `h3: 2`, `blockquote: 1`, `code: 4`, text length `10147`
- Headings, lists, code:
  - `/blog/working-with-chatgpt-generative-ai-copilot-interaction-rules-part-2`
  - `h2: 3`, `h3: 1`, `pre: 1`, `code: 6`, `blockquote: 2`
- Image or rich formatting:
  - `/blog/what-creates-net-neutrality-market-forces-or-the-fcc`
  - body includes one markdown image and multiple blockquotes

## Measured Findings From Live Output

- All scanned published articles had exactly one route-level `main h1`.
- Scanned article bodies had zero body-level `h1` in current published output, but renderer normalization now prevents future duplicate `h1` output.
- Real published content uses:
  - paragraphs
  - ordered and unordered lists
  - `h2` / `h3`
  - inline code
  - fenced code rendered as `pre > code`
  - blockquotes
  - standard images
- No published articles currently render markdown tables or `details` blocks, but both are now styleable by the prose system.

## Previous Conflicts

- Public article route previously carried a large inline utility stack targeting markdown descendants.
- Markdown rendering previously used default `marked` output with no normalization for:
  - duplicate `h1`
  - raw HTML emission
  - table overflow wrapper structure
  - image-to-figure normalization
- Public route and preview did not share a clearly defined normalized rendering surface.

## Current Normalization Outcome

- Prose styling is applied through one canonical body container.
- Public route semantics are intentionally layered: article shell outside, prose body inside.
- Markdown primitives now emit a more predictable HTML surface for the prose system.
- Legacy article-specific descendant utility overrides have been removed from the public article route.

## Unsupported or Unobserved Primitives

- No current published articles were found with markdown tables.
- No current published articles were found with `details` / `summary`.
- No current published articles were found with markdown image captions using image titles.
- These remain supported structurally and styleably, but were not observable in live published content during this audit.

## Files Involved

- `src/lib/blog/markdown.ts`
- `src/routes/blog/[slug]/index.tsx`
- `src/components/content/ArticleProse.tsx`
- `src/components/blog/MarkdownPreview.tsx`
- `src/styles/prose.css`
