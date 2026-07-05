import { cloudflarePagesAdapter } from "@builder.io/qwik-city/adapters/cloudflare-pages/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import baseConfig from "../../vite.config";

// Force `pg-cloudflare` to its real Workers implementation. Its package.json
// exposes the real module only under the `workerd` export condition and an
// empty stub under `default`; the Vite/Qwik build doesn't activate `workerd`,
// so it would otherwise bundle the stub and `new CloudflareSocket()` throws
// "TypeError: ... is not a constructor" on the /blog (Postgres) route. Aliasing
// the whole package sidesteps that without changing global resolve conditions
// (adding broad conditions like `browser` breaks the adapter's Node-side SSG
// pass with a `pg` circular-init error).
const nodeRequire = createRequire(import.meta.url);
const pgCloudflareReal = join(
  dirname(nodeRequire.resolve("pg-cloudflare/package.json")),
  "dist/index.js",
);

export default extendConfig(baseConfig, () => {
  return {
    resolve: {
      alias: {
        "pg-cloudflare": pgCloudflareReal,
      },
    },
    build: {
      // Keep the client build output already emitted by `vite build`.
      emptyOutDir: false,
      ssr: true,
      // Minification stays OFF (inherited from the base config). Minifying the
      // server bundle has caused runtime init/constructor errors with `pg`; the
      // bundle is comfortably under Cloudflare's Worker size limit unminified
      // now that the heavy AWS SDK has been removed in favour of Resend.
      minify: false,
      rollupOptions: {
        input: ["src/entry.cloudflare-pages.tsx", "@qwik-city-plan"],
        // `cloudflare:sockets` is a Workers runtime built-in (used by
        // pg-cloudflare). Leave it external so the import survives to runtime.
        external: [/^cloudflare:/],
        output: {
          // The base config hashes entry files (`[name]-[hash].js`) for client
          // CDN caching. The generated `dist/_worker.js` imports the SSR entry
          // by its exact module name (`entry.cloudflare-pages`), so this server
          // entry must NOT be hashed or the Worker fails to resolve it at
          // runtime. Chunks keep their hashed names (imported relatively).
          entryFileNames: "[name].js",
        },
      },
    },
    plugins: [
      cloudflarePagesAdapter({
        // This site is SSR-only (no pages are statically prerendered), so keep
        // SSG from generating anything. Critically, `sitemapOutFile: null`
        // disables Qwik's built-in SSG sitemap generator, which otherwise
        // writes an EMPTY dist/sitemap.xml (it lists only prerendered pages, of
        // which there are none) that shadows our dynamic /sitemap.xml route on
        // Cloudflare Pages — static assets are served before Functions run.
        ssg: {
          include: [],
          sitemapOutFile: null,
        },
      }),
    ],
  };
});
