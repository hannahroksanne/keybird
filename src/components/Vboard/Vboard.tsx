import './Vboard.css'
import './VboardKeyMenu.css'

import useKeyboardEvents from '@acusti/use-keyboard-events'
import * as React from 'react'
import { Flex } from '../Flex'
import { GrayTheme } from '../Themes'
import { VboardKey } from './VboardKey'
import { store } from '../../store'
import isEmpty from 'is-empty'
import keyboardLayoutsConfig from '../../consts/keyboardLayouts.config.json'
import { Text } from '@radix-ui/themes'
import { OutputController } from '../OutputController'
import { Spacer } from '../Spacer'
import { MidiToggleButton } from '../Controls/MidiToggleButton'
import { MidiOutputSelector } from '../Controls/MidiOutputSelector'
import { KeyNameSelect, ScaleTypeSelect } from '../Controls/ScaleControls'
import { OctaveController } from '../Controls/OctaveController'

type VboardRowPropsT = {
	index: number
	keyCodes: string[]
}

const VboardRow = React.memo((props: VboardRowPropsT) => {
	const keyMap = store.useKeyMap()
	if (isEmpty(keyMap)) return null

	return (
		<Flex.Row gap="2" data-testid={`VboardRow${props.index}`} className="VboardRow">
			{props.keyCodes.map((keyCode) => {
				return <VboardKey key={keyCode} keyCode={keyCode} />
			})}
		</Flex.Row>
	)
})

export const Vboard = React.memo(() => {
	const rows = keyboardLayoutsConfig.standard.rows

	useKeyboardEvents({
		onKeyDown: handleEngageButton,
		onKeyUp: handleDisengageButton
	})

	return (
		<Flex.Column gap="2" p="2" className="VboardContainer">
			<DataRow />
			<GrayTheme>
				<Flex.Column gap="2" p="2" className="Vboard" data-testid="Vboard">
					{rows.map((keyCodes, index) => (
						<VboardRow key={index} index={index} keyCodes={keyCodes} />
					))}
				</Flex.Column>
			</GrayTheme>
			<OptionsRow />
		</Flex.Column>
	)
})

const DataRow = () => {
	const playingNotes = store.usePlayingNotes()

	return (
		<Flex.Row gap="3" align="center">
			{playingNotes.map((note, index) => (
				<Text size="1" key={note + index} className="VboardDataRowNote">
					{note}
				</Text>
			))}
		</Flex.Row>
	)
}

const OptionsRow = () => {
	return (
		<Flex.Row gap="3" mb="2" mt="2" className="VboardDataRow" justify="end" align="center" style={{ width: '100%' }}>
			<KeyNameSelect />
			<ScaleTypeSelect />
			<OctaveController />
			<MidiOutputSelector />
			<MidiToggleButton />
			<OutputController />
		</Flex.Row>
	)
}

const handleFunctionalKey = (key) => {
	store.addPressedKeyCode(key.keyCode)

	if (key.function === 'toggleAlternateLabels') {
		const shouldShowAltLabels = store.shouldShowAltLabels
		store.setShouldShowAltLabels(!shouldShowAltLabels)
	}

	if (key.function === 'toggleMidiOutputEnabled') {
		const isMidiEnabled = store.isMidiEnabled
		store.setIsMidiEnabled(!isMidiEnabled)
	}
}

const handleEngageButton = (event: KeyboardEvent) => {
	event.preventDefault()
	const key = store.keyMap[event.code]
	const isKeyAlreadyPressed = store.pressedKeyCodes.includes(key.keyCode)
	if (isKeyAlreadyPressed) return
	if (key.isFunctional) return handleFunctionalKey(key)
	if (key.isPlayable) return store.addPressedKeyCode(key.keyCode)
}

const handleDisengageButton = (event: KeyboardEvent) => {
	event.preventDefault()
	const key = store.keyMap[event.code]
	if (key.isFunctional) store.removePressedKeyCode(key.keyCode)
	if (key.isPlayable) store.removePressedKeyCode(key.keyCode)
}
