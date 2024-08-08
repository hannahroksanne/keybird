import { Text } from '@radix-ui/themes'
import classcat from 'classcat'
import { VboardKeyMenu } from './VboardKeyMenu'
import { VboardKeyButton } from './VboardKeyButton'
import { $core } from '../../stores/core/$core'
import React from 'react'

type VboardKeyPropsT = {
	keyCode: string
}

export const VboardKey = (props: VboardKeyPropsT) => {
	const qwertyKey = $core.useQwertyKey(props.keyCode)
	const isSharpKey = qwertyKey.note.includes('#')
	const areAltLabelsShown = $core.useAreAltLabelsShown()
	const isSharpKeyClassName = isSharpKey && 'VboardSharpNoteKey'
	const isFunctionalClassName = qwertyKey.isFunctional && 'VboardFunctionalKey'
	const isPlayableClassName = qwertyKey.isPlayable && 'VboardPlayableKey'
	const isPressedClassName = qwertyKey.isPressed && 'VboardPressedKey'
	const isRelatedClassName = qwertyKey.isRelated && 'VboardRelatedKey'

	const keyClassName = `VboardKey${qwertyKey.keyCode}`
	const baseClassNAme = ['VboardButton', isPlayableClassName, isSharpKeyClassName]
	const modifierClassNames = [isPressedClassName, keyClassName, isFunctionalClassName]
	const className = classcat([...baseClassNAme, ...modifierClassNames, isRelatedClassName])

	const color = qwertyKey.isPressed ? qwertyKey.color : qwertyKey.isRelated ? '' : qwertyKey.color
	const variant = qwertyKey.isPressed ? qwertyKey.variant : qwertyKey.isRelated ? 'soft' : qwertyKey.variant
	const altLabel = qwertyKey.altLabel || qwertyKey.note || qwertyKey.label
	const label = areAltLabelsShown ? altLabel : qwertyKey.label
	const buttonRef = React.useRef<HTMLButtonElement>(null)
	const reportOpenMenu = console.log
	const isPlayable = qwertyKey.isPlayable

	const finalProps = {
		...props,
		...qwertyKey,
		reportOpenMenu,
		buttonRef,
		className,
		color,
		variant,
		label
	}

	const Component = isPlayable ? VboardPlayableKey : VboardFunctionalKey
	return <Component {...finalProps} />
}

type EnhancedPropsT = QwertyKeyT & {
	reportOpenMenu: () => void
	className: string
	color: string
	variant: string
	label: string
}

export const VboardPlayableKey = React.memo((props: EnhancedPropsT) => {
	return (
		<VboardKeyButton {...props}>
			<VboardKeyMenu reportOpenMenu={props.reportOpenMenu}>
				<Text>{props.label}</Text>
			</VboardKeyMenu>
		</VboardKeyButton>
	)
})

export const VboardFunctionalKey = React.memo((props: EnhancedPropsT) => {
	const handleClick = (event: MouseEvent) => {}

	return (
		<VboardKeyButton {...props}>
			<VboardKeyMenu reportOpenMenu={props.reportOpenMenu}>
				<Text>{props.label}</Text>
			</VboardKeyMenu>
		</VboardKeyButton>
	)
})
