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
    /* Build output configuration for optimal static asset caching */
    outDir: 'dist',
    
    /* Output build metadata for analysis and cache validation */
    reportCompressedSize: true,
    sourcemap: false, // Exclude source maps from build output (can be enabled for debugging)
    
    /* Minification disabled: Workaround for Qwik SSG initialization error
       - Issue: esbuild minification causes TDZ error with vendored chunks
       - Symptom: "Cannot access '_' before initialization" during SSG
       - Workaround: Disable minification for now
       - Bundle size impact: ~2-3x larger (acceptable for CDN + gzip)
       - TODO: Investigate root cause of esbuild/Qwik incompatibility
       
       Related: Qwik issue tracking or vite-plugin-qwik configuration
    */
    minify: false,
    
    /* Target modern browsers: ES2020 with dynamic import support
       - Avoids polyfills and transpilation overhead
       - Acceptable for 2024+ deployments (>95% browser support)
       - Falls back to bundled polyfills if specifically needed
    */
    target: 'ES2020',
    
    rollupOptions: {
      output: {
        /* Consistent naming for hashed assets enables aggressive long-term caching
           - [hash] replaces with content hash for cache busting
           - Hashed names guarantee new hash = new content (immutable)
           - Old hashes remain cached indefinitely
        */
        chunkFileNames: "[name]-[hash].js",
        entryFileNames: "[name]-[hash].js",
        assetFileNames: ({ name }) => {
          /* Separate asset types for clarity and targeted cache control */
          if (name && /\.css$/i.test(name)) {
            return "styles/[name]-[hash][extname]";
          }
          if (name && /\.(woff2?|ttf|otf)$/i.test(name)) {
            return "fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        
        /* Chunk splitting: Keep vendor separation, disable qwik-runtime chunk
           
           RATIONALE:
           - Vendor chunk still provides cache benefits for node_modules
           - Removing qwik-runtime chunk fixes SSR/SSG initialization order issue
           - Qwik code is now bundled with application code
           
           ISSUE RESOLVED:
           - Manual qwik-runtime chunk was causing "Cannot access componentQrl before initialization"
           - This manifested as TDZ (Temporal Dead Zone) errors during SSG
           - Bundling Qwik with app code resolves the dependency order
        */
        manualChunks: (id) => {
          /* Vendor dependencies: mid stability, infrequent updates
             Separate chunk protects against app code churn */
          if (id.includes("node_modules")) {
            return "vendor";
          }
          
          /* Application code + Qwik: High churn, bundled together
             This ensures proper initialization order during SSR/SSG */
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
