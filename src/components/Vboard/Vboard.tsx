import './Vboard.css'
import './VboardKeyMenu.css'

import useKeyboardEvents from '@acusti/use-keyboard-events'
import * as React from 'react'
import { Flex } from '../Flex'
import { GrayTheme } from '../Themes'
import { VboardKey } from './VboardKey'
import { store } from '../../stores/store'
import isEmpty from 'is-empty'
import keyboardLayoutsConfig from '../../consts/default.layouts.json'
import { Text } from '@radix-ui/themes'
import { KeyNameSelect, ScaleTypeSelect } from '../Controls/ScaleControls'
import { OctaveController } from '../Controls/OctaveController'
import { OutputOptionsRow } from '../MidiOrInstrumentToggleButton'
import { KeyMapLayoutController } from '../KeyMapLayoutController'
import { MidiOutputSelector } from '../Controls/MidiOutputSelector'
import { MidiToggleButton } from '../Controls/MidiToggleButton'

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
			{/* <OutputOptionsRow /> */}
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

const MidiOptions = () => {
	const midiOutputNames = store.useMidiOutputNames()

	if (midiOutputNames.length === 0) {
		return <Text size="1">No MIDI outputs found.</Text>
	}

	return (
		<>
			<MidiOutputSelector />
			<MidiToggleButton />
		</>
	)
}

const OptionsRow = () => {
	return (
		<Flex.Row gap="3" mb="1" mt="0" className="VboardDataRow" justify="end" align="center" style={{ width: '100%' }}>
			{/* <MidiOrInstrumentToggleButton /> */}
			{/* <Flex.Row gap="2"> */}
			<MidiOptions />
			<KeyMapLayoutController />
			<KeyNameSelect />
			<ScaleTypeSelect />
			<OctaveController />
			{/* </Flex.Row> */}
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
	if (!key) return
	const isKeyAlreadyPressed = store.pressedKeyCodes.includes(key.keyCode)
	if (isKeyAlreadyPressed) return
	if (key.isFunctional) return handleFunctionalKey(key)
	if (key.isPlayable) return store.addPressedKeyCode(key.keyCode)
}

const handleDisengageButton = (event: KeyboardEvent) => {
	event.preventDefault()
	const key = store.keyMap[event.code]
	if (!key) return
	if (key.isFunctional) store.removePressedKeyCode(key.keyCode)
	if (key.isPlayable) store.removePressedKeyCode(key.keyCode)
}
