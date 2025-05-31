import { LayoutBase } from '@/app'
import { useRouter } from 'next/router'
import { IdeaDetails } from '@/entities/idea/ui'

export default function IdeaPage() {
	const router = useRouter()
	const { id } = router.query as { id: string }

	return (
		<LayoutBase>
			<main className='main'>
				<div className='container'>{id && <IdeaDetails id={id} />}</div>
			</main>
		</LayoutBase>
	)
}
