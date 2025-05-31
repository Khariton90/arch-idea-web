import Button from '@mui/material/Button'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextareaAutosize,
} from '@mui/material'
import { IdeaRdo, IdeaStatus } from '../model'
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './IdeaCard.module.scss'
import { useCreateIdeaSolutionMutation } from '../api'

interface Props {
	idea: IdeaRdo
	id: string
	refetch: () => void
}

export function SolutionDialog({ id, refetch }: Props) {
	const [open, setOpen] = useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

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
				handleClose()
			}
		})
	}

	return (
		<>
			<Button
				variant='contained'
				sx={{ maxWidth: 200, alignSelf: 'end' }}
				onClick={handleClickOpen}
			>
				Изменить статус
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				slotProps={{
					paper: {
						component: 'form',
						onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
							event.preventDefault()
							const formData = new FormData(event.currentTarget)
							const formJson = Object.fromEntries((formData as any).entries())
							const email = formJson.email
							console.log(email)
							handleClose()
						},
					},
				}}
			>
				<DialogTitle>Решение</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Оставьте решение для дальнейшей работы над инициативой.
					</DialogContentText>
					<form className={styles.commentForm}>
						<TextareaAutosize
							minRows={8}
							className={styles.review}
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
					</form>
				</DialogContent>
				<DialogActions>
					<Button type='submit' onClick={handleClose}>
						Отмена
					</Button>
					<Button type='submit' onClick={handleSubmit}>
						Отправить
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
