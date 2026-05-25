#!/usr/bin/env bash
set -Eeuo pipefail

usage() {
  cat <<'USAGE'
Usage:
  deploy-ec2.sh <branch> <app_port> <app_name> <app_owner> <app_origin> [env_file]

Required arguments:
  branch      Git branch to deploy, such as main
  app_port    Host port to bind to container port 3000
  app_name    Application name, used for Docker image/container naming
  app_owner   Owner/namespace, used for Docker image naming
  app_origin  Public origin, such as https://example.com

Optional:
  env_file    Runtime/build env file on the EC2 host. Defaults to .env.production

Environment:
  DEPLOY_ROOT         Directory containing the git checkout. Defaults to current directory.
  DEPLOY_REPOSITORY   Git repository URL used to bootstrap DEPLOY_ROOT when needed.
  DEPLOY_SOURCE_MODE  Set to archive to skip git fetch/checkout/pull. Defaults to git.
  DEPLOY_COMMIT_SHA   Commit SHA to use for image tags when DEPLOY_SOURCE_MODE=archive.
  HEALTHCHECK_PATH    Path to check after container start. Defaults to /
USAGE
}

log() {
  printf '[deploy] %s\n' "$*"
}

fail() {
  printf '[deploy] ERROR: %s\n' "$*" >&2
  exit 1
}

require_command() {
  command -v "$1" >/dev/null 2>&1 || fail "Missing required command: $1"
}

require_env_file_key() {
  local key="$1"
  local value

  value="$(awk -F= -v key="$key" '
    $0 !~ /^[[:space:]]*#/ && $1 == key {
      sub(/^[^=]*=/, "")
      gsub(/\r$/, "")
      print
      exit
    }
  ' "$ENV_FILE_PATH")"

  if [[ -z "$value" ]]; then
    fail "Required env var ${key} is missing or empty in ${ENV_FILE_PATH}"
  fi
}

normalize_name() {
  printf '%s' "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9_.-]+/-/g; s/^-+//; s/-+$//'
}

wait_for_http() {
  local url="$1"
  local attempts="${2:-30}"
  local delay="${3:-2}"

  for attempt in $(seq 1 "$attempts"); do
    if curl --fail --silent --show-error --max-time 5 "$url" >/dev/null; then
      return 0
    fi

    log "Health check attempt ${attempt}/${attempts} failed for ${url}"
    sleep "$delay"
  done

  return 1
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

[[ $# -ge 5 ]] || {
  usage >&2
  exit 2
}

BRANCH="$1"
APP_PORT="$2"
APP_NAME_RAW="$3"
APP_OWNER_RAW="$4"
APP_ORIGIN="$5"
ENV_FILE="${6:-.env.production}"
DEPLOY_ROOT="${DEPLOY_ROOT:-$(pwd)}"
DEPLOY_REPOSITORY="${DEPLOY_REPOSITORY:-git@github.com:${APP_OWNER_RAW}/${APP_NAME_RAW}.git}"
DEPLOY_SOURCE_MODE="${DEPLOY_SOURCE_MODE:-git}"
DEPLOY_COMMIT_SHA="${DEPLOY_COMMIT_SHA:-}"
HEALTHCHECK_PATH="${HEALTHCHECK_PATH:-/}"

[[ "$APP_PORT" =~ ^[0-9]+$ ]] || fail "app_port must be numeric, got: ${APP_PORT}"
[[ "$APP_ORIGIN" =~ ^https?:// ]] || fail "app_origin must start with http:// or https://"

APP_NAME="$(normalize_name "$APP_NAME_RAW")"
APP_OWNER="$(normalize_name "$APP_OWNER_RAW")"
[[ -n "$APP_NAME" ]] || fail "app_name normalized to an empty value"
[[ -n "$APP_OWNER" ]] || fail "app_owner normalized to an empty value"

IMAGE_REPOSITORY="${APP_OWNER}/${APP_NAME}"
CONTAINER_NAME="${APP_OWNER}-${APP_NAME}"
PREVIOUS_CONTAINER_NAME="${CONTAINER_NAME}-previous"

if [[ "$DEPLOY_SOURCE_MODE" != "archive" ]]; then
  require_command git
fi
require_command docker
require_command curl

DOCKER=(docker)
DOCKER_BUILD=(env DOCKER_BUILDKIT=1 docker)
if ! docker info >/dev/null 2>&1; then
  require_command sudo
  if sudo -n docker info >/dev/null 2>&1; then
    DOCKER=(sudo docker)
    DOCKER_BUILD=(sudo env DOCKER_BUILDKIT=1 docker)
  else
    fail "Docker is not available to this user, and passwordless sudo docker is not available"
  fi
fi

mkdir -p "$DEPLOY_ROOT"
cd "$DEPLOY_ROOT" || fail "Cannot cd to DEPLOY_ROOT: ${DEPLOY_ROOT}"

if [[ "$DEPLOY_SOURCE_MODE" != "archive" ]]; then
  if [[ ! -d .git ]]; then
    log "Initializing git checkout in ${DEPLOY_ROOT}"
    git init
    git remote add origin "$DEPLOY_REPOSITORY"
  elif ! git remote get-url origin >/dev/null 2>&1; then
    git remote add origin "$DEPLOY_REPOSITORY"
  fi

  log "Updating git checkout"
  git fetch --prune origin "$BRANCH"
  git checkout -B "$BRANCH" "origin/${BRANCH}"
fi

[[ -f Dockerfile ]] || fail "Dockerfile not found in ${DEPLOY_ROOT} after source update"

if [[ "$ENV_FILE" != /* ]]; then
  ENV_FILE_PATH="${DEPLOY_ROOT}/${ENV_FILE}"
else
  ENV_FILE_PATH="$ENV_FILE"
fi

if [[ ! -f "$ENV_FILE_PATH" ]]; then
  fail "Env file not found: ${ENV_FILE_PATH}"
fi

require_env_file_key DATABASE_URL
require_env_file_key AWS_REGION
require_env_file_key CONTACT_FORM_FROM_EMAIL
require_env_file_key CONTACT_FORM_TO_EMAIL

log "Deploying ${APP_OWNER_RAW}/${APP_NAME_RAW} from branch ${BRANCH}"
log "Deploy root: ${DEPLOY_ROOT}"
log "Deploy source mode: ${DEPLOY_SOURCE_MODE}"
log "Env file: ${ENV_FILE_PATH}"

if [[ "$DEPLOY_SOURCE_MODE" == "archive" ]]; then
  COMMIT_SHA="${DEPLOY_COMMIT_SHA:0:12}"
  [[ -n "$COMMIT_SHA" ]] || COMMIT_SHA="uploaded"
else
  COMMIT_SHA="$(git rev-parse --short=12 HEAD)"
fi

IMAGE_TAG="${BRANCH}-${COMMIT_SHA}"
IMAGE="${IMAGE_REPOSITORY}:${IMAGE_TAG}"
LATEST_IMAGE="${IMAGE_REPOSITORY}:latest"

log "Building Docker image ${IMAGE}"
"${DOCKER_BUILD[@]}" build \
  --secret "id=app_env,src=${ENV_FILE_PATH}" \
  --build-arg "APP_ORIGIN=${APP_ORIGIN}" \
  --tag "$IMAGE" \
  --tag "$LATEST_IMAGE" \
  .

log "Removing stale previous container if present"
"${DOCKER[@]}" rm -f "$PREVIOUS_CONTAINER_NAME" >/dev/null 2>&1 || true

if "${DOCKER[@]}" inspect "$CONTAINER_NAME" >/dev/null 2>&1; then
  log "Parking existing container ${CONTAINER_NAME}"
  "${DOCKER[@]}" rename "$CONTAINER_NAME" "$PREVIOUS_CONTAINER_NAME"
  "${DOCKER[@]}" stop "$PREVIOUS_CONTAINER_NAME" >/dev/null
fi

log "Starting ${CONTAINER_NAME} on host port ${APP_PORT}"
if ! "${DOCKER[@]}" run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  --env-file "$ENV_FILE_PATH" \
  -e "NODE_ENV=production" \
  -e "HOST=0.0.0.0" \
  -e "PORT=3000" \
  -e "ORIGIN=${APP_ORIGIN}" \
  -p "127.0.0.1:${APP_PORT}:3000" \
  "$IMAGE" >/dev/null; then
  if "${DOCKER[@]}" inspect "$PREVIOUS_CONTAINER_NAME" >/dev/null 2>&1; then
    log "New container failed to start; restoring previous container"
    "${DOCKER[@]}" start "$PREVIOUS_CONTAINER_NAME" >/dev/null || true
    "${DOCKER[@]}" rename "$PREVIOUS_CONTAINER_NAME" "$CONTAINER_NAME" || true
  fi
  fail "Failed to start new container"
fi

HEALTHCHECK_URL="http://127.0.0.1:${APP_PORT}${HEALTHCHECK_PATH}"
log "Waiting for ${HEALTHCHECK_URL}"

if ! wait_for_http "$HEALTHCHECK_URL"; then
  log "New container failed health check; showing recent logs"
  "${DOCKER[@]}" logs "$CONTAINER_NAME" --tail 100 >&2 || true
  "${DOCKER[@]}" rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
  if "${DOCKER[@]}" inspect "$PREVIOUS_CONTAINER_NAME" >/dev/null 2>&1; then
    log "Restoring previous container"
    "${DOCKER[@]}" start "$PREVIOUS_CONTAINER_NAME" >/dev/null || true
    "${DOCKER[@]}" rename "$PREVIOUS_CONTAINER_NAME" "$CONTAINER_NAME" || true
  fi
  fail "Deployment failed health check"
fi

if "${DOCKER[@]}" inspect "$PREVIOUS_CONTAINER_NAME" >/dev/null 2>&1; then
  "${DOCKER[@]}" rm -f "$PREVIOUS_CONTAINER_NAME" >/dev/null 2>&1 || true
fi

log "Pruning dangling Docker images"
"${DOCKER[@]}" image prune -f >/dev/null 2>&1 || true

log "Deployment complete: ${IMAGE}"
