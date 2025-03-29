import { UserRdo } from '@/entities/session/model'

export type ReactionType = 'None' | 'Like' | 'Dislike'

export enum IdeaStatus {
	New = 'New',
	InProgress = 'InProgress',
	Completed = 'Completed',
	Canceled = 'Canceled',
}

export enum LocationDepartment {
	Parnas = 'Parnas',
	Industrialny = 'Industrialny',
	KadSever = 'KadSever',
	Planernaya = 'Planernaya',
	Murmanskoe = 'Murmanskoe',
	Sofiyskaya = 'Sofiyskaya',
	Tallinskaya = 'Tallinskaya',
	Slavyanka = 'Slavyanka',
	Other = 'Other',
}

export interface User {
	id: number
	username: string
}

export enum SubDepartment {
	Warehouse = 'Warehouse',
	SalesFloor = 'SalesFloor',
	CommercialDepartment = 'CommercialDepartment',
	Other = 'Other',
}

export enum Priority {
	Low = 'Low',
	Medium = 'Medium',
	High = 'High',
}

export interface Idea {
	title: string
	description: string
	department: string
	subDepartment: string
	priority: string
}

export interface CreateIdea extends Idea {
	file?: File | Blob
}

export interface IdeaRdo extends Idea {
	id: string
	user: UserRdo
	status: string
	createdAt: string
	updatedAt: string
	favoriteIdeasCount: number
	dislikedIdeasCount: number
	isFavorite: boolean
	likesCount: number
	dislikesCount: number
	reactionType: ReactionType
	solution: string
}

export interface IdeaQuery {
	page: number
	limit: number
	sortDirection?: 'asc' | 'desc'
	department?: LocationDepartment
	sortOptions?: string
	status?: IdeaStatus
	priority?: Priority
	subDepartment?: SubDepartment
}

export interface CreateIdeaSolution {
	id: string
	status: IdeaStatus
	solution: string
}

export interface UpdateIdeaDto {
	id: string
	title: string
	description: string
}
