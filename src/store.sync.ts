import React from 'react'
import { store } from './store'
import { toner } from './utilities/toner'
import { generateKeyMap } from './store.helpers'
import defaultKeysConfig from './consts/defaultKeys.config.json'
import { WebMidi } from 'webmidi'
import Soundfont, { InstrumentName } from 'soundfont-player'
import keyMapLayoutsConfig from './consts/keyMapLayouts.config.json'
import { chords } from './consts/chords'

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
		const chordNames = chords[scaleName]
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
		if (!scaleNotes.length) return
		const isOctaveSame = ref0.current === octave
		const isNotesSame = ref1.current === joinedScaleNotes
		const isLayoutSame = ref2.current === keyMapLayoutName
		if (isOctaveSame && isNotesSame && isLayoutSame) return
		ref0.current = octave
		ref1.current = joinedScaleNotes
		ref2.current = keyMapLayoutName

		const keyMap = generateKeyMap({
			keyMapLayout: keyMapLayoutsConfig[store.keyMapLayoutName],
			scaleName: store.scaleName,
			scaleNotes,
			octave
		})

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
		store.setMidiOutputName(midiOutputName)
		store.setMidiOutputNames(outputNames)
		store.setIsMidiEnabled(true)
	}, [isMidiConnected])
}

// Every 30s check and make sure all the midi outputs are still available.
function useMidiOutputsSync() {
	React.useEffect(() => {
		setInterval(() => {
			const midiOutputName = store.midiOutputName
			const outputNames = WebMidi.outputs.map((output) => output.name)
			const mergedMidiOutputNames = [...outputNames, 'built-in instrument']
			const isSelectedOutputStillAvailable = mergedMidiOutputNames.includes(midiOutputName)
			if (!isSelectedOutputStillAvailable) store.setMidiOutputName('')
		}, 30000)
	}, [])
}

async function loadInstrument(context, name: InstrumentName) {
	return new Promise((resolve, reject) => {
		Soundfont.instrument(context, name).then(resolve).catch(reject)
	})
}

function useInstrumentLoader() {
	const isOutputEnabled = store.useIsOutputEnabled()
	const areInstrumentsLoaded = store.useAreInstrumentsLoaded()

	React.useEffect(() => {
		if (areInstrumentsLoaded) return
		if (!isOutputEnabled) return

		const context = new AudioContext()
		store.setAudioContext(context)
		const loader0 = loadInstrument(context, 'acoustic_grand_piano')
		const loader1 = loadInstrument(context, 'acoustic_guitar_nylon')
		const loader2 = loadInstrument(context, 'electric_guitar_clean')
		const loader3 = loadInstrument(context, 'xylophone')
		const loader4 = loadInstrument(context, 'marimba')

		const whenAllAreDone = Promise.all([loader0, loader1, loader2, loader3, loader4])

		whenAllAreDone.then((instruments) => {
			store.set('instruments')({
				acoustic_grand_piano: instruments[0],
				acoustic_guitar_nylon: instruments[1],
				electric_guitar_clean: instruments[2],
				xylophone: instruments[3],
				marimba: instruments[4]
			})

			store.setAreInstrumentsLoaded(true)
			const midiOutputNames = store.midiOutputNames
			store.setMidiOutputNames([...midiOutputNames, 'built-in instrument'])
		})
	}, [isOutputEnabled])
}

export function useStoreSync() {
	console.log('useStoreSync')
	useInstrumentLoader()
	useScaleNameSync()
	useScaleNotesSync()
	usePlayingNotesSync()
	useKeyMapSync()
	useMidiSync()
	useMidiOutputsSync()
}
