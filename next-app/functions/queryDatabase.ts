import db from '@/lib/db'

import { DbQuery, DbQueryValue } from '@/types/db'

export const queryDatabase = async<T> ({ query, values = [] }: QueryDatabaseProps) => {

	/*
     NOTE: Presume that any use of this function includes pre-sanitization of the query string and values provided.
     TODO: Make this function more robust, i.e. able to handle a variety of potential cases.
    */

	try {
		const { rows } = await db.query(query, values);
		return rows as T[]
	} catch (error) {
		console.error("Database query operation failed:", error);
		return []
	}
	
}

type QueryDatabaseProps = {
  query: DbQuery,
  values?: DbQueryValue[],
}
