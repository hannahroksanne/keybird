import { Button, Text, ContextMenu } from '@radix-ui/themes'
import { $core } from '../stores'
import { Flex } from './Flex'
import React from 'react'
import classcat from 'classcat'
import './MessyKeys.css'

export const MessyKeys = () => {
	const qwertyKeys = [...$core.useQwertyKeys()]

	const sortedQwertyKeys = qwertyKeys.sort((a, b) => {
		// I need all of the isPlayable keys at the front and
		// the isFunctional keys at the back
		if (a.isPlayable && !b.isPlayable) return -1
		if (!a.isPlayable && b.isPlayable) return 1
		if (a.isFunctional && !b.isFunctional) return 1
		if (!a.isFunctional && b.isFunctional) return -1
		return 0
	})

	return (
		<Flex.Row gap="3" wrap="wrap" px="4">
			{sortedQwertyKeys.map((key, index) => {
				return <Key key={key.keyCode} {...key} />
			})}
		</Flex.Row>
	)
}

const Key = React.memo((props: AnyObjectT) => {
	const areAltLabelsShown = $core.useAreAltLabelsShown()
	const label = areAltLabelsShown ? props.keyCode : props.label

	return (
		<BaseKey {...props}>
			<BaseKeyMenu reportOpenMenu={props.reportOpenMenu}>
				<Text>{label}</Text>
			</BaseKeyMenu>
		</BaseKey>
	)
})

const BaseKey = (props) => {
	const className = classcat(['BaseKey', props.className])

	return (
		<Button
			variant={props.variant}
			color={props.color}
			disabled={props.isDisabled}
			className={className}
			style={{ gap: 0, flexGrow: props.width, position: 'relative' }}
		>
			<>{props.children}</>
		</Button>
	)
}

const BaseKeyMenu = (props) => {
	return (
		<ContextMenu.Root>
			<ContextMenu.Trigger style={{ width: '100%', height: '100%' }}>{props.children}</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Item shortcut="E">Assign Note</ContextMenu.Item>
				<ContextMenu.Item shortcut="N">Assign Chord</ContextMenu.Item>
				<ContextMenu.Sub>
					<ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
					<ContextMenu.SubContent>
						<ContextMenu.Item>Increase Octave</ContextMenu.Item>
						<ContextMenu.Item>Decrease Octave</ContextMenu.Item>
					</ContextMenu.SubContent>
				</ContextMenu.Sub>
				<ContextMenu.Separator />
				<ContextMenu.Item shortcut="C" disabled>
					Copy
				</ContextMenu.Item>
				<ContextMenu.Item shortcut="P" disabled>
					Paste
				</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item shortcut="D" disabled>
					Disable
				</ContextMenu.Item>
				<ContextMenu.Item shortcut="x" color="red" disabled>
					Delete
				</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>
	)
}
