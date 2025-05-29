import { LayoutLogo } from '@/shared/ui'
import { Button } from '@mui/material'
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
					<input
						className='input'
						type='text'
						autoComplete='off'
						placeholder='Логин'
						{...register('login', { required: true, minLength: 4 })}
					/>
					{errors.password && <span>Обязательное поле</span>}
					<input
						type='password'
						placeholder='Пароль'
						className='input'
						autoComplete='off'
						{...register('password', { required: true, minLength: 6 })}
					/>
					{errors.password && <span>Обязательное поле</span>}

					<Button
						disabled={!isValid}
						variant='contained'
						type={isSuccess ? 'button' : 'submit'}
						color='primary'
						sx={{ padding: '16px' }}
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
