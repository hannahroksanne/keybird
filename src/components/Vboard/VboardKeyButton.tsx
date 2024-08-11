import * as React from 'react'
import { Button } from '@radix-ui/themes'

type PropsT = KeyMappingT & {
	className?: string
	isDisabled?: boolean
	children: React.ReactNode
	buttonRef?: React.RefObject<HTMLButtonElement>
}

export const VboardKeyButton = (props: PropsT) => {
	const color = (props.color || 'gray') as any
	const variant = (props.variant || 'outline') as any

	const dispatchKeyEvent = (type: string) => {
		const event = new KeyboardEvent(type, { code: props.keyCode })
		document.dispatchEvent(event)
	}

	const handleKeyDown = () => {
		dispatchKeyEvent('keydown')
	}

	const handleKeyUp = () => {
		dispatchKeyEvent('keyup')
	}

	return (
		<Button
			ref={props.buttonRef}
			variant={variant}
			color={color}
			onMouseDown={handleKeyDown}
			onMouseUp={handleKeyUp}
			disabled={props.isDisabled}
			className={props.className}
			style={{ gap: 0, flexGrow: props.width, position: 'relative' }}
		>
			<>
				{/* <div className="pressedPixel" /> */}
				{props.children}
			</>
		</Button>
	)
}
