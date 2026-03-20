/**
 * Static Prerender Routes Enumeration
 *
 * This file enumerates all routes that can be prerendered to static HTML at build time.
 * Used to ensure the site can be deployed as 100% static HTML to any CDN or static host.
 *
 * ROUTE CATEGORIES:
 * 1. Static routes - fixed paths, always prerendered
 * 2. Dynamic routes - enumerated from content arrays (blog, projects)
 *
 * USAGE:
 * - Referenced during build to enumerate all routes
 * - Can be used by adapters, scripts, or deployment processes
 * - Ensures all content is discoverable and prerendered
 */

import { publishedBlogPosts } from "~/content/blog/posts";
import { engineeringProjects } from "~/content/engineering/projects";
import { productionProjects } from "~/content/production/projects";

/**
 * Static routes that should always be prerendered
 * These are non-parameterized routes with fixed paths
 */
export const STATIC_ROUTES = [
  "/",
  "/about",
  "/resume",
  "/blog",
  "/engineering",
  "/production",
  "/contact",
  "/robots.txt",
  "/sitemap.xml",
] as const;

/**
 * Enumerate all blog post routes
 * Only published posts are prerendered (unpublished drafts are not exposed)
 */
export const getBlogRoutes = () =>
  publishedBlogPosts.map((post) => `/blog/${post.slug}` as const);

/**
 * Enumerate all engineering project routes
 */
export const getEngineeringProjectRoutes = () =>
  engineeringProjects.map(
    (project) => `/engineering/projects/${project.slug}` as const
  );

/**
 * Enumerate all production project routes
 */
export const getProductionProjectRoutes = () =>
  productionProjects.map(
    (project) => `/production/projects/${project.slug}` as const
  );

/**
 * Get all prerenderable routes (static + dynamic)
 * Useful for listing all routes that should be generated at build time
 */
export const getAllPrerenderedRoutes = () => {
  const staticRoutes = [...STATIC_ROUTES];
  const blogRoutes = getBlogRoutes();
  const engineeringRoutes = getEngineeringProjectRoutes();
  const productionRoutes = getProductionProjectRoutes();

  return [...staticRoutes, ...blogRoutes, ...engineeringRoutes, ...productionRoutes];
};

/**
 * Build summary for logging/debugging
 */
export const getPrerenderSummary = () => {
  const all = getAllPrerenderedRoutes();
  return {
    static: STATIC_ROUTES.length,
    blog: getBlogRoutes().length,
    engineering: getEngineeringProjectRoutes().length,
    production: getProductionProjectRoutes().length,
    total: all.length,
  };
};
