import { configureStore } from '@reduxjs/toolkit'
import reducer from './rootReducer'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '@/shared/api'

export const setupStore = () => {
	const store = configureStore({
		reducer: reducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(baseApi.middleware),
	})
	setupListeners(store.dispatch)
	return store
}

export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>

export default setupStore()
