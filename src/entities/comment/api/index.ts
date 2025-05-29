import { IdeaQuery } from '@/entities/idea'
import { CommentListRdo, CommentRdo, CommentDto } from '@/entities/model/types'
import { baseApi } from '@/shared/api'
import { COMMENT_TAG } from '@/shared/api/tags'

export const commentApi = baseApi.injectEndpoints({
	endpoints: build => ({
		findAllCount: build.query<number, void>({
			query: () => ({
				url: '/comment/allCount',
			}),
		}),
		findComments: build.query<
			CommentListRdo,
			{ ideaId: string; query: IdeaQuery }
		>({
			query: ({ ideaId, query }) => ({
				url: `/comment/${ideaId}`,
				method: 'GET',
				params: { ...query },
			}),
			providesTags: [COMMENT_TAG],
		}),
		createComment: build.mutation<CommentRdo, CommentDto>({
			query: ({ ideaId, content }) => ({
				url: `/comment/${ideaId}`,
				method: 'POST',
				body: { content },
			}),
			invalidatesTags: [COMMENT_TAG],
		}),
		findCommentCount: build.query<number, { ideaId: string }>({
			query: ({ ideaId }) => ({
				url: `/comment/totalCount/${ideaId}`,
				method: 'GET',
			}),
		}),
	}),
})

export const {
	useCreateCommentMutation,
	useFindCommentsQuery,
	useFindCommentCountQuery,
	useFindAllCountQuery,
} = commentApi
