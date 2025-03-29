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

export type SessionDto = {
	accessToken: string
}

export type QrCodeDto = {
	sub: string
	modelName: string
}

export type AuthRdo = {
	userId: string
	access_token: string
	refresh_token: string
}

export type UserDto = {
	id: string
	firstName: string
	lastName: string
	status: UserStatus
	department: string
	favoriteIdeasCount: number
	myIdeasCount: number
	role: UserRole
	login: string
}

export interface UserListDto {
	users: UserDto[]
	count: number
}

export type UserRdo = {
	id: string
	status: string
	firstName: string
	lastName: string
}

export type UserOptionsDto = {
	id: string
	role?: UserRole
	status?: UserStatus
}

export enum AuthorizationStatus {
	Auth = 'AUTH',
	NoAuth = 'NO_AUTH',
	Unknown = 'UNKNOWN',
}

export type SignInForm = {
	login: string
	password: string
	modelName?: string
}
