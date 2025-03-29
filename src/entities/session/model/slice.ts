import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthorizationStatus, AuthRdo } from './types'
import { sessionApi } from '../api'
import { dropToken, saveToken } from '../lib'

interface SessionState {
	isAuthorized: AuthorizationStatus
	userId: string | null
	accessToken: string | null
}

const initialState: SessionState = {
	isAuthorized: AuthorizationStatus.Unknown,
	userId: null,
	accessToken: null,
}

export const sessionSlice = createSlice({
	name: 'sessionSlice',
	initialState: initialState,
	reducers: {
		setSessionData: (state, action: PayloadAction<AuthRdo>) => {
			const { userId, access_token } = action.payload

			state.isAuthorized = AuthorizationStatus.Auth
			state.userId = userId
			state.accessToken = access_token
		},
		clearSessionData(state) {
			state.isAuthorized = AuthorizationStatus.NoAuth
			state.accessToken = null
			state.userId = null
		},
	},
	extraReducers: builder => {
		builder.addMatcher(
			sessionApi.endpoints.sendRefreshToken.matchFulfilled,
			(state, { payload }) => {
				state.isAuthorized = AuthorizationStatus.Auth
				state.userId = payload.userId
				state.accessToken = payload.access_token
				saveToken(payload.refresh_token)
			}
		),
			builder.addMatcher(
				sessionApi.endpoints.sendRefreshToken.matchRejected,
				state => {
					state.isAuthorized = AuthorizationStatus.NoAuth
					dropToken()
				}
			),
			builder.addMatcher(
				sessionApi.endpoints.signIn.matchFulfilled,
				(state, { payload }) => {
					state.isAuthorized = AuthorizationStatus.Auth
					state.userId = payload.userId
					state.accessToken = payload.access_token
					saveToken(payload.refresh_token)
				}
			)
	},
})

export const { setSessionData, clearSessionData } = sessionSlice.actions
export const selectToken = (state: RootState) => state.sessionSlice.accessToken
