import { UrlQueryParam } from '@/types/generic'
import { createUrlParamsString } from '@/functions/createUrlParamsString'

export const createUrl = ({ url, queryParams = [], fragment = undefined }: createUrlParamsT) => (
	`${url}${queryParams.length ? '?' + createUrlParamsString(queryParams) : ''}${fragment ? `#${fragment}` : ''}`
)

type createUrlParamsT = {
  url: string,
  queryParams?: UrlQueryParam[],
  fragment?: string,
}
