import { UserListDto, UserDto, UserOptionsDto } from '@/entities/session/model'
import { baseApi } from '@/shared/api'
import { SESSION_TAG, USER_TAG } from '@/shared/api/tags'
import {
	UserQuery,
	UpdateUserDto,
	UserSessions,
	StatDataset,
} from '../model/types'

export const userApi = baseApi.injectEndpoints({
	endpoints: build => ({
		findDepartmentTotalCount: build.query<number, void>({
			query: () => ({
				url: '/department/totalCount',
			}),
		}),
		findTotalCount: build.query<number, void>({
			query: () => ({
				url: '/idea/totalCount',
			}),
		}),
		fetchUsers: build.query<UserListDto, UserQuery>({
			query: params => ({
				url: '/user/all',
				params: { ...params },
			}),
			providesTags: [USER_TAG],
		}),
		updateUser: build.mutation<UserDto, UpdateUserDto>({
			query: dto => ({
				url: '/user/update',
				method: 'POST',
				body: dto,
			}),
		}),
		updateUserOptions: build.mutation<UserDto, UserOptionsDto>({
			query: ({ id, ...body }) => ({
				url: `/user/update-options/${id}`,
				method: 'POST',
				body,
			}),
			invalidatesTags: [USER_TAG],
		}),
		getAccount: build.query<UserDto, void>({
			query() {
				return {
					url: '/user/account',
					method: 'GET',
				}
			},
			providesTags: [SESSION_TAG],
		}),
		getSessions: build.query<UserSessions[], void>({
			query() {
				return {
					url: '/user/sessions',
					method: 'GET',
				}
			},
		}),
		getStatistic: build.query<StatDataset[], void>({
			query() {
				return {
					url: '/stat',
					method: 'GET',
				}
			},
		}),
	}),
})

export const {
	useUpdateUserMutation,
	useFetchUsersQuery,
	useUpdateUserOptionsMutation,
	useFindTotalCountQuery,
	useGetAccountQuery,
	useGetSessionsQuery,
	useFindDepartmentTotalCountQuery,
	useGetStatisticQuery,
} = userApi
