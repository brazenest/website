import type { RequestHandler } from '@builder.io/qwik-city'
import { resolveRedirect } from '~/lib/redirects/resolve-redirect'

export const onRequest: RequestHandler = async ({ next, redirect, url }) => {
  const resolution = resolveRedirect(url.pathname)

  if (resolution) {
    const location = `${resolution.to}${url.search}`

    throw redirect(resolution.permanent ? 308 : 307, location)
  }

  await next()
}