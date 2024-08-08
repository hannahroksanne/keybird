import * as Tonal from 'tonal'
import mems from 'mems'

import { CHORDS } from '../consts/oldChords.ts'
import { ALL_SCALES } from './allScales'
import { SYMBOLS } from '../consts/symbols'
import ALL_SCALE_NAMES from './allScaleNames.json'
import ALL_SCALES_CHORDS from './allScalesChords.json'
import { PLAYABLE_KEY_CODES } from './allPlayableKeyCodes'
import { isSubsetOf } from 'is-subset-of'
import { ROOT_NOTES } from '../consts/scales'

// This is necessary because for some reason if
// we do not access the objects early, they can
// act fucky. For example, accessing ALL_SCALES
// was for some reason giving the data for ALL_SCALE_NAMES.

const ALL = {
	SCALES: ALL_SCALES,
	SCALE_NAMES: ALL_SCALE_NAMES,
	CHORDS: CHORDS,
	SYMBOLS: SYMBOLS,
	NOTES: ROOT_NOTES,
	SCALES_CHORDS: ALL_SCALES_CHORDS,
	PLAYABLE_KEYS: PLAYABLE_KEY_CODES
}

const getNotesCompliance = (notes0: string[], notes1: string[]) => {
	return notes0.every((note) => notes1.includes(note))
}

// ########## getNotesInScale ##########
// getNotesInScale is a helper function that returns
// an array of notes based on the provided scale name.
// It uses the Tonal library to get the notes in the scale.

export const getNotesInScale = mems((scale: string): string[] => {
	return Tonal.Scale.get(scale).notes
})

// ########## getNotesInChord ##########
// getNotesInChord is a helper function that returns
// an array of notes based on the provided chord name.
// It uses the Tonal library to get the notes in the chord.

export const getNotesInChord = mems((chord: string) => {
	return Tonal.Chord.get(chord).notes
})

// ########## getScaleNotesCompliance ##########
// getScaleNotesCompliance is a helper function that returns
// a boolean based on the provided notes and scale. It uses
// the provided notes to determine if all notes are in the
// scale.

export const getScaleNotesCompliance = (notes: string[], scale: string): boolean => {
	const scaleNotes = getNotesInScale(scale)
	return notes.every((note) => scaleNotes.includes(note))
}

// ########## getChordNotesCompliance ##########
// getChordNotesCompliance is a helper function that returns
// a boolean based on the provided notes and chord. It uses
// the provided notes to determine if all notes are in the
// chord.

export const getChordNotesCompliance = (notes: string[], chord: string): boolean => {
	const chordNotes = getNotesInChord(chord)
	return notes.every((note) => chordNotes.includes(note))
}

// ########## getScaleNamesWithNotes ##########
// getScaleNamesWithNotes is a helper function that returns
// an array of scale names based on the provided notes. It
// uses the provided notes to determine which scales contain
// the notes.

export const getScaleNamesWithNotes = (notes: string[]): string[] => {
	return ALL.SCALE_NAMES.filter((scale) => {
		return getScaleNotesCompliance(notes, scale)
	})
}

// ########## getShortSymbols ##########
// getShortSymbols is a helper function that returns
// an array of the first symbol of each symbol object
// in the provided array of symbols.

export const getShortSymbols = (symbols: VboardT.Symbol[]): string[] => {
	return symbols.map((symbol) => symbol.symbols[0])
}

// generateChords uses SYMBOLS and ALL_NOTES
// to generate a chord for every note paired with
// every symbol. Then, for each chord generated,
// it loops through ALL.SCALE_NAMES and checks each
// scale to see if the chord's keys are in the scale.
// This is used in building the foundational data for
// but is not used in the app, itself. All subsequent
// functions rely on the data that generateChords
// produces and that is saved to allChords.json.

export const generateChords = () => {
	const symbols = ALL.SYMBOLS as VboardT.Symbol[]
	const allNotes = ALL.NOTES as string[]
	const chords = [] as VboardT.Chord[]
	const shortSymbols = getShortSymbols(symbols)

	// For each note --
	// For each symbol, generate the chord.
	for (const note of allNotes) {
		for (const shortSymbol of shortSymbols) {
			const notes = getNotesInChord(`${note}${shortSymbol}`)
			const scaleNames = getScaleNamesWithNotes(notes)
			const chord = { name: `${note}${shortSymbol}`, notes, rootNote: note, scaleNames }
			chords.push(chord)
		}
	}

	return chords
}

// ########## getAllChords ##########
// getAllChords returns all the chords without having to
// import the CHORDS json.

export const getChordsWithNotes = (notes: string[], chords: VboardT.Chord[]) => {
	return chords.filter((chord) => {
		return getChordNotesCompliance(notes, chord.name)
	})
}

// ########## getChordNamesWithNotes ##########
// getChordNamesWithNotes is a helper function that returns
// an array of chord names based on the provided notes and
// chords. It uses the provided notes to determine which
// chords contain the notes.

export const getChordNamesWithNotes = (notes: string[], chords: VboardT.Chord[]) => {
	return getChordsWithNotes(notes, chords).map((chord) => chord.name)
}

// ########## getChordsInScale ##########
// given a scaleName, return a list of all chord names
// that are in the scale.

export const getChordsInScale = (scaleName: VboardT.ScaleName) => {
	return CHORDS.filter((chord) => {
		return chord.scaleNames.includes(scaleName)
	})
}

// ########## getChordNamesInScale ##########
// getChordNamesInScale is a helper function that returns
// an array of chord names based on the provided scale
// name. It uses the provided scale to determine which
// chords are in the scale.

export const getChordNamesInScale = (scaleName: VboardT.ScaleName) => {
	const scale = ALL_SCALES[scaleName]
	return scale?.chordNames || []
}

// ########## generateScales ##########
// generateScales uses ALL.SCALE_NAMES to generate
// a scale object for each scale name. It uses the
// Tonal library to get the notes in each scale and
// the chord names in each scale. It also determines
// the root note and scale type for each scale. This
// is used in building the foundational data for but
// is not used in the app, itself. All subsequent
// functions rely on the data that generateScales
// produces and that is saved to allScales.json.

export const generateScales = () => {
	const scales = {} as VboardT.AllScales[]
	const scaleNames = ALL.SCALE_NAMES as VboardT.ScaleName[]

	for (const scaleName of scaleNames) {
		const chordNames = getChordNamesInScale(scaleName)
		const notes = getNotesInScale(scaleName)
		const rootNote = Tonal.Scale.get(scaleName).tonic as VboardT.RootNote
		const scaleType = Tonal.Scale.get(scaleName).type as VboardT.ScaleType
		scales[scaleName] = { notes, chordNames, rootNote, scaleType }
	}

	return scales
}

export const getNoteSuggestions = mems((notes: string[], scaleName: VboardT.ScaleName) => {
	const noteSuggestions = new Set() as Set<string>

	const cleanedNotes = removeOctaveNumbers(notes)
	const scaleChords = getChordsInScale(scaleName)
	const futureChords = getSuperSets(cleanedNotes, scaleChords)

	// console.log('getting suggestions notes:', notes)

	// console.log('getting suggestions cleanedNotes:', cleanedNotes)
	// console.log('getting suggestions scaleChords:', scaleChords)
	// console.log('getting suggestions futureChords:', futureChords)

	for (const chord of futureChords) {
		const nextNote = getNextNote(cleanedNotes, chord.notes)
		if (nextNote) noteSuggestions.add(nextNote)
		// if (!nextNote) console.error('getNoteSuggestions: nextNote is undefined')
	}

	return Array.from(noteSuggestions)
})

const getSuperSets = (notes: string[], chords: VboardT.Chord[]) => {
	// console.log('get super sets', { notes, chords })
	return chords.filter((chord) => {
		return isSubsetOfTarget(notes, chord.notes)
	})
}

export const isSubsetOfTarget = (notes: string[], target: string[]) => {
	const isSubset = isSubsetOf(notes, target)
	// console.log('is subset of target?', { notes, target, isSubset })
	const isFullSubset = isSubset && notes.length === target.length
	return isFullSubset ? false : isSubset
}

export const getNextNote = (subset: string[], fullSet: string[]): string | undefined => {
	// Find the first note in fullSet that's not in the cleaned subset
	return fullSet.find((note, index) => {
		const subsetNote = subset[index]
		return subsetNote !== note
	})
}

export const removeOctaveNumbers = (notes) => {
	return notes.map((note: string) => note.replace(/[0-9]/g, ''))
}
