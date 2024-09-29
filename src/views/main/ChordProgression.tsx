import './ChordProgression.css'
import { Flex } from '#/components/layout/Flex'
import { Text } from '@radix-ui/themes'
import { useChordProgressionStore } from './store'
import { ChordBlock } from './ChordBlock'

export const ChordProgression = () => {
	const { chords } = useChordProgressionStore()

	return (
		<Flex.Row className="ChordProgression" gap="4" p="4">
			{chords.map((chord) => (
				<ChordBlock key={chord.id} chord={chord} />
			))}
		</Flex.Row>
	)
}
