import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material'
import { useEffect } from 'react'
import Router from 'next/router'
import styles from './styles.module.scss'
import { useSignUpMutation } from '../../api'
import { delay } from '@/shared/lib'
import { useForm, SubmitHandler } from 'react-hook-form'
import { CreateUserDto } from '../../model'
import { toast } from 'react-toastify'
import { LayoutLogo } from '@/shared'

const departments = [
	{ id: 'Parnas', label: 'Парнас' },
	{ id: 'Industrialny', label: 'Индустриальный' },
	{ id: 'KadSever', label: 'КАД Север' },
	{ id: 'Planernaya', label: 'Планерная' },
	{ id: 'Murmanskoe', label: 'Мурманское' },
	{ id: 'Sofiyskaya', label: 'Софийская' },
	{ id: 'Tallinskaya', label: 'Таллинская' },
	{ id: 'Slavyanka', label: 'Славянка' },
	{ id: 'Other', label: 'Другое' },
]

export function SignUpForm() {
	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<CreateUserDto>()
	const [signUp, { isSuccess }] = useSignUpMutation()

	const onSubmit: SubmitHandler<CreateUserDto> = async data => {
		await signUp({ ...data })
	}

	const redirect = async () => {
		if (isSuccess && isValid) {
			toast('Заявка успешно создана, письмо поступит на вашу почту...')
			await delay(5000)
			Router.push('/')
		}
	}

	useEffect(() => {
		if (isSuccess) {
			redirect()
		}
	}, [isSuccess])

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
				}}
			>
				<LayoutLogo />
				<TextField
					{...register('email')}
					type='email'
					required
					fullWidth
					label='Email'
				/>

				<FormControl fullWidth>
					<InputLabel required htmlFor='department-select'>
						Подразделение
					</InputLabel>
					<Select
						{...register('department')}
						id='department-select'
						label='Подразделение'
						required
					>
						{departments.map(dept => (
							<MenuItem key={dept.id} value={dept.id}>
								{dept.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<Button size='large' variant='contained' type='submit'>
					Отправить
				</Button>
			</Box>
		</form>
	)
}
