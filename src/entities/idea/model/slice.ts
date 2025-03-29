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
		page: 0,
		limit: 9,
	},
}

export const ideaSlice = createSlice({
	name: 'ideaSlice',
	initialState,
	reducers: {},
})
