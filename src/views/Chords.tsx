import { Heading } from '@radix-ui/themes'
import { Flex } from '../components/Flex'
import { Spacer } from '../components/Spacer'
import { ChordBoard } from '../components/ChordBoard/ChordBoard'
import { MessyKeys } from '../components/MessyKeys'

export const Chords = () => {
	return (
		<Flex.Column data-testid="ChordsScene" style={{ width: '100%', height: '100%' }} px="4">
			<Spacer size="24px" />
			<Flex.Row>
				<Heading size="5">Chords</Heading>
			</Flex.Row>
			<Spacer size="12px" />
			<MessyKeys />
			<ChordBoard />
		</Flex.Column>
	)
}
