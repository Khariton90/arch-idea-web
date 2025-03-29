import { LayoutBase } from '@/app'
import { BaseIdeasList } from '@/widgets/BaseIdeasList'
import { Pagination } from '@mui/material'

export default function Login() {
	return (
		<LayoutBase>
			<main className='main'>
				<div className='container'>
					<BaseIdeasList />
					<Pagination
						className='pagination'
						count={10}
						variant='outlined'
						shape='rounded'
					/>
				</div>
			</main>
		</LayoutBase>
	)
}
