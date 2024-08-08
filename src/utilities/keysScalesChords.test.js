import { test, expect, it } from 'vitest'

import {
	getNotesInScale,
	getNotesInChord,
	getScaleNotesCompliance,
	getChordNotesCompliance,
	getScaleNamesWithNotes,
	getShortSymbols,
	generateChords,
	getChordsWithNotes,
	getChordNamesWithNotes,
	getChordsInScale,
	getChordNamesInScale,
	generateScales,
	getAllScales,
	getScale
} from './keysScalesChords'

import { ALL_SCALES } from './allScales'

test('getNotesInScale', () => {
	const result0 = getNotesInScale('C major')
	const result1 = getNotesInScale('C minor')
	expect(result0).toEqual(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
	expect(result1).toEqual(['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'])
})

test.skip('getNotesInChord', () => {
	// NOTE: This is just a wrapper around a Tonal
	// utility. Nothing really to test. But at least
	// this test will let us know if we are fuck ups.
	const result0 = getNotesInChord('Cmaj7')
	const result1 = getNotesInChord('C7')
	expect(result0).toEqual(['C', 'E', 'G', 'B'])
	expect(result1).toEqual(['C', 'E', 'G', 'Bb'])
})

test('getScaleNotesCompliance', () => {
	const result0 = getScaleNotesCompliance(['A', 'B', 'C', 'D'], 'Cmajor')
	const result1 = getScaleNotesCompliance(['Z', 'B', 'C', 'D'], 'C major')
	expect(result0).toBe(true)
	expect(result1).toBe(false)
})

test.skip('getChordNotesCompliance', () => {
	const result0 = getChordNotesCompliance(['C', 'E', 'G'], 'C')
	expect(result0).toBe(true)
})

test.skip('getScaleNamesWithNotes', () => {})

test.skip('getShortSymbols', () => {})

test.skip('generateChords', () => {})

test.skip('getChordsWithNotes', () => {
	const result0 = getChordsWithNotes('C', 'maj7')
	const result1 = getNotesInChord('C', '7')
	expect(result0).toEqual(['C', 'E', 'G', 'B'])
	expect(result1).toEqual(['C', 'E', 'G', 'Bb'])
})

test.skip('getChordNamesWithNotes', () => {
	const result0 = getChordNamesWithNotes(['C', 'E', 'G', 'B'])
	expect(result0).toEqual(['Cmaj7'])
})

test.skip('getChordsInScale', () => {
	const chords = getChordsInScale('C major')
	const result0 = chords.map((chord) => chord.name)
	expect(result0).toEqual(ALL_SCALES['C major'].chordNames)
})

test.skip('getChordNamesInScale', () => {
	const result0 = getChordNamesInScale('C major')
	expect(result0).toEqual(ALL_SCALES['C major'].chordNames)
})

test.skip('generateScales', () => {
	// NOTE: We just want to make sure that it outputs
	// the same thing it previously did.
	const result0 = generateScales()
	expect(result0).toEqual(ALL_SCALES)
})

test.skip('getScale', () => {
	const result0 = getScale('C major')
	expect(result0).toEqual(ALL_SCALES['C major'])
})
