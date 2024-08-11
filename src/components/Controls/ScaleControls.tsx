import { Spinner, Select, Text } from '@radix-ui/themes'
import { Flex } from '../Flex'
import { store } from '../../store'

export const KeyNameSelect = () => {
	const rootNote = store.useScaleRootNote()

	const reportKeyNameChange = (newRootNote: string) => {
		store.setScaleRootNote(newRootNote)
	}

	return (
		<Select.Root size="2" value={rootNote} onValueChange={reportKeyNameChange}>
			<Select.Trigger>
				<Text className="normalFont">Key: {rootNote}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				<Select.Item value="C">C</Select.Item>
				<Select.Item value="C#">C#</Select.Item>
				<Select.Item value="D">D</Select.Item>
				<Select.Item value="D#">D#</Select.Item>
				<Select.Item value="E">E</Select.Item>
				<Select.Item value="F">F</Select.Item>
				<Select.Item value="F#">F#</Select.Item>
				<Select.Item value="G">G</Select.Item>
				<Select.Item value="G#">G#</Select.Item>
				<Select.Item value="A">A</Select.Item>
				<Select.Item value="A#">A#</Select.Item>
				<Select.Item value="B">B</Select.Item>
			</Select.Content>
		</Select.Root>
	)
}

export const ScaleTypeSelect = () => {
	const scaleType = store.useScaleType()

	const changeScaleType = (newScaleType: string) => {
		store.setScaleType(newScaleType)
	}

	return (
		<Select.Root size="2" value={scaleType} onValueChange={changeScaleType}>
			<Select.Trigger>
				<Text className="normalFont">Scale: {scaleType}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				<Select.Item value="major">major</Select.Item>
				<Select.Item value="minor">minor</Select.Item>
			</Select.Content>
		</Select.Root>
	)
}
