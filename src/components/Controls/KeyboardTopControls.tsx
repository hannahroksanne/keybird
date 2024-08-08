import { Flex } from '../Flex'
import { KeyNameSelect, MidiControls, ScaleNameSelect } from './ScaleControls'

export const KeyboardTopControls = () => {
	return (
		<Flex.Row align="center" justify="end" className="KeyboardTopControls" gap="6">
			<Flex.Row gap="6" pl="4" align="center">
				<KeyNameSelect />
				<ScaleNameSelect />
			</Flex.Row>
			<MidiControls />
		</Flex.Row>
	)
}
