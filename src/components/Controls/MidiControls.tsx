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
		<Flex.Row gap="2" align="center">
			<MidiWarningMessage />
			<MidiOutputSelector />
			<MidiToggleSwitch />
		</Flex.Row>
	)
}
