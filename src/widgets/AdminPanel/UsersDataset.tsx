import { BarChart } from '@mui/x-charts'
import styles from './styles.module.scss'
import { useGetStatisticQuery } from '@/entities/user/api'
import dayjs from 'dayjs'

export function valueFormatter(value: number | null) {
	return `${value}`
}

export function UsersDataset() {
	const { data: dataset, isError } = useGetStatisticQuery()

	const chartSetting = {
		yAxis: [
			{
				label: 'кол-во',
				width: 60,
			},
		],
		height: 300,
	}

	if (isError) {
		return (
			<div className={styles.usersDataset}>
				<h2>Ошибка...Попробуйте позже...</h2>
			</div>
		)
	}

	return (
		<div className={styles.usersDataset}>
			{dataset ? (
				<BarChart
					colors={['#8b2836', '#ffba4e', 'green']}
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					dataset={dataset as any}
					xAxis={[{ dataKey: 'month', label: dayjs().format('YYYY') }]}
					series={[
						{ dataKey: 'users', label: 'Новые пользователи', valueFormatter },
						{ dataKey: 'ideas', label: 'Новые идеи', valueFormatter },
						{ dataKey: 'comments', label: 'Новые коментарии', valueFormatter },
					]}
					{...chartSetting}
				/>
			) : null}
		</div>
	)
}
