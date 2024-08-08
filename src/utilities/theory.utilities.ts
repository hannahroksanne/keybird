import { Chord, Interval, note, Note, Scale } from 'tonal'
import CONFIG from '../config.json'

export const getKeyScaleName = (key: string, scale: string) => {
	return `${key} ${scale}`
}

export const getKeyScaleNoteNames = (keyScaleName: string) => {
	return Scale.get(keyScaleName).notes
}

export const createKeyMap = (inputKeyName: string, noteName: string) => {
	return {
		inputKeyName,
		noteName
	}
}

const getIterativeNoteName = (keyScaleNoteNames: string[], index: number) => {
	const noteIndex = index % keyScaleNoteNames.length
	const noteName = keyScaleNoteNames[noteIndex]
	return noteName
}

type KeyMapT = {
	inputKeyName: string
	noteName: string
}

export const getPlayableNotesKeyMap = (keyScaleNoteNames: string[]) => {
	const playableKeyNames = CONFIG.PLAYABLE_INPUT_KEYS.map((inputKeyName: string, index: number) => {
		const noteName = getIterativeNoteName(keyScaleNoteNames, index)
		const octave = Math.floor(index / keyScaleNoteNames.length)
		const octavedNoteName = `${noteName}${octave}`
		return createKeyMap(inputKeyName, octavedNoteName)
	})

	return playableKeyNames
}
