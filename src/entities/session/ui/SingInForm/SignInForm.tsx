import { LayoutLogo } from '@/shared/ui'
import { Button } from '@mui/material'
import { useSignInMutation } from '../../api'
import { ChangeEvent, useEffect, useState } from 'react'
import { useAppSelector } from '@/shared'
import { AuthorizationStatus } from '../../model/types'
import Router from 'next/router'

export function SignInForm() {
	const authStatus = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized
	)

	const isAuth = authStatus === AuthorizationStatus.Auth

	const [signIn, { isLoading }] = useSignInMutation()
	const [form, setForm] = useState({
		login: '',
		password: '',
	})

	const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setForm(prev => ({
			...prev,
			[evt.target.name]: evt.target.value,
		}))
	}

	const handleSubmit = async () => {
		if (form.login && form.password) {
			await signIn(form)
		}
	}

	useEffect(() => {
		if (isAuth) {
			Router.push('/')
		}
	})

	if (isAuth) {
		return <main className='main'></main>
	}

	return (
		<main className='main'>
			<div className='container flex-center'>
				<form className='form' autoComplete='off'>
					<LayoutLogo />
					<input
						name='login'
						className='input'
						type='text'
						placeholder='Логин'
						onChange={handleChange}
						required
					/>
					<input
						name='password'
						className='input'
						type='password'
						placeholder='Пароль'
						onChange={handleChange}
						required
					/>
					{form.login && form.password ? (
						<Button
							disabled={isLoading}
							onClick={handleSubmit}
							variant='contained'
							sx={{ background: '#ffba4e', color: '#000', padding: '16px' }}
						>
							Войти
						</Button>
					) : (
						<Button
							variant='contained'
							sx={{
								background: '#ffba4e',
								color: '#000',
								opacity: 0.5,
								padding: '16px',
							}}
						>
							Войти
						</Button>
					)}
				</form>
			</div>
		</main>
	)
}
