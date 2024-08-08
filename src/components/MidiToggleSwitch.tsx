import { Text, Switch, Tooltip } from '@radix-ui/themes'
import { Flex } from '../components/Flex'
import { KeyboardIcon } from '@radix-ui/react-icons'
import { $midi } from '../stores/midi/$midi'

export const MidiToggleSwitch = () => {
	const isMidiReady = $midi.useIsMidiReady()
	const isMidiEnabled = $midi.useIsMidiEnabled()
	const statusText = isMidiEnabled ? 'Midi Enabled' : 'Midi Disabled'

	const toggleMidi = () => {
		$midi.setIsMidiEnabled(!isMidiEnabled)
	}

	const tooltipText =
		"When disabled, no midi will be sent to your device. Toggle midi on and off with the '\\' (backslash) key."

	return (
		<Tooltip content={tooltipText}>
			<Text as="label" size="2">
				<Flex.Row gap="2">
					<Switch color="orange" disabled={!isMidiReady} checked={isMidiEnabled} onCheckedChange={toggleMidi} />
					{statusText}
					<KeyboardIcon style={{ marginTop: 2, color: 'var(--yellow-a12)' }} />
				</Flex.Row>
			</Text>
		</Tooltip>
	)
}
