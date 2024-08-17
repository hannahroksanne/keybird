import { hookstate } from '@hookstate/core'

// Initialized when the user turns on audio.
export const audioContext = hookstate(null)
// Are we done loading the initial instruments?
export const areInstrumentsLoaded = hookstate(false)
// Initialized when the user turns on audio.
export const loadedInstrumentNames = hookstate<string[]>([])
// Used to determine if we should send midi messages to
// a midi receiver or if we should play through a local instument.
export const selectedOutputType = hookstate<string>('midi')
// The name of the instrument the user has selected
// for playing music locally rather than via midi.
export const selectedInstrumentName = hookstate<string>('')
// The name of the midi output the user has selected.
export const selectedMidiOutputName = hookstate<string>('')
// Did we connect to midi successfully?
export const isMidiConnected = hookstate(false)
// Has the user enabled/disabled midi output?
export const isMidiEnabled = hookstate(false)
// Any error that may occur while trying to connect to midi.
export const midiConnectionError = hookstate<string | null>(null)

export const outputValues = {
	audioContext,
	areInstrumentsLoaded,
	loadedInstrumentNames,
	selectedOutputType,
	selectedInstrumentName,
	selectedMidiOutputName,
	isMidiConnected,
	isMidiEnabled,
	midiConnectionError
}
