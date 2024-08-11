import { Spinner, Select } from '@radix-ui/themes'
import { $midi, $core } from '../../stores'
import { MidiOutputSelector } from './MidiOutputSelector'
import { MidiToggleSwitch } from './MidiToggleSwitch'
import { MidiWarningMessage } from '../MidiWarningMessage'
import { Flex } from '../Flex'
import { store } from '../../store'

export const MidiControls = () => {
	const isMidiReady = store.useIsMidiConnected()

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
	const rootNote = store.useScaleRootNote()

	const reportKeyNameChange = (newRootNote: string) => {
		store.setScaleRootNote(newRootNote)
	}

	return (
		<Select.Root size="3" value={rootNote} onValueChange={reportKeyNameChange}>
			<Select.Trigger variant="ghost" />
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

export const ScaleNameSelect = () => {
	const scaleType = store.useScaleType()

	const changeScaleType = (newScaleType: string) => {
		store.setScaleType(newScaleType)
	}

	return (
		<Select.Root size="3" value={scaleType} onValueChange={changeScaleType}>
			<Select.Trigger variant="ghost" />
			<Select.Content position="popper">
				<Select.Item value="major">major</Select.Item>
				<Select.Item value="minor">minor</Select.Item>
			</Select.Content>
		</Select.Root>
	)
}
