import * as Tonal from 'tonal'
import { stores } from './stores'
import { scales } from './scales'

// When the scale key or scale type changes, update the state for scaleKey, scaleType,
// scaleNotes, and scaleChordNames.
const handleScaleChange = (scaleKey: string, scaleType: string) => {
	const scaleName = `${scaleKey} ${scaleType}`
	const scale = scales.get(scaleName)
	const scaleNotes = scale.notes
	const chordNames = scale.chordNames

	stores.selectedScaleKey.set(scaleKey)
	stores.selectedScaleType.set(scaleType)
	stores.scaleNotes.set(scaleNotes)
	stores.scaleChordNames.set(chordNames)
}

type NoteSignalT = {
	id: string
	noteId: string
	startDivision: number
	endDivision: number
	velocity: number
}

const addNoteSignal = (options: NoteSignalT) => {
	const signalRows = stores.signalRows.state
}
