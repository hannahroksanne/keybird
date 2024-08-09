import './ChordBoard.css'
import './ChordCard.css'

import * as React from 'react'
import { Flex } from '../Flex'
import { Text, Card, Heading } from '@radix-ui/themes'
import { toner } from '../../utilities/toner/toner'
import { $core, $midi } from '../../stores'

type PropsT = {
	chordName: string
}

const useChord = (chordName: string) => {
	return React.useMemo(() => {
		return toner.chords.find((chord) => chord.name === chordName)
	}, [chordName])
}

export const ChordCard = (props: PropsT) => {
	const chord = useChord(props.chordName)
	const color = tonicColors[chord.tonic]

	return (
		<Card className="ChordCard" style={{ background: `var(--${color}-a6)` }}>
			<Flex.Row gap="3" align="center">
				<Text className="ChordCardChordName">{chord.symbol}</Text>
			</Flex.Row>
		</Card>
	)
}

const tonicColors = {
	C: 'mint',
	'C#': 'sky',
	Db: 'violet',
	D: 'plum',
	'D#': 'crimson',
	Eb: 'tomato',
	E: 'orange',
	F: 'lime',
	'F#': 'grass',
	Gb: 'teal',
	G: 'cyan',
	'G#': 'indigo',
	Ab: 'pink',
	A: 'ruby',
	'A#': 'amber',
	Bb: 'bronze',
	B: 'jade'
}

const playChord = (chordName: string) => {
	// get octave from $core
	const octave = $core.state.octave
	const notes = toner.getChordNotes(chordName)
	const octavedNotes = toner.getOctavedNotes(notes, octave)
	const midiNotes = toner.getMidiNotes(octavedNotes)

	for (const midiNote of midiNotes) {
		$midi.broadcastNoteStart(midiNote)
	}
}

// handleChord({
//   chordName: 'C minor',
//   octave: 3,

// })

// const handleChord = (options) => {

// }
