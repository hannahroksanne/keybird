import './Vboard.css'
import './VboardKeyMenu.css'

import * as React from 'react'
import { Flex } from '../Flex'
import { GrayTheme } from '../Themes'
import { $core } from '../../stores/core/$core'
import { VboardKey } from './VboardKey'

import useKeyboardEvents from '@acusti/use-keyboard-events'
import { $midi } from '../../stores/midi/$midi'

type VboardRowPropsT = {
	index: number
	qwertyKeys: string[]
}

const VboardRow = (props: VboardRowPropsT) => {
	return (
		<Flex.Row gap="2" data-testid={`VboardRow${props.index}`} className="VboardRow">
			{props.qwertyKeys.map((keyCode) => {
				return <VboardKey key={keyCode} keyCode={keyCode} />
			})}
		</Flex.Row>
	)
}

const midiOn: number[] = []

export const Vboard = React.memo(() => {
	const rows = $core.useQwertyStringRows() as string[][]

	const handleFunction = (event: KeyboardEvent) => {
		event.preventDefault()

		const qwertyKey = $core.getQwertyKey(event.code)
		if (!qwertyKey) return

		if (qwertyKey.function === 'toggleLabels') {
			const shouldShowAltLabels = $core.state.shouldShowAltLabels
			$core.setShouldShowAltLabels(!shouldShowAltLabels)
		}

		if (qwertyKey.function === 'toggleMidiOutput') {
			const isMidiEnabled = $midi.state.isMidiEnabled
			$midi.setIsMidiEnabled(!isMidiEnabled)
		}

		if (qwertyKey.function === 'foo') {
			console.log('foo')
		}
	}

	const handleEngageButton = (event: KeyboardEvent) => {
		console.log('handleEngageButton')
		handleFunction(event)
		const midi = $core.getMidiForKeyCode(event.code)
		const isAlreadyPressed = $core.checkIfKeyIsPressed(event.code)
		if (isAlreadyPressed) return
		$core.reportKeyDown(event.code)
		if (!midi) return
		const isMidiEnabled = $midi.state.isMidiEnabled
		const isMidiReady = $midi.state.isMidiReady
		const shouldBroadcast = isMidiEnabled && isMidiReady
		shouldBroadcast && midiOn.push(midi)
		shouldBroadcast && $midi.broadcastNoteStart(midi)
	}

	const handleDisengageButton = (event: KeyboardEvent) => {
		console.log('keyup happened...')
		const midi = $core.getMidiForKeyCode(event.code)
		$core.reportKeyUp(event.code)
		if (!midi) return
		midiOn.splice(midiOn.indexOf(midi), 1)
		$midi.broadcastNoteEnd(midi)
	}

	useKeyboardEvents({
		onKeyDown: handleEngageButton,
		onKeyUp: handleDisengageButton
	})

	return (
		<GrayTheme>
			<GlowPixels />

			<Flex.Column gap="2" p="2" className="Vboard" data-testid="Vboard">
				{rows.map((qwertyKeys, index) => (
					<VboardRow key={index} index={index} qwertyKeys={qwertyKeys} />
				))}
			</Flex.Column>
		</GrayTheme>
	)
})

// Make it look cool. That is all.
const GlowPixels = () => {
	return (
		<>
			<span className="pixel0"> </span>
			<span className="pixel1"> </span>
			<span className="pixel2"> </span>
		</>
	)
}
