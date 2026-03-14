import { NextRequest, NextResponse } from "next/server";
import { apiQueryDatabase } from "@/functions/apiQueryDatabase";
import { calculateReadtime } from "@/functions/calculateReadtime";

export async function GET(req: NextRequest) {
	const query: string[] = []
	const values: string[] = []

	const slug = req.nextUrl.searchParams.get('slug')
	const sortOrder = req.nextUrl.searchParams.get('sortOrder')
	const showHidden = req.nextUrl.searchParams.get('showHidden')?.toLowerCase()

	if (slug) {

		query.push(
			'SELECT *',
			'FROM posts',
			'JOIN categories',
			'ON posts.category = categories.slug',
			'WHERE posts.slug=? AND posts.visible=?',
			'LIMIT 1',
		)
		values.push(
			slug,
			'1',
		)

	} else {

		// SELECT
		const selectColumns = ['*']
		query.push(`SELECT ${selectColumns.join(', ')}`)

		// FROM
		const fromTables = ['posts']
		query.push(`FROM ${fromTables.join(', ')}`)

		// WHERE
		const whereStatements: string[] = []
		if (!showHidden || (showHidden && (showHidden !== 'true'))) {
			whereStatements.push(`visible = true`)
		}
		query.push(`WHERE ${whereStatements.join(' AND ')}`)

		// ORDER BY
		if (sortOrder) {
			const VALID_SORT_ORDERS = {
				newestFirst: 'ORDER BY date DESC',
			}

			if (Object.keys(VALID_SORT_ORDERS).includes(sortOrder)) {
				query.push(VALID_SORT_ORDERS[sortOrder])
			}
		}
	}

	const queryString = query.join(' ')

	const queryResponse = await apiQueryDatabase({ query: queryString, values })

	return NextResponse.json(queryResponse)
}

export async function POST(req: NextRequest) {
	const data = await req.json()

	const query = `insert into posts (title, slug, category, excerpt, dek, date, body, readtime) values (?, ?, ?, ?, ?, ?, ?, ?)`
	const values = [
		data.title,
		data.slug,
		data.category,
		data.excerpt,
		data.dek,
		data.date,
		data.body,
		calculateReadtime(data.body),
	]

	let dbResponse
	let responseData

	try {
		dbResponse = await apiQueryDatabase({ query, values })
		responseData = {
			ok: true,
			data: dbResponse,
		}
	} catch (err) {
		responseData = {
			ok: false,
			message: err,
		}
	} finally {
		return NextResponse.json(responseData)
	}
}