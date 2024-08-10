import './Vboard.css'
import './VboardKeyMenu.css'

import * as React from 'react'
import { Flex } from '../Flex'
import { GrayTheme } from '../Themes'
import { $core } from '../../stores/core/$core'
import { VboardKey } from './VboardKey'

import useKeyboardEvents from '@acusti/use-keyboard-events'
import { $midi } from '../../stores/midi/$midi'
import { $logs } from '../../stores'

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

		const qwertyKey = $core.getQwertyKey(event.code) as QwertyKeyT
		if (!qwertyKey) return

		if (qwertyKey.function === 'toggleLabels') {
			const shouldShowAltLabels = $core.state.shouldShowAltLabels
			$core.setShouldShowAltLabels(!shouldShowAltLabels)
		}

		if (qwertyKey.function === 'toggleMidiOutput') {
			const isMidiEnabled = $midi.state.isMidiEnabled
			$midi.setIsMidiEnabled(!isMidiEnabled)
		}

		if (qwertyKey.function === 'toggleDevLogList') {
			$logs.toggleLogListOpen(!$logs.state.isLogListOpen)
		}
	}

	const handleEngageButton = (event: KeyboardEvent) => {
		handleFunction(event)
		const key = $core.getQwertyKey(event.code) as QwertyKeyT
		const isAlreadyPressed = $core.checkIfKeyIsPressed(event.code)
		if (isAlreadyPressed) return
		$core.reportKeyDown(event.code)
		if (!key.isPlayable) return
		const isMidiEnabled = $midi.state.isMidiEnabled
		const isMidiReady = $midi.state.isMidiReady
		const shouldBroadcast = isMidiEnabled && isMidiReady
		shouldBroadcast && $midi.playNote(key.note)
	}

	const handleDisengageButton = (event: KeyboardEvent) => {
		const key = $core.getQwertyKey(event.code)
		$core.reportKeyUp(event.code)
		if (!key.isPlayable) return
		$midi.stopNote(key.note)
	}

	useKeyboardEvents({
		onKeyDown: handleEngageButton,
		onKeyUp: handleDisengageButton
	})

	return (
		<GrayTheme>
			<Flex.Column gap="2" p="2" className="Vboard" data-testid="Vboard">
				{rows.map((qwertyKeys, index) => (
					<VboardRow key={index} index={index} qwertyKeys={qwertyKeys} />
				))}
			</Flex.Column>
		</GrayTheme>
	)
})
