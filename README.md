# Alden Gillespy's Personal Website

The active website workspace is the Qwik v3 implementation rooted in `src/`. The previous Next.js implementation now lives in `next-app/` as legacy reference code during the migration.

## Workspace Boundaries

- `src/` is the canonical application root for the v3 Qwik app.
- `next-app/` is legacy Next.js v2 reference code only.
- Active v3 imports, aliases, scripts, and build configuration should not point into `next-app/` unless a migration task explicitly marks that usage as temporary reference-only work.

## Current Foundation

- Version **`3.0.0`**
- Workspace boundary refresh completed on `2026-03-13`

## License Info

This project is released under the **[SUNTHETIC Source Code Evaluation License, Version 1.2](https://sunthetic.media/licenses/scel-1.2)** license.

A copy of this license is provided within this project [here](LICENSE.md).

## Copyright Notice

&copy; 2026 Alden Gillespy. All rights reserved.
