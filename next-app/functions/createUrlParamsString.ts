import { ApiQueryParam } from '@/types/api'

export const createUrlParamsString = (params: ApiQueryParam[]) => params.map(({ key, value }) => `${key}=${value}`).join('&')
