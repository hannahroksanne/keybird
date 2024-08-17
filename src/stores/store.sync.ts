import React from 'react'
import { store } from './store'
import { toner } from '../utilities/toner'
import { generateKeyMap } from './store.helpers'
import { WebMidi } from 'webmidi'
import Soundfont, { InstrumentName } from 'soundfont-player'
import { chords } from '../consts/chords'
import { usePrevious } from '@uidotdev/usehooks'
import { midi } from './midi.helper'
import getDiff from 'array-differ'
import { playableKeyCodes } from '../consts'

// Syncs scaleName when scaleRootNote or scaleType changes.
// Syncs scaleNotes when scaleName changes.
// Syncs scaleChordNames when scaleName changes.
// Syncs playingRootNotes when playingNotes changes.

function useScaleNameSync() {
	const scaleRootNote = store.useScaleRootNote()
	const scaleType = store.useScaleType()
	const ref0 = usePrevious(scaleRootNote) || ''
	const ref1 = usePrevious(scaleType) || ''

	React.useEffect(() => {
		const isRootNoteSame = ref0 === scaleRootNote
		const isScaleTypeSame = ref1 === scaleType
		if (isRootNoteSame && isScaleTypeSame) return

		const scaleName = `${scaleRootNote} ${scaleType}`
		const scale = toner.getScale(scaleName)
		const chordNames = chords[scaleName]

		store.setState({
			scaleName,
			scaleNotes: scale.notes,
			scaleChordNames: chordNames
		})
	}, [scaleRootNote, scaleType])
}

function usePlayingNotesSync() {
	const pressedKeyCodes = store.usePressedKeyCodes()
	const playablePressedkeyCodes = pressedKeyCodes.filter((code) => playableKeyCodes.includes(code))
	const joinedPressedKeyCodes = playablePressedkeyCodes.join(' ')

	const handlePlayingNotesAsync = async () => {
		const keyMap = store.keyMap
		const keys = pressedKeyCodes.map((keyCode) => keyMap[keyCode])
		const playableKeys = keys.filter((key) => key.isPlayable) as PlayableKeyMappingT[]
		const playingNotes = playableKeys.map((key) => key.note)
		const playingRootNotes = toner.getNotesRootNotes(playingNotes)

		store.setState({
			playingNotes,
			playingRootNotes
		})
	}

	React.useEffect(() => {
		handlePlayingNotesAsync()
	}, [joinedPressedKeyCodes])
}

const getDifference = (outdated: string[], updated: string[]) => {
	const stoppedNotes = getDiff(outdated, updated)
	const startedNotes = getDiff(updated, outdated)
	return [startedNotes, stoppedNotes]
}

function useMidiOutput() {
	const playingNotes = store.usePlayingNotes()
	const previouslyPlayingNotes = usePrevious(playingNotes) || []
	const joinedPlayingNotes = playingNotes.join(' ')

	const handleMidiOutputAsync = async () => {
		const [startedNotes, stoppedNotes] = getDifference(previouslyPlayingNotes, playingNotes)

		startedNotes.forEach((note) => {
			midi.playNote(note)
		})

		stoppedNotes.forEach((note) => {
			midi.stopNote(note)
		})
	}

	React.useEffect(() => {
		handleMidiOutputAsync()
	}, [joinedPlayingNotes])
}

function useKeyMapSync() {
	const octave = store.useOctave()
	const scaleNotes = store.useScaleNotes()
	const joinedScaleNotes = scaleNotes.join(' ')
	const keyMapLayoutName = store.useKeyMapLayoutName()
	const ref0 = usePrevious(octave) || ''
	const ref1 = React.useRef(joinedScaleNotes) || ''
	const ref2 = React.useRef(keyMapLayoutName) || ''

	React.useEffect(() => {
		if (!scaleNotes.length) return
		const isOctaveSame = ref0 === octave
		const isNotesSame = ref1 === joinedScaleNotes
		const isLayoutSame = ref2 === keyMapLayoutName
		if (isOctaveSame && isNotesSame && isLayoutSame) return

		console.log('generating keymap', { octave, keyMapLayoutName, joinedScaleNotes })
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
		const outputNames = outputs.map((output) => output.name)
		const firstOutput = outputs[0] || ({} as any)
		const midiOutputName = firstOutput.name || ''

		store.setState({
			midiOutputName,
			midiOutputNames: outputNames,
			isMidiEnabled: true
		})
	}, [isMidiConnected])
}

// Every 30s check and make sure all the midi outputs are still available.
function useMidiOutputsSync() {
	React.useEffect(() => {
		setInterval(() => {
			const midiOutputName = store.midiOutputName
			const outputNames = WebMidi.outputs.map((output) => output.name)
			const mergedMidiOutputNames = [...outputNames, 'builtIn']
			const isSelectedOutputStillAvailable = mergedMidiOutputNames.includes(midiOutputName)
			if (!isSelectedOutputStillAvailable) store.setMidiOutputName('')
		}, 30000)
	}, [])
}

// async function loadInstrument(context, name: InstrumentName) {
// 	return new Promise((resolve, reject) => {
// 		Soundfont.instrument(context, name).then(resolve).catch(reject)
// 	})
// }

// function useInstrumentLoader() {
// 	const isOutputEnabled = store.useIsOutputEnabled()
// 	const areInstrumentsLoaded = store.useAreInstrumentsLoaded()

// 	React.useEffect(() => {
// 		if (areInstrumentsLoaded) return
// 		if (!isOutputEnabled) return

// 		const context = new AudioContext()
// 		store.setAudioContext(context)

// 		const loader0 = loadInstrument(context, 'acoustic_grand_piano')
// 		const loader1 = loadInstrument(context, 'acoustic_guitar_nylon')
// 		const loader2 = loadInstrument(context, 'electric_guitar_clean')
// 		const loader3 = loadInstrument(context, 'xylophone')
// 		const loader4 = loadInstrument(context, 'marimba')

// 		const whenAllAreDone = Promise.all([loader0, loader1, loader2, loader3, loader4])

// 		whenAllAreDone.then((instruments) => {
// 			store.set('loadedInstruments')({
// 				acoustic_grand_piano: instruments[0],
// 				acoustic_guitar_nylon: instruments[1],
// 				electric_guitar_clean: instruments[2],
// 				xylophone: instruments[3],
// 				marimba: instruments[4]
// 			})

// 			store.setAreInstrumentsLoaded(true)
// 			const midiOutputNames = store.midiOutputNames
// 			store.setMidiOutputNames([...midiOutputNames, 'builtIn'])

// 			store.setState({
// 				midiOutputName: 'builtIn',
// 				isMidiEnabled: true
// 			})
// 		})
// 	}, [isOutputEnabled])
// }

export function useStoreSync() {
	// useInstrumentLoader()
	useScaleNameSync()
	usePlayingNotesSync()
	useKeyMapSync()
	useMidiSync()
	useMidiOutputsSync()
	useMidiOutput()
}
