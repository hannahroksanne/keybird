import * as Tonal from 'tonal'
import { isSubsetOf } from 'is-subset-of'
import { CONSTS } from '../../consts'

type NewChordT = {
	intervals: string[]
	symbols: string[]
	name: string
}

// export const getChordRelations = () => {
// 	const _scales = toner.allScales.map((scale: any) => {
// 		scale.chords = []
// 		return scale
// 	})

// 	for (const chord of toner.allChords) {
// 		chord.scales = []

// 		for (const scale of _scales) {
// 			const isChordInScale = isSubsetOf(chord.notes, scale.notes)
// 			if (!isChordInScale) continue
// 			chord.scales.push(scale.name)
// 			scale.chords.push(chord.name)
// 		}
// 	}

// 	console.log({
// 		chords: toner.allChords,
// 		scales: _scales
// 	})
// }

export const toner = {
	getChordNotes: Tonal.Chord.notes,
	getScale: Tonal.Scale.get,
	getChordTypes: Tonal.ChordType.names,
	getChord: Tonal.Chord.get,

	// checkIfChordIsInScale(chordName: string, scaleName: string) {
	// 	const scale = toner.getScale(scaleName)
	// 	const chordNotes = toner.getChordNotes(chordName)
	// 	const isChordInScale = isSubsetOf(chordNotes, scale)
	// 	return isChordInScale
	// },

	// getAllChords() {
	// 	return toner.rootNotes.flatMap((rootNote: string) => {
	// 		return toner.chordNames.map((chordName: string) => `${rootNote}${chordName}`)
	// 	})
	// },

	// registerChord(chord: NewChordT) {
	// 	Tonal.ChordType.add(chord.intervals, chord.symbols, chord.name)
	// },

	// getChordRelations,
	rootNotes: CONSTS.MUSIC.ROOT_NOTES,
	scaleTypes: CONSTS.MUSIC.SCALE_TYPES,
	scaleNAmes: CONSTS.MUSIC.SCALE_NAMES,
	chordNames: CONSTS.MUSIC.CHORD_NAMES,
	chordTypes: CONSTS.MUSIC.CHORD_TYPES,
	scales: CONSTS.MUSIC.SCALES,
	chords: CONSTS.MUSIC.CHORDS
}

// const generateTonerData = () => {
// 	CONSTS.MUSIC.CHORD_TYPES.forEach((chord) => {
// 		toner.registerChord(chord)
// 	})
// 	toner.allChordTypes = toner.getChordTypes()
// 	toner.allChordNames = toner.rootNotes.flatMap((rootNote) => {
// 		return toner.allChordTypes.map((chordName) => `${rootNote}${chordName}`)
// 	})
// 	toner.allChords = toner.allChordNames.map((chordName) => {
// 		return toner.getChord(chordName)
// 	})
// }

// generateTonerData()
