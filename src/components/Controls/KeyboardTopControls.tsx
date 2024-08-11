import { Label } from '@radix-ui/react-label'
import { TextField } from '@radix-ui/themes'
import { store } from '../../store'
import { Flex } from '../Flex'
import { KeyNameSelect, MidiControls, ScaleNameSelect } from './ScaleControls'

const OctaveController = () => {
	const octave = store.useOctave()

	const setOctave = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value)
		store.setOctave(value)
	}

	return (
		<Flex.Row gap="2" align="center">
			<TextField.Root
				className="OctaveController"
				placeholder="Octave"
				type="number"
				min="0"
				max="8"
				value={octave}
				onChange={setOctave}
			>
				<TextField.Slot>Octave</TextField.Slot>
			</TextField.Root>
		</Flex.Row>
	)
}

export const KeyboardTopControls = () => {
	return (
		<Flex.Row align="center" justify="between" className="KeyboardTopControls" gap="6">
			<Flex.Row gap="6" align="center">
				<KeyNameSelect />
				<ScaleNameSelect />
				<OctaveController />
			</Flex.Row>
			<MidiControls />
		</Flex.Row>
	)
}
