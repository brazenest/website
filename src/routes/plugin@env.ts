import type { RequestHandler } from "@builder.io/qwik-city";
import { bridgePlatformEnv } from "~/lib/server/runtimeEnv";

/**
 * Bridges Cloudflare `platform.env` bindings/secrets into the shared runtime env
 * store at the start of every request, before route loaders/actions run, so
 * server code can read them with getRuntimeEnv(). No-op on Node.js.
 * See src/lib/server/runtimeEnv.ts for details.
 */
export const onRequest: RequestHandler = async ({ platform, next }) => {
  bridgePlatformEnv(platform);
  await next();
};
