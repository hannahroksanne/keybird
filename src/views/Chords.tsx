import { Heading } from '@radix-ui/themes'
import { Flex } from '../components/Flex'
import { Spacer } from '../components/Spacer'
import { ChordBoard } from '../components/ChordBoard/ChordBoard'
import { ConfigurableKeys } from '../components/ConfigurableKeys'

export const Chords = () => {
	return (
		<Flex.Column data-testid="ChordsScene" style={{ width: '100%', height: '100%' }} p="4">
			{/* <Spacer size="24px" /> */}
			<Flex.Row mb="12px">{/* <Heading size="5">Chords</Heading> */}</Flex.Row>
			<ConfigurableKeys />
			<ChordBoard />
		</Flex.Column>
	)
}
