import { timingSafeEqual } from 'node:crypto'

export const ADMIN_ROUTE_PREFIX = '/admin'
export const ADMIN_BASIC_AUTH_REALM = 'Admin'
export const ADMIN_BASIC_AUTH_USERNAME_ENV = 'ADMIN_BASIC_AUTH_USERNAME'
export const ADMIN_BASIC_AUTH_PASSWORD_ENV = 'ADMIN_BASIC_AUTH_PASSWORD'

type AdminBasicAuthConfig = {
  username: string
  password: string
}

type AdminBasicAuthCredentials = {
  username: string
  password: string
}

export type AdminBasicAuthValidationResult =
  | {
    ok: true
  }
  | {
    ok: false
    reason: 'missing-config' | 'missing-header' | 'invalid-header' | 'invalid-credentials'
  }

export function isAdminRoutePath(pathname: string): boolean {
  return pathname === ADMIN_ROUTE_PREFIX || pathname.startsWith(`${ADMIN_ROUTE_PREFIX}/`)
}

export function buildAdminBasicAuthChallenge(): string {
  return `Basic realm="${ADMIN_BASIC_AUTH_REALM}", charset="UTF-8"`
}

export function getAdminBasicAuthConfig(env: NodeJS.ProcessEnv): AdminBasicAuthConfig | null {
  const username = env[ADMIN_BASIC_AUTH_USERNAME_ENV]
  const password = env[ADMIN_BASIC_AUTH_PASSWORD_ENV]

  if (!username || !password) {
    return null
  }

  return {
    username,
    password,
  }
}

function parseBasicAuthorizationHeader(
  authorizationHeader: string | undefined,
): AdminBasicAuthCredentials | null {
  if (!authorizationHeader) {
    return null
  }

  const [scheme, encodedCredentials] = authorizationHeader.split(' ', 2)

  if (scheme !== 'Basic' || !encodedCredentials) {
    return null
  }

  try {
    const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf8')
    const separatorIndex = decodedCredentials.indexOf(':')

    if (separatorIndex < 0) {
      return null
    }

    return {
      username: decodedCredentials.slice(0, separatorIndex),
      password: decodedCredentials.slice(separatorIndex + 1),
    }
  } catch {
    return null
  }
}

function safeCompareSecret(expectedValue: string, receivedValue: string): boolean {
  const expectedBuffer = Buffer.from(expectedValue, 'utf8')
  const receivedBuffer = Buffer.from(receivedValue, 'utf8')

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false
  }

  return timingSafeEqual(expectedBuffer, receivedBuffer)
}

export function validateAdminBasicAuthHeader(
  authorizationHeader: string | undefined,
  env: NodeJS.ProcessEnv,
): AdminBasicAuthValidationResult {
  const config = getAdminBasicAuthConfig(env)

  if (!config) {
    return {
      ok: false,
      reason: 'missing-config',
    }
  }

  if (!authorizationHeader) {
    return {
      ok: false,
      reason: 'missing-header',
    }
  }

  const credentials = parseBasicAuthorizationHeader(authorizationHeader)

  if (!credentials) {
    return {
      ok: false,
      reason: 'invalid-header',
    }
  }

  const usernameMatches = safeCompareSecret(config.username, credentials.username)
  const passwordMatches = safeCompareSecret(config.password, credentials.password)

  if (!usernameMatches || !passwordMatches) {
    return {
      ok: false,
      reason: 'invalid-credentials',
    }
  }

  return {
    ok: true,
  }
}
