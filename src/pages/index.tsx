import { useEffect, useRef } from 'react'
import { PhoneImage } from '@/shared/ui/PhoneImage'
import Link from 'next/link'
import { LayoutBase } from '@/app'

export default function Home() {
	return (
		<LayoutBase>
			<main className='main'>
				<div className='container'>
					<section className='preview'>
						<div className='left'>
							<h1 className='title'>
								<strong>ARCH IDEA </strong> <br /> На кончиках пальцев рождаются{' '}
								<strong>идеи</strong>
							</h1>
							<p className='subtitle'>
								Приложение для эффективного взаимодействия между отделами.
								Удобный инструмент для коллективной работы над идеями,
								обсуждения проектов и координации действий. Все идеи собраны в
								одном месте, что упрощает процесс принятия решений и
								способствует развитию инноваций в компании.
							</p>

							<button className='req__btn'>
								<Link href='Admin'>Добавить новую идею</Link>
							</button>
						</div>

						<div className='right'>
							<div className='phone-container'>
								<PhoneImage />
								<Video />
							</div>
						</div>
					</section>
				</div>
			</main>
		</LayoutBase>
	)
}

function Video(): React.ReactNode {
	const videoRef = useRef<null | HTMLVideoElement>(null)

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play()
		}
	}, [])

	return (
		<div className='video-container'>
			<video className='video' ref={videoRef} loop muted>
				<source src='video5420635489357029921.mp4' />
				Ваш браузер не поддерживает тег video.
			</video>
		</div>
	)
}
