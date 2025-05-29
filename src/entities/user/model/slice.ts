import { createSlice } from '@reduxjs/toolkit'
import { UserRole } from './types'
import { userApi } from '../api'

interface State {
	role: UserRole
}

const initialState: State = {
	role: UserRole.User,
}

export const userSlice = createSlice({
	name: 'userSlice',
	initialState,
	reducers: {
		setUserRole(state, action) {
			state.role = action.payload
		},
	},
	extraReducers(builder) {
		builder.addMatcher(
			userApi.endpoints.getAccount.matchFulfilled,
			(state, { payload }) => {
				state.role = payload.role
			}
		)
	},
})

export const { setUserRole } = userSlice.actions
