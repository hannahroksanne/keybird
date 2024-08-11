import './ChordBoard.css'
import './ChordCard.css'

import * as React from 'react'
import { Flex } from '../Flex'
import { Text, Card, Heading, Button } from '@radix-ui/themes'
import { toner } from '../../utilities/toner/toner'
import { store } from '../../store'
import appConfig from '../../app.config.json'
import classcat from 'classcat'

type PropsT = {
	chordName: string
}

const useChord = (chordName: string) => {
	return React.useMemo(() => {
		return toner.chords.find((chord) => chord.name === chordName)
	}, [chordName])
}

export const ChordCard = React.memo((props: PropsT) => {
	const maxComplexity = store.useMaxChordComplexity()
	const isPlaying = store.useIsChordPlaying(props.chordName)
	const isPlayingClassName = isPlaying && 'ChordCardPlaying'
	const className = classcat(['ChordCard', isPlayingClassName])

	const chord = useChord(props.chordName)
	const color = appConfig.tonicColors[chord.tonic]
	if (chord.notes.length > maxComplexity) return null

	const onMouseDown = () => {
		store.addPlayingChordName(props.chordName)
	}

	return (
		<Button className={className} color={color} variant="ghost" onMouseDown={onMouseDown}>
			<Flex.Row gap="3" align="center">
				<Text className="ChordCardChordName">{chord.symbol}</Text>
			</Flex.Row>
		</Button>
	)
})
