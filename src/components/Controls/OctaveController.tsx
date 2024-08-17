import { Label } from '@radix-ui/react-label'
import { Select, Text, TextField } from '@radix-ui/themes'
import { store } from '../../stores/store'
import { Flex } from '../Flex'

export const OctaveController = () => {
	const octave = store.useOctave()

	const setOctave = (newOctave: string) => {
		const value = Number(newOctave)
		store.setOctave(value)
	}

	return (
		<Select.Root value={String(octave)} onValueChange={setOctave}>
			<Select.Trigger>
				<Text className="normalFont">Octave {octave}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				<Select.Item value="0">0</Select.Item>
				<Select.Item value="1">1</Select.Item>
				<Select.Item value="2">2</Select.Item>
				<Select.Item value="3">3</Select.Item>
				<Select.Item value="4">4</Select.Item>
				<Select.Item value="5">5</Select.Item>
				<Select.Item value="6">6</Select.Item>
				<Select.Item value="7">7</Select.Item>
				<Select.Item value="8">8</Select.Item>
			</Select.Content>
		</Select.Root>
	)
}
