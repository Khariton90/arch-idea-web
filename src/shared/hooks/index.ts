import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import store, { AppStore } from '@/app/store'

export type AppDispatch = AppStore['dispatch']
export type State = ReturnType<typeof store.getState>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<State> = useSelector
