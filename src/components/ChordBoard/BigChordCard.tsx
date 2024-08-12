import './BigChordCard.css'

import * as React from 'react'
import { Flex } from '../Flex'
import { Text, Button } from '@radix-ui/themes'
import { toner } from '../../utilities/toner'
import { store } from '../../store'
import appConfig from '../../consts/app.config.json'
import classcat from 'classcat'
import * as Tonal from 'tonal'

type PropsT = {
	chordName: string
}

const useChord = (chordName: string) => {
	return React.useMemo(() => {
		return Tonal.Chord.get(chordName)
	}, [chordName])
}

export const BigChordCard = React.memo((props: PropsT) => {
	const isPlaying = store.useIsChordPlaying(props.chordName)
	const isPlayingClassName = isPlaying && 'ChordCardPlaying'
	const className = classcat(['ChordCard', isPlayingClassName])
	const chord = useChord(props.chordName)
	const color = appConfig.tonicColors[chord.tonic]

	const onMouseDown = () => {
		store.addPlayingChordName(props.chordName)
	}

	return (
		<Button size="3" className={className} color={color} variant="surface" onMouseDown={onMouseDown}>
			<Flex.Row gap="3" align="center">
				<Text className="BigChordCardChordName">{chord.symbol}</Text>
			</Flex.Row>
		</Button>
	)
})
