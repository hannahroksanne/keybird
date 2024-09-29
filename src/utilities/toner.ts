// @ts-nocheck

import * as Tonal from 'tonal'
import { isSubsetOf } from 'is-subset-of'
import * as CONSTS from '#/configuration'
import ROOT_NOTES from '#/configuration/theory/rootNotes.json'
import SCALES from '#/configuration/theory/scales.json'
import CHORD_NAMES from '#/configuration/theory/chordNames.json'
import SCALE_NAMES from '#/configuration/theory/scaleNames.json'
import CHORD_TYPES from '#/configuration/theory/chordTypes.json'
import mems from 'mems'
import range from 'array-range'

import getPossibilities from 'just-permutations'
import getDeviation from 'just-standard-deviation'
import getSkewness from 'just-skewness'
import getVariance from 'just-variance'
import groupBy from 'just-group-by'
import sortBy from 'just-sort-by'
import memoize from 'just-memoize'

const getFirstTwo = (target: string) => target.slice(0, 2)
const checkSharpOrFlat = (target: string) => getFirstTwo(target).match(/[#b]/)
const getRootNote = (target: string) => (checkSharpOrFlat(target) ? getFirstTwo(target) : target[0])

const SHARP_KEYS = ['C#', 'Db', 'D#', 'Eb', 'F#', 'Gb', 'G#', 'Ab', 'A#', 'Bb']
const FLAT_KEYS = ['Fb', 'Cb', 'Bb', 'Eb', 'Ab', 'Db', 'Gb', 'Bb', 'Eb', 'Ab']

const scalesMap = SCALES.reduce((final, scale) => {
	final.set(scale.name, scale)
	return final
}, new Map())

type NewChordT = {
	intervals: string[]
	symbols: string[]
	name: string
}

class Theory {
	constructor(chordTypes: any = []) {
		chordTypes.forEach((chordType) => {
			this.registerChord(chordType)
		})
	}

	getChordSkewNess(chordName: string) {
		const chordNotes = Tonal.Chord.notes(chordName)
		const midiNotes = chordNotes.map((note) => Tonal.Note.midi(note + 2))
		return getSkewness(midiNotes)
	}

	getScaleChordNames = (scaleName: string) => {
		return scalesMap.get(scaleName).chordNames
	}

	getRootNoteGroupedChordNames = memoize((scaleName: string) => {
		console.log('!!getRootNoteGroupedChordNames !!!!!!!!', scaleName)
		const chordNames = this.getScaleChordNames(scaleName)
		const notes = this.getScaleNotes(scaleName)

		const rootNoteMap = notes.reduce((final, note) => {
			final[note] = []
			return final
		}, {})

		return chordNames.reduce((final, chordName) => {
			const root = chordName.split('')[0]
			final[root].push(chordName)
			return final
		}, rootNoteMap)
	})

	getIsBlackKey = (note: string) => {
		return SHARP_KEYS.includes(Tonal.Note.get(note).pc)
	}

	getAllChordsInScale = mems((scaleName: string) => {
		const allChordNames = CHORD_NAMES
		const scale = this.getScale(scaleName)
		const inScaleChordNames = []

		for (const chordName of allChordNames) {
			const chord = Tonal.Chord.get(chordName)
			const isSubset = isSubsetOf(chord.notes, scale.notes)
			if (isSubset) inScaleChordNames.push(chordName)
		}

		return inScaleChordNames
	})

	registerChord(chord: NewChordT) {
		Tonal.ChordType.add(chord.intervals, chord.symbols, chord.name)
	}

	getScale(scaleName: string) {
		return Tonal.Scale.get(scaleName)
	}

	getScaleNotes(scaleName: string) {
		return Tonal.Scale.get(scaleName).notes
	}

	getNoteRootNote(note: string) {
		return Tonal.Note.get(note).pc
	}

	getNotesWithoutOctaves(notes: string[]) {
		// return notes.map(this.getNoteRootNote)
		return notes.map((note) => note.replace(/\d/, ''))
	}

	getChordNamesFromScaleName = mems((scaleName: string) => {
		const chords = scalesMap.get(scaleName).chordNames
		return Array.from(new Set(chords))
	})

	getChord = mems((chordName: string) => {
		return Tonal.Chord.get(chordName)
	})

	getChordNotes(chordName: string) {
		return Tonal.Chord.notes(chordName)
	}

	getChordType(chordName: string) {
		return Tonal.ChordType.get(chordName)
	}

	getChordSymbol(chordName: string) {
		return Tonal.Chord.symbol(chordName)
	}

	getChordTypeNames() {
		return Tonal.ChordType.names()
	}

	getChordNames() {
		return Tonal.Chord.names()
	}

	getScaleChordNamesByRootNote = memoize((scaleName: string, rootNote: string) => {
		console.log('!!!getScaleChordNamesByRootNote', scaleName, rootNote)
		const groupedChordNames = this.getRootNoteGroupedChordNames(scaleName)
		return groupedChordNames[rootNote]
	})

	// getScaleChordNames(scaleName: string) {
	// 	return scalesMap.get(scaleName).chords
	// }

	getScaleNames() {
		return Tonal.Scale.names()
	}

	getNoteNames() {
		return Tonal.Note.names()
	}

	getOctavedNotes = (notes, octave) => {
		const rootNotes = ROOT_NOTES
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

	getNotesRootNotes = (notes: string[]) => {
		return notes.map(theory.getNoteRootNote)
	}

	getNotesWithOctave = (notes, octave) => {
		return notes.map((note) => `${note}${octave}`)
	}

	getRepeatedScaleNotes(scaleNotes: string[]) {
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

	// Given a count, a base octave, and the notes of the scale,
	// generates an array of `count` length of octaved notes.
	getManyOctavedNotes(options: GetManyOctavedNotesOptionsT) {
		const repeatedScaleNotes = getRepeatedScaleNotes(options.scaleNotes)
		const octavedScaleNotes = getOctavedNotes(repeatedScaleNotes, options.baseOctave)
		const indexes = range(options.count)

		return indexes.map((index: number) => {
			return octavedScaleNotes[index]
		})
	}

	mapChordNamesToSymbols(chordNames: string[]) {
		const chords = chordNames.map(Tonal.Chord.get)
		const symbols = chords.map((chord) => chord.symbol)
		return symbols
	}
}

export const theory = new Theory(CHORD_TYPES)
// console.log('>>>', theory.groupChordNamesByRootNote(theory.getAllChordsInScale('D minor')))

type GetManyOctavedNotesOptionsT = {
	count: number
	scaleNotes: string[]
	baseOctave: number
}

export const rootNotes = ROOT_NOTES
export const scaleTypes = SCALES
export const scaleNames = SCALE_NAMES
export const chordNames = CHORD_NAMES
export const chordTypes = CHORD_TYPES
export const scales = SCALES
export const chords = CHORD_TYPES
