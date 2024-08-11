// @ts-nocheck

import * as Tonal from 'tonal'
import { isSubsetOf } from 'is-subset-of'
import * as CONSTS from '../consts'
import mems from 'mems'
import range from 'array-range'

import chordTypes from '../consts/chords/chordTypes.json'
import getPossibilities from 'just-permutations'
import getDeviation from 'just-standard-deviation'
import getSkewness from 'just-skewness'
import getVariance from 'just-variance'
import groupBy from 'just-group-by'
import sortBy from 'just-sort-by'

const getFirstTwo = (target: string) => target.slice(0, 2)
const checkSharpOrFlat = (target: string) => getFirstTwo(target).match(/[#b]/)
const getRootNote = (target: string) => (checkSharpOrFlat(target) ? getFirstTwo(target) : target[0])

const SHARP_KEYS = ['C#', 'Db', 'D#', 'Eb', 'F#', 'Gb', 'G#', 'Ab', 'A#', 'Bb']

export const checkIsBlackKey = (note: string) => {
	return SHARP_KEYS.includes(Tonal.Note.get(note).pc)
}

export const groupChordNamesByRootNote = (notes: string[]) => {
	return groupBy(notes, getRootNote)
}

globalThis.groupChordNamesByRootNote = groupChordNamesByRootNote

const getChordSkewNess = (chordName: string) => {
	const chordNotes = Tonal.Chord.notes(chordName)
	const midiNotes = chordNotes.map((note) => Tonal.Note.midi(note + 2))
	return getSkewness(midiNotes)
}

globalThis.getChordSkewNess = getChordSkewNess

const getScale = (scaleName: string) => Tonal.Scale.get(scaleName)

globalThis.getScale = getScale

export const getAllChordsInScale = mems((scaleName: string) => {
	const allChordNames = CONSTS.chordNames
	const scale = getScale(scaleName)
	const inScaleChordNames = []

	for (const chordName of allChordNames) {
		const chord = Tonal.Chord.get(chordName)
		const isSubset = isSubsetOf(chord.notes, scale.notes)
		if (isSubset) inScaleChordNames.push(chordName)
	}

	return inScaleChordNames
})

globalThis.getAllChordsInScale = getAllChordsInScale

const scalesMap = CONSTS.scales.reduce((final, scale) => {
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
	chordTypes.forEach((chord) => {
		registerChord(chord)
	})
}

prepareChords()

console.log(Tonal.Scale.get('D minor').notes)
console.log(groupChordNamesByRootNote(getAllChordsInScale('D minor')))

const getChordNamesFromScaleName = (scaleName: string) => scalesMap.get(scaleName).chords
const getNoteRootNote = (note: string) => Tonal.Note.get(note).pc

const getNotesRootNotes = (notes: string[]) => {
	return notes.map(getNoteRootNote)
}
const getOctavedNotes = (notes, octave) => {
	const rootNotes = CONSTS.rootNotes
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

const mapChordNamesToSymbols = (chordNames: string[]) => {
	const chords = chordNames.map(Tonal.Chord.get)
	const symbols = chords.map((chord) => chord.symbol)
	return symbols
}

console.log('mapChordNamesToSymbols', mapChordNamesToSymbols(['C# minor seventh']))

export const toner = {
	getChordNotes: Tonal.Chord.notes,
	getScale,
	checkIsBlackKey,
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
	getAllChordsInScale,
	rootNotes: CONSTS.rootNotes,
	scaleTypes: CONSTS.scaleTypes,
	scaleNAmes: CONSTS.scaleNames,
	chordNames: CONSTS.chordNames,
	chordTypes: chordTypes,
	scales: CONSTS.scales,
	chords: CONSTS.chords
}
