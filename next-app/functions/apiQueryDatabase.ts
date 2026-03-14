import { queryDatabase } from '@/functions/queryDatabase'

export const apiQueryDatabase = async ({ query, values = [] }: { query: string, values: string[] }) => {
	if (query.length === 0) {
		throw new Error('apiQueryDatabase(): Query is empty.')
	}

	let dbResponse
	let responseData

	try {
		dbResponse = await queryDatabase({ query, values })
		responseData = {
			ok: true,
			data: dbResponse[0],
		}
	} catch (err: any) {
		responseData = {
			ok: false,
			message: err.message,
		}
	} finally {
		return responseData
	}
}