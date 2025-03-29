import {
	BaseQueryApi,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	QueryReturnValue,
} from '@reduxjs/toolkit/query'
import { baseQuery } from './baseQuery'

type ExtraOptions = {
	headers?: Record<string, string>
	timeout?: number
}

export async function baseQueryWithReauth(
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: ExtraOptions
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
	const result = await baseQuery(args, api, extraOptions)
	return result
}
