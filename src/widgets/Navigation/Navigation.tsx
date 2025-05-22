import styles from './styles.module.scss'
import { dropToken } from '@/entities/session/lib'
import { AuthorizationStatus, clearSessionData } from '@/entities/session/model'
import { useAppSelector, useAppDispatch } from '@/shared'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function Navigation() {
	const isAuth = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized === AuthorizationStatus.Auth
	)
	const router = useRouter()
	const dispatch = useAppDispatch()

	const logout = () => {
		dispatch(clearSessionData())
		dropToken()
	}

	return (
		<nav className='nav'>
			<ul className={styles.navList}>
				{isAuth ? (
					<>
						<NavLink
							title='Главная'
							href='/'
							active={router.pathname === '/'}
						/>
						<NavLink
							title='Список идей'
							href='/dashboard'
							active={router.pathname === '/dashboard'}
						/>

						<NavLink onPress={logout} title='Выйти' href='/' outlined />
					</>
				) : (
					<NavLink title='Войти' href='signIn' outlined />
				)}
			</ul>
		</nav>
	)
}

interface Props {
	title: string
	href: string
	outlined?: boolean
	onPress?: () => void
	active?: boolean
}

function NavLink({ title, href, outlined, onPress, active }: Props) {
	const isActive = outlined && 'outlined'

	return (
		<li className={styles.navItem} onClick={onPress}>
			<Link
				className={`${styles.navLink} ${isActive} ${
					active ? styles.active : undefined
				}`}
				href={href}
			>
				{title}
			</Link>
		</li>
	)
}
