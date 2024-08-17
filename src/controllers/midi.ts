import * as Tonal from 'tonal'
import memoize from 'just-memoize'

const getNoteData = memoize((note: string) => {
	return Tonal.Note.get(note)
})

// NOTE: per beat = per quarter note.
// TODO: Convert to 96 on output.
// 0 KICK 24 SNARE 48 KICK 72 SNARE
const TICKS_PER_BEAT = 96
const BEATS_PER_BAR = 4
// const DIVISIONS_PER_BAR = 32
const TICKS_PER_BAR = 384 // (96 * 4)
const TICKS_PER_DIVISION = 12 // (384 / 32)

// Create a note object for playback state.
export const createNote = memoize((note: Partial<PlaybackNoteT>) => {
	const noteData = getNoteData(note.name)
	const ticks = note.startTicks * TICKS_PER_DIVISION
	const duration = note.endTicks - note.startTicks

	return {
		name: note.name,
		startTime: note.startTicks,
		endTime: note.endTicks,
		velocity: note.velocity,
		midi: noteData.midi,
		octave: noteData.oct,
		rootNote: noteData.letter,
		duration,
		ticks
	}
})

// export const convertNoteToMidi = (note: PlaybackNoteT) => {
// 	return {
// 		name: note.name,
// 		midi: note.midi,
// 		octave: note.octave,
// 		pitch: note.rootNote,
// 		velocity: note.velocity,
// 		duration,
// 		ticks
// 	}
// }
