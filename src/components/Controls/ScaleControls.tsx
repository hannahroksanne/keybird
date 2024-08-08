import { Spinner, Select } from '@radix-ui/themes'
import { $midi, $core } from '../../stores'
import { MidiOutputSelector } from './MidiOutputSelector'
import { MidiToggleSwitch } from './MidiToggleSwitch'
import { MidiWarningMessage } from '../MidiWarningMessage'
import { Flex } from '../Flex'

export const MidiControls = () => {
	const isMidiReady = $midi.useIsMidiReady()

	if (!isMidiReady) {
		return <Spinner title="Preparing midi." />
	}

	return (
		<Flex.Row gap="4" align="center">
			<MidiWarningMessage />
			<MidiOutputSelector />
			<MidiToggleSwitch />
		</Flex.Row>
	)
}

export const KeyNameSelect = () => {
	const rootNote = $core.use((state) => state.scaleRootNote)

	const reportKeyNameChange = (newRootNote: string) => {
		$core.setScaleRootNote(newRootNote as any)
	}

	return (
		<Select.Root size="3" value={rootNote} onValueChange={reportKeyNameChange}>
			<Select.Trigger variant="ghost" />
			<Select.Content>
				<Select.Group>
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
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

export const ScaleNameSelect = () => {
	const scaleType = $core.use((state) => state.scaleType)

	const changeScaleType = (newScaleType: string) => {
		$core.setScaleType(newScaleType as any)
	}

	return (
		<Select.Root size="3" value={scaleType} onValueChange={changeScaleType}>
			<Select.Trigger variant="ghost" />
			<Select.Content>
				<Select.Group>
					<Select.Item value="major">major</Select.Item>
					<Select.Item value="minor">minor</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}
