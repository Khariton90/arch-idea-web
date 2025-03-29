'use client'
import React, { useEffect } from 'react'
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
import './globals.scss'

export function LayoutBase({ children }: { children: React.ReactNode }) {
	return (
		<ReduxProvider>
			<Page>{children}</Page>
		</ReduxProvider>
	)
}

function Page({ children }: { children: React.ReactNode }) {
	const [sendRefreshToken, {}] = useSendRefreshTokenMutation()
	const dispatch = useAppDispatch()
	const authStatus = useAppSelector(
		({ sessionSlice }) => sessionSlice.isAuthorized
	)
	const isUnknownAuth = authStatus === AuthorizationStatus.Unknown

	const fetchToken = async () => {
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
	}

	useEffect(() => {
		if (isUnknownAuth) {
			fetchToken()
		}
	}, [])

	if (authStatus === AuthorizationStatus.Unknown) {
		return (
			<div className='container flex-center vh-100'>
				<h1 className='center'>Загрузка...</h1>
			</div>
		)
	}

	return (
		<div className='page'>
			<LayoutHeader navigationSlot={<Navigation />} />
			{children}
			<LayoutFooter />
		</div>
	)
}
