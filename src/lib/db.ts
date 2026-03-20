import { Pool, type QueryResultRow } from 'pg'

type QueryValue = string | number | boolean | Date | null

let pool: Pool | undefined

function assertServerSide() {
  if (!import.meta.env.SSR) {
    throw new Error('Database access is only available during server-side execution.')
  }
}

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL?.trim()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL must be set before using PostgreSQL blog helpers.')
  }

  return databaseUrl
}

function getPool() {
  assertServerSide()

  if (!pool) {
    pool = new Pool({
      connectionString: getDatabaseUrl(),
    })
  }

  return pool
}

export async function query<T extends QueryResultRow>(text: string, values: QueryValue[] = []) {
  return getPool().query<T>(text, values)
}