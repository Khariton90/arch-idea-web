import { PhoneImage, useAppSelector } from '@/shared'
import { PhoneVideo } from '../PhoneVideo'
import Link from 'next/link'
import { AuthorizationStatus } from '@/entities/session/model'
import { Button } from '@mui/material'
import styles from './styles.module.scss'
import { useGetAccountQuery } from '@/entities/user/api'

export function Preview() {
	const isAuth = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized === AuthorizationStatus.Auth
	)

	return (
		<main className='main'>
			<div className={`container ${styles.container}`}>
				<section className={styles.preview}>
					<div className='left'>
						<h1 className='title'>
							<strong>ARCH IDEA </strong> <br /> На кончиках пальцев рождаются{' '}
							<strong>идеи</strong>
						</h1>
						<p className='subtitle'>
							Мобильное приложение для эффективного взаимодействия. Удобный
							инструмент для коллективной работы над идеями, обсуждения проектов
							и координации действий. Все идеи собраны в одном месте, что
							упрощает процесс принятия решений и способствует развитию
							инноваций в компании.
						</p>

						{isAuth ? (
							<AuthBlock />
						) : (
							<Link href={'signUp'}>
								<Button
									sx={{ padding: '16px 80px' }}
									size='large'
									variant='contained'
									color={'primary'}
									type='button'
								>
									Зарегистрироваться
								</Button>
							</Link>
						)}
					</div>

					<div className={`right ${styles.right}`}>
						<div className='phone-container'>
							<PhoneImage />
							<PhoneVideo />
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}

function AuthBlock() {
	useGetAccountQuery()
	return (
		<Link href='newIdea'>
			<Button
				sx={{ padding: '16px 80px' }}
				size='large'
				variant='contained'
				color={'primary'}
			>
				Добавить новую идею
			</Button>
		</Link>
	)
}
