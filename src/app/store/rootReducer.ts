import { ideaSlice } from '@/entities/idea/model/slice'
import { sessionSlice } from '@/entities/session/model/slice'
import { baseApi } from '@/shared/api/baseApi'
import { combineReducers } from '@reduxjs/toolkit'

export default combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	[sessionSlice.name]: sessionSlice.reducer,
	[ideaSlice.name]: ideaSlice.reducer,
})
