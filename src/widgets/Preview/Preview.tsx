import { PhoneImage, useAppSelector } from '@/shared'
import { PhoneVideo } from '../PhoneVideo'
import Link from 'next/link'
import { AuthorizationStatus } from '@/entities/session/model'

export function Preview() {
	const isAuth = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized === AuthorizationStatus.Auth
	)

	return (
		<main className='main'>
			<div className='container'>
				<section className='preview'>
					<div className='left'>
						<h1 className='title'>
							<strong>ARCH IDEA </strong> <br /> На кончиках пальцев рождаются{' '}
							<strong>идеи</strong>
						</h1>
						<p className='subtitle'>
							Приложение для эффективного взаимодействия между отделами. Удобный
							инструмент для коллективной работы над идеями, обсуждения проектов
							и координации действий. Все идеи собраны в одном месте, что
							упрощает процесс принятия решений и способствует развитию
							инноваций в компании.
						</p>

						{isAuth ? (
							<button className='req__btn'>
								<Link href='Admin'>Перейти к идеям</Link>
							</button>
						) : (
							<button className='req__btn'>
								<Link href='SignIn'>Войти</Link>
							</button>
						)}
					</div>

					<div className='right'>
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
