export const siteConfig = {
  title: "Alden Gillespy",
  description:
    "Minimal personal index for Alden Gillespy's work, writing, and current projects.",
} as const;

export const workspaceBoundaries = {
  canonicalAppRoot: "src",
  legacyReferenceRoot: "next-app",
  guidance:
    "Do not wire active v3 imports or build configuration into next-app unless the migration task explicitly marks that usage as temporary reference-only work.",
} as const;
