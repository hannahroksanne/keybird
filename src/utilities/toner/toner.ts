import * as Tonal from 'tonal'
import { isSubsetOf } from 'is-subset-of'
import { CONSTS } from '../../consts'
import mems from 'mems'
import range from 'array-range'

const scalesMap = CONSTS.MUSIC.SCALES.reduce((final, scale) => {
	final.set(scale.name, scale)
	return final
}, new Map())

type NewChordT = {
	intervals: string[]
	symbols: string[]
	name: string
}

function registerChord(chord: NewChordT) {
	Tonal.ChordType.add(chord.intervals, chord.symbols, chord.name)
}

function prepareChords() {
	CONSTS.MUSIC.CHORD_TYPES.forEach((chord) => {
		registerChord(chord)
	})
}

prepareChords()

const getChordNamesFromScaleName = (scaleName: string) => scalesMap.get(scaleName).chords
const getNoteRootNote = (note: string) => {
	return note.replace(/\d/, '')
}
const getNotesRootNotes = (notes: string[]) => {
	return notes.map(getNoteRootNote)
}
const getOctavedNotes = (notes, octave) => {
	const rootNotes = CONSTS.MUSIC.ROOT_NOTES
	let currentOctave = octave
	let lastNoteRootIndex = -1

	return notes.map((note: string, index: number) => {
		const isFirstIteration = index === 0
		// Remove any previous octave number from the note.
		const cleanNote = note.replace(/\d/, '')
		// Get the note's index in the root notes array.
		const rootIndex = rootNotes.indexOf(cleanNote)
		const isRootIndexLowerThanLast = rootIndex < lastNoteRootIndex
		// If the note's root index is less than the last note's
		// root index, increment the octave. (But not on the first note.)
		if (!isFirstIteration && isRootIndexLowerThanLast) currentOctave++
		lastNoteRootIndex = rootIndex
		return `${cleanNote}${currentOctave}`
	})
}

const getNotesFromScaleName = (scaleName: string) => scalesMap.get(scaleName).notes

// Just add whatever octave to all the notes provided.
const getNotesWithOctave = (notes, octave) => notes.map((note) => `${note}${octave}`)

function getRepeatedScaleNotes(scaleNotes: string[]) {
	return [
		...scaleNotes,
		...scaleNotes,
		...scaleNotes,
		...scaleNotes,
		...scaleNotes,
		...scaleNotes,
		...scaleNotes,
		...scaleNotes
	]
}

type GetManyOctavedNotesOptionsT = {
	count: number
	scaleNotes: string[]
	baseOctave: number
}

// Given a count, a base octave, and the notes of the scale,
// generates an array of `count` length of octaved notes.
function getManyOctavedNotes(options: GetManyOctavedNotesOptionsT) {
	const repeatedScaleNotes = getRepeatedScaleNotes(options.scaleNotes)
	const octavedScaleNotes = getOctavedNotes(repeatedScaleNotes, options.baseOctave)
	const indexes = range(options.count)

	return indexes.map((index: number) => {
		return octavedScaleNotes[index]
	})
}

const getChordSymbol = (chordName: string) => {
	const chord = Tonal.Chord.get(chordName)
	return chord.symbol
}

export const toner = {
	getChordNotes: Tonal.Chord.notes,
	getScale: Tonal.Scale.get,
	getChordTypes: Tonal.ChordType.names,
	getChord: Tonal.Chord.get,
	getChordSymbol,
	getOctavedNotes,
	getNoteRootNote,
	getNotesRootNotes,
	getNotesWithOctave,
	getNotesFromScaleName,
	getChordNamesFromScaleName,
	getManyOctavedNotes,
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

// getChordRelations,
