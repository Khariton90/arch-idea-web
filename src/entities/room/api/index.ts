import { baseApi } from '@/shared/api'
import { Room } from '../model/types'

export const roomApi = baseApi.injectEndpoints({
	endpoints: build => ({
		findRooms: build.query<Room[], void>({
			query: () => ({
				url: '/department',
			}),
		}),
	}),
})

export const { useFindRoomsQuery } = roomApi
