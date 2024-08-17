import { Text, Button, Select } from '@radix-ui/themes'
import { store } from '../../stores/store'

export const MidiOutputSelector = () => {
	const midiOutputNames = store.useMidiOutputNames()
	const selectedMidiOutputName = store.useMidiOutputName()
	const isMidiEnabled = store.useIsMidiEnabled()
	const isMidiConnected = store.useIsMidiConnected()
	const isGoodToGo = isMidiEnabled && isMidiConnected
	const value = isGoodToGo ? selectedMidiOutputName : 'Disabled'
	const isInstrument = selectedMidiOutputName === 'builtIn'

	const setMidiOutputName = (newMidiOutputName: string) => {
		store.setMidiOutputName(newMidiOutputName)
	}

	return (
		<Select.Root value={value} onValueChange={setMidiOutputName}>
			<Select.Trigger>
				<Text className="normalFont">Output: {value}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				{midiOutputNames.map((name) => (
					<Select.Item key={name} value={name}>
						{name}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}
