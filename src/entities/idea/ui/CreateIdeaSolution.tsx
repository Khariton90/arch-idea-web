import {
	TextareaAutosize,
	Button,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material'
import styles from './IdeaCard.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useCreateIdeaSolutionMutation } from '../api'
import { IdeaStatus } from '../model'

interface Props {
	id: string
	refetch: () => void
}

export function CreateIdeaSolution({ id, refetch }: Props) {
	const [value, setValue] = useState('')
	const [status, setStatus] = useState(IdeaStatus.New)
	const [createIdeaSolution] = useCreateIdeaSolutionMutation()

	const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(() => evt.target.value)
	}

	const handleChangeStatus = (evt: ChangeEvent<HTMLInputElement>) => {
		setStatus(() => evt.target.value as IdeaStatus)
	}

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault()
		await createIdeaSolution({
			id,
			status,
			solution: value,
		}).then(data => {
			if (!data.error) {
				setValue(() => '')
				refetch()
			}
		})
	}

	return (
		<div className={styles.solution}>
			<form className={styles.commentForm} onSubmit={handleSubmit}>
				<TextareaAutosize
					className={styles.title}
					placeholder='Решение'
					name='comment'
					value={value}
					onChange={handleChange}
				/>
				<FormControl
					sx={{
						gridColumn: '1/3',
						order: 2,
						background: '#333',
						padding: '10px',
						borderRadius: '6px',
					}}
				>
					<RadioGroup
						row
						aria-labelledby='demo-form-control-label-placement'
						name='position'
						defaultValue='top'
					>
						<FormControlLabel
							value={IdeaStatus.New}
							control={<Radio onChange={handleChangeStatus} />}
							label='Новая'
							labelPlacement='bottom'
						/>

						<FormControlLabel
							value={IdeaStatus.InProgress}
							control={<Radio onChange={handleChangeStatus} />}
							label='В процессе'
							labelPlacement='bottom'
						/>

						<FormControlLabel
							value={IdeaStatus.Completed}
							control={<Radio onChange={handleChangeStatus} />}
							label='Завершена'
							labelPlacement='bottom'
						/>

						<FormControlLabel
							value={IdeaStatus.Canceled}
							control={<Radio onChange={handleChangeStatus} />}
							label='Отменена'
							labelPlacement='bottom'
						/>
					</RadioGroup>
				</FormControl>

				<Button variant='contained' type='submit' sx={{ padding: '12px 20px' }}>
					Отправить
				</Button>
			</form>
		</div>
	)
}
