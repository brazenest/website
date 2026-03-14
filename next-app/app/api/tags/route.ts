import { queryDatabase } from "@/functions/queryDatabase";
import { DbQuery, DbWhereCondition } from "@/types/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

	const ids = req.nextUrl.searchParams.getAll('ids')

	const query: DbQuery[] = []

	query.push(
		'SELECT name',
		'FROM tags',
	)

	const whereConditions: DbWhereCondition[] = []
	whereConditions.push({ key: 'id', value: `IN (${ids.join(',')})` })
	const whereStatement = whereConditions
		.map(condition => `${condition.key} ${condition.value}`)
		.join(' AND ')
	query.push(`WHERE ${whereStatement}`)

	const response = await queryDatabase({ query: query.join(' ') })

	const result = response[0]
	return NextResponse.json(result)
}