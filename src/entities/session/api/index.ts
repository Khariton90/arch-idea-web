import { baseApi } from '@/shared/api'
import { AuthRdo, SignInForm } from '../model/types'
import { SESSION_TAG } from '@/shared/api/tags'

export const sessionApi = baseApi.injectEndpoints({
	endpoints: build => ({
		signIn: build.mutation<AuthRdo, SignInForm>({
			query: dto => ({
				url: '/session/signIn',
				method: 'POST',
				body: dto,
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

export const { useSignInMutation, useSendRefreshTokenMutation } = sessionApi
