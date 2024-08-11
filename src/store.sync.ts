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

		const scaleName = `${scaleRootNote} ${scaleType}`
		store.setScaleName(scaleName)
	}, [scaleRootNote, scaleType])
}

function useScaleNotesSync() {
	const scaleName = store.useScaleName()
	const ref = React.useRef('')

	React.useEffect(() => {
		if (ref.current === scaleName) return
		ref.current = scaleName

		const scale = toner.getScale(scaleName)
		store.setScaleNotes(scale.notes)
	}, [scaleName])
}

function useScaleChordNamesSync() {
	const scaleName = store.useScaleName()
	const ref = React.useRef('')

	React.useEffect(() => {
		if (ref.current === scaleName) return
		ref.current = scaleName

		const chordNames = toner.getChordNamesFromScaleName(scaleName)
		store.setScaleChordNames(chordNames)
	}, [scaleName])
}

function usePlayingNotesSync() {
	const pressedKeyCodes = store.usePressedKeyCodes()
	const playablePressedkeyCodes = pressedKeyCodes.filter((code) => playableKeyCodes.includes(code))
	const joinedPressedKeyCodes = playablePressedkeyCodes.join(' ')

	React.useEffect(() => {
		const keyMap = store.keyMap
		const keys = pressedKeyCodes.map((keyCode) => keyMap[keyCode])
		const playableKeys = keys.filter((key) => key.isPlayable) as PlayableKeyMappingT[]
		const playingNotes = playableKeys.map((key) => key.note)
		const playingRootNotes = toner.getNotesRootNotes(playingNotes)
		store.setPlayingNotes(playingNotes)
		store.setPlayingRootNotes(playingRootNotes)
	}, [joinedPressedKeyCodes])
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
		console.log('useKeyMapSync----')
		if (!scaleNotes.length) return
		const isOctaveSame = ref0.current === octave
		const isNotesSame = ref1.current === joinedScaleNotes
		const isLayoutSame = ref2.current === keyMapLayoutName
		if (isOctaveSame && isNotesSame && isLayoutSame) return
		ref0.current = octave
		ref1.current = joinedScaleNotes
		ref2.current = keyMapLayoutName

		console.log('useKeyMapSync')
		const keyMap = generateKeyMap()
		store.setKeyMap(keyMap)
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

function useMidiOutputsSync() {
	const ref = React.useRef([])

	React.useEffect(() => {
		setInterval(() => {
			const midiOutputName = store.midiOutputName
			const outputs = WebMidi.outputs
			const outputNames = outputs.map((output) => output.name)
			const isSame = ref.current.join('') === outputNames.join('')
			if (isSame) store.setMidiOutputNames(outputNames)
			const isSelectedOutputStillAvailable = outputNames.includes(midiOutputName)
			if (!isSelectedOutputStillAvailable) store.setMidiOutputName('')
		}, 30000)
	}, [])
}

export function useStoreSync() {
	console.log('useStoreSync')
	useScaleNameSync()
	useScaleNotesSync()
	usePlayingNotesSync()
	useScaleChordNamesSync()
	useKeyMapSync()
	useMidiSync()
	useMidiOutputsSync()
}
