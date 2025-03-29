import Image from 'next/image'
import styles from './LayoutHeader.module.scss'
import image from '../../../public/mini-logo.png'
import Link from 'next/link'

interface Props {
	navigationSlot: React.ReactNode
}

export function LayoutHeader({ navigationSlot }: Props) {
	return (
		<header className='header'>
			<div className='container'>
				<div className={styles.wrapper}>
					<Link className='logo' href='/'>
						<Image src={image} alt='Логотип' />
					</Link>
					{navigationSlot}
				</div>
			</div>
		</header>
	)
}
