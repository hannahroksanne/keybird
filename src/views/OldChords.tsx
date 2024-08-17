import { Flex } from '../components/Flex'
import { ChordBoard } from '../components/ChordBoard/ChordBoard'
import { ConfigurableKeysColumn } from '../components/ConfigurableKeysColumn'
import { ChordKeybindOverlay } from '../components/ChordKeyBindOverlay'
import { store } from '../stores/store'

export const Chords = () => {
	return (
		<Flex.Row gap="4" data-testid="ChordsScene" style={{ width: '100%' }} p="4">
			<ConfigurableKeysColumn />
			<ChordBoard />
		</Flex.Row>
	)
}
