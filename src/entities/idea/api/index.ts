import { CreateIdea, CreateIdeaSolution, UpdateIdeaDto } from './../model/types'
import { IdeaQuery, IdeaRdo } from '../model/types'
import { IDEA_TAG, ONE_IDEA, VOTE_TAG, WISHLIST_TAG } from '@/shared/api/tags'
import { createEntityAdapter } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api'
import { mapIdea } from '../lib'

const ideasAdapter = createEntityAdapter({
	selectId: (item: IdeaRdo) => item.id,
})

const ideasSelector = ideasAdapter.getSelectors()

export const ideaApi = baseApi.injectEndpoints({
	endpoints: build => ({
		findTotalCountIdeas: build.query<number, IdeaQuery>({
			query: queryParams => ({
				url: `/idea/totalCount`,
				method: 'GET',
				providesTags: [IDEA_TAG],
				params: { ...queryParams },
			}),
		}),
		findIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => {
				return {
					url: '/idea',
					method: 'GET',
					params: { ...queryParams },
				}
			},
			providesTags: [IDEA_TAG, VOTE_TAG, ONE_IDEA],
			transformResponse: (response: IdeaRdo[]) => response.map(mapIdea),
		}),
		findMyIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => ({
				url: '/idea/my-ideas',
				method: 'GET',
				params: { ...queryParams },
			}),
			providesTags: [IDEA_TAG, WISHLIST_TAG],
			transformResponse: (response: IdeaRdo[]) => response.map(mapIdea),
		}),
		findFavoriteIdeas: build.query<IdeaRdo[], IdeaQuery>({
			query: queryParams => ({
				url: '/idea/favorite-ideas',
				method: 'GET',
				params: { ...queryParams },
			}),
			providesTags: [IDEA_TAG, WISHLIST_TAG],
			transformResponse: (response: IdeaRdo[]) => response.map(mapIdea),
		}),
		findByIdeaId: build.query<IdeaRdo, string>({
			query: id => ({
				url: `/idea/${id}`,
				method: 'GET',
				providesTags: (result: Pick<IdeaRdo, 'id'>) => [
					{ type: ONE_IDEA, id: result?.id || undefined },
				],
			}),
			transformResponse: (response: IdeaRdo) => mapIdea(response),
		}),
		createIdeaSolution: build.mutation<IdeaRdo, CreateIdeaSolution>({
			query: ({ id, ...body }) => ({
				url: `/idea/create-solution/${id}`,
				method: 'PUT',
				body,
				invalidatesTags: (
					result: unknown,
					error: unknown,
					arg: Pick<IdeaRdo, 'id'>
				) => [{ type: ONE_IDEA, id: arg.id }],
				transformResponse: (response: IdeaRdo) => mapIdea(response),
			}),
		}),
		createIdea: build.mutation<IdeaRdo, CreateIdea>({
			query: dto => ({
				url: '/idea/create',
				method: 'POST',
				body: dto,
			}),
			invalidatesTags: [IDEA_TAG, WISHLIST_TAG],
			transformResponse: (response: IdeaRdo) => mapIdea(response),
		}),
		uploadImage: build.mutation<string, FormData>({
			query: dto => ({
				url: '/images/upload',
				method: 'POST',
				body: dto,
			}),
		}),
		updateIdea: build.mutation<IdeaRdo, UpdateIdeaDto>({
			query: ({ id, ...body }) => ({
				url: `/idea/update/${id}`,
				method: 'PUT',
				body,
				invalidatesTags: (
					result: unknown,
					error: unknown,
					arg: Pick<IdeaRdo, 'id'>
				) => [{ type: ONE_IDEA, id: arg.id }, IDEA_TAG],
				transformResponse: (response: IdeaRdo) => mapIdea(response),
			}),
		}),
	}),
})

export const {
	useCreateIdeaMutation,
	useFindIdeasQuery,
	useFindByIdeaIdQuery,
	useFindMyIdeasQuery,
	useFindFavoriteIdeasQuery,
	useFindTotalCountIdeasQuery,
	useCreateIdeaSolutionMutation,
	useUploadImageMutation,
	useUpdateIdeaMutation,
} = ideaApi

export { ideasSelector, ideasAdapter }
