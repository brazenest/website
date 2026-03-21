import { redirectMap, type RedirectRule } from './redirect-map'

export type RedirectResolution = {
  to: string
  permanent: true
  rule: RedirectRule
}

export const normalizeRedirectPath = (pathname: string) => {
  if (!pathname) {
    return '/'
  }

  let normalized = pathname.trim()

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`
  }

  normalized = normalized.replace(/\/+/g, '/')

  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, '')
  }

  return normalized || '/'
}

export const resolveRedirect = (pathname: string): RedirectResolution | null => {
  const normalizedPath = normalizeRedirectPath(pathname)

  for (const rule of redirectMap) {
    if (rule.type !== 'exact') {
      continue
    }

    if (normalizeRedirectPath(rule.from) !== normalizedPath) {
      continue
    }

    const target = normalizeRedirectPath(rule.to)

    if (target === normalizedPath) {
      return null
    }

    return {
      to: target,
      permanent: rule.permanent,
      rule,
    }
  }

  for (const rule of redirectMap) {
    if (rule.type !== 'pattern') {
      continue
    }

    const match = normalizedPath.match(rule.from)

    if (!match) {
      continue
    }

    const target = normalizeRedirectPath(rule.to(match))

    if (target === normalizedPath) {
      return null
    }

    return {
      to: target,
      permanent: rule.permanent,
      rule,
    }
  }

  return null
}