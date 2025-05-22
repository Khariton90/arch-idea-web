'use server'
import { LayoutLogo } from '@/shared/ui'
import { Button } from '@mui/material'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useAppSelector } from '@/shared'
import { AuthorizationStatus } from '../../model/types'
import Router from 'next/router'
import styles from './styles.module.scss'
import { useSignUpMutation } from '../../api'
import { delay } from '@/shared/lib'

interface Form {
	email?: string
	firstName?: string
	lastName?: string
}

export function SignUpForm() {
	const [form, setForm] = useState<Form>({})

	const authStatus = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized
	)

	const [signUp, { isSuccess }] = useSignUpMutation()

	const isAuth = authStatus === AuthorizationStatus.Auth

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setForm(prevForm => ({ ...prevForm, [evt.target.name]: evt.target.value }))
	}

	const isRequired = form.email && form.firstName && form.lastName

	const handleSubmit = async (evt: FormEvent) => {
		evt.preventDefault()
		if (isRequired) {
			await signUp({ message: JSON.stringify(form, null, 2) })
			await delay(3000)
			Router.push('/')
		}
	}

	useEffect(() => {
		if (isAuth) {
			Router.push('/')
		}
	}, [isAuth])

	return (
		<div className={styles.backdrop}>
			<div>
				<form
					className={`form  ${styles.form}`}
					autoComplete='off'
					onSubmit={handleSubmit}
				>
					<LayoutLogo />
					<input
						name='email'
						className='input'
						type='email'
						placeholder='Рабочий email'
						onChange={handleChange}
						required
					/>
					<input
						name='lastName'
						className='input'
						type='text'
						placeholder='Фамилия'
						required
						onChange={handleChange}
					/>

					<input
						name='firstName'
						className='input'
						type='text'
						placeholder='Имя'
						required
						onChange={handleChange}
					/>

					{isSuccess || !isRequired ? (
						<Button
							variant='contained'
							sx={{
								background: '#ffba4e',
								color: '#000',
								opacity: 0.5,
								padding: '16px',
							}}
						>
							Отправить заявку
						</Button>
					) : (
						<Button
							variant='contained'
							sx={{ background: '#ffba4e', color: '#000', padding: '16px' }}
							disabled={!isRequired}
							type='submit'
						>
							Отправить заявку
						</Button>
					)}
				</form>
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
