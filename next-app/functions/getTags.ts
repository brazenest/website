import { DB_TagModel } from "@/types/blog"
import { queryDatabase } from "./queryDatabase"

export const getTags = async (ids: number[]) => {
	if (!ids.length) return []
	const tags = await queryDatabase<DB_TagModel>({ query: `SELECT name, slug FROM tags WHERE id IN (${ids.join(',')}) ORDER BY id ASC;` })

	return tags
}
