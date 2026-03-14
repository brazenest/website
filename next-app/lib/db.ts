import { Pool } from 'pg'

const params = {
	host: process.env.NEXT_PUBLIC_DB_HOST,
	port: (process.env.NEXT_PUBLIC_DB_PORT as unknown) as number,
	user: process.env.NEXT_PUBLIC_DB_USER,
	password: process.env.NEXT_PUBLIC_DB_PASSWORD,
	database: process.env.NEXT_PUBLIC_DB_NAME,
	ssl: {
		rejectUnauthorized: false,
	}
}

const pool = new Pool(params)

const exportFn = {
	query: (text, params) => pool.query(text, params),
}

export default exportFn
