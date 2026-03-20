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
    
    /* Minification: Use esbuild for smaller output and faster builds
       - esbuild is Vite's default, optimized for modern JS
       - Keeps output lean for faster CDN transfer and browser parsing
       - Consider: --minify-identifiers and --minify-whitespace are already true by default
    */
    minify: 'esbuild',
    
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
        
        /* Chunk splitting strategy for stable, infinitely-cacheable assets
           
           RATIONALE:
           - Smaller chunks = finer-grained cache invalidation
           - Stable chunks = constant hash when content doesn't change
           - Framework isolation = Qwik updates don't invalidate app code
           - Vendor isolation = Dependency changes don't invalidate internal code
           
           This enables aggressive long-term caching: old chunks stay cached
           even when site updates, reducing bandwidth for returning visitors.
        */
        manualChunks: (id) => {
          /* Qwik framework: highest stability, rarely updated
             Separate chunk allows aggressive caching of framework code */
          if (id.includes("@builder.io/qwik") || id.includes("@builder.io/qwik-city")) {
            return "qwik-runtime";
          }
          
          /* Vendor dependencies: mid stability, infrequent updates
             Separate chunk protects against app code churn */
          if (id.includes("node_modules")) {
            return "vendor";
          }
          
          /* Application code: highest churn, updates frequently
             Treated as default chunk, not isolated beyond vendor split */
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
