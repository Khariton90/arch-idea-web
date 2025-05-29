import styles from './IdeaCard.module.scss'
import { Chip, Stack } from '@mui/material'
import { IdeaRdo } from '../model'
import { formatDate } from '@/shared/lib/formatDate'
import Link from 'next/link'
import { mapUserStatus } from '@/entities/user/lib/mapUser'

interface Props {
	idea: IdeaRdo
}

export function IdeaCard({ idea }: Props) {
	return (
		<div className={styles.card}>
			<Link href={`/dashboard/${idea.id}`} className={styles.cardLink}></Link>
			<div className={styles.header}>
				<div className={styles.user}>
					<div className={styles.logo}> {idea.user.firstName.slice(0, 1)} </div>
					<span>{mapUserStatus(idea.user.status)}</span>
					<span>
						{idea.user.firstName} {idea.user.lastName}
					</span>
				</div>
			</div>
			<div className={styles.body}>
				<h2 className={styles.title}>{idea.title}</h2>
				<p className={styles.text}>{idea.description}</p>

				<Stack direction='row' spacing={1} className={styles.chips}>
					<Chip
						size='small'
						sx={{ fontSize: '11px', borderRadius: '4px' }}
						label={`Статус: ${idea.status}`}
						color='info'
					/>
					<Chip
						size='small'
						label={`Приоритет: ${idea.priority}`}
						color='info'
						sx={{ fontSize: '11px', borderRadius: '4px' }}
					/>
					<Chip
						size='small'
						label={`Категория: ${idea.subDepartment}`}
						color='info'
						sx={{ fontSize: '11px', borderRadius: '4px' }}
					/>
				</Stack>
			</div>

			<div className={styles.footer}>
				<span className={styles.date}> {formatDate(idea.createdAt)}</span>
			</div>
		</div>
	)
}
