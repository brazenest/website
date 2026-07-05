import type { RequestHandler } from "@builder.io/qwik-city";
import {
  ADMIN_BASIC_AUTH_PASSWORD_ENV,
  ADMIN_BASIC_AUTH_USERNAME_ENV,
  buildAdminBasicAuthChallenge,
  isAdminRoutePath,
  validateAdminBasicAuthHeader,
} from "~/lib/auth/adminBasicAuth";
import { bridgePlatformEnv, getRuntimeEnv } from "~/lib/server/runtimeEnv";

/**
 * Enforces HTTP Basic auth on /admin routes at the SSR layer.
 *
 * The Fastify entry (entry.fastify.tsx) enforces this with a Fastify hook, but
 * that hook does not run on Cloudflare Pages. This middleware performs the same
 * check inside Qwik City so /admin stays protected on every adapter. Running on
 * both adapters is harmless (the Fastify hook simply passes first).
 */
export const onRequest: RequestHandler = async (requestEvent) => {
  // Ensure ADMIN_BASIC_AUTH_* secrets from Cloudflare bindings are visible.
  bridgePlatformEnv(requestEvent.platform);

  if (!isAdminRoutePath(requestEvent.url.pathname)) {
    return;
  }

  // Resolve credentials via getRuntimeEnv (Cloudflare bindings or Node env);
  // `process.env` is not reliably populated on route/plugin chunks on Workers.
  const validation = validateAdminBasicAuthHeader(
    requestEvent.request.headers.get("authorization") ?? undefined,
    {
      [ADMIN_BASIC_AUTH_USERNAME_ENV]: getRuntimeEnv(ADMIN_BASIC_AUTH_USERNAME_ENV),
      [ADMIN_BASIC_AUTH_PASSWORD_ENV]: getRuntimeEnv(ADMIN_BASIC_AUTH_PASSWORD_ENV),
    },
  );

  if (validation.ok) {
    return;
  }

  if (validation.reason === "missing-config") {
    requestEvent.headers.set("content-type", "text/plain; charset=utf-8");
    throw requestEvent.text(503, "Admin access is unavailable.");
  }

  requestEvent.headers.set("WWW-Authenticate", buildAdminBasicAuthChallenge());
  requestEvent.headers.set("content-type", "text/plain; charset=utf-8");
  throw requestEvent.text(401, "Authentication required.");
};
