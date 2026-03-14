import { ApiQueryParam } from '@/types/api'
import { createUrl } from './createUrl'

export const createApiUrl = ({ baseUrl, endpoint, params = [] }: createApiUrlParamsT) => (
	createUrl({
		url: `${baseUrl}/${endpoint}`,
		queryParams: params,
	})
)

type createApiUrlParamsT = {
  baseUrl: string,
  endpoint: string,
  params: ApiQueryParam[],
}
