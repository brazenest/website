import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { legacyRouteAudit } from '../src/lib/redirects/redirect-map'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputPath = resolve(repoRoot, 'docs/redirect-audit-v3-launch.md')

const renderDestination = (destination: string | null) => destination ?? 'n/a'

const markdown = `# Redirect Audit - v3 Launch

This audit inventories verified legacy public HTML routes recovered from git history and maps them to the v3 launch surface.

## Evidence Sources

- `_old/app/ * ` snapshot recovered from commit `0a86b8ab87e08c52a8e0ea9b6d49aa5d3204a4c1`
- `next - app / app/*` snapshot recovered from commit `9538f9942ef2013e659d4ff0855c9afbe5e8705e`
- Current v3 routes under `src/routes/*`

## Excluded From The Matrix

- `/admin`, `/add-article`, and other operational authoring pages
- `/api/*` endpoints used for form or content operations
- Internal framework files and draft-only local paths

## Legacy Route Matrix

| old path | old content/page purpose | v3 status | v3 destination | notes |
| --- | --- | --- | --- | --- |
${legacyRouteAudit
  .map(
    (row) =>
      `| ${row.oldPath} | ${row.purpose} | ${row.status} | ${renderDestination(row.destination)} | ${row.notes} |`
  )
  .join('\n')}

## Launch Redirect Rules Confirmed In Code

- `/blog/posts/[slug]` -> `/blog/[slug]` (permanent)
- `/blog/articles/[slug]` -> `/blog/[slug]` (permanent)
- `/blog/posts` -> `/blog` (permanent)
- `/blog/articles` -> `/blog` (permanent)
- `/work/shadowcat-bellagio` -> `/production/projects/bellagio-fountain-film` (permanent)
- `/work/shadowcat-bellagio-fountains` -> `/production/projects/bellagio-fountain-film` (permanent)

## Notes

- `gone` entries should prefer `410 Gone` at the edge if those paths are kept in the server or CDN configuration.
- `needs-decision` entries should not receive a guessed redirect before product sign-off.
- No blanket redirect-to-home rule is present in the application redirect layer.
`

mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, markdown, 'utf8')

console.log(`Wrote ${outputPath}`)