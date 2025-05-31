import { mapUserStatus } from '@/entities/user/lib/mapUser'
import styles from './styles.module.scss'

interface Props {
	status: string
	firstName: string
	lastName: string
}

export function UserInfo({ status, firstName, lastName }: Props) {
	return (
		<div className={styles.user}>
			<div className={styles.logo}>A</div>
			<span>{mapUserStatus(status)}</span>
			<span>
				{firstName} {lastName}
			</span>
		</div>
	)
}
