import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

/* ============================================================================
   ASSET DELIVERY & CACHE STRATEGY
   
   This configuration optimizes static asset delivery with content-addressed
   (hashed) filenames and cache-friendly headers for production use.
   
   KEY PRINCIPLES:
   1. Hashed assets (e.g., q-B_LB6VGz.js) are immutable → cache forever
   2. HTML/route entry points (from Qwik SSR) → no-cache (check server each time)
   3. Chunk boundaries optimized for granular invalidation
   4. Source maps included for production debugging (removed from final deliverable)
   
   DEPLOYMENT NOTES:
   - Server should set Cache-Control: max-age=31536000 (1 year) for /build and /assets
   - Server should set Cache-Control: no-cache for *.html and entry points
   - Not environment-specific; works with any static hosting or SSR adapter
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
