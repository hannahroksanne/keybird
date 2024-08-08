import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export const useAnimator = () => {
	const containerRef = React.useRef()
	const scrollTriggerRef = React.useRef()
	const { contextSafe } = useGSAP({ scope: containerRef })

	const handleScroll = contextSafe(() => {
		// gsap.to('.ChordBoard', { y: '-80%', height: '100vh' })
		gsap.to('.ChordBoard', {
			scrollTrigger: '.SCROLLTRIGGER',
			x: 500
		})
	})

	return [containerRef, scrollTriggerRef, handleScroll]
}
