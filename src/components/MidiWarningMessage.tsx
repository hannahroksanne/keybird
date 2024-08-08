import { Text, Tooltip } from '@radix-ui/themes'
import { $midi } from '../stores/midi/$midi'

export const MidiWarningMessage = () => {
	const warningMessage = $midi.useWarningMessage()

	if (!warningMessage) return null

	return (
		<Tooltip content={'foo bar baz'}>
			<Text as="label" size="2" color="orange">
				{warningMessage}
			</Text>
		</Tooltip>
	)
}
