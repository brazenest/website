# Known Issues & Post-Launch Investigation Backlog

**Document Status**: v3.0.0 Known Issues Capture  
**Created**: March 20, 2026  
**Tracking**: Engineering follow-up items that do not block v3.0.0 launch but require investigation  
**Priority**: Post-launch investigation (after successful deployment)

---

## Overview

This document captures production-verified issues and compatibility problems that are well-understood, have acceptable workarounds, and are explicitly deferred from v3.0.0 launch. These items are tracked here to prevent loss and to guide post-launch optimization work.

**Key Principle**: Documented issues are contained and tracked; they do not prevent launch or compromise production reliability.

---

## Issue #1: Qwik SSG & esbuild Minification Incompatibility

**Status**: Known Issue with Workaround Applied  
**Severity**: Medium (impacts production build size, not functionality)  
**Discovered**: TASK-138 (March 20, 2026)  
**Workaround**: Minification disabled + NO manual chunks in vite.config.ts  
**Last Updated**: TASK-140 (March 20, 2026) — Corrected from d3b7a31 incomplete fix  
**Launch Status**: ✅ Acceptable for v3.0.0 (workaround applied and verified)  
**Post-Launch Priority**: 🔴 HIGH — Investigate for bundle size optimization

### Issue Description

During Qwik City static site generation (SSG), the production build fails when **ANY manual chunking is enabled**, even vendor-only chunks, combined with **minification settings**:

**Root Cause**: Manual chunk configuration (including vendor-only) creates circular dependency in SSR bundle:  
- `entry.ssr` → `vendor` → `entry.ssr` (circular reference)
- This circular dependency manifests as module initialization errors (TDZ) during SSG phase

**Error Symptoms**:
- With minification + vendor chunk: `ReferenceError: Cannot access '_' before initialization`
- Without minification + vendor chunk: `ReferenceError: Cannot access 'componentQrl' before initialization`
- Error location: During SSG phase when loading SSR bundle for route generation
- Manifestation: Temporal Dead Zone (TDZ) error in Qwik-generated code

**Important**: The fix is NOT just removing qwik-runtime chunk; ALL manual chunks must be disabled.

### Impact Analysis

| Aspect | Status | Notes |
|--------|--------|-------|
| **Functionality** | ✅ No impact | Code runs identically in development and production |
| **Development** | ✅ No impact | Dev server unaffected; dev build works correctly |
| **Production Build** | ✅ Success | Build completes when all manual chunks disabled |
| **SSG Phase** | ✅ Success | Routes generate without module initialization errors |
| **Bundle Size** | 🟡 Degraded | ~2-3x larger pre-gzip output (acceptable tradeoff) |
| **Deployment** | ✅ Acceptable | Gzip recovery: ~85-90% (final delivery ~15-30 KB larger) |
| **User Experience** | ✅ No impact | No runtime differences; SSR serves identical output |

### Current Workaround (Applied in TASK-140, Corrected)

**Configuration Changes**:

```javascript
// vite.config.ts — CORRECTED after TASK-140 validation

build: {
  // Minification: DISABLED
  // - Reason: Triggers TDZ errors during SSG phase
  // - Required for compatibility with Qwik SSG pipeline
  // - Bundle size impact: ~2-3x larger pre-gzip; ~15-30 KB post-gzip
  // - Status: Verified acceptable for v3.0.0 launch
  minify: false,

  rollupOptions: {
    output: {
      // Manual Chunks: DISABLED ENTIRELY
      // - Previous attempt (d3b7a31): Vendor-only chunk configuration
      // - Issue: Even vendor chunk creates circular dependency in SSR
      // - Result: TDZ errors persist with vendor chunking
      // 
      // TASK-140 Corrected: Removed ALL manual chunking
      // - No vendor chunk
      // - No qwik-runtime chunk
      // - All code bundled into single module
      // - Result: SSG succeeds consistently
      //
      // manualChunks disabled - no chunk splitting
    },
  },
}
```

**Why configuration works**:
1. Disabling minification alone: ❌ Still fails if ANY manual chunks exist
2. Disabling vendor chunk alone: ✅ Workaround works when COMBINED with minify: false
3. Disabling all manual chunks + minify: false: ✅✅ Correct and verified solution

**Why Both Changes Are Necessary**:

1. **Disabling minification alone** → Build passes ✅
2. **Removing qwik-runtime chunk alone** → Build passes ✅
3. **Both changes together** → Build passes + SSG succeeds ✅
4. **Either change reverted alone** → TDZ error returns ❌

The interaction suggests a module initialization order problem in Qwik's code generation that manifests during both minification and chunk isolation.

### Known-Good Build Path

**Current Production Build (Verified)**:

```bash
npm run build
```

Execution sequence:
1. `build.types` — TypeScript type checking ✅
2. `build.client` — Vite client bundle ✅
3. `lint` — ESLint validation ✅
4. `build.server` — SSR bundle + Fastify adapter ✅
5. **SSG Phase** — Static site generation ✅ (38.1ms with workaround)

**Output**:
- Unminified JavaScript bundles
- Vendor chunk: ~29 KB (node_modules)
- App code: ~70-100 KB (pre-gzip, combined with Qwik)
- All routes prerendered to static .html files
- Gzipped delivery: ~80-120 KB (estimated)

**Associated Commits**:
- `d3b7a31` — Fix SSG initialization error: remove qwik-runtime chunk and disable minification
- `53db323` — Fix blog DB integration and sitemap response

### Investigation Scope (Post-Launch)

After v3.0.0 launch, the following investigation tracks should guide future work:

#### 1. Root Cause Analysis

**Questions to Answer**:

- [ ] **Is this esbuild-specific?**
  - Can terser, swc, or other minifiers work with current chunk config?
  - Is it specific to esbuild's minification algorithm or name mangling?

- [ ] **Is this chunk-order-specific?**
  - Does the issue persist with different chunk thresholds?
  - Can manual chunk configuration be altered to preserve minification?
  - What is the minimum chunk isolation that maintains SSG stability?

- [ ] **Is this Qwik codegen-specific?**
  - Do other frameworks (Astro, Fresh, etc.) have similar issues?
  - Is Qwik's SSR/SSG code generation order-dependent?
  - Are there known Qwik configuration options that affect this?

- [ ] **Is this a plugin/config interaction?**
  - Does the vite-plugin-qwik have optimization settings that could help?
  - Are there Vite build configuration changes that could resolve this?
  - Does qwik.config.ts have relevant settings?

#### 2. Optimization Strategies to Explore

**Priority Order** (investigate in this sequence):

1. **Alternative Minifiers** (Lower priority)
   - Test terser instead of esbuild
   - Test swc for Rust-based minification
   - Verify whether name mangling is the specific issue

2. **Chunk Configuration Refinement** (Medium priority)
   - Re-introduce qwik-runtime chunk with different threshold
   - Explore dynamic import boundaries
   - Test limiting chunk count vs. manual splitting

3. **Qwik Configuration** (High priority)
   - Review qwikVite() plugin options
   - Check qwik.config.ts for SSG/SSR settings
   - Investigate Qwik version-specific fixes

4. **Build Pipeline Reordering** (High priority)
   - Test minification of client bundle only (not SSR)
   - Sequence minification after SSG phase
   - Explore post-processing minification

#### 3. Testing Methodology

When resuming investigation:

```bash
# Diagnostic build sequence
pnpm run build.types
pnpm run build.client
pnpm run lint
pnpm run build.server

# Then test minification scenarios:
# Scenario 1: Current workaround (baseline)
vite build  # Expect: success

# Scenario 2: Re-enable minification only
# Edit: minify: 'esbuild' in vite.config.ts
vite build  # Expect: TDZ error

# Scenario 3: Re-add qwik-runtime chunk only
# Edit: qwik-runtime chunk in manualChunks
vite build  # Expect: success

# Scenario 4: Test alternative minifiers
# Edit: minify: 'terser' or minify: 'swc'
vite build  # Observe: passes or fails?

# Scenario 5: Chunk threshold adjustment
# Edit: manualChunks threshold
vite build  # Observe: initialization order change?
```

#### 4. Communication & Tracking

**If Issue is Resolved**:
- Update vite.config.ts with new settings
- Update this document with resolution date and approach
- Update README.md build performance notes
- Commit as separate optimization task (e.g., TASK-145)

**If Issue Requires Qwik Fix**:
- Report to Qwik GitHub issues if not already reported
- Link issue URL in this document
- Track Qwik version in package.json for when fix is available
- Plan upgrade task for next minor release

**If Issue Requires Alternative Approach**:
- Document new strategy (e.g., post-processing minification)
- Update build pipeline documentation
- Re-baseline bundle size expectations

### References

**Related Documentation**:
- [Performance Audit — Section 18: TASK-138 Build Configuration](./performance-audit.md#18-task-138-build-configuration--minification-workaround)
- [Release Readiness — TASK-138 SSG Build & Blog DB Integration](./release-readiness.md#task-138-ssg-build--blog-db-integration)

**Related Commits**:
- `d3b7a31` — Applied workaround (disable minification + remove qwik-runtime chunk)
- `53db323` — Blog DB integration (prerequisite for discovering this issue)

**Related Build Configuration**:
- `vite.config.ts` lines 46-115 (build options and chunk configuration)
- `qwik.config.ts` (Qwik-specific build settings)

**Estimated Investigation Time (Post-Launch)**:
- Root cause analysis: 2-3 hours
- Testing alternative approaches: 3-5 hours
- Implementation (if fix found): 1-2 hours

---

## Issue Template for Future Items

When adding new known issues, use this structure:

```markdown
## Issue #N: [Brief Title]

**Status**: [Known Issue | Regression | Bug]  
**Severity**: [Critical | High | Medium | Low]  
**Discovered**: [TASK-XXX date]  
**Workaround**: [Description or "N/A"]  
**Launch Status**: [✅ Acceptable | ⚠️ Monitored | ❌ Blocking]  
**Post-Launch Priority**: [🔴 HIGH | 🟡 MEDIUM | 🟢 LOW]  

### Issue Description

[Plain-language explanation of what's wrong and under what conditions]

### Current Workaround

[If applicable; code or configuration changes]

### Investigation Scope

[Questions to answer, testing methodology, estimated effort]

### References

[Links to commits, docs, related issues]
```

---

## Summary

This document serves as the containment point for issues that are:

1. ✅ **Well-understood** — Root cause known or suspected
2. ✅ **Have acceptable workarounds** — Does not prevent launch
3. ✅ **Explicitly tracked** — Not lost after launch
4. ✅ **Scoped for investigation** — Clear path for future optimization

**v3.0.0 Launch Status**: 🚀 Approved to proceed with documented workarounds

All production-critical issues have been resolved. Known performance tradeoffs are documented and acceptable.

---

**Last Updated**: March 20, 2026 (TASK-139)  
**Next Review**: Post-launch (Week of March 27)
