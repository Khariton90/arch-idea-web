import {
	IdeaRdo,
	IdeaStatus,
	LocationDepartment,
	Priority,
	SubDepartment,
} from '../model/types'

export const mappingSubDepartment: Record<SubDepartment, string> = {
	[SubDepartment.Warehouse]: 'Склад',
	[SubDepartment.SalesFloor]: 'Торговый зал',
	[SubDepartment.CommercialDepartment]: 'Коммерческий отдел',
	[SubDepartment.Other]: 'Другое',
}

export const mappingStatus: Record<IdeaStatus, string> = {
	[IdeaStatus.New]: 'Новая',
	[IdeaStatus.InProgress]: 'В работе',
	[IdeaStatus.Completed]: 'Внедрена',
	[IdeaStatus.Canceled]: 'Отменена',
}

export const mappingPriority: Record<Priority, string> = {
	[Priority.Low]: 'Низкий',
	[Priority.Medium]: 'Средний',
	[Priority.High]: 'Высокий',
}

export const mappingDepartment: Record<LocationDepartment, string> = {
	[LocationDepartment.Other]: 'Другое',
	[LocationDepartment.Parnas]: 'Парнас',
	[LocationDepartment.KadSever]: 'Кад Север',
	[LocationDepartment.Planernaya]: 'Планерная',
	[LocationDepartment.Industrialny]: 'Индустриальный',
	[LocationDepartment.Murmanskoe]: 'Мурманское ш.',
	[LocationDepartment.Sofiyskaya]: 'Софийская',
	[LocationDepartment.Tallinskaya]: 'Таллинская',
	[LocationDepartment.Slavyanka]: 'Славянка',
}

export function mapIdea(idea: IdeaRdo): IdeaRdo {
	return {
		...idea,
		subDepartment: mappingSubDepartment[idea.subDepartment as SubDepartment],
		status: mappingStatus[idea.status as IdeaStatus],
		priority: mappingPriority[idea.priority as Priority],
		department: mappingDepartment[idea.department as LocationDepartment],
	}
}

export function mapIdeaStatus(status: string) {
	return mappingStatus[status as IdeaStatus]
}
