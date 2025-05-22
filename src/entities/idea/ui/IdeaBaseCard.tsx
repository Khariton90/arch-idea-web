import { formatDate } from '@/shared/lib/formatDate'
import styles from './IdeaCard.module.scss'
import { useFindByIdeaIdQuery } from '../api'

interface Props {
	id: string
}

export function IdeaBaseCard({ id }: Props) {
	const { data: idea } = useFindByIdeaIdQuery(id)

	if (!idea) {
		return <></>
	}

	return (
		<div className={styles.baseCard}>
			<div className={styles.infoBlock}>
				<span>Дата публикации:</span>
				<span>{formatDate(idea.createdAt)}</span>
			</div>

			<div className={styles.infoBlock}>
				<span>Статус:</span>
				<span>{idea.status}</span>
			</div>

			<div className={styles.infoBlock}>
				<span>Категория:</span>
				<span>{idea.subDepartment}</span>
			</div>

			<div className={styles.infoBlock}>
				<span>Приоритет:</span>
				<span className='priority-highlight'>{idea.priority}</span>
			</div>

			<div className={styles.infoBlock}>
				<span>Автор:</span>
				<span>
					{idea.user.firstName} {idea.user.lastName}
				</span>
			</div>

			<h2 className={styles.h2}>{idea.title}</h2>

			<p className={styles.p}>{idea.description}</p>
		</div>
	)
}
