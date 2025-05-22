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

	console.log(totalCount)

	return (
		<>
			<div className='baseIdeasList'>
				{ideas && ideas.map(idea => <IdeaCard idea={idea} key={idea.id} />)}
			</div>

			{totalCount && (
				<Pagination
					className='pagination'
					count={Math.floor(totalCount / 6)}
					variant='outlined'
					shape='rounded'
					onChange={handleChange}
				/>
			)}
		</>
	)
}
