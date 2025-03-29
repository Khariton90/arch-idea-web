import { LayoutBase } from '@/app'
import { BaseIdeasList } from '@/widgets/BaseIdeasList'

export default function Admin() {
	return (
		<LayoutBase>
			<main className='main'>
				<div className='container'>
					<BaseIdeasList />
				</div>
			</main>
		</LayoutBase>
	)
}
