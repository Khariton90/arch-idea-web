import { formatDate } from '@/shared/lib/formatDate'
import styles from './styles.module.scss'
import { useFindByIdeaIdQuery } from '../../api'
import { Button, TextareaAutosize } from '@mui/material'
import {
	useCreateCommentMutation,
	useFindCommentsQuery,
} from '@/entities/comment'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppSelector, UserInfo } from '@/shared'
import { UserRole } from '@/entities/session/model'
import { SolutionDialog } from '../SolutionDialog'
import { EmogiList } from '@/features'
import { Chips } from '../Chips/Chips'

interface Props {
	id: string
}

export function IdeaDetails({ id }: Props) {
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

	const selectEmojiForComment = (emoji: string) => {
		setComment(prev => prev + emoji)
	}

	if (!idea) {
		return <></>
	}

	return (
		<div className={styles.card}>
			<div className={styles.top}>
				<span>Опубликовано: {formatDate(idea.createdAt)}</span>

				<UserInfo
					status={idea.user.status}
					firstName={idea.user.firstName}
					lastName={idea.user.lastName}
				/>
			</div>

			<div className={styles.middle}>
				<Chips
					size='medium'
					status={idea.status}
					priority={idea.priority}
					subDepartment={idea.subDepartment}
				/>
			</div>

			<div className={styles.bottom}>
				<h2 className={styles.h2}>{idea.title}</h2>

				<p className={styles.p}>{idea.description}</p>
			</div>

			<div className={styles.solution}>
				<h2 className={styles.h2}>Статус:</h2>
				{!idea.solution ? (
					<h3 className={styles.commentTitle}>
						Пока тишина... Ждём вдохновения ⭐
					</h3>
				) : (
					<h3 className={styles.commentTitle}>{idea.solution}</h3>
				)}
				{isAdmin ? (
					<SolutionDialog idea={idea} id={idea.id} refetch={refetch} />
				) : null}
				{/* {isAdmin ? <CreateIdeaSolution id={idea.id} refetch={refetch} /> : null} */}
			</div>

			<div className={styles.comments}>
				<h3 className={styles.commentTitle}>
					Комментарии:
					{comments?.totalCount ? <span> {comments?.totalCount} </span> : null}
				</h3>

				<form className={styles.commentForm} onSubmit={handleSubmitMessage}>
					<TextareaAutosize
						className={styles.textArea}
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

				<EmogiList selectEmojiForComment={selectEmojiForComment} />
				<div className={styles.commentList}>
					{comments?.totalCount ? (
						comments.comments.map(comment => (
							<div className={styles.commentItem} key={comment.id}>
								<UserInfo
									status={comment.user.status}
									firstName={comment.user.firstName}
									lastName={comment.user.lastName}
								/>

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
