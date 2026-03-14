import { getSiteSettings } from "~/lib/content";

const settings = getSiteSettings();

export const siteConfig = {
  title: settings.title,
  description: settings.description,
} as const;

export const workspaceBoundaries = {
  canonicalAppRoot: "src",
  legacyReferenceRoot: "next-app",
  guidance:
    "Do not wire active v3 imports or build configuration into next-app unless the migration task explicitly marks that usage as temporary reference-only work.",
} as const;
