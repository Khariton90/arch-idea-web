import { formatDate } from '@/shared/lib/formatDate'
import styles from './IdeaCard.module.scss'
import { useFindByIdeaIdQuery } from '../api'
import { Stack, Chip, Button, TextareaAutosize } from '@mui/material'
import {
	useCreateCommentMutation,
	useFindCommentsQuery,
} from '@/entities/comment'
import { ChangeEvent, FormEvent, useState } from 'react'
import { mapUserStatus } from '@/entities/user/lib/mapUser'
import { CreateIdeaSolution } from './CreateIdeaSolution'
import { useAppSelector } from '@/shared'
import { UserRole } from '@/entities/session/model'

interface Props {
	id: string
}

const emojisUnicode = [
	'\u{1F600}', // 😀
	'\u{1F602}', // 😂
	'\u{1F642}', // 🙂
	'\u{1F621}', // 😡
	'\u{1F611}', // 😕
	'\u{1F620}', // 😤
	'\u{1F44D}', // 👍
	'\u{1F44E}', // 👎
	'\u{1F64F}', // 🙏
	'\u{1F64C}', // 🙌
	'\u{1F4A9}', // 💩
	'\u{1F44B}', // 👋
	'💡',
]

export function IdeaBaseCard({ id }: Props) {
	const [query, setQuery] = useState({
		page: 1,
		limit: 20,
		sortDirection: 'desc' as 'asc' | 'desc',
	})

	const [comment, setComment] = useState(` `)

	const { data: idea, refetch } = useFindByIdeaIdQuery(id)
	const { data: comments } = useFindCommentsQuery({ ideaId: id, query })
	const [createComment] = useCreateCommentMutation()

	const isAdmin = useAppSelector(
		({ userSlice }) => userSlice.role !== UserRole.User
	)

	const handleChangeComment = (evt: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(() => evt.target.value)
	}

	const handleSubmitMessage = async (evt: FormEvent) => {
		evt.preventDefault()
		const content = comment.trim()

		if (!content) {
			return
		}

		await createComment({ ideaId: id, content }).then(response => {
			if (!response.error) {
				setComment(() => '')
			}
		})
	}

	const addEmoji = (emoji: string) => {
		setComment(prev => prev + emoji)
	}

	if (!idea) {
		return <></>
	}

	return (
		<div className={styles.baseCard}>
			<div className={styles.top}>
				<span>Опубликовано: {formatDate(idea.createdAt)}</span>

				<Stack direction='row' spacing={2}>
					<Chip
						size='small'
						label={`Статус: ${idea.status}`}
						color='info'
						sx={{ borderRadius: '4px' }}
					/>
				</Stack>
			</div>

			<div className={styles.middle}>
				<div className={styles.user}>
					<div className={styles.logo}>A</div>
					<span>{mapUserStatus(idea.user.status)}</span>
					<span>
						{idea.user.firstName} {idea.user.lastName}
					</span>
				</div>

				<Stack spacing={1} direction={'row'} className={styles.chips}>
					<Chip
						size='small'
						label={`Категория: ${idea.subDepartment}`}
						color='info'
						sx={{ borderRadius: '4px' }}
					/>
					<Chip
						size='small'
						label={`Приоритет: ${idea.priority}`}
						color='info'
						sx={{ borderRadius: '4px' }}
					/>
				</Stack>
			</div>

			<div className={styles.bottom}>
				<h2 className={styles.h2}>{idea.title}</h2>

				<p className={styles.p}>{idea.description}</p>
			</div>
			{/* 
			<div className={styles.favorite} aria-label='Плашка подписки на канал'>
				<div className='content--subscribe-banner__text-1o content--subscribe-banner__long-1H'>
					<div>Добавьте публикацию в избранное</div>
					<div>чтобы не пропустить решение и обсуждения</div>
				</div>

				<Button variant='contained'>В избранное</Button>
			</div> */}

			<div className={styles.solution}>
				<h2 className={styles.h2}>Решение:</h2>
				{!idea.solution ? (
					<h3 className={styles.commentTitle}>
						Пока тишина... Ждём вдохновения ⭐
					</h3>
				) : (
					<h3 className={styles.commentTitle}>{idea.solution}</h3>
				)}
				{isAdmin ? <CreateIdeaSolution id={idea.id} refetch={refetch} /> : null}
			</div>

			<div className={styles.comments}>
				<h3 className={styles.commentTitle}>
					Комментарии:
					{comments?.totalCount ? <span> {comments?.totalCount} </span> : null}
				</h3>

				<form className={styles.commentForm} onSubmit={handleSubmitMessage}>
					<TextareaAutosize
						className={styles.title}
						placeholder='Комментарий'
						name='comment'
						value={comment}
						onChange={handleChangeComment}
					/>
					<Button
						variant='contained'
						type='submit'
						sx={{ padding: '12px 20px' }}
					>
						Отправить
					</Button>
				</form>
				<div className={styles.emogi}>
					{emojisUnicode.map(emoji => (
						<a
							href='#'
							key={emoji}
							onClick={evt => {
								evt.preventDefault()
								addEmoji(emoji)
							}}
						>
							{emoji}
						</a>
					))}
				</div>
				<div className={styles.commentList}>
					{comments?.totalCount ? (
						comments.comments.map(comment => (
							<div className={styles.commentItem} key={comment.id}>
								<div className={styles.user}>
									<div className={styles.logo}>
										{comment.user.firstName.slice(0, 1)}
									</div>
									<span>{mapUserStatus(comment.user.status)}</span>
									<span>
										{comment.user.firstName} {comment.user.lastName}
									</span>
								</div>

								<div className={styles.commentText}>{comment.content}</div>
								<span className={styles.commentDate}>
									{formatDate(comment.createdAt)}
								</span>
							</div>
						))
					) : (
						<h3 className={styles.commentTitle}>Комментариев нет</h3>
					)}

					{comments?.totalCount &&
					comments?.totalCount > query.limit * query.page ? (
						<Button
							type='button'
							variant='contained'
							sx={{ margin: '20px auto' }}
							onClick={() =>
								setQuery(prev => ({ ...prev, limit: prev.limit + 10 }))
							}
						>
							Загрузить еще
						</Button>
					) : null}
				</div>
			</div>
		</div>
	)
}
