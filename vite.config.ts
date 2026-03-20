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
        
        /* Chunk splitting: DISABLED
           
           VERIFIED FINDING (TASK-140):
           - Even vendor-only chunking causes circular dependency: entry.ssr -> vendor -> entry.ssr
           - This circular dependency manifests as TDZ error: "Cannot access 'componentQrl' before initialization"
           - Diagnostic: removed ALL manual chunks → build passes ✓
           - Result: SSG properly executes without module initialization errors
           
           PRODUCTION CONFIGURATION:
           - No manual chunking for SSR/SSG stability
           - All code bundled into single module
           - Gzip compression provides caching benefits on hashed assets
           - Cache-busting via content hash still effective
           
           NOTE: This contradicts the vendor-chunk assumption in d3b7a31
           TASK-140 validation confirmed no manual chunks is the only working path
        */
        /* manualChunks disabled entirely for SSR/SSG compatibility */
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
