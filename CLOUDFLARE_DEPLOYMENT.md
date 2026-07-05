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

1. **Install the new dev dependency** (`wrangler`):
   ```bash
   npm install      # or: pnpm install
   ```

2. **Create the Pages project** (name must match `name` in `wrangler.jsonc`):
   ```bash
   npx wrangler pages project create aldengillespy-website
   ```

3. **Create Hyperdrive** pointing at your Postgres, then paste the returned id
   into `wrangler.jsonc` (`hyperdrive[0].id`):
   ```bash
   npx wrangler hyperdrive create aldengillespy-db \
     --connection-string="postgres://USER:PASS@HOST:5432/DB"
   ```

4. **Set production secrets** (do NOT commit these):
   ```bash
   npx wrangler pages secret put ORIGIN                     # https://your-domain.com
   npx wrangler pages secret put RESEND_API_KEY             # from resend.com
   npx wrangler pages secret put CONTACT_FORM_FROM_EMAIL    # domain verified in Resend
   npx wrangler pages secret put CONTACT_FORM_TO_EMAIL
   npx wrangler pages secret put CONTACT_FORM_SUBJECT_PREFIX
   npx wrangler pages secret put ADMIN_BASIC_AUTH_USERNAME
   npx wrangler pages secret put ADMIN_BASIC_AUTH_PASSWORD
   ```
   `DATABASE_URL` is supplied automatically by the Hyperdrive binding — you do
   not set it as a secret.

## Build & deploy

```bash
npm run build.cloudflare     # builds client + dist/_worker.js
npm run deploy.cloudflare     # wrangler pages deploy dist
```

Or connect the Git repo in the Cloudflare dashboard and set:
- **Build command:** `npm run build.cloudflare`
- **Build output directory:** `dist`

## Local preview (Workers runtime)

```bash
cp .dev.vars.example .dev.vars   # fill in values
npm run build.cloudflare
npm run preview.cloudflare        # wrangler pages dev dist
```

## Notes / caveats

- **`nodejs_compat`** and a `compatibility_date >= 2024-09-23` are required for
  `pg` and the AWS SDK. Both are set in `wrangler.jsonc`.
- **Postgres must be reachable from Cloudflare** (a hosted provider such as Neon,
  Supabase, or RDS with a public endpoint) via the Hyperdrive binding. `/blog`
  and `/admin` query it at request time. Note: the blog only swallows a *missing
  `blog_posts` table* (renders an empty list); an unreachable/misconfigured DB
  surfaces as a 500, so verify the Hyperdrive id and DB connectivity before
  going live.
- **Custom domain:** add it under the Pages project → Custom domains, then point
  `ORIGIN` at the final `https://` URL so form POST origin checks pass.
- The **Fastify/Docker** path (`npm run build`) is unchanged and still works.
