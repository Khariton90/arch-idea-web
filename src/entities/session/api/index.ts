import { baseApi } from '@/shared/api'
import { AuthRdo, SignInForm } from '../model/types'
import { SESSION_TAG } from '@/shared/api/tags'

export const sessionApi = baseApi.injectEndpoints({
	endpoints: build => ({
		signIn: build.mutation<AuthRdo, SignInForm>({
			query: dto => ({
				url: '/auth/login',
				method: 'POST',
				body: { ...dto, modelName: 'web' },
			}),
			invalidatesTags: [SESSION_TAG],
		}),
		signUp: build.mutation<unknown, { message: string }>({
			query: dto => ({
				url: '/session/register',
				method: 'POST',
				body: { message: dto.message },
			}),
			invalidatesTags: [SESSION_TAG],
		}),
		sendRefreshToken: build.mutation<AuthRdo, string>({
			query: (token: string) => ({
				url: '/auth/refresh',
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
		}),
	}),
})

export const {
	useSignInMutation,
	useSendRefreshTokenMutation,
	useSignUpMutation,
} = sessionApi
