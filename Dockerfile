ARG NODE_ENV="production"
ARG NODE_VERSION="20"
ARG APP_ORIGIN="http://localhost"ARG DATABASE_URL
################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

################################################################################
# Create a stage for installing production dependencies.
FROM base as deps

COPY package.json pnpm-lock.yaml .

RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod=false

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# RUN --mount=type=bind,source=package.json,target=package.json \
#    --mount=type=bind,source=yarn.lock,target=yarn.lock \
#    --mount=type=cache,target=/root/.yarn \
#    yarn install --frozen-lockfile --production=false

################################################################################
# Create a stage for building the application.
FROM deps as build

# Copy the rest of the source files into the image.
COPY . .

# Pass DATABASE_URL as environment variable for build-time blog route prerendering
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Run the build scripts.
RUN pnpm run build
RUN pnpm run build.server

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
FROM base as final

ARG NODE_ENV
ARG APP_ORIGIN

# Use production node environment by default.
ENV NODE_ENV ${NODE_ENV}

# IMPORTANT: Set your actual domain for CSRF protection
ENV ORIGIN ${APP_ORIGIN}

# Copy package.json so that package manager commands can be used.
COPY package.json pnpm-lock.yaml .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod=true
COPY --from=build /usr/src/app/dist ./dist

# Run the application as a non-root user.
USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD ["pnpm", "run", "serve"]
