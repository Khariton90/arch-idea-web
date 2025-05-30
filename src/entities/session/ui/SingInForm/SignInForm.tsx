import { LayoutLogo } from '@/shared/ui'
import { Button, TextField } from '@mui/material'
import { useSignInMutation } from '../../api'
import { useAppSelector } from '@/shared'
import { AuthorizationStatus } from '../../model/types'
import Router from 'next/router'
import styles from './styles.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
	login: string
	password: string
}

export function SignInForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<Inputs>()
	const [signIn, { isError, isSuccess }] = useSignInMutation()

	const authStatus = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized
	)

	const isAuth = authStatus === AuthorizationStatus.Auth

	const onSubmit: SubmitHandler<Inputs> = async data => {
		await signIn(data).then(res => {
			if (!res.error) {
				Router.push('/')
			}
		})
	}

	if (isAuth) {
		return <main className='main'></main>
	}

	return (
		<main className='main'>
			<div className='container flex-center'>
				<form
					className={`${styles.form} form`}
					autoComplete='off'
					onSubmit={handleSubmit(onSubmit)}
				>
					<LayoutLogo />
					<TextField
						{...register('login', { required: true, minLength: 4 })}
						type='text'
						required
						fullWidth
						placeholder='Логин'
						label='Логин'
						autoComplete='off'
					/>

					{errors.password && <span>Обязательное поле</span>}
					<TextField
						{...register('password', { required: true, minLength: 6 })}
						type='password'
						placeholder='Пароль'
						required
						fullWidth
						autoComplete='off'
						label='Пароль'
					/>

					{errors.password && <span>Обязательное поле</span>}

					<Button
						disabled={!isValid}
						variant='contained'
						type={isSuccess ? 'button' : 'submit'}
						color='primary'
						size='large'
					>
						Войти
					</Button>

					{isError && (
						<span style={{ textAlign: 'center' }}>Ошибка авторизации</span>
					)}
				</form>
			</div>
		</main>
	)
}
