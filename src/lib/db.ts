import { Pool, type PoolConfig, type QueryResultRow } from 'pg'

export type QueryValue = string | number | boolean | Date | null

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

function getSslMode(databaseUrl: string) {
  const envSslMode = process.env.PGSSLMODE?.trim().toLowerCase()

  if (envSslMode) {
    return envSslMode
  }

  try {
    return new URL(databaseUrl).searchParams.get('sslmode')?.trim().toLowerCase()
  } catch {
    return undefined
  }
}

function getPoolConfig(): PoolConfig {
  const databaseUrl = getDatabaseUrl()
  const sslMode = getSslMode(databaseUrl)

  return {
    connectionString: databaseUrl,
    ...((sslMode === 'require' || sslMode === 'verify-ca' || sslMode === 'verify-full')
      ? {
        ssl: {
          rejectUnauthorized: process.env.PGSSLREJECTUNAUTHORIZED !== 'false',
        },
      }
      : {}),
  }
}

function getPool() {
  assertServerSide()

  if (!pool) {
    pool = new Pool(getPoolConfig())
  }

  return pool
}

export async function query<T extends QueryResultRow>(text: string, values: QueryValue[] = []) {
  return getPool().query<T>(text, values)
}