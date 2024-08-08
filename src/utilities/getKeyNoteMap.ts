import { PLAYABLE_KEY_CODES } from './allPlayableKeyCodes'

export const getKeyNoteMap = (scaleNotes: string[]) => {
	const noteMap = {} as AnyObjectT
	let octave = 1

	for (const index in PLAYABLE_KEY_CODES) {
		const noteIndex = Number(index) % scaleNotes.length
		if (noteIndex === 0) octave++

		const keyCode = PLAYABLE_KEY_CODES[index]
		const scaleNote = scaleNotes[noteIndex]
		const note = `${scaleNote}${octave}`
		noteMap[keyCode] = note
	}

	return noteMap
}
