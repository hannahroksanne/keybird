import { Heading } from '@radix-ui/themes'
import { Flex } from '../components/Flex'
import { Spacer } from '../components/Spacer'
import { ChordBoard } from '../components/ChordBoard/ChordBoard'
import { ConfigurableKeysColumn } from '../components/ConfigurableKeysColumn'

export const Chords = () => {
	return (
		<Flex.Row gap="4" data-testid="ChordsScene" style={{ width: '100%' }} p="4">
			<ConfigurableKeysColumn />
			<ChordBoard />
		</Flex.Row>
	)
}
