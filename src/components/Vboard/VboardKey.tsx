import { Text } from '@radix-ui/themes'
import classcat from 'classcat'
import { VboardKeyMenu } from './VboardKeyMenu'
import { VboardKeyButton } from './VboardKeyButton'
import React from 'react'
import { store } from '../../store'

type VboardKeyPropsT = {
	keyCode: string
}

export const VboardKey = (props: VboardKeyPropsT) => {
	const pressedKeyCodes = store.usePressedKeyCodes()
	const shouldShowAltLabels = store.shouldShowAltLabels
	const key = store.useKeyMapping(props.keyCode) as KeyMappingT

	const isFunctionalClassName = key.isFunctional && 'VboardFunctionalKey'
	const isPlayableClassName = key.isPlayable && 'VboardPlayableKey'
	const isPressed = pressedKeyCodes.includes(key.keyCode)
	const isPressedClassName = isPressed && 'VboardPressedKey'
	const keyClassName = `VboardKey${key.keyCode}`
	const baseClassNAme = ['VboardButton', isPlayableClassName]
	const modifierClassNames = [isPressedClassName, keyClassName, isFunctionalClassName]
	const className = classcat([...baseClassNAme, ...modifierClassNames])

	const altLabel = key.alternateLabel || key.label
	const label = shouldShowAltLabels ? altLabel : key.label
	const buttonRef = React.useRef<HTMLButtonElement>(null)
	const reportOpenMenu = console.log
	const isPlayable = key.isPlayable

	const finalProps = {
		...key,
		reportOpenMenu,
		buttonRef,
		className,
		label
	}

	const Component = isPlayable ? VboardPlayableKey : VboardFunctionalKey
	// @ts-ignore
	return <Component {...finalProps} />
}

type EnhancedPropsT = {
	buttonRef: React.RefObject<HTMLButtonElement>
	reportOpenMenu: () => void
	className: string
}

type PlayableKeyPropsT = PlayableKeyMappingT & EnhancedPropsT
type FunctionalKeyPropsT = FunctionalKeyMappingT & EnhancedPropsT

export const VboardPlayableKey = React.memo((props: PlayableKeyPropsT) => {
	const isRootNotePlaying = store.useIsRootNotePlaying(props.rootNote)
	const isPlaying = store.useIsNotePlaying(props.note)
	const isSharp = props.note.includes('#')
	const isPlayingClassName = isPlaying && 'VboardPlayingKey'
	const isSharpKeyClassName = isSharp && 'VboardSharpNoteKey'
	const isRelatedClassName = isRootNotePlaying && 'VboardRelatedKey'
	const className = classcat([props.className, isPlayingClassName, isSharpKeyClassName, isRelatedClassName])

	return (
		<VboardKeyButton {...props} className={className}>
			<VboardKeyMenu reportOpenMenu={props.reportOpenMenu}>
				<Text>{props.label}</Text>
			</VboardKeyMenu>
		</VboardKeyButton>
	)
})

export const VboardFunctionalKey = React.memo((props: FunctionalKeyPropsT) => {
	return (
		<VboardKeyButton {...props}>
			<VboardKeyMenu reportOpenMenu={props.reportOpenMenu}>
				<Text>{props.label}</Text>
			</VboardKeyMenu>
		</VboardKeyButton>
	)
})
