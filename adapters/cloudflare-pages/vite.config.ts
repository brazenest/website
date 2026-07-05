import { cloudflarePagesAdapter } from "@builder.io/qwik-city/adapters/cloudflare-pages/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      // Keep the client build output already emitted by `vite build`.
      emptyOutDir: false,
      ssr: true,
      // The base config disables minification as a workaround for a Qwik SSG
      // (static generation) TDZ error. The Cloudflare adapter builds a server
      // bundle (not SSG), so re-enable minification here to keep the generated
      // `_worker.js` well under Cloudflare's Worker size limits — the bundled
      // `pg` and AWS SDK dependencies are large unminified.
      minify: true,
      rollupOptions: {
        input: ["src/entry.cloudflare-pages.tsx", "@qwik-city-plan"],
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
    plugins: [cloudflarePagesAdapter()],
  };
});
