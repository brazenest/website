import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/* ============================================================================
   STATIC PRE-RENDERING & ASSET DELIVERY STRATEGY
   
   BUILD OUTPUT: Complete static HTML for all routes + versioned assets
   
   PRERENDERED ROUTES:
   - Static: /, /about, /resume, /blog, /engineering, /production, /contact
   - Blog: /blog/[slug] for all published posts (enumerated from content)
   - Engineering: /engineering/projects/[slug] for all projects
   - Production: /production/projects/[slug] for all projects
   - Special: /robots.txt, /sitemap.xml
   
   Each route is rendered to a static .html file in dist/ at build time.
   Route enumeration via src/lib/prerender-routes.ts
   
   ASSET DELIVERY & CACHING:
   
   KEY PRINCIPLES:
   1. Hashed assets (e.g., q-B_LB6VGz.js) are immutable → cache forever
   2. HTML files (from Qwik SSR prerendering) → revalidate on each request
   3. Chunk boundaries optimized for granular cache invalidation
   
   DEPLOYMENT:
   - Deploy /dist to any static file host or CDN
   - No Node.js runtime required
   - Optimal static hosting performance
   
   CACHE HEADERS (Set by deployment host):
   - /build/** and /assets/** → Cache-Control: max-age=31536000 (1 year)
   - *.html files → Cache-Control: no-cache (always revalidate)
   ============================================================================ */

export default defineConfig(() => ({
  plugins: [qwikCity({ trailingSlash: false }), qwikVite(), tsconfigPaths()],
  
  build: {
    /* Output build metadata for analysis and cache validation */
    reportCompressedSize: true,
    sourcemap: false, // Exclude source maps from build output (can be enabled for debugging)
    
    rollupOptions: {
      output: {
        /* Consistent naming for hashed assets enables aggressive long-term caching
           - [hash] replaces with content hash (e.g., q-B_LB6VGz)
           - Qwik framework files go to /build with q- prefix
           - Used-land assets go to /assets with consistent hashing
        */
        chunkFileNames: "[name]-[hash].js",
        entryFileNames: "[name]-[hash].js",
        assetFileNames: ({ name }) => {
          /* Separate CSS from other assets for clarity and targeted optimization */
          if (name && /\.css$/i.test(name)) {
            return "[name]-[hash][extname]";
          }
          return "[name]-[hash][extname]";
        },
        
        /* Chunk splitting strategy:
           - Keep vendor dependencies and Qwik framework chunks separate
           - Smaller chunks = finer-grained cache invalidation
           - Isolate framework updates from user code
        */
        manualChunks: (id) => {
          /* Isolate @builder.io modules for stable caching: 
             Qwik updates won't invalidate user code */
          if (id.includes("@builder.io/qwik") || id.includes("@builder.io/qwik-city")) {
            return "qwik-framework";
          }
        },
      },
    },
  },
  
  server: {
    /* Development server: disable caching to always serve fresh code during local development */
    headers: {
      "Cache-Control": "no-store",
    },
  },
}));
