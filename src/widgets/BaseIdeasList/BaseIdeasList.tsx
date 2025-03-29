import { useFindIdeasQuery } from '@/entities/idea/api'
import { IdeaCard } from '@/entities/idea/ui'
import { useAppSelector } from '@/shared'

export function BaseIdeasList() {
	const query = useAppSelector(({ ideaSlice }) => ideaSlice.currentFilter)
	const { data: ideas } = useFindIdeasQuery(query)

	return (
		<div className='baseIdeasList'>
			{ideas && ideas.map(idea => <IdeaCard idea={idea} key={idea.id} />)}
		</div>
	)
}
