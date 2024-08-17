import { CheckCircledIcon, CheckIcon, SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons'
import { Button, Spinner, Select, Text } from '@radix-ui/themes'
import { store } from '../stores/store'
import React from 'react'

const TEXT_OVERRIDES = ['Output Disabled', 'Loading Instruments', 'Loaded Instruments', 'Output Enabled']
const ICON_OVERRIDES = [SpeakerOffIcon, Spinner, CheckCircledIcon, CheckCircledIcon]
const BUTTON_COLOR_OVERRIDES = ['red', 'gray', 'grass', 'jade']
const ICON_COLOR_OVERRIDES = ['white', 'gray', 'grass']
const BUTTON_VARIANT_OVERRIDES = ['solid', 'outline', 'outline', 'outline']
const BACKGROUND_OVERRIDES = [null, 'rgba(0,0,0,0)', null]
const BUTTON_TEXT_COLOR_OVERRIDES = [null, null, null]

export const OutputController = () => {
	const [loadState, setLoadState] = React.useState(0)
	const [hasLoaded, setHasLoaded] = React.useState(false)

	const areInstrumentsLoaded = store.useAreInstrumentsLoaded()
	const isOutputEnabled = store.useIsOutputEnabled()
	const toggleOutputEnabled = () => store.toggleIsOutputEnabled()

	const Icon = ICON_OVERRIDES[loadState]
	const text = TEXT_OVERRIDES[loadState]
	const iconColor = ICON_COLOR_OVERRIDES[loadState]
	const variant = BUTTON_VARIANT_OVERRIDES[loadState] as any
	const color = BUTTON_COLOR_OVERRIDES[loadState] as any
	const background = BACKGROUND_OVERRIDES[loadState]
	const textColor = BUTTON_TEXT_COLOR_OVERRIDES[loadState]

	React.useEffect(() => {
		if (!isOutputEnabled && hasLoaded) return setLoadState(0)
		if (isOutputEnabled && !hasLoaded) return setLoadState(1)
		if (isOutputEnabled && hasLoaded) setLoadState(3)
	}, [isOutputEnabled])

	React.useEffect(() => {
		if (!isOutputEnabled) return
		if (loadState === 1 && !areInstrumentsLoaded) return
		if (loadState === 1 && areInstrumentsLoaded && hasLoaded) return setLoadState(3)
		if (loadState === 1 && areInstrumentsLoaded && !hasLoaded) {
			setLoadState(2)
			setHasLoaded(true)
			setTimeout(() => setLoadState(3), 2000)
		}
	}, [areInstrumentsLoaded])

	return (
		<Button variant={variant} color={color} size="2" onClick={toggleOutputEnabled} style={{ background, color: textColor }}>
			<Icon style={{ color: iconColor, fill: iconColor }} /> {text}
		</Button>
	)
}

export const InstrumentSelector = () => {
	const loadedInstruments = store.useLoadedInstruments()
	const selectedInstrumentName = store.useSelectedInstrumentName()
	const instrumentNames = Object.keys(loadedInstruments)

	return (
		<Select.Root value={selectedInstrumentName} onValueChange={store.setSelectedInstrumentName}>
			<Select.Trigger>
				<Text className="normalFont">Instrument: {selectedInstrumentName}</Text>
			</Select.Trigger>
			<Select.Content>
				{instrumentNames.map((name) => (
					<Select.Item key={name} value={name}>
						{name}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}
