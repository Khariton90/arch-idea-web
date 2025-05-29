import { LocationDepartment } from '@/entities/idea'

export interface UpdateUserDto {
	firstName: string
	lastName: string
	login: string
	password: string
}

export enum UserStatus {
	NotVerified = 'NotVerified',
	Spec = 'Spec',
	Master = 'Master',
	Pro = 'Pro',
	Expert = 'Expert',
	SuperExpert = 'SuperExpert',
}

export enum UserRole {
	Admin = 'Admin',
	Manager = 'Manager',
	User = 'User',
}

export interface UserQuery {
	limit: number
	page: number
	sortDirection?: string
	department?: LocationDepartment
}

export interface UserSessions {
	id: string
	createdAt: Date
}

export interface StatDataset {
	users: number
	comments: number
	ideas: number
	month: string
}
