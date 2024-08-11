import { InfoCircledIcon, KeyboardIcon, SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons'
import { Button, Spinner } from '@radix-ui/themes'
import { store } from '../../store'
import React from 'react'

const COLOR_OVERRIDES = ['gray', 'gray', 'jade', 'red']
const ICON_OVERRIDES = [Spinner, KeyboardIcon, KeyboardIcon, InfoCircledIcon]
const TEXT_OVERRIDES = ['Connecting MIDI', 'MIDI Disabled', 'MIDI Enabled', 'MIDI Error']
const BACKGROUND_OVERRIDES = [null, 'rgba(0,0,0,0)', null, 'rgba(0,0,0,0)']
const BORDER_OVERRIDES = [null, null, null, 'red']
// 0 midi not connected / midi not enabled
// 1 MIDI CONNECTED / midi not enabled
// 2 MIDI CONNECTED / MIDI ENABLED
// 3 connection error

export const MidiToggleButton = () => {
	const [loadState, setLoadState] = React.useState(0)
	const isMidiEnabled = store.useIsMidiEnabled()
	const isMidiConnected = store.useIsMidiConnected()
	const midiConnectionError = store.useMidiConnectionError()
	const toggleIsMidiEnabled = () => store.toggleIsMidiEnabled()

	// console.log({ isMidiEnabled, isMidiConnected, midiConnectionError })

	const color = COLOR_OVERRIDES[loadState] as any
	const Icon = ICON_OVERRIDES[loadState]
	const text = TEXT_OVERRIDES[loadState]

	React.useEffect(() => {
		if (!midiConnectionError) return
		// console.log('4: midi connection error', midiConnectionError)
		setLoadState(3)
	}, [midiConnectionError])

	React.useEffect(() => {
		if (!isMidiConnected) return
		// console.log('1: midi connected', isMidiConnected)
		setLoadState(1)
	}, [isMidiConnected])

	React.useEffect(() => {
		const isLoadState2 = loadState === 2
		const shouldContinue = isMidiConnected && !isMidiEnabled && isLoadState2
		if (!shouldContinue) return
		// console.log(': midi enabled', isMidiEnabled)
		setLoadState(1)
	}, [isMidiConnected, isMidiEnabled])

	React.useEffect(() => {
		const shouldContinue = isMidiConnected && isMidiEnabled
		if (!shouldContinue) return
		// console.log('2: midi enabled', isMidiEnabled)
		setLoadState(2)
	}, [isMidiEnabled])

	return (
		<Button variant="outline" color={color} size="2" onClick={toggleIsMidiEnabled}>
			<Icon /> {text}
		</Button>
	)
}
