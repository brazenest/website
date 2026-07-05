import { Client, Pool, type PoolConfig, type QueryResultRow } from 'pg'
import { getRuntimeEnv } from '~/lib/server/runtimeEnv'

export type QueryValue = string | number | boolean | Date | null

let pool: Pool | undefined

/**
 * On the Cloudflare Workers runtime, sockets cannot be reused across requests,
 * so a long-lived module-scoped `Pool` is invalid. Detect Workers and open a
 * short-lived `Client` per query instead (connections are pooled upstream by
 * Hyperdrive). The Node.js/Fastify path keeps the shared `Pool`.
 */
const isCloudflareWorkers =
  typeof navigator !== 'undefined' && navigator.userAgent === 'Cloudflare-Workers'

function assertServerSide() {
  if (!import.meta.env.SSR) {
    throw new Error('Database access is only available during server-side execution.')
  }
}

function getDatabaseUrl() {
  const databaseUrl = getRuntimeEnv('DATABASE_URL')?.trim()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL must be set before using PostgreSQL blog helpers.')
  }

  return databaseUrl
}

function getSslMode(databaseUrl: string) {
  const envSslMode = getRuntimeEnv('PGSSLMODE')?.trim().toLowerCase()

  if (envSslMode) {
    return envSslMode
  }

  try {
    return new URL(databaseUrl).searchParams.get('sslmode')?.trim().toLowerCase()
  } catch {
    return undefined
  }
}

function getConnectionString(databaseUrl: string, sslMode: string | undefined) {
  if (sslMode !== 'require') {
    return databaseUrl
  }

  try {
    const url = new URL(databaseUrl)
    url.searchParams.set('uselibpqcompat', 'true')
    return url.toString()
  } catch {
    return databaseUrl
  }
}

function getPoolConfig(): PoolConfig {
  const databaseUrl = getDatabaseUrl()
  const sslMode = getSslMode(databaseUrl)
  const rejectUnauthorized =
    getRuntimeEnv('PGSSLREJECTUNAUTHORIZED')?.trim().toLowerCase() === 'true'

  return {
    connectionString: getConnectionString(databaseUrl, sslMode),
    ...(sslMode === 'require'
      ? {
        ssl: {
          rejectUnauthorized,
        },
      }
      : (sslMode === 'verify-ca' || sslMode === 'verify-full')
        ? {
          ssl: {
            rejectUnauthorized: getRuntimeEnv('PGSSLREJECTUNAUTHORIZED') !== 'false',
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
  assertServerSide()

  if (isCloudflareWorkers) {
    const client = new Client(getPoolConfig())
    await client.connect()
    try {
      return await client.query<T>(text, values)
    } finally {
      await client.end()
    }
  }

  return getPool().query<T>(text, values)
}
