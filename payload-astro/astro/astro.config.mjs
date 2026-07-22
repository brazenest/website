// @ts-check
import { defineConfig } from 'astro/config'

// Pure static output → dist/ (BUILD.md §1, §8: no Functions, free unlimited Pages bandwidth).
// No SSR adapter: Payload is a build-time content source, never a live dependency.
export default defineConfig({
  site: 'https://aldengillespy.com',
  output: 'static',
  build: {
    // Inline the CSS into each page's <head> instead of an external stylesheet, so there's
    // no render-blocking round-trip before styles apply — kills the flash of unstyled
    // content on first paint in every browser (Firefox was still showing it). ~8KB gzipped.
    inlineStylesheets: 'always',
  },
  image: {
    // Astro's built-in sharp pipeline optimizes the media copied in by `pnpm run export`
    // and generates responsive sizes at build (BUILD.md §6.4). Watch the 20k-file ceiling.
    responsiveStyles: true,
  },
})
