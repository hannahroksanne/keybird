import { Text, Button, Select } from '@radix-ui/themes'
import { store } from '../../store'

export const MidiOutputSelector = () => {
	const midiOutputNames = store.useMidiOutputNames()
	const selectedMidiOutputName = store.useMidiOutputName()
	const isMidiEnabled = store.useIsMidiEnabled()
	const isMidiConnected = store.useIsMidiConnected()
	const isGoodToGo = isMidiEnabled && isMidiConnected
	const value = isGoodToGo ? selectedMidiOutputName : 'Disabled'

	return (
		<Select.Root value={value}>
			<Select.Trigger>
				<Text className="normalFont">MIDI Output: {value}</Text>
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
