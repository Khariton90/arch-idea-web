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
		await signIn(form)
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
					/>
					<input
						name='password'
						className='input'
						type='text'
						placeholder='Пароль'
						onChange={handleChange}
					/>
					<Button
						disabled={isLoading}
						onClick={handleSubmit}
						variant='contained'
						sx={{ background: '#ffba4e', color: '#000' }}
					>
						Войти
					</Button>
				</form>
			</div>
		</main>
	)
}
