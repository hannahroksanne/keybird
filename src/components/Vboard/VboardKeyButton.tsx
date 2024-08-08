import * as React from 'react'
import { Button } from '@radix-ui/themes'
import { $core } from '../../views/core'
import { $midi } from '../../views/midi.store'

type PropsT = QwertyKeyT & {
	className?: string
	variant?: string
	color?: string
	isDisabled?: boolean
	children: React.ReactNode
}

// const useKeyDown = (keyCode: string, handler: (event: KeyboardEvent) => void) => {
// 	React.useEffect(() => {
// 		const _handler = (event: KeyboardEvent) => {
// 			if (event.code === keyCode) {
// 				handler(event)
// 			}
// 		}

// 		window.addEventListener('keydown', _handler)
// 		return () => {
// 			window.removeEventListener('keydown', _handler)
// 		}
// 	}, [])
// }

// const useKeyUp = (keyCode: string, handler: (event: KeyboardEvent) => void) => {
// 	React.useEffect(() => {
// 		const _handler = (event: KeyboardEvent) => {
// 			if (event.code === keyCode) {
// 				handler(event)
// 			}
// 		}

// 		window.addEventListener('keyup', _handler)
// 		return () => {
// 			window.removeEventListener('keyup', _handler)
// 		}
// 	}, [])
// }

export const VboardKeyButton = (props: PropsT) => {
	const color = (props.color || 'gray') as any
	const variant = (props.variant || 'outline') as any
	const dataProps = getButtonDataProps(props)

	// useKeyDown(props.keyCode, () => {
	// 	if (isEngagedRef.current) return
	// 	isEngagedRef.current = true
	// 	engageButton()
	// })

	// useKeyUp(props.keyCode, () => {
	// 	if (!isEngagedRef.current) return
	// 	isEngagedRef.current = false
	// 	disengageButton()
	// })

	// const engageButton = () => {
	// 	handleEngageButton?.()
	// 	$core.reportKeyDown(props.keyCode)
	// }

	// const disengageButton = () => {
	// 	handleDisengageButton?.()
	// 	$core.reportKeyUp(props.keyCode)
	// }

	// const onButtonMouseDown = () => {
	// 	isMouseDownRef.current = true
	// 	engageButton()
	// }

	// const onButtonMouseUp = () => {
	// 	isMouseDownRef.current = false
	// 	disengageButton()
	// }

	// const handleMouseOut = () => {
	// 	if (isMouseDownRef.current) disengageButton()
	// 	isMouseDownRef.current = false
	// }

	return (
		<Button
			// onMouseDown={onButtonMouseDown}
			// onMouseUp={onButtonMouseUp}
			// onMouseOver={handleMouseOver}
			// onMouseOut={handleMouseOut}
			variant={variant}
			color={color}
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
		'data-rootnote': props.rootNote
	}
}
