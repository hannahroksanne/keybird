import { Select } from '@radix-ui/themes'
import { $midi } from '../views/$midi'

export const MidiOutputSelector = () => {
	const midiOutputs = $midi.use((state) => state.midiOutputs)
	const selectedMidiOutputName = $midi.use((state) => state.selectedMidiOutputName)
	const isMidiEnabled = $midi.use((state) => state.isMidiEnabled)
	const value = isMidiEnabled ? selectedMidiOutputName : 'Disabled'

	if (!isMidiEnabled) return null

	return (
		<Select.Root value={value}>
			<Select.Trigger />
			<Select.Content>
				{midiOutputs.map((output) => (
					<Select.Item key={output.name} value={output.name}>
						{output.name}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}
