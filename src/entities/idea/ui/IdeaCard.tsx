import styles from './IdeaCard.module.scss'
import { IdeaRdo } from '../model'
import { formatDate } from '@/shared/lib/formatDate'
import Link from 'next/link'
import { UserInfo } from '@/shared'
import { Chips } from './Chips/Chips'

interface Props {
	idea: IdeaRdo
}

export function IdeaCard({ idea }: Props) {
	console.log(idea.priority)

	return (
		<div className={styles.card}>
			<Link href={`/dashboard/${idea.id}`} className={styles.cardLink}></Link>
			<div className={styles.header}>
				<UserInfo
					status={idea.user.status}
					firstName={idea.user.firstName}
					lastName={idea.user.lastName}
				/>
			</div>
			<div className={styles.body}>
				<h2 className={styles.title}>{idea.title}</h2>
				<p className={styles.text}>{idea.description}</p>

				<Chips
					status={idea.status}
					priority={idea.priority}
					subDepartment={idea.subDepartment}
				/>
			</div>

			<div className={styles.footer}>
				<span className={styles.date}> {formatDate(idea.createdAt)}</span>
			</div>
		</div>
	)
}
