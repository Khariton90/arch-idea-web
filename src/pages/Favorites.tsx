import { LayoutBase } from '@/app'
import { IdeaCard } from '@/entities/idea/ui'
import { Pagination } from '@mui/material'

export default function Login() {
	return (
		<LayoutBase>
			<main className='main'>
				<div className='container'>
					<div className='baseIdeasList'>
						<IdeaCard />
					</div>
					<Pagination
						className='pagination'
						count={10}
						variant='outlined'
						shape='rounded'
					/>
					<Pagination count={11} defaultPage={6} boundaryCount={2} />
				</div>
			</main>
		</LayoutBase>
	)
}
