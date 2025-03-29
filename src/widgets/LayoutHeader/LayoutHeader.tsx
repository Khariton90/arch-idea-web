import Image from 'next/image'
import styles from './LayoutHeader.module.scss'
import image from '../../../public/mini-logo.png'
import Link from 'next/link'

export function LayoutHeader() {
	return (
		<header className='header'>
			<div className='container'>
				<div className={styles.wrapper}>
					<Link className='logo' href='/'>
						<Image src={image} alt='Логотип' />
					</Link>

					<nav className='nav'>
						<ul className={styles.navList}>
							<li className={styles.navItem}>
								<a className={styles.navLink} href=''>
									Главная
								</a>
							</li>
							<li className={styles.navItem}>
								<a className={styles.navLink} href=''>
									Мои идеи
								</a>
							</li>
							<li className={styles.navItem}>
								<a className={styles.navLink} href=''>
									Избранное
								</a>
							</li>
							<li className={styles.navItem}>
								<Link className={styles.navLink} href={'SignIn'}>
									Войти
								</Link>
							</li>
							<li className={styles.navItem}>
								<a className={`${styles.navLink} outlined`} href=''>
									Зарегистрироваться
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}
