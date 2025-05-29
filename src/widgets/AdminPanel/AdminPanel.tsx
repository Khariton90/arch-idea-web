import { PieChart } from '@mui/x-charts'
import styles from './styles.module.scss'
import {
	useFetchUsersQuery,
	useFindDepartmentTotalCountQuery,
	useGetSessionsQuery,
} from '@/entities/user/api'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import {
	useFindAllIdeaCountQuery,
	useGetIdeaStatisticQuery,
} from '@/entities/idea/api'
import { useFindAllCountQuery } from '@/entities/comment'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AdUnitsIcon from '@mui/icons-material/AdUnits'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { mapIdeaStatus } from '@/entities/idea/lib'
import { useAppSelector } from '@/shared'
import { useRouter } from 'next/router'
import { UserRole } from '@/entities/user'
import { UsersDataset } from './UsersDataset'

export function Board() {
	const { data: sessions } = useGetSessionsQuery()
	const { data: users } = useFetchUsersQuery({ limit: 1000, page: 1 })
	const { data: statistic } = useGetIdeaStatisticQuery()
	const { data: commentCount } = useFindAllCountQuery()
	const { data: departmentCount } = useFindDepartmentTotalCountQuery()
	const { data: ideaCount } = useFindAllIdeaCountQuery()

	const startOfCurrentMonth = dayjs().startOf('month')
	const endOfCurrentMonth = dayjs().endOf('month')

	const filteredData = useMemo(() => {
		return sessions?.filter(item => {
			if (sessions) {
				const itemDate = dayjs(item.createdAt)
				return (
					itemDate.isSame(startOfCurrentMonth, 'month') &&
					itemDate.isBefore(endOfCurrentMonth.add(1, 'day'))
				)
			} else {
				return []
			}
		})
	}, [endOfCurrentMonth, sessions, startOfCurrentMonth])

	return (
		<main className='main'>
			<div className='container'>
				<section className={styles.content}>
					<div className={styles.tabItem}>
						<div className={styles.tabIcon}>
							<TipsAndUpdatesIcon />
						</div>
						<div className={styles.tabDescription}>
							<h6 className={styles.tabTitle}>Идеи</h6>
							<h6 className={styles.tabExtraBold}>{ideaCount}</h6>
						</div>
					</div>
					<div className={styles.tabItem}>
						<div className={styles.tabIcon}>
							<PeopleAltIcon />
						</div>
						<div className={styles.tabDescription}>
							<h6 className={styles.tabTitle}>Пользователи</h6>
							<h6 className={styles.tabExtraBold}>{users?.count}</h6>
						</div>
					</div>
					<div className={styles.tabItem}>
						<div className={styles.tabIcon}>
							<AdUnitsIcon />
						</div>
						<div className={styles.tabDescription}>
							<h6 className={styles.tabTitle}>Комнаты</h6>
							<h6 className={styles.tabExtraBold}>{departmentCount}</h6>
						</div>
					</div>
					<div className={styles.tabItem}>
						<div className={styles.tabIcon}>
							<ChatBubbleOutlineIcon />
						</div>
						<div className={styles.tabDescription}>
							<h6 className={styles.tabTitle}>Комментарии</h6>
							<h6 className={styles.tabExtraBold}>{commentCount}</h6>
						</div>
					</div>
					<UsersDataset />
					<div className={`${styles.sessionsDiagram} adminCard`}>
						<h4 className={styles.cardTitle}>Сессий за текущий месяц</h4>
						<PieChart
							colors={['#ffba4e', 'red']}
							series={[
								{
									data: [
										{
											id: 0,
											value: filteredData?.length || 0,
											label: 'Активные пользователи',
										},
										{
											id: 1,
											value: users?.count || 0,
											label: 'Количество пользователей',
										},
									],
								},
							]}
							width={200}
							height={200}
						/>
					</div>
					<div className={`${styles.ideaStatus} adminCard`}>
						<h4 className={styles.cardTitle}>Статусы по идеям</h4>

						<PieChart
							colors={['green', '#ffba4e', 'red', 'blue']}
							series={[
								{
									data: statistic
										? Object.keys(statistic).map((el, index) => ({
												id: index,
												value: statistic[el],
												label: mapIdeaStatus(el),
										  }))
										: [],
								},
							]}
							width={200}
							height={200}
						/>
					</div>
				</section>
			</div>
		</main>
	)
}

export function AdminPanel() {
	const role = useAppSelector(({ userSlice }) => userSlice.role)
	const router = useRouter()

	if (role === UserRole.User) {
		return router.push('/')
	}

	return <Board />
}
