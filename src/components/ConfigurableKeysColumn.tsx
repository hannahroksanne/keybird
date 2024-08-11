import './ConfigurableKeys.css'
import React from 'react'
import classcat from 'classcat'
import defaultKeysConfig from '../consts/defaultKeys.config.json'
import keyboardLayoutsConfig from '../consts/keyboardLayouts.config.json'
import { Button, Text, ContextMenu, ScrollArea } from '@radix-ui/themes'
import { Flex } from './Flex'
import { store } from '../store'
import isEmpty from 'is-empty'
import appConfig from '../consts/app.config.json'

const usePlayableKeyCodes = () => {
	const layoutName = store.useKeyboardLayoutName()
	const layout = keyboardLayoutsConfig[layoutName]

	return React.useMemo(() => {
		const allKeyCodes = layout.rows.flat()

		return allKeyCodes.reduce((final, keyCode) => {
			const keyConfig = defaultKeysConfig[keyCode]
			const isPlayable = keyConfig.isPlayable
			if (isPlayable) final.push(keyCode)
			return final
		}, [])
	}, [])
}

export const ConfigurableKeysColumn = () => {
	const playableKeyCodes = usePlayableKeyCodes()
	const keyMap = store.useKeyMap()
	if (isEmpty(keyMap)) return null

	return (
		<ScrollArea type="always" scrollbars="vertical" style={{ minWidth: 200, width: 200, height: 600 }}>
			<Flex.Column gap="3" pr="5" pb="2" style={{ width: 200, minWidth: 200 }}>
				{playableKeyCodes.map((keyCode) => {
					return <ConfigurableKey key={keyCode} keyCode={keyCode} />
				})}
			</Flex.Column>
		</ScrollArea>
	)
}

const ConfigurableKey = React.memo((props: AnyObjectT) => {
	const key = store.useKeyMapping(props.keyCode) as PlayableKeyMappingT

	return (
		<BaseKey {...props} {...key}>
			<BaseKeyMenu reportOpenMenu={props.reportOpenMenu}>
				<Text>{key.chordName}</Text>
			</BaseKeyMenu>
		</BaseKey>
	)
})

const BaseKey = (props) => {
	const className = classcat(['BaseKey', props.className])
	const color = appConfig.tonicColors[props.chordRootNote]

	return (
		<Button
			size="2"
			variant={props.variant}
			color={color}
			className={className}
			style={{ gap: 0, flex: 1, position: 'relative', paddingRight: 5 }}
		>
			<Flex.Row
				align="center"
				justify="center"
				style={{
					color: 'white',
					minWidth: 36,
					height: 36,
					background: `var(--${color}-a3)`,
					boxShadow: 'inset 0 0 0 1px var(--accent-a8)'
				}}
			>
				<Text size="2">{props.label}</Text>
			</Flex.Row>
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
