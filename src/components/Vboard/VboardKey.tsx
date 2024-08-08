import { Text } from '@radix-ui/themes'
import classcat from 'classcat'
import { VboardKeyMenu } from './VboardKeyMenu'
import { VboardKeyButton } from './VboardKeyButton'
import { $core } from '../../views/$core'
import React from 'react'
import { $midi } from '../../views/$midi'

type VboardKeyPropsT = {
	keyCode: string
}

export const VboardKey = (props: VboardKeyPropsT) => {
	const qwertyKey = $core.useQwertyKey(props.keyCode)
	const areAltLabelsShown = $core.useAreAltLabelsShown()
	const isPressedClassName = qwertyKey.isPressed && 'VboardPressedKey'
	const isRelatedClassName = qwertyKey.isRelated && 'VboardRelatedKey'

	const keyClassName = `VboardKey${qwertyKey.keyCode}`
	const baseClassNAme = ['VboardButton', 'VbuttonPlayableKey']
	const modifierClassNames = [isPressedClassName, keyClassName]
	const className = classcat([...baseClassNAme, ...modifierClassNames, isRelatedClassName])

	const color = qwertyKey.isPressed ? qwertyKey.color : qwertyKey.isRelated ? '' : qwertyKey.color
	const variant = qwertyKey.isPressed ? qwertyKey.variant : qwertyKey.isRelated ? 'soft' : qwertyKey.variant
	const label = areAltLabelsShown ? qwertyKey.altLabel : qwertyKey.label
	const reportOpenMenu = console.log
	const isPlayable = qwertyKey.isPlayable

	const finalProps = {
		...props,
		...qwertyKey,
		reportOpenMenu,
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
	return (
		<VboardKeyButton {...props}>
			<VboardKeyMenu reportOpenMenu={props.reportOpenMenu}>
				<Text>{props.label}</Text>
			</VboardKeyMenu>
		</VboardKeyButton>
	)
})
