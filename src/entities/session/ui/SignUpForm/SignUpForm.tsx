import { LayoutLogo } from '@/shared/ui'
import { Button, Checkbox, FormControlLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import styles from './styles.module.scss'
import { useSignUpMutation } from '../../api'
import { delay } from '@/shared/lib'
import { useForm, SubmitHandler } from 'react-hook-form'

type Form = {
	email?: string
	firstName?: string
	lastName?: string
	isAnonim?: boolean
}

export function SignUpForm() {
	const [isAnonym, setIsAnonim] = useState(false)
	const [signUp, { isSuccess, isError, isLoading }] = useSignUpMutation()

	const {
		register,
		handleSubmit,
		formState: { isValid },
	} = useForm<Form>()

	const onSubmit: SubmitHandler<Form> = async data => {
		const message = isAnonym
			? JSON.stringify({ email: data.email, isAnonym }, null, 2)
			: JSON.stringify({ ...data, isAnonym }, null, 2)

		await signUp({
			message,
		})
	}

	const redirect = async () => {
		if (isSuccess) {
			await delay(4000)
			Router.push('/')
		}
	}

	useEffect(() => {
		if (isSuccess) {
			redirect()
		}
	}, [isSuccess])

	return (
		<div className={styles.backdrop}>
			<div>
				<form
					className={`form  ${styles.form}`}
					autoComplete='off'
					onSubmit={handleSubmit(onSubmit)}
				>
					<LayoutLogo />
					<input
						className='input'
						type='email'
						placeholder='Рабочий email'
						{...register('email', { required: true, minLength: 8 })}
						required
					/>
					{!isAnonym ? (
						<>
							<input
								className='input'
								type='text'
								placeholder='Фамилия'
								{...register('lastName', { required: !isAnonym, minLength: 4 })}
							/>

							<input
								className='input'
								type='text'
								placeholder='Имя'
								required
								{...register('firstName', {
									required: !isAnonym,
									minLength: 4,
								})}
							/>
						</>
					) : null}
					<FormControlLabel
						onChange={() => {
							setIsAnonim(prev => !prev)
						}}
						value={isAnonym}
						sx={{
							'& .MuiSvgIcon-root': {
								color: '#ffba4e',
							},
						}}
						control={<Checkbox checked={isAnonym} />}
						label='Анонимный пользователь'
					/>
					<Button
						disabled={isLoading || !isValid}
						variant='contained'
						type={isLoading ? 'button' : 'submit'}
						sx={{
							padding: '16px',
						}}
					>
						Отправить заявку
					</Button>
				</form>
				{isError && (
					<div className={styles.message}>
						<p>Ошибка</p>
					</div>
				)}

				{isSuccess && (
					<div className={styles.message}>
						<h2>Заявка принята</h2>
						<p>После рассмотрения подтверждение придет на почту</p>
					</div>
				)}
			</div>
		</div>
	)
}
