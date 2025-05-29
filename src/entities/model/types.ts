import { UserRdo } from '@/entities/session/model/types'

export type CommentDto = {
	ideaId: string
	content: string
}

export type CommentRdo = {
	id: string
	content: string
	ideaId: string
	user: UserRdo
	createdAt: Date
	updatedAt: Date
}

export type CommentListRdo = {
	totalCount: number
	comments: CommentRdo[]
}
