import { WebMidi } from 'webmidi'
import { store } from './store'

const DEFAULT_INSTRUMENT_NAME = 'acoustic_grand_piano'

const nodes = {}

const playInstrument = (instrumentName = DEFAULT_INSTRUMENT_NAME) => {
	const instrument = store.loadedInstruments[instrumentName]
	const audioContext = store.audioContext
	const gain = 0.8
	const attack = 0.9

	const playNote = (note, options) => {
		const _options = { gain, attack, ...options }

		nodes[note] = instrument.play(note) //, audioContext.currentTime, _options)
	}

	const stopNote = (note) => {
		const node = nodes[note]
		node.stop(audioContext.currentTime, note)
		delete nodes[note]
		// if (Array.isArray(note)) {
		// 	return note.forEach((note, index) => {
		// 		instrument.stop(audioContext.currentTime, note)
		// 	})
		// }
	}

	return {
		playNote,
		stopNote
	}
}

const createOutput = () => {
	const isMidiConnected = store.isMidiConnected
	const isMidiEnabled = store.isMidiEnabled
	const midiOutput = store.midiOutputName
	const outputType = store.outputType
	const isOutputBuiltIn = outputType === 'builtIn'
	const selectedInstrumentName = store.selectedInstrumentName
	const shouldError = !isOutputBuiltIn && !isMidiConnected && !isMidiEnabled

	console.log({ isOutputBuiltIn, isMidiConnected, isMidiEnabled, midiOutput, shouldError })
	if (shouldError) return console.error('No valid output available')
	if (isOutputBuiltIn) return playInstrument(selectedInstrumentName)

	if (isMidiConnected && isMidiEnabled) {
		const midiOutputDevice = WebMidi.getOutputByName(midiOutput)

		const playNote = (note, options) => {
			if (Array.isArray(note)) {
				note.forEach((n) => {
					midiOutputDevice.playNote(n, options)
				})
			} else {
				midiOutputDevice.playNote(note, options)
			}
		}

		const stopNote = (note) => {
			if (Array.isArray(note)) {
				note.forEach((n) => {
					midiOutputDevice.stopNote(n)
				})
			} else {
				midiOutputDevice.stopNote(note)
			}
		}

		return {
			playNote,
			stopNote
		}
	}
}

export const playNote = (note, options = {}) => {
	const output = createOutput()
	output.playNote(note, options)
}

export const stopNote = (note) => {
	const output = createOutput()
	output.stopNote(note)
}

export const midi = {
	playNote,
	stopNote
}
