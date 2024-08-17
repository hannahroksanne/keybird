import './ChordKeybindOverlay.css'
import * as React from 'react'
import { Flex } from './Flex'
import { Button, Text } from '@radix-ui/themes'
import { store } from '../stores/store'
import useKeyboardEvents from '@acusti/use-keyboard-events'
import { playableKeyCodes } from '../consts'

export const ChordKeybindOverlay = () => {
	const whichChordIsBeingBound = store.useWhichChordIsBeingBound()
	const [selectedKey, setSelectedKey] = React.useState('')
	const [selectedKeyCode, setSelectedKeyCode] = React.useState('')

	const handleEngageButton = (event: KeyboardEvent) => {
		if (playableKeyCodes.includes(event.code)) {
			setSelectedKey(event.key)
			setSelectedKeyCode(event.code)
		}
	}

	useKeyboardEvents({
		onKeyDown: handleEngageButton
	})

	const confirm = () => {
		store.setChordKeyBinds({ ...store.chordKeyBinds, [selectedKeyCode]: whichChordIsBeingBound })
		store.toggleIsKeybindOverlayOpen()
		store.setWhichChordIsBeingBound('')
	}

	const cancel = () => {
		store.toggleIsKeybindOverlayOpen()
		store.setWhichChordIsBeingBound('')
	}

	return (
		<Flex.Column justify="center" align="center" className="ChordKeybindOverlay" gap="5" p="8">
			<Flex.Row justify="center" align="center">
				<Text size="4">Binding: {whichChordIsBeingBound}</Text>
			</Flex.Row>
			<Flex.Row justify="center" align="center" className="inputKeyDisplay">
				<Text size="9">{selectedKey}</Text>
			</Flex.Row>
			<Flex.Row className="instructionsBox">
				<Text size="1" className="instructions">
					Press a key to bind it to the selected chord.
				</Text>
			</Flex.Row>
			<Flex.Row className="actions" gap="3">
				<Button onClick={cancel} size="3">
					Cancel
				</Button>
				<Button size="3" onClick={confirm} color="teal">
					Confirm
				</Button>
			</Flex.Row>
		</Flex.Column>
	)
}
