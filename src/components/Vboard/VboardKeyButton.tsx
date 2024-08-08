import * as React from 'react'
import { Button } from '@radix-ui/themes'

type PropsT = QwertyKeyT & {
	className?: string
	variant?: string
	color?: string
	isDisabled?: boolean
	children: React.ReactNode
	buttonRef?: React.RefObject<HTMLButtonElement>
}

export const VboardKeyButton = (props: PropsT) => {
	const color = (props.color || 'gray') as any
	const variant = (props.variant || 'outline') as any
	const dataProps = getButtonDataProps(props)
	const isMouseOverRef = React.useRef(false)

	const dispatchKeyEvent = (type: string) => {
		const event = new KeyboardEvent(type, { code: props.keyCode })
		document.dispatchEvent(event)
	}

	const handleKeyDown = () => {
		console.log('handleKeyDown')
		dispatchKeyEvent('keydown')
		isMouseOverRef.current = true
	}

	const handleKeyUp = () => {
		dispatchKeyEvent('keyup')
		isMouseOverRef.current = false
	}

	const handleMouseOut = () => {
		if (isMouseOverRef.current) handleKeyUp()
	}

	return (
		<Button
			ref={props.buttonRef}
			variant={variant}
			color={color}
			onMouseDown={handleKeyDown}
			onMouseUp={handleKeyUp}
			onMouseLeave={handleMouseOut}
			disabled={props.isDisabled}
			className={props.className}
			style={{ gap: 0, flexGrow: props.width, position: 'relative' }}
			{...dataProps}
		>
			<>
				<div className="pressedPixel" />
				{props.children}
			</>
		</Button>
	)
}

const getButtonDataProps = (props: PropsT) => {
	return {
		'data-testid': `VboardKeyButton${props.keyCode}`,
		'data-keycode': props.keyCode,
		'data-ispressed': props.isPressed,
		'data-isrelated': props.isRelated,
		'data-isplayable': props.isPlayable,
		'data-isfunctional': props.isFunctional,
		'data-isdisabled': props.isDisabled,
		'data-function': props.function,
		'data-variant': props.variant,
		'data-color': props.color,
		'data-midi': props.midi,
		'data-velocity': props.velocity,
		'data-pattern': props.pattern,
		'data-rhythm': props.rhythm,
		'data-inversion': props.inversion,
		'data-voicing': props.voicing,
		'data-humanize': props.humanize,
		'data-note': props.note,
		'data-rootnote': props.rootNote,
		'data-issharp': props.note.includes('#')
	}
}
