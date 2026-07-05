# Deploying to Cloudflare Pages

This site runs as a **Qwik City SSR app on Cloudflare Pages** (Pages Functions /
Workers runtime). The existing Fastify/Docker deploy is left intact — Cloudflare
uses a separate adapter and entry point.

## What was added

| File | Purpose |
| --- | --- |
| `src/entry.cloudflare-pages.tsx` | Cloudflare Pages SSR entry (`fetch` handler). |
| `adapters/cloudflare-pages/vite.config.ts` | Build config that emits `dist/_worker.js`. |
| `wrangler.jsonc` | Pages project config: `nodejs_compat`, Hyperdrive binding. |
| `src/routes/plugin@env.ts` | Bridges Cloudflare bindings/secrets into the shared runtime env store each request. |
| `src/routes/plugin@auth.ts` | Enforces `/admin` Basic auth at the SSR layer. |
| `src/lib/server/runtimeEnv.ts` | `bridgePlatformEnv()` + `getRuntimeEnv()` (Hyperdrive → `DATABASE_URL`, etc.). |
| `src/lib/db.ts` | Uses a per-request `pg` `Client` on Workers (Hyperdrive pools upstream). |

Why the env bridge/plugins exist: on Cloudflare, secrets and bindings arrive on
`platform.env`, not `process.env` — and on the Workers runtime a `process.env`
write in one bundled chunk is **not** visible to other chunks, so it can't be
used to hand values to route handlers. Instead, middleware copies bindings into a
`globalThis`-backed store (shared across chunks), and server code reads them with
`getRuntimeEnv()` (which falls back to `process.env` on Node/Fastify). Separately,
`/admin` auth was previously enforced only by the Fastify server, which does not
run on Pages. Both gaps are now closed for the Cloudflare runtime.

## One-time setup

If you're using the GitHub dashboard flow (below), project creation and secrets
are handled there — the only step you must still do here is **create
Hyperdrive** (a Cloudflare resource that can't live in the repo):

**Create Hyperdrive** pointing at your Postgres, then paste the returned id into
`wrangler.jsonc` (`hyperdrive[0].id`):
```bash
npx wrangler hyperdrive create aldengillespy-db \
  --connection-string="postgres://USER:PASS@HOST:5432/DB"
```
`DATABASE_URL` is then supplied automatically by the Hyperdrive binding — never
set it as a secret.

(CLI-only alternative to the dashboard: `npm install`, then
`npx wrangler pages project create aldengillespy-website`, then set each secret
with `npx wrangler pages secret put <NAME>`.)

## Automatic deploys from GitHub (recommended)

Goal: every push to `main` deploys `aldengillespy.com`, every push to `dev`
deploys `dev.aldengillespy.com` — no CLI, no GitHub Action. Cloudflare Pages'
Git integration builds on every push (the production branch → production, all
other branches → preview deployments).

The build reads `wrangler.jsonc` from the repo, so `nodejs_compat` and the
Hyperdrive binding are applied automatically. `build.cloudflare` needs **no**
`.env` file — all config comes from the Pages environment variables you set
below.

**1. Connect the repo (once).**
Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick
this repo. Set:
- **Production branch:** `main`
- **Framework preset:** None
- **Build command:** `npm run build.cloudflare`
- **Build output directory:** `dist`
- Save & Deploy. (The project name must match `name` in `wrangler.jsonc`:
  `aldengillespy-website`.)

After this, pushes to `main` build production and pushes to `dev` build a preview
automatically.

**2. Environment variables & secrets.**
IMPORTANT: because this repo has a `wrangler.jsonc`, Pages treats it as the source
of truth for **plain variables** and *wipes any plain variables set in the
dashboard* — only **Secrets** (encrypted) survive there. So config is split:

- **Non-secret vars → `wrangler.jsonc` `vars`** (already committed, version-
  controlled, per-environment): `ORIGIN`, `CONTACT_FORM_TO_EMAIL`,
  `CONTACT_FORM_FROM_EMAIL`, `CONTACT_FORM_SUBJECT_PREFIX`. Edit them there.
- **Secrets → dashboard** (Settings → Environment variables and secrets → add as
  *Secret*, for **both** Production and Preview): `RESEND_API_KEY`,
  `ADMIN_BASIC_AUTH_USERNAME`, `ADMIN_BASIC_AUTH_PASSWORD`.

Do NOT set the non-secret keys as dashboard variables — they'll be wiped. Do not
duplicate a key in both places. `DATABASE_URL` is NOT set anywhere — it comes
from the Hyperdrive binding.

**3. Hyperdrive (production + a separate free dev database).** `wrangler.jsonc`
is already set up for two databases: the top-level `HYPERDRIVE` binding →
production, and an `env.preview` override → the `dev` branch. This is zero-cost —
Hyperdrive is free (up to 10 configs/account) and the dev database lives on your
**existing** Postgres server, so no new server is provisioned. To finish it:

```bash
# 1. On your existing Postgres server, create a separate dev database:
#    (psql)  CREATE DATABASE aldengillespy_dev;
# 2. Create the dev Hyperdrive config (free):
npx wrangler hyperdrive create aldengillespy-db-dev \
  --connection-string="postgres://USER:PASS@HOST:5432/aldengillespy_dev"
# 3. Paste the returned id into wrangler.jsonc -> env.preview.hyperdrive[0].id
#    (replacing REPLACE_WITH_YOUR_DEV_HYPERDRIVE_ID).
```

Production keeps using the top-level Hyperdrive id. Until the real dev id is set,
`dev` previews can't reach a database. (Pages rule: because `env.preview`
overrides a binding, that env block must declare every binding it needs — here
just `hyperdrive`; production still inherits the top-level config.)

**4. Custom domains** — see "Branch → domain mapping" below for the `dev`
subdomain (the non-obvious CNAME step).

### Manual deploy (alternative, no Git integration)

```bash
npm run build.cloudflare      # builds client + dist/_worker.js
npm run deploy.cloudflare      # wrangler pages deploy dist  (add --branch dev for preview)
```
Secrets for the manual path are set with `wrangler pages secret put <NAME>`
(prompts for production/preview).

## Local preview (Workers runtime)

```bash
cp .dev.vars.example .dev.vars   # fill in values
npm run build.cloudflare
npm run preview.cloudflare        # wrangler pages dev dist
```

## Branch → domain mapping

The old EC2 deploy mapped branches to domains via GitHub Actions
(`.github/workflows/deploy-development.yml` → `dev`, `deploy-production.yml` →
`main`, each SSHing to EC2). **That mapping does not carry over to Cloudflare** —
Pages uses its own model, and those two workflows still target EC2. Decide
whether to keep them (belt-and-suspenders during the transition) or remove them
once Cloudflare is live.

Cloudflare Pages branch model:
- **Production branch** (`main`) → every push builds a **production** deployment.
  `aldengillespy.com` (you've already added it) always serves the latest
  production build. So `main` → `aldengillespy.com` is done once `main` is the
  production branch.
- **All other branches** (incl. `dev`) → **preview** deployments at
  `<hash>.<project>.pages.dev`, plus a stable per-branch alias
  `dev.<project>.pages.dev` that always tracks the latest `dev` commit.

**Map `dev.aldengillespy.com` → the `dev` branch** (two steps; needs a *proxied*
Cloudflare DNS record):
1. Pages project → **Custom domains → Set up a custom domain** → enter
   `dev.aldengillespy.com` → Continue → Activate. This creates a `CNAME dev`
   record pointing at the project's production alias (`aldengillespy-website.pages.dev`).
2. Go to the zone's **DNS** settings and edit that `CNAME dev` record: change its
   **target** from `aldengillespy-website.pages.dev` to the branch alias
   `dev.aldengillespy-website.pages.dev`. Keep it **Proxied** (orange cloud).

Now `dev.aldengillespy.com` serves the latest `dev` preview, and `main` +
`aldengillespy.com` serve production — both refreshed automatically on push.

## Notes / caveats

- **`nodejs_compat`** and a `compatibility_date >= 2024-09-23` are required for
  `pg`. Both are set in `wrangler.jsonc`.
- **Postgres must be reachable from Cloudflare** (a hosted provider such as Neon,
  Supabase, or RDS with a public endpoint) via the Hyperdrive binding. `/blog`
  and `/admin` query it at request time. Note: the blog only swallows a *missing
  `blog_posts` table* (renders an empty list); an unreachable/misconfigured DB
  surfaces as a 500, so verify the Hyperdrive id and DB connectivity before
  going live.
- **Custom domains / per-branch domains:** see "Branch → domain mapping" above.
- The **Fastify/Docker** path (`npm run build`) and the EC2 GitHub Actions are
  unchanged and still work — nothing forces you off them until you're ready.
