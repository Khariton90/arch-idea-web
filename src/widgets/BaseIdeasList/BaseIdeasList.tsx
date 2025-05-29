import { useFindIdeasQuery } from '@/entities/idea/api'
import { changePage, setTotalCount } from '@/entities/idea/model/slice'
import { IdeaCard } from '@/entities/idea/ui'
import { useFindTotalCountQuery } from '@/entities/user/api'
import { useAppDispatch, useAppSelector } from '@/shared'
import { Pagination } from '@mui/material'
import { useEffect } from 'react'

export function BaseIdeasList() {
	const query = useAppSelector(({ ideaSlice }) => ideaSlice.currentFilter)
	const { data: ideas } = useFindIdeasQuery(query)
	const { data: totalCount } = useFindTotalCountQuery()

	const dispatch = useAppDispatch()

	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		dispatch(changePage(value))
	}

	useEffect(() => {
		if (totalCount) {
			dispatch(setTotalCount(totalCount))
		}
	}, [dispatch, totalCount])

	if (!totalCount) {
		return <></>
	}

	const pageCount = Math.ceil(totalCount / 6)

	return (
		<main className='main'>
			<div className='container'>
				<div className='baseIdeasList'>
					{ideas && ideas.map(idea => <IdeaCard idea={idea} key={idea.id} />)}
				</div>

				{totalCount && (
					<Pagination
						className='pagination'
						count={pageCount}
						variant='outlined'
						shape='rounded'
						sx={{
							background:
								'linear-gradient(135deg, #000 0%, #282828 50%, #000 100%)',
							'& .MuiPaginationItem-outlined': {
								color: '#fff',
								bgcolor: '#000',
								borderColor: '#555',
							},
							'.css-ptck8z-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected':
								{
									color: '#ffba4e',
									border: '1px solid #ffba4e',
								},
						}}
						page={query.page}
						onChange={handleChange}
					/>
				)}
			</div>
		</main>
	)
}
