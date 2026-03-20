# Asset Delivery & Cache Strategy

## Overview

This document describes the static asset delivery and HTTP caching strategy for the site. The strategy optimizes for efficient browser caching, minimal re-downloads on updates, and predictable cache invalidation.

## Build Output Structure

### Hashed Assets (Immutable)

All static assets in the build are named using **content hashes**:

```
dist/assets/
  ├── ButtonLink-BQA_7gD9.js              # Hashed JS (immutable)
  ├── cn-C_y86Ny1.js                      # Hashed JS (immutable)
  ├── CMRgKVKj-style.css                  # Hashed CSS (immutable)
  └── BOeWTOD4-inter-cyrillic-ext-*.woff2 # Hashed fonts (immutable)

dist/
  ├── q-manifest.json                     # Routes and asset mapping
  ├── qwikloader-*.js                     # Loader bootstrap
  └── [route-chunks]                      # Route-specific code
```

### Key Properties

1. **Content Addressing**: Filename = hash(file contents)
   - Same content = same filename
   - Different content = different filename
   - Enables aggressive caching with automatic invalidation

2. **Granular Code Splitting**: Separate chunks for:
   - Framework (@builder.io packages)
   - User code (routes, components)
   - Shared utilities (cn, structured-data, etc.)
   - Route-specific code chunks

## Caching Strategy by Asset Type

### 1. Hashed Assets (JS/CSS/Fonts/Images)

**Pattern**: `/assets/ButtonLink-BQA_7gD9.js`, `/assets/style-CMRgKVKj.css`

**Recommended Headers**:

```
Cache-Control: public, immutable, max-age=31536000
```

**Rationale**:

- Content hash in filename = guaranteed immutable
- Browser cache for 1 year (or longer)
- No revalidation needed
- Automatically invalidated when content changes

### 2. HTML Route Entry Points

**Pattern**: `/index.html`, `/about/`, `/blog/`, etc.

**Recommended Headers**:

```
Cache-Control: no-cache, must-revalidate
ETag: [generated from content]
```

**Rationale**:

- Points to new hashed assets on update
- Browser must check server for fresh version
- Prevents serving stale HTML with references to old assets
- Safe to check frequently (small payload, likely 304 Not Modified responses)

### 3. Manifest & Bootstrap

**Files**: `q-manifest.json`, `qwikloader-*.js`

**Recommended Headers**:

```
Cache-Control: no-cache, must-revalidate
ETag: [generated from content]
```

**Rationale**:

- Maps routes to asset chunks
- Small files (worth checking for updates)
- Prevents being stuck with old asset references

## Deployment Implementation

### Static Hosting (Netlify, Vercel, GitHub Pages)

Most platforms automatically handle cache headers based on file patterns. Verify:

```javascript
// netlify.toml / vercel.json / equivalent
{
  "headers": [
    {
      "source": "/assets/*",
      "headers": [
        { "key": "Cache-Control", "value": "public, immutable, max-age=31536000" }
      ]
    },
    {
      "source": "/*.html",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache, must-revalidate" }
      ]
    },
    {
      "source": "/q-manifest.json",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache, must-revalidate" }
      ]
    }
  ]
}
```

### Self-Hosted / Node.js Server

Configure your HTTP headers in middleware:

```javascript
// Example: Express
app.use((req, res, next) => {
  if (req.path.startsWith("/assets/")) {
    // Hashed assets: cache forever
    res.header("Cache-Control", "public, immutable, max-age=31536000");
  } else if (
    req.path.endsWith(".html") ||
    req.path === "/" ||
    req.path.match(/\/\w+\/?$/)
  ) {
    // HTML routes: always revalidate
    res.header("Cache-Control", "no-cache, must-revalidate");
  } else {
    // Manifest, bootstrap: always revalidate
    res.header("Cache-Control", "no-cache, must-revalidate");
  }
  next();
});
```

### CDN / Edge Cache

Pair origin cache headers with edge cache rules:

```
Origin: Cache-Control headers above
Edge: Respect origin headers, with min TTL for no-cache assets
  → Reduces origin revalidation requests
  → CDN still checks origin on cache hit for no-cache assets
  → Browser gets fresh version with short CDN latency
```

## Chunk Management

### Framework Chunk Isolation

The build config isolates `@builder.io/qwik` and `@builder.io/qwik-city` into a separate chunk:

```typescript
// vite.config.ts
manualChunks: (id) => {
  if (id.includes("@builder.io/qwik") || id.includes("@builder.io/qwik-city")) {
    return "qwik-framework";
  }
};
```

**Benefits**:

- Framework updates don't invalidate user code hashes
- User code updates don't require re-downloading framework
- Finer cache invalidation granularity

### User Code Chunks

Route-specific and component code is automatically split by Qwik:

```
q-B_LB6VGz.js       # Route chunk for /blog
q-CKVPtzjq.js       # Route chunk for /about
q-D2ZcEzIn.js       # Shared utility chunk
```

Each chunk is independently cacheable by its content hash.

## Monitoring & Validation

### Build Output Validation

Check `npm run build` output for:

1. **Asset naming consistency**: All files in `/assets/` should use hashes
2. **Gzip size efficiency**: Verify final sizes are reasonable
3. **Chunk count**: Ensure granular splitting (20+ chunks is typical)

Example output:

```
dist/ButtonLink-BQA_7gD9.js              2.1 kB │ gzip: 0.8 kB
dist/cn-C_y86Ny1.js                     26.7 kB │ gzip: 8.4 kB
dist/CMRgKVKj-style.css                 45.9 kB │ gzip: 6.2 kB
```

### HTTP Header Verification

Once deployed, verify headers are set correctly:

```bash
# Check hashed asset headers
curl -I https://example.com/assets/ButtonLink-BQA_7gD9.js
# Should see: Cache-Control: public, immutable, max-age=31536000

# Check HTML headers
curl -I https://example.com/about/
# Should see: Cache-Control: no-cache, must-revalidate
```

### Browser DevTools

- **Network tab**: Verify hashed assets are cached (Status: 304 or from cache)
- **Memory tab**: Check total bundle size (target < 100KB gzipped for initial load)
- **Coverage tab**: Identify unused code for future optimization

## Performance Implications

### Positive

- ✅ Hashed assets never re-downloaded unless content changes
- ✅ Efficient granular invalidation (only changed chunks break cache)
- ✅ Browser disk cache persists between sessions
- ✅ CDN can cache assets indefinitely

### Considerations

- ⚠️ First visit still downloads full bundle (unavoidable, ~30KB gzipped)
- ⚠️ All assets cached per origin; separate domains don't share cache
- ⚠️ Long max-age assumes immutable filenames (already guaranteed by content hash)

## Future Optimizations

### Possible Enhancements

1. **Differential Loading**: Serve modern browsers ES 2020+ by default, fallback for older browsers
2. **Route Prefetching**: Preload likely next routes after initial load
3. **Service Worker**: Persist cache across deployments for offline support
4. **Compression** Brotli compression for compatible clients (better than gzip)
5. **HTTP/2 Push**: Proactively send critical assets

### Prerequisites

These would require:

- Deployment platform support
- Updated server configuration
- Browser runtime support verification

## References

- [MDN: HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [Qwik: Production Deployment](https://qwik.dev/docs/deployments/)
- [Vite: Build Optimization](https://vitejs.dev/guide/features.html#dynamic-import)
- [MDN: Immutable Content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching#immutable_content)

## Historical Notes

- **Phase 12, TASK-115**: Added comprehensive cache strategy documentation and optimized vite.config.ts for consistent asset hashing and chunk splitting
- Build configuration now explicitly manages chunk boundaries and asset naming for long-term caching effectiveness
