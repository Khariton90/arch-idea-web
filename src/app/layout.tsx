import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'ARCH IDEA',
	description: 'ARCH IDEA - На кончиках пальцев рождаются идеи',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body>{children}</body>
		</html>
	)
}
