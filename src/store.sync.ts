import React from 'react'
import { store } from './store'
import { toner } from './utilities/toner/toner'
import { generateKeyMap } from './store.helpers'
import defaultKeysConfig from './defaultKeys.config.json'
import { WebMidi } from 'webmidi'

const playableKeyCodes = Object.values(defaultKeysConfig).reduce((final, key) => {
	if (key.isPlayable) final.push(key.keyCode)
	return final
}, [])

// Syncs scaleName when scaleRootNote or scaleType changes.
// Syncs scaleNotes when scaleName changes.
// Syncs scaleChordNames when scaleName changes.
// Syncs playingRootNotes when playingNotes changes.

function useScaleNameSync() {
	const scaleRootNote = store.useScaleRootNote()
	const scaleType = store.useScaleType()
	const ref0 = React.useRef('')
	const ref1 = React.useRef('')

	React.useEffect(() => {
		const isRootNoteSame = ref0.current === scaleRootNote
		const isScaleTypeSame = ref1.current === scaleType
		if (isRootNoteSame && isScaleTypeSame) return
		ref0.current = scaleRootNote
		ref1.current = scaleType

		console.group('useScaleNameSync effect')
		console.log('scaleRootNote', scaleRootNote)
		console.log('scaleType', scaleType)
		const scaleName = `${scaleRootNote} ${scaleType}`
		store.setScaleName(scaleName)
		console.log('set scaleName', scaleName)
		console.groupEnd()
	}, [scaleRootNote, scaleType])
}

function useScaleNotesSync() {
	const scaleName = store.useScaleName()
	const ref = React.useRef('')

	React.useEffect(() => {
		if (ref.current === scaleName) return
		ref.current = scaleName

		console.group('useScaleNotesSync effect')
		console.log('scaleName', scaleName)
		const scale = toner.getScale(scaleName)
		store.setScaleNotes(scale.notes)
		console.log('set scaleNotes', scale.notes)
		console.groupEnd()
	}, [scaleName])
}

function useScaleChordNamesSync() {
	const scaleName = store.useScaleName()
	const ref = React.useRef('')

	React.useEffect(() => {
		if (ref.current === scaleName) return
		ref.current = scaleName

		console.group('useScaleChordNamesSync effect')
		console.log('scaleName', scaleName)
		const chordNames = toner.getChordNamesFromScaleName(scaleName)
		store.setScaleChordNames(chordNames)
		console.log('set scaleChordNames', chordNames)
		console.groupEnd()
	}, [scaleName])
}

function usePlayingNotesSync() {
	const pressedKeyCodes = store.usePressedKeyCodes()
	const playablePressedkeyCodes = pressedKeyCodes.filter((code) => playableKeyCodes.includes(code))
	const joinedPressedKeyCodes = playablePressedkeyCodes.join(' ')
	const ref = React.useRef('')

	React.useEffect(() => {
		if (ref.current === joinedPressedKeyCodes) return
		ref.current = joinedPressedKeyCodes

		console.group('usePlayingNotesSync effect')
		console.log('pressedKeyCodes', joinedPressedKeyCodes)
		const keyMap = store.keyMap
		const keys = pressedKeyCodes.map((keyCode) => keyMap[keyCode])
		const playableKeys = keys.filter((key) => key.isPlayable) as PlayableKeyMappingT[]
		const notes = playableKeys.map((key) => key.note)
		store.setPlayingNotes(notes)
		console.log('set playingNotes', notes)
		console.groupEnd()
	}, [joinedPressedKeyCodes])
}

function usePlayingRootNotesSync() {
	const playingNotes = store.usePlayingNotes()
	const joinedPlayingNotes = playingNotes.join(' ')
	const ref = React.useRef('')

	React.useEffect(() => {
		if (ref.current === joinedPlayingNotes) return
		ref.current = joinedPlayingNotes

		console.group('usePlayingRootNotesSync effect')
		console.log('playingNotes', playingNotes)
		const rootNotes = toner.getNotesRootNotes(playingNotes)
		store.setPlayingRootNotes(rootNotes)
		console.log('set playingRootNotes', rootNotes)
		console.groupEnd()
	}, [joinedPlayingNotes])
}

function useKeyMapSync() {
	const octave = store.useOctave()
	const scaleNotes = store.useScaleNotes()
	const joinedScaleNotes = scaleNotes.join(' ')
	const keyMapLayoutName = store.useKeyMapLayoutName()
	const ref0 = React.useRef(-1)
	const ref1 = React.useRef('')
	const ref2 = React.useRef('')

	React.useEffect(() => {
		if (!scaleNotes.length) return
		const isOctaveSame = ref0.current === octave
		const isNotesSame = ref1.current === joinedScaleNotes
		const isLayoutSame = ref2.current === keyMapLayoutName
		if (isOctaveSame && isNotesSame && isLayoutSame) return
		ref0.current = octave
		ref1.current = joinedScaleNotes
		ref2.current = keyMapLayoutName

		console.group('useKeyMapSync effect')
		console.log('octave', octave)
		console.log('scaleNotes', joinedScaleNotes)
		const keyMap = generateKeyMap()
		store.setKeyMap(keyMap)
		console.log('set keyMap', keyMap)
		console.groupEnd()
	}, [octave, joinedScaleNotes, keyMapLayoutName])
}

function useMidiSync() {
	const isMidiConnected = store.useIsMidiConnected()

	React.useEffect(() => {
		WebMidi.enable()
			.then(() => store.setIsMidiConnected(true))
			.catch((error) => store.setMidiConnectionError(error))
	}, [])

	React.useEffect(() => {
		if (!isMidiConnected) return
		const outputs = WebMidi.outputs
		const firstOutput = outputs[0] || ({} as any)
		const midiOutputName = firstOutput.name || ''
		store.setMidiOutputName(midiOutputName)
	}, [isMidiConnected])
}

export function useStoreSync() {
	console.log('useStoreSync')
	useScaleNameSync()
	useScaleNotesSync()
	usePlayingNotesSync()
	usePlayingRootNotesSync()
	useScaleChordNamesSync()
	useKeyMapSync()
	useMidiSync()
}
