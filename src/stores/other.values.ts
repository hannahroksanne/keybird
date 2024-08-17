import { hookstate, useHookstate } from '@hookstate/core'

const static = {
	instruments: {},
	midiOutputs: {}
}

// Has the user toggled alternate keyboard labels?
const shouldShowAltLabels = hookstate(false)

// ################### Chords View
const chordTypeFilter = hookstate<string>('all')
const chordComplexityFilter = hookstate<string>(10)
const chordRootFilter = hookstate<string>('F#')
// ################### Keyboard View
const keyMap = hookstate<AnyObjectT>({})
// ------------------------------------------------
