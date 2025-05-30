import {
	BaseQueryApi,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	QueryReturnValue,
} from '@reduxjs/toolkit/query'
import { BASE_URL, baseQuery } from './baseQuery'
import axios from 'axios'
import { AuthRdo, setSessionData } from '@/entities/session/model'
import { saveToken } from '@/entities/session/lib'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ExtraOptions = {
	headers?: Record<string, string>
	timeout?: number
}

export async function baseQueryWithReauth(
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: ExtraOptions
): Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>> {
	let result = await baseQuery(args, api, extraOptions)

	if (result.error && result.error.status === 401) {
		toast.error('Ошибка клиента! Проверьте введённые данные.')
		try {
			const { data } = await axios.post<AuthRdo>(`${BASE_URL}/auth/refresh`, {})
			saveToken(data.refresh_token)
			api.dispatch(setSessionData(data))
			result = await baseQuery(args, api, extraOptions)
		} catch {
			console.error('Error')
		}
	}

	return result
}
