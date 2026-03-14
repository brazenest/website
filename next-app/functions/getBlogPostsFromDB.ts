import { DbQueryValue } from '@/types/db'
import { queryDatabase } from './queryDatabase'
import { DB_PostModel } from '@/types/blog'
import { getTags } from './getTags'

export const getBlogPostsFromDB = async ({ slug, showHidden = false }: fnGetpostsFromDBParams) => {

	const values: DbQueryValue[] = []

	// Build the WHERE predicate.
	const whereParts: string[] = []

	if (slug) {
		whereParts.push('posts.slug = ?')
		values.push(slug)
	}
	if (!showHidden) {
		whereParts.push('posts.visible = ?')
		values.push('1')
	}

	// SELECT clause
	const select = new DBQuerySelectClause([
		'posts.slug AS slug',
		'posts.title AS title',
		'posts.date AS date',
		'categories.slug AS category',
		'posts.excerpt AS excerpt',
		'posts.dek AS dek',
		'posts.body AS body',
		'posts.tags AS tags',
	])

	// FROM clause
	const from = new DBQueryFromClause(['posts'])

	// JOIN clause
	const join = new DBQueryJoinClause(['categories'])

	// ON clause
	const on = new DBQueryOnClause(['posts.category = categories.slug'])

	// WHERE clause
	const where = new DBQueryWhereClause(whereParts)

	// ORDER BY clause
	const orderBy = new DBQueryOrderByClause(['posts.date DESC'])

	let substitutionValue = 0

	// Build the query string.
	const query = [
		select,
		from,
		join,
		on,
		where,
		orderBy,
	]
		.join(' ')
		.replace(/\?/g, () => `$${++substitutionValue}`)

	// Return the result of the direct-to-DB query.
	const result: DB_PostModel[] = await queryDatabase<DB_PostModel>({ query, values });
	const posts = await Promise.all(
		result.map(async (post) => ({
			...post,
			tags: await getTags(post.tags),
		}))
	)

	return posts
}

type fnGetpostsFromDBParams = {
	slug?: string
	showHidden?: boolean
}

abstract class DBQueryClause {
	protected theName: string
	protected theValues: string[]
	protected theConjoiner: string

	constructor(name, values, { conjoiner }: DBQueryClauseParams) {
		this.theName = name
		this.theValues = values
		this.theConjoiner = conjoiner ?? ''
	}

	get name() {
		return this.theName
	}
	get value() {
		return this.theValues.join(this.theConjoiner)
	}

	toString() {
		return this.name + ' ' + this.value
	}
}

type DBQueryClauseParams = {
	conjoiner?: string
}

class DBQuerySelectClause extends DBQueryClause {
	constructor(values) {
		super('SELECT', values, { conjoiner: ', ' })
	}
}

class DBQueryFromClause extends DBQueryClause {
	constructor(values) {
		super('FROM', values, { conjoiner: ', ' })
	}
}

class DBQueryJoinClause extends DBQueryClause {
	constructor(values) {
		super('JOIN', values, { conjoiner: ' AND ' })
	}
}

class DBQueryOnClause extends DBQueryClause {
	constructor(values) {
		super('ON', values, { conjoiner: ', ' })
	}
}

class DBQueryWhereClause extends DBQueryClause {
	constructor(values) {
		super('WHERE', values, { conjoiner: ' AND ' })
	}
}

class DBQueryOrderByClause extends DBQueryClause {
	constructor(values) {
		super('ORDER BY', values, { conjoiner: ', ' })
	}
}
