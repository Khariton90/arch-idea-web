import { createSlice } from '@reduxjs/toolkit'
import { IdeaQuery } from './types'

interface State {
	myIdeasCount: number
	totalCount: number
	currentFilter: IdeaQuery
}

const initialState: State = {
	myIdeasCount: 0,
	totalCount: 0,
	currentFilter: {
		page: 1,
		limit: 6,
	},
}

export const ideaSlice = createSlice({
	name: 'ideaSlice',
	initialState,
	reducers: {
		changePage(state, action) {
			state.currentFilter.page = action.payload
		},
		setTotalCount(state, action) {
			state.totalCount = action.payload
		},
	},
})

export const { changePage, setTotalCount } = ideaSlice.actions
