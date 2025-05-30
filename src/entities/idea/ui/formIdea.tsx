import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from '@mui/material'
import styles from './IdeaCard.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Idea } from '../model'
import { useCreateIdeaMutation } from '../api'
import Router from 'next/router'

export function FormIdea() {
	const [createIdea] = useCreateIdeaMutation()

	const [form, setForm] = useState<Idea>({
		title: '',
		description: '',
		department: 'Parnas',
		subDepartment: '',
		priority: '',
	})

	const handleChangeSelect = (event: SelectChangeEvent) => {
		setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
	}

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
	}

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault()

		try {
			await createIdea(form).then(res => {
				if (!res.error) {
					Router.push('dashboard')
				}
			})
		} catch {
			console.log('error')
		}
	}

	const isNotValid = Object.values(form).some(item => !item)

	return (
		<div className={styles.wrapper}>
			<form
				className={`${styles.form}`}
				autoComplete='off'
				onSubmit={handleSubmit}
			>
				<h2 className={styles.top}>Поделитесь своими идеями!</h2>
				<p className={styles.sub}>
					Ваш вклад важен — вместе мы сделаем сервис лучше!
				</p>

				<TextField
					name='title'
					onChange={handleChange}
					type='text'
					placeholder='Заголовок'
					required
					fullWidth
					autoComplete='off'
					label='Заголовок'
					className={styles.inputTitle}
				/>

				<FormControl fullWidth>
					<InputLabel htmlFor='category' required>
						Категория
					</InputLabel>
					<Select
						labelId='category'
						id='category'
						label='Категория'
						name='subDepartment'
						required
						onChange={handleChangeSelect}
					>
						<MenuItem value={'Warehouse'}>Склад</MenuItem>
						<MenuItem value={'SalesFloor'}>Торговый зал</MenuItem>
						<MenuItem value={'CommercialDepartment'}>
							Коммерческий отдел
						</MenuItem>
						<MenuItem value={'Other'}>Другое</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel htmlFor='priority-select' required>
						Приоритет
					</InputLabel>
					<Select
						labelId='priority-select'
						id='priority-select'
						label='Приоритет'
						name='priority'
						required
						onChange={handleChangeSelect}
					>
						<MenuItem value={'Low'}>Низкий</MenuItem>
						<MenuItem value={'Medium'}>Средний</MenuItem>
						<MenuItem value={'High'}>Высокий</MenuItem>
					</Select>
				</FormControl>

				<textarea
					name='description'
					placeholder='Описание'
					id='desc'
					className={styles.description}
					onChange={handleChange}
				></textarea>

				{isNotValid ? (
					<Button
						variant='contained'
						sx={{
							background: '#ffba4e',
							color: '#000',
							opacity: 0.5,
							padding: '16px',
						}}
					>
						Создать идею
					</Button>
				) : (
					<Button
						variant='contained'
						type='submit'
						sx={{
							background: '#ffba4e',
							color: '#000',

							padding: '16px',
						}}
					>
						Создать идею
					</Button>
				)}
			</form>
		</div>
	)
}
