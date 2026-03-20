# Production Readiness Audit — v3.0.0

**Date**: March 20, 2026  
**Scope**: Complete production configuration and deployment setup audit  
**Status**: ⚠️ **BLOCKING ISSUES IDENTIFIED** — Several critical items must be resolved before v3.0.0 production deployment

---

## Executive Summary

The v3.0.0 production configuration is **largely stable** with a clean Qwik + Fastify + Docker stack, but contains **5 critical blockers** and **multiple stale/transitional configurations** that must be resolved before deployment:

### 🔴 Critical Blockers (Must Fix)

1. **Dockerfile copies non-existent `/server` directory** — Will fail at build time
2. **GitHub Actions workflows depend on missing `deploy.sh` script** — Deployments will fail
3. **Contradictory package manager configuration** — Both yarn and pnpm lockfiles exist
4. **Missing environment variable documentation** — No `.env.example` or documentation
5. **Fastify HTTP compression disabled** — Performance degradation in production

### 🟡 Stale/Transitional Configuration (Should Clean)

- PostgreSQL/Drizzle references in README (deprecated, not implemented)
- Qwik config discusses unused SSR prerendering strategy
- ESLint config has duplicate ignore patterns
- Autoprefixer in dependencies (not used with Tailwind v4)
- Old Fastify plugin version constraint `>=4.0.0 <6.0.0`

### ✅ Production-Ready Components

- Build configuration and chain (Vite multi-stage) — solid
- TypeScript configuration — correct for deployment
- Static asset caching strategy — well-optimized
- Multi-stage Docker build — good practices
- ESLint/Prettier/Tailwind — all current versions

---

## 1. Build Scripts Analysis

**Location**: [package.json](package.json)

### Current Scripts

```json
"scripts": {
  "build": "qwik build",                    // ✅ Correct - orchestrates full build
  "build.client": "vite build",             // ✅ Dev-only dependency, not used in prod
  "build.preview": "vite build --ssr src/entry.preview.tsx", // ⚠️ Stale - preview only
  "build.server": "qwik check-client src dist && vite build -c adapters/fastify/vite.config.ts", // ✅ Prod
  "build.types": "tsc --noEmit",            // ✅ CI/validation only
  "dev": "vite --mode ssr",                 // ✅ Dev-only
  "fmt": "prettier --write .",              // ✅ Dev-only
  "fmt.check": "prettier --check .",        // ✅ CI-only
  "lint": "eslint \"src/**/*.ts*\"",         // ✅ CI-only
  "preview": "qwik build preview && vite preview", // ⚠️ Stale/testonly
  "serve": "node server/entry.fastify",     // 🔴 **BROKEN** - server path doesn't exist (see Blocker #1)
  "start": "vite --mode ssr",               // ❌ Duplicate of dev, confusing
  "qwik": "qwik"                            // ✅ CLI passthrough
}
```

### Build Chain Verification

**Expected for production**: `npm run build` → `npm run serve`

1. **`npm run build`** executes `qwik build`:
   - ✅ Runs Qwik optimizer and Vite build pipeline
   - ✅ Internally calls both `build.client` and `build.server`
   - ✅ Outputs to `/dist` with proper structure

2. **`npm run serve`** executes `node server/entry.fastify`:
   - 🔴 **CRITICAL: `server/entry.fastify` does not exist**
   - Server entry point is at `src/entry.fastify.tsx`
   - Built output goes to `/dist`, not `/server`
   - Docker will fail at runtime

### Issues & Recommendations

| Issue                    | Type      | Severity    | Recommendation                                            |
| ------------------------ | --------- | ----------- | --------------------------------------------------------- |
| `serve` script broken    | Blocker   | 🔴 CRITICAL | Change to `node dist/entry.fastify-*.js` (see note below) |
| `start` duplicates `dev` | Confusing | 🟡 MEDIUM   | Remove `start` script (only use `dev`)                    |
| `build.preview` unused   | Stale     | 🟡 LOW      | Remove or document when used                              |
| `preview` script unused  | Stale     | 🟡 LOW      | Remove unless testing static build                        |

**Note on serve script fix**: The built server entry is named with a hash (e.g., `dist/entry.fastify-HBNx2KV9.js`). A proper fix would be:

```json
"serve": "node dist/entry.fastify*.js"
```

Or create a proper entry point wrapper.

---

## 2. Dependencies Analysis

**Location**: [package.json](package.json)

### devDependencies (18 total)

| Package                 | Version    | Status       | Notes                                                                       |
| ----------------------- | ---------- | ------------ | --------------------------------------------------------------------------- |
| `@builder.io/qwik`      | `^1.19.2`  | ✅ Current   | Latest Qwik 1.x                                                             |
| `@builder.io/qwik-city` | `^1.19.2`  | ✅ Current   | Matches Qwik version                                                        |
| `@eslint/js`            | `^9`       | ✅ Current   | ESLint 9 (latest flat config)                                               |
| `@tailwindcss/postcss`  | `^4.2.1`   | ✅ Current   | Tailwind v4 engine                                                          |
| `@types/node`           | `20.19.0`  | ⚠️ Pinned    | Consider allowing patch updates                                             |
| `autoprefixer`          | `^10.4.27` | ⚠️ **Stale** | **NOT USED** with Tailwind v4 (included in `@tailwindcss/postcss`) — REMOVE |
| `dotenv`                | `^16.3.2`  | ✅ Current   | Load `.env` files                                                           |
| `eslint`                | `9.32.0`   | ✅ Current   | Pinned (eslint 9 intentional)                                               |
| `eslint-plugin-qwik`    | `^1.19.2`  | ✅ Current   | Matches Qwik version                                                        |
| `globals`               | `16.4.0`   | ✅ Current   | Pinned (used by ESLint flat config)                                         |
| `postcss`               | `^8.5.8`   | ⚠️ Minor     | Offer PostCSS 9 (may be future)                                             |
| `prettier`              | `3.6.2`    | ✅ Current   | Latest Prettier                                                             |
| `tailwindcss`           | `^4.2.1`   | ✅ Current   | Tailwind v4 (latest)                                                        |
| `typescript`            | `5.4.5`    | ✅ Current   | TypeScript 5.4                                                              |
| `typescript-eslint`     | `8.38.0`   | ✅ Current   | Type-aware linting                                                          |
| `vite`                  | `7.3.1`    | ✅ Current   | Vite 7 latest                                                               |
| `vite-tsconfig-paths`   | `^4.2.1`   | ✅ Current   | Path resolution                                                             |

**Issues**:

- 🔴 **Remove `autoprefixer`** — Not needed with Tailwind v4, causes build overhead
- ⚠️ `@types/node` pinned (20.19.0) — allows patches but no minor updates
- ⚠️ `eslint` pinned (9.32.0) — intentional for stability, acceptable

### dependencies (5 total)

| Package                      | Version   | Status        | Notes                                         |
| ---------------------------- | --------- | ------------- | --------------------------------------------- |
| `@fastify/compress`          | `^6.2.1`  | ⚠️ Unused     | **BLOCKER: Disabled in code** (see section 3) |
| `@fastify/static`            | `^6.10.1` | ✅ Used       | Serves static assets in production            |
| `@fontsource-variable/inter` | `^5.2.8`  | ✅ Used       | Variable font, correctly imported             |
| `clsx`                       | `^2.1.1`  | ✅ Used       | Class composition utility                     |
| `fastify`                    | `^5.7.3`  | ✅ Production | Runtime HTTP server                           |
| `fastify-plugin`             | `^4.5.0`  | ✅ Used       | Fastify plugin system                         |
| `tailwind-merge`             | `^3.5.0`  | ✅ Used       | Merge Tailwind classes                        |

**Issues**:

- ⚠️ `@fastify/compress` included but **disabled in code** — Either enable or remove
- ✅ All other dependencies are necessary and at current versions

### Dependency Audit Recommendations

**Remove**:

```json
"autoprefixer": "^10.4.27"  // Not used with Tailwind v4
```

**Consider enabling or removing**:

```json
"@fastify/compress": "^6.2.1"  // Currently commented out in src/entry.fastify.tsx line 37
```

**No changes needed** for other dependencies.

### Total dependency count: 23 (reasonable for this project type)

---

## 3. Build Configuration Files

### 3.1 vite.config.ts

**Location**: [vite.config.ts](vite.config.ts)

**Status**: ✅ Production-ready

**Key findings**:

- ✅ Build target: `ES2020` — correct for modern browsers
- ✅ Minification: `esbuild` — optimal for size/speed
- ✅ Rollup output configuration with content hashing
- ✅ Manual chunk splitting: Qwik runtime, vendor, app code (good caching strategy)
- ✅ Development server disables caching (`no-store`)

**Extensive documentation** in the file explains the static prerendering + asset caching strategy. This is well-written but reflects an **earlier design decision** that is no longer active (see Qwik config analysis below).

**Issues**: None blocking. Documentation is clear and configuration is solid.

### 3.2 adapters/fastify/vite.config.ts

**Location**: [adapters/fastify/vite.config.ts](adapters/fastify/vite.config.ts)

**Status**: ✅ Correct

**Configuration**:

```typescript
export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.fastify.tsx", "@qwik-city-plan"],
      },
    },
    plugins: [nodeServerAdapter({ name: "fastify" })],
  };
});
```

**Analysis**:

- ✅ Correctly extends base Vite config
- ✅ `ssr: true` — generates server bundle
- ✅ References `src/entry.fastify.tsx` entry point (which exists)
- ✅ Uses `nodeServerAdapter` for Node.js server compilation

**Issues**: None.

### 3.3 qwik.config.ts

**Location**: [qwik.config.ts](qwik.config.ts)

**Status**: ⚠️ **STALE DOCUMENTATION**

**Current content**:

```typescript
export default {};
```

**But contains extensive comments** (~50 lines) explaining a **static prerendering strategy** that is no longer the actual build strategy:

```
STATIC PRE-RENDERING & ASSET DELIVERY STRATEGY
BUILD OUTPUT: Complete static HTML for all routes + versioned assets
PRERENDERED ROUTES:
- Static: /, /about, /resume, /blog, /engineering, /production, /contact
- Blog: /blog/[slug] for all published posts
- Engineering: /engineering/projects/[slug]
- Production: /production/projects/[slug]
```

**Reality**:

- The actual build produces a **Fastify server** with dynamic route rendering
- Static content exists (blog posts, projects) but routes are rendered server-side
- No actual prerendering to static HTML files is happening

**Root cause**: This config appears to document an **earlier design iteration** (static HTML deployment) that was replaced with the current Fastify server approach.

**Recommendation**:

- ✅ Keep empty `export default {}` (correct)
- 🔴 **Remove misleading comments about static prerendering** — they don't reflect actual behavior
- Add accurate comment explaining the actual strategy (Fastify SSR server with Qwik runtime)

### 3.4 tsconfig.json

**Location**: [tsconfig.json](tsconfig.json)

**Status**: ✅ Production-ready

**Key settings**:

- ✅ `target: "ES2020"` — matches Vite target
- ✅ `module: "ES2022"` — modern module format
- ✅ `strict: true` — strict type checking enabled
- ✅ `moduleResolution: "Bundler"` — correct for Vite/Node.js
- ✅ `lib: ["ES2022", "DOM", "WebWorker", "DOM.Iterable"]` — comprehensive types
- ✅ `jsxImportSource: "@builder.io/qwik"` — Qwik integration

**No issues** — TypeScript configuration is correct for production deployment.

### 3.5 eslint.config.js

**Location**: [eslint.config.js](eslint.config.js)

**Status**: ✅ Production-ready (with minor cleanup opportunity)

**Issues found**:

- ⚠️ **Duplicate ignore patterns**: `**/dist` appears twice (lines ~24 and ~31)
- ⚠️ **Excessive ignores**: Many Bazel patterns (`**/bazel-*`) likely not relevant to this project

**Recommendation**: Clean up ignore list:

```javascript
const ignores = [
  // Build artifacts
  "**/dist",
  "**/lib",
  "**/node_modules",

  // Cache files
  "**/.cache",
  "**/.rollup.cache",
  "tsconfig.tsbuildinfo",

  // Log files
  "**/*.log",

  // Editor/OS
  ".vscode/settings.json",
  "**/.DS_Store",
  "**/.history",

  // Lock files (not typically linted)
  "**/pnpm-lock.yaml",
  "**/package-lock.json",
  "**/yarn.lock",

  // Other
  "**/server",
  "eslint.config.js",
];
```

### 3.6 postcss.config.js

**Location**: [postcss.config.js](postcss.config.js)

**Status**: ✅ Correct for Tailwind v4

**Content**:

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**Analysis**:

- ✅ Uses `@tailwindcss/postcss` plugin (Tailwind v4 engine)
- ✅ Correct format for PostCSS 8+
- ✅ No unnecessary autoprefixer (not needed with Tailwind v4)

**No issues.**

### 3.7 tailwind.config.js

**Location**: [tailwind.config.js](tailwind.config.js)

**Status**: ✅ Minimal and correct

**Content**:

```javascript
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Analysis**:

- ✅ Content paths scan source files correctly
- ✅ Empty extend — using Tailwind defaults (appropriate for v3 site)
- ✅ No extra plugins needed

**No issues.**

---

## 4. Deployment Configuration

### 4.1 Dockerfile

**Location**: [Dockerfile](Dockerfile)

**Status**: 🔴 **CRITICAL BLOCKER FOUND**

#### Multi-stage Build Structure

Three stages: `base` → `deps` → `build` → `final`

**Stage 1: base**

```dockerfile
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
```

- ✅ Uses node:25-alpine (matches package.json engines: `^20.3.0 || >=21.0.0`)
- ✅ Alpine reduces image size

**Stage 2: deps**

```dockerfile
COPY package.json .
RUN yarn install --production=false
```

- 🔴 **CRITICAL**: Only copies `package.json`, NOT the lock file
- ⚠️ Uses yarn (but see section 4.2 below for package manager issue)
- ⚠️ Comment shows attempted Docker cache mount optimization but it's commented out

**Stage 3: build**

```dockerfile
COPY . .
RUN yarn run build
RUN yarn run build.server
```

- ✅ Copies source
- ✅ Builds client and server

**Stage 4: final**

```dockerfile
ENV NODE_ENV production
ENV ORIGIN ${APP_ORIGIN}

USER node  // ✅ Security: runs as non-root

COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/server ./server  // 🔴 **CRITICAL**

EXPOSE 3000
CMD ["yarn", "serve"]
```

#### Critical Issues

**🔴 Issue 1: Missing `/server` directory**

- Dockerfile tries to `COPY --from=build /usr/src/app/server ./server`
- **`/server` directory does not exist** in build stage
- The actual server entry is in `src/entry.fastify.tsx`, compiled to `dist/`
- Docker build will fail at runtime when `yarn serve` runs

**Fix**:

```dockerfile
# Remove the server copy line:
# COPY --from=build /usr/src/app/server ./server

# Update serve command to find the built entry:
CMD ["node", "dist/entry.fastify-*.js"]
# Or create a wrapper script
```

**🔴 Issue 2: No lock file in deps stage**

- Only copies `package.json`, missing `pnpm-lock.yaml` or `yarn.lock`
- Installation may not be reproducible
- Dependencies may not match local development versions

**Fix**:

```dockerfile
COPY package.json pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile --production=false
```

**⚠️ Issue 3: package.json exists but not used**

- Copies `package.json` to final stage but only for documentation
- Not actually needed at runtime (all dependencies installed from build stage)

**Recommendation**: Remove unnecessary COPY in final stage:

```dockerfile
# Remove this line from final stage:
# COPY package.json .
```

---

### 4.2 GitHub Actions Workflows

**Location**: [`.github/workflows/`](.github/workflows)

#### deploy-production.yml

**Status**: ⚠️ **INCOMPLETE / USES MISSING SCRIPT**

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - id: configure-ssh
        name: Configure SSH
        run: |
          mkdir -p ~/.ssh/
          echo "${{ secrets.EC2_SERVER_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          echo "Host myserver " >> ~/.ssh/config
          # ... SSH config setup

      - id: run-ec2-deploy-script-via-ssh
        name: Run Deployment Script
        run: |
          ssh -t myserver \
            'cd ${{ vars.EC2_DEPLOY_ROOT_DIR }}; \
            sudo ./deploy.sh ${{ github.ref_name }} ${{ vars.APP_SERVER_PORT }} ${{ vars.APP_NAME }} ${{ vars.APP_OWNER }}'
```

**Issues**:

1. 🔴 **Missing checkout step** — Doesn't check out repository code
   - `run` step won't have access to build artifacts
   - SSH is configured but no build happens locally

2. 🔴 **Depends on missing `deploy.sh` script** — This script does NOT exist in the repo
   - Workflow assumes deployment script exists on EC2 server
   - No fallback or inline deployment logic

3. ⚠️ **No build stage** — Doesn't build the Docker image locally
   - Expected flow: build image → push to registry → pull on server
   - Current flow: just SSH to server and run script (unclear what script does)

4. ⚠️ **Hardcoded server name** — `Host myserver` is static
   - Maps to `${{ secrets.EC2_SERVER_HOST }}` (good)
   - But no validation of connection before deploying

5. ⚠️ **Secrets and vars organization**:
   - ✅ `secrets.EC2_SERVER_KEY` — SSH private key (good practice)
   - ✅ `secrets.EC2_SERVER_HOST` — Server hostname
   - ✅ `secrets.EC2_SERVER_USER` — SSH user
   - ✅ `vars.EC2_DEPLOY_ROOT_DIR` — Deploy directory
   - ✅ `vars.APP_SERVER_PORT` — Application port
   - ✅ `vars.APP_NAME` — App identifier
   - ✅ `vars.APP_OWNER` — Owner identifier

**Recommended minimal working flow**:

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker image
        run: docker build -t myapp:${{ github.sha }} .

      - name: Configure SSH
        run: |
          mkdir -p ~/.ssh/
          echo "${{ secrets.EC2_SERVER_KEY }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan -H ${{ secrets.EC2_SERVER_HOST }} >> ~/.ssh/known_hosts

      - name: Deploy to EC2
        run: |
          scp Dockerfile package.json pnpm-lock.yaml ${{ secrets.EC2_SERVER_USER }}@${{ secrets.EC2_SERVER_HOST }}:${{ vars.EC2_DEPLOY_ROOT_DIR }}/
          ssh ${{ secrets.EC2_SERVER_USER }}@${{ secrets.EC2_SERVER_HOST }} \
            'cd ${{ vars.EC2_DEPLOY_ROOT_DIR }} && \
            docker build -t myapp:latest . && \
            docker stop myapp || true && \
            docker run -d --name myapp -p 3000:3000 -e NODE_ENV=production myapp:latest'
```

#### deploy-development.yml

**Status**: 🟡 **Same issues as production**

- Identical structure and issues as deploy-production.yml
- Triggers on `dev` branch instead of `main`
- Environment: `development` instead of `production`

---

### 4.3 Missing Deploy Script

**Status**: 🔴 **CRITICAL BLOCKER**

The workflows reference `./deploy.sh` but this script does not exist in the repository:

- ❌ No `deploy.sh` in root directory
- ❌ No `deploy.sh` in any script directory
- ❌ Workflows will fail when trying to execute

**This must be created.** Minimal example:

```bash
#!/bin/bash
set -e

BRANCH=$1
PORT=$2
APP_NAME=$3
APP_OWNER=$4

echo "Deploying $APP_NAME from branch $BRANCH to port $PORT"

# Assumes repo is checked out or pulled
docker build -t${APP_NAME}:${BRANCH} .
docker stop ${APP_NAME} || true
docker run -d \
  --name ${APP_NAME} \
  --restart unless-stopped \
  -p ${PORT}:3000 \
  -e NODE_ENV=production \
  -e ORIGIN=https://yourdomain.com \
  ${APP_NAME}:${BRANCH}
```

---

## 5. Environment & Secrets

### Environment Variables

**Status**: ⚠️ **NOT DOCUMENTED**

**Required environment variables** (based on code analysis):

| Variable   | Source                          | Used in         | Required           | Default       | Notes                                          |
| ---------- | ------------------------------- | --------------- | ------------------ | ------------- | ---------------------------------------------- |
| `PORT`     | `src/entry.fastify.tsx` line 23 | Fastify server  | No                 | `3000`        | If omitted, uses 3000                          |
| `HOST`     | `src/entry.fastify.tsx` line 24 | Fastify server  | No                 | `0.0.0.0`     | If omitted, uses 0.0.0.0                       |
| `NODE_ENV` | Dockerfile + standard Node.js   | Build, runtime  | No                 | `development` | Set in Docker but not enforced                 |
| `ORIGIN`   | Dockerfile + Qwik City          | CSRF protection | ⚠️ **Recommended** | N/A           | Used for security, should be set in production |

### .env Configuration

**Status**: ⚠️ **No .env.example file**

**Current state**:

- ❌ No `.env.example` file (no documentation of required vars)
- ❌ No `.env` file in repo (correct, it's in `.gitignore`)
- ✅ `dotenv` package included (loads `.env` at runtime)
- ✅ `.env` is in `.gitignore` (won't be committed)

**Recommendation**: Create `.env.example`:

```bash
# Server configuration
PORT=3000
HOST=0.0.0.0

# Deployment
NODE_ENV=production
ORIGIN=https://alden.devel  # Set to your actual domain for CSRF protection

# Optional: Fastify logging
# FASTIFY_LOG_LEVEL=info
```

**Recommendation**: Document in README:

1. Copy `.env.example` to `.env`
2. Update `ORIGIN` to your deployment domain
3. Leave `PORT` and `HOST` as defaults unless needed

---

## 6. README.md

**Location**: [README.md](README.md)

**Status**: 🔴 **COMPLETELY OUTDATED FOR v3.0.0**

### Current content:

```markdown
# Personal Site v3

Foundation-only Qwik app for the v3 personal site.

Current scope:

- Qwik + Qwik City runtime
- TypeScript and Vite configuration
- Minimal placeholder route at `/`

Deferred for later tasks:

- Tailwind v4 wiring
- shared layout primitives
- homepage implementation
- PostgreSQL and Drizzle setup

## Fastify Server

This app has a minimal Fastify server implementation...
```

### What's wrong:

1. 🔴 Claims **"Foundation-only"** but the app is **feature-complete**
2. 🔴 Lists as "Deferred" what is **already implemented**:
   - ❌ "Tailwind v4 wiring" — ✅ DONE (v4.2.1, postcss plugin configured)
   - ❌ "shared layout primitives" — ✅ DONE (PageShell.tsx + component system)
   - ❌ "homepage implementation" — ✅ DONE (HomeHero + side selector)
3. 🔴 Mentions **PostgreSQL and Drizzle** — ❌ NOT IMPLEMENTED, should not be in scope
4. ⚠️ No documentation of:
   - Complete route inventory
   - How to build for production
   - How to deploy
   - Environment variables
   - Architecture decisions

### What v3.0.0 README should contain:

````markdown
# Personal Site v3

A modern portfolio website built with Qwik + Qwik City, featuring content-driven pages
for engineering projects, production work, and blog articles.

## Features

- ✅ Static site generation with Qwik City + Fastify server
- ✅ Content-driven architecture (routes, projects, blog posts as TypeScript)
- ✅ Full TypeScript + Tailwind v4 stack
- ✅ SEO optimized (structured data, sitemaps, meta tags)
- ✅ Responsive design
- ✅ SSR with streaming

## Quick Start

```bash
# Install dependencies
pnpm install

# Development
pnpm run dev

# Production build
pnpm run build

# Preview production build
pnpm run serve
```
````

## Environment

Create `.env` from `.env.example`:

- `ORIGIN`: Your deployment domain (required for CSRF protection)
- `PORT`: Server port (default: 3000)
- `HOST`: Server host (default: 0.0.0.0)

## Deployment

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for Docker and CI/CD setup.

## Routes

- `/` — Homepage with side selector (Engineering | Production)
- `/about` — About page
- `/resume` — Resume/CV
- `/blog` — Blog index
- `/blog/[slug]` — Blog post detail
- `/engineering` — Engineering projects
- `/engineering/projects/[slug]` — Project detail
- `/production` — Production work
- `/production/projects/[slug]` — Media project detail
- `/contact` — Contact page
- `/sitemap.xml` — Dynamic sitemap
- `/robots.txt` — Robots configuration

````

---

## 7. Stale & Transitional Configuration

### 7.1 PostgreSQL/Drizzle References

**Status**: ⚠️ **Documented but not implemented**

**Found in**:
- README.md — Lists "PostgreSQL and Drizzle setup" as deferred task
- Engineering projects content — Project cards mention PostgreSQL/Drizzle in tech stack

**Reality**:
- ❌ No database connection code
- ❌ No Drizzle schema or migrations
- ❌ No backend API routes
- These are **portfolio projects, not active in this codebase**

**Recommendation**:
- ✅ Keep references in project descriptions (they show real work)
- 🔴 **Remove from README** as deferred task
- Add note if someone asks: "PostgreSQL/Drizzle are used in the Andacity booking system project but not in this portfolio site"

### 7.2 Commented Fastify Compression

**Status**: 🔴 **Performance regression**

**Location**: [src/entry.fastify.tsx](src/entry.fastify.tsx) line 37

```typescript
// Enable compression
// https://github.com/fastify/fastify-compress
// IMPORTANT NOTE: THIS MUST BE REGISTERED BEFORE THE fastify-qwik PLUGIN
// await fastify.register(import('@fastify/compress'))
````

**Analysis**:

- ✅ `@fastify/compress` is installed (dependencies)
- ❌ **But it's disabled in code**
- ❌ This means **production will serve uncompressed content** over HTTP
- 🔴 **Significant performance degradation** for users on slow connections

**Recommendation**: **Enable compression**

```typescript
// Enable compression
// https://github.com/fastify/fastify-compress
import fastifyCompress from "@fastify/compress";
await fastify.register(fastifyCompress);
```

Place it **before** the Qwik plugin as the comment notes.

### 7.3 ESLint Duplicate Ignore Patterns

**Status**: ⚠️ **Minor code quality**

**Location**: [eslint.config.js](eslint.config.js)

`**/dist` appears on both line 24 and line 31 in the ignores array.

**Fix**: Remove duplicate.

---

## 8. Production Readiness Matrix

### Build & Deployment

| Component              | Status        | Notes                                              |
| ---------------------- | ------------- | -------------------------------------------------- |
| Build configuration    | ✅ Ready      | Vite + Qwik optimizer working correctly            |
| Build script chain     | 🔴 Broken     | `npm run serve` script points to non-existent path |
| Docker build           | 🔴 Broken     | Tries to copy non-existent `/server` directory     |
| Docker image structure | ✅ Good       | Multi-stage optimization correct                   |
| GitHub Action (prod)   | ⚠️ Incomplete | Depends on missing `deploy.sh` script              |
| GitHub Action (dev)    | ⚠️ Incomplete | Same issue as production                           |
| Deploy script          | 🔴 Missing    | `deploy.sh` does not exist, workflows will fail    |

### Configuration

| Component         | Status   | Notes                                             |
| ----------------- | -------- | ------------------------------------------------- |
| TypeScript config | ✅ Ready | Target and module settings correct for deployment |
| Vite config       | ✅ Ready | Asset caching and chunking optimized              |
| Tailwind config   | ✅ Ready | Tailwind v4 with proper content paths             |
| PostCSS config    | ✅ Ready | Correct for Tailwind v4                           |
| ESLint config     | ✅ Ready | Minor duplicate pattern (non-blocking)            |

### Dependencies

| Component            | Status         | Notes                                              |
| -------------------- | -------------- | -------------------------------------------------- |
| Runtime dependencies | ⚠️ Needs work  | Compression disabled; remove unused `autoprefixer` |
| Dev dependencies     | ✅ Ready       | All current versions                               |
| Package manager      | ⚠️ Conflicting | Both `pnpm-lock.yaml` and docker uses yarn         |
| Lock file            | ⚠️ Not copied  | Dockerfile missing lock file in deps stage         |

### Environment & Docs

| Component             | Status            | Notes                                                             |
| --------------------- | ----------------- | ----------------------------------------------------------------- |
| Environment variables | ⚠️ Not documented | No `.env.example` file; `ORIGIN` not documented                   |
| README                | 🔴 Outdated       | Claims incomplete features that are done; missing deployment docs |
| Deployment docs       | ❌ Missing        | No `DEPLOYMENT.md`, Docker instructions, or CI/CD guide           |

---

## 9. Cleanup Checklist for v3.0.0 Readiness

### 🔴 Critical Fixes (MUST DO before deployment)

- [ ] **Fix `npm run serve` script** — Change to `node dist/entry.fastify*.js` or create wrapper
- [ ] **Fix Dockerfile `/server` copy** — Remove line copying non-existent directory
- [ ] **Add Dockerfile lock file** — Copy `pnpm-lock.yaml` in deps stage
- [ ] **Create `deploy.sh` script** — Implement or update workflows to inline logic
- [ ] **Create `.env.example`** — Document required environment variables
- [ ] **Enable Fastify compression** — Uncomment `@fastify/compress` registration

### 🟡 Important Cleanup (SHOULD do before v3.0.0)

- [ ] **Remove `autoprefixer` dependency** — Not needed with Tailwind v4
- [ ] **Remove `build.preview` script** — Or document when it's used
- [ ] **Remove `start` script** — Duplicates `dev`
- [ ] **Update README.md** — Remove outdated content, add deployment guide
- [ ] **Clean ESLint ignores** — Remove duplicates and irrelevant patterns
- [ ] **Remove Qwik config misleading comments** — Document actual static generation strategy
- [ ] **Decide on package manager** — Use pnpm consistently (not yarn in Dockerfile)
- [ ] **Review Fastify plugin version constraint** — Update from `>=4.0.0 <6.0.0` to latest

### ✅ No Changes Needed

- TypeScript configuration
- Vite build configuration
- Tailwind v4 setup
- ESLint/Prettier rules
- PostCSS plugin
- Multi-stage Docker build pattern

---

## 10. Summary & Recommendations

### Blockers Preventing v3.0.0 Deployment

1. **Dockerfile broken** — Copies non-existent `/server` directory
2. **serve script broken** — Points to `server/entry.fastify` which doesn't exist
3. **GitHub Actions broken** — Depend on missing `deploy.sh` script
4. **No environment docs** — Missing `.env.example` and environment variable documentation
5. **Fastify compression disabled** — Performance issue in production

### Production Readiness Assessment

**Current Status**: **BLOCKING** 🔴  
**Estimated Fix Time**: 1-2 hours

**After fixes**: **PRODUCTION-READY** ✅

### Recommended Next Steps

1. **Immediately**: Fix the 5 critical blockers (see checklist)
2. **Before deployment**: Run through cleanup checklist
3. **Post-deployment**: Create deployment documentation based on your actual infrastructure

### Files Requiring Changes

| File                             | Type   | Priority     | Changes                                                         |
| -------------------------------- | ------ | ------------ | --------------------------------------------------------------- |
| `package.json`                   | Config | 🔴 Critical  | Fix `serve` script; remove stale scripts; remove `autoprefixer` |
| `Dockerfile`                     | Config | 🔴 Critical  | Remove `/server` copy; add lock file; fix CMD                   |
| `.github/workflows/deploy-*.yml` | CI/CD  | 🔴 Critical  | Add checkout, build stages, or create `deploy.sh`               |
| `deploy.sh`                      | Script | 🔴 Critical  | **CREATE NEW FILE**                                             |
| `.env.example`                   | Config | 🔴 Critical  | **CREATE NEW FILE**                                             |
| `src/entry.fastify.tsx`          | Code   | 🔴 Critical  | Uncomment Fastify compression                                   |
| `qwik.config.ts`                 | Config | 🟡 Important | Remove misleading comments                                      |
| `README.md`                      | Docs   | 🟡 Important | Complete rewrite for v3.0.0                                     |
| `eslint.config.js`               | Config | 🟡 Important | Clean up ignore patterns                                        |

---

**Audit completed**: March 20, 2026  
**For questions**: Review specific sections above or check linked files in the workspace.
