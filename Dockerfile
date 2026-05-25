# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=20
ARG PNPM_VERSION=10.32.1

FROM node:${NODE_VERSION}-alpine AS base
ARG PNPM_VERSION

ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

FROM base AS deps

COPY package.json pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store \
  pnpm install --frozen-lockfile

FROM deps AS build

COPY . .

RUN --mount=type=secret,id=app_env,required=true \
  node scripts/with-env.mjs /run/secrets/app_env -- pnpm exec qwik build

FROM deps AS prod-deps

RUN pnpm prune --prod

FROM base AS final

ARG APP_ORIGIN=http://localhost
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV ORIGIN=${APP_ORIGIN}

COPY --from=prod-deps /usr/src/app/package.json ./package.json
COPY --from=prod-deps /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prod-deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/scripts/serve-built.mjs ./scripts/serve-built.mjs

USER node

EXPOSE 3000

CMD ["pnpm", "run", "serve"]
