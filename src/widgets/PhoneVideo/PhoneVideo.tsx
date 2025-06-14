import { useEffect, useRef } from 'react'

export function PhoneVideo() {
	const videoRef = useRef<null | HTMLVideoElement>(null)

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.play()
		}
	}, [])

	return (
		<div className='video-container'>
			<video className='video' ref={videoRef} loop muted>
				<source
					src='video5420635489357029921.mp4'
					media='(min-width: 1024px)'
					type='video/mp4'
				/>
			</video>
		</div>
	)
}
