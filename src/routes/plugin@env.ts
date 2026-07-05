import type { RequestHandler } from "@builder.io/qwik-city";
import { bridgePlatformEnv, getRuntimeEnv } from "~/lib/server/runtimeEnv";

/**
 * Bridges Cloudflare `platform.env` bindings/secrets into the shared runtime env
 * store at the start of every request, before route loaders/actions run, so
 * server code can read them with getRuntimeEnv(). No-op on Node.js.
 * See src/lib/server/runtimeEnv.ts for details.
 */
export const onRequest: RequestHandler = async ({ platform, next, url }) => {
  bridgePlatformEnv(platform);

  // TEMP DIAGNOSTIC (remove after production env debugging): on contact/admin
  // requests, log what the runtime sees for the critical secrets. Logs binding
  // key NAMES and value LENGTHS only — never secret values.
  if (url.pathname.includes("/contact") || url.pathname.includes("/admin")) {
    const env = (platform as { env?: Record<string, unknown> } | undefined)?.env;
    if (env) {
      const keys = Object.keys(env);
      const probe = (k: string) => {
        const v = env[k];
        const direct = typeof v === "string" ? `str${(v as string).length}` : typeof v;
        return `${k}(enum=${keys.includes(k) ? 1 : 0},direct=${direct},resolved=${getRuntimeEnv(k) ? 1 : 0})`;
      };
      console.log(
        `[env-diag] path=${url.pathname} envKeys=[${keys.join(",")}] ` +
          [
            "CONTACT_FORM_TO_EMAIL",
            "CONTACT_FORM_FROM_EMAIL",
            "RESEND_API_KEY",
            "ADMIN_BASIC_AUTH_USERNAME",
          ]
            .map(probe)
            .join(" "),
      );
    }
  }

  await next();
};
