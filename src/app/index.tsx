'use client'
import React, { useCallback, useEffect } from 'react'
import ReduxProvider from './reduxProvider'
import { LayoutHeader } from '@/widgets/LayoutHeader'
import { LayoutFooter } from '@/widgets/LayoutFooter'
import { useSendRefreshTokenMutation } from '@/entities/session/api'
import { getToken } from '@/entities/session/lib'
import { AuthorizationStatus } from '@/entities/session/model/types'
import { useAppDispatch, useAppSelector } from '@/shared'
import { delay } from '@/shared/lib'
import { clearSessionData } from '@/entities/session/model'
import { Navigation } from '@/widgets/Navigation'
import { ToastContainer } from 'react-toastify'
import '@/styles/globals.scss'

import { createTheme, ThemeProvider } from '@mui/material'
import { Roboto } from 'next/font/google'

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#ffba4e',
		},
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				root: {
					'&.Mui-focused': {
						backgroundColor: 'transparent !important', // Прозрачный фон активного поля
					},
				},
			},
		},
	},
})

const roboto = Roboto({ subsets: ['cyrillic'] })

export function LayoutBase({ children }: { children: React.ReactNode }) {
	return (
		<ReduxProvider>
			<ToastContainer theme='dark' position='bottom-right' autoClose={5000} />
			<ThemeProvider theme={darkTheme}>
				<Page>{children}</Page>
			</ThemeProvider>
		</ReduxProvider>
	)
}

function Page({ children }: { children: React.ReactNode }) {
	const [sendRefreshToken] = useSendRefreshTokenMutation()
	const dispatch = useAppDispatch()
	const authStatus = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized
	)
	const isUnknownAuth = authStatus === AuthorizationStatus.Unknown

	const fetchToken = useCallback(async () => {
		if (!isUnknownAuth) {
			return
		}

		const token = getToken()
		await delay()

		try {
			if (token) {
				await sendRefreshToken(token)
			} else {
				dispatch(clearSessionData())
			}
		} catch (error) {
			console.error(error)
			dispatch(clearSessionData())
		}
	}, [dispatch, isUnknownAuth, sendRefreshToken])

	useEffect(() => {
		fetchToken()
	}, [fetchToken])

	if (authStatus === AuthorizationStatus.Unknown) {
		return (
			<div className='container flex-center vh-100'>
				<h1 className='center'>Загрузка...</h1>
			</div>
		)
	}

	return (
		<div className={`${roboto.className} page`}>
			<LayoutHeader navigationSlot={<Navigation />} />
			{children}
			<LayoutFooter />
		</div>
	)
}
