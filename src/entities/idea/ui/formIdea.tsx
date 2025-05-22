import { LayoutLogo } from '@/shared'
import {
	Button,
	FormControl,
	Input,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
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

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setForm(prev => ({ ...prev, [event.target.name]: event.target.value }))
	}

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault()

		try {
			await createIdea(form).then(res => {
				if (!res.error) {
					Router.push('Dashboard')
				}
			})
		} catch {
			console.log('error')
		}
	}

	const isNotValid = Object.values(form).some(item => !item)

	return (
		<form
			className={`form ${styles.form}`}
			autoComplete='off'
			onSubmit={handleSubmit}
		>
			<LayoutLogo />
			<Input
				type='text'
				placeholder='Заголовок'
				sx={{
					background: '#fff',
					padding: '10px',
				}}
				name='title'
				onChange={handleChange}
			/>
			<Input
				id='desc'
				fullWidth
				type='text'
				placeholder='Описание'
				name='description'
				sx={{
					background: '#fff',
					padding: '10px',
				}}
				onChange={handleChange}
			/>
			<FormControl fullWidth>
				<InputLabel htmlFor='category'>Категория</InputLabel>
				<Select
					labelId='category'
					id='category'
					label='Категория'
					name='subDepartment'
					sx={{
						background: '#fff',
					}}
					onChange={handleChangeSelect}
				>
					<MenuItem value={'Warehouse'}>Склад</MenuItem>
					<MenuItem value={'SalesFloor'}>Торговый зал</MenuItem>
					<MenuItem value={'CommercialDepartment'}>Коммерческий отдел</MenuItem>
					<MenuItem value={'Other'}>Другое</MenuItem>
				</Select>
			</FormControl>
			<FormControl fullWidth>
				<InputLabel htmlFor='priority-select'>Приоритет</InputLabel>
				<Select
					labelId='priority-select'
					id='priority-select'
					label='Приоритет'
					name='priority'
					sx={{
						background: '#fff',
					}}
					onChange={handleChangeSelect}
				>
					<MenuItem value={'Low'}>Низкий</MenuItem>
					<MenuItem value={'Medium'}>Средний</MenuItem>
					<MenuItem value={'High'}>Высокий</MenuItem>
				</Select>
			</FormControl>

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
	)
}
