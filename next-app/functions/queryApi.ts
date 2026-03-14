import 'dotenv/config'
import { ApiQueryParam } from '@/types/api'
import { createApiUrl } from './createApiUrl'

export const queryApi = async ({ endpoint, params = [], method = 'GET', data = {} }: queryApiParamsT) => {

	// Construct URL with query parameters
	const requestUrl = createApiUrl({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!, endpoint, params })

	let fetchParams

	switch (method) {
	case 'GET':
		fetchParams = {}
		break

	case 'POST':
		fetchParams = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}
		break

	default:
		return {
			ok: false,
			message: `queryApi(): Invalid HTTP method: ${method}`,
		}
	}

	const apiResponse = await fetch(requestUrl, fetchParams)
	const response = await apiResponse.json()

	return response
}

type queryApiParamsT = {
  endpoint: string
  params?: ApiQueryParam[]
  method?: 'GET' | 'POST'
  data?: any
}
