import { getPublishedBlogRouteEntries } from './getPublishedBlogRouteEntries'

export async function getPublishedBlogSlugs(): Promise<string[]> {
  const entries = await getPublishedBlogRouteEntries()

  return entries.map((entry) => entry.slug)
}