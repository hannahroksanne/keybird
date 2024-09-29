import * as Tonal from 'tonal'
import scaleTypes from '#/configuration/theory/scales.json'
import chordTypes from '#/configuration/theory/chords.json'

type NewChordT = {
	intervals: string[]
	symbols: string[]
	name: string
}

const buildScalesMap = (scaleTypes, chordTypes) => {
	const map = new Map()

	// Register chords with Tonal.
	for (const chordType of chordTypes) {
		Tonal.ChordType.add(chordType.intervals, chordType.aliases, chordType.name)
	}

	// Create a map of scale names to scale objects
	// that are pre-set-up and ready for easy lookup.
	for (const scale of scaleTypes) {
		const chords = new Map()
		const chordNames = []

		for (const chordName of scale.chordNames) {
			const chord = Tonal.Chord.get(chordName)
			chords.set(chord.symbol, chord)
			chordNames.push(chord.symbol)
		}

		map.set(scale.name, {
			name: scale.name,
			intervals: scale.intervals,
			aliases: scale.aliases,
			type: scale.type,
			tonic: scale.tonic,
			notes: scale.notes,
			chords,
			chordNames
		})
	}

	return map
}

export const scales = buildScalesMap(scaleTypes, chordTypes)
