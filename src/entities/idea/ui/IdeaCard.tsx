import styles from './IdeaCard.module.scss'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import { Chip, Stack } from '@mui/material'
import { IdeaRdo } from '../model'

interface Props {
	idea: IdeaRdo
}

export function IdeaCard({ idea }: Props) {
	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<a>
					<svg viewBox='0 0 24 24' width={20} height={20} stroke={'#ffba4e'}>
						<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z' />
					</svg>
				</a>
			</div>
			<div className={styles.body}>
				<h2 className={styles.title}>{idea.title}</h2>
				<p className={styles.text}>{idea.description}</p>

				<Stack direction='column' spacing={1}>
					<Chip
						size='small'
						label='Статус: Новая'
						color='primary'
						sx={{
							color: '#FF9100',
							borderRadius: '6px',
							background: 'transparent',
							border: '1px solid #eeeeee',
						}}
					/>
					<Chip
						size='small'
						label='Приоритет: Средний'
						color='success'
						sx={{
							color: '#FF9100',
							borderRadius: '6px',
							background: 'transparent',
							border: '1px solid #eeeeee',
						}}
					/>
					<Chip
						size='small'
						label='Категория: Склад'
						color='success'
						sx={{
							color: '#FF9100',
							borderRadius: '6px',
							background: 'transparent',
							border: '1px solid #eeeeee',
						}}
					/>
				</Stack>
			</div>

			<div className={styles.footer}>
				<ThumbUpIcon fontSize='small' />
				<ThumbDownIcon fontSize='small' />
			</div>
		</div>
	)
}
