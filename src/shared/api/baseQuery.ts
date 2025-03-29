import { selectToken } from '@/entities/session/model/slice'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BASE_URL = 'http://localhost:3000/api'

import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query'
import { RootState } from '@/app/store'

type ExtraOptions = {
	headers?: Record<string, string>
	timeout?: number
}

export const baseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	ExtraOptions,
	FetchBaseQueryMeta
> = fetchBaseQuery({
	baseUrl: BASE_URL,
	prepareHeaders: (headers, { getState }) => {
		const token = selectToken(getState() as RootState)

		if (token) {
			headers.set('Authorization', `Bearer ${token}`)
		}

		return headers
	},
})
