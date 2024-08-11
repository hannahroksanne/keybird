import { WebMidi } from 'webmidi'
import { store } from './store'

const DEFAULT_INSTRUMENT_NAME = 'acoustic_grand_piano'

const playInstrument = (instrumentName = DEFAULT_INSTRUMENT_NAME) => {
	const instrument = store.loadedInstruments[instrumentName]
	const audioContext = store.audioContext
	const gain = 0.5
	const attack = 0.25

	const playNote = (note, options) => {
		const _options = { gain, attack, ...options }

		if (Array.isArray(note)) {
			return note.forEach((note, index) => {
				instrument.play(note, audioContext.currentTime + index, _options)
			})
		}

		instrument.play(note, audioContext.currentTime, _options)
	}

	const stopNote = (note) => {
		if (Array.isArray(note)) {
			return note.forEach((note, index) => {
				instrument.stop(note, audioContext.currentTime + index)
			})
		}

		instrument.stop(note, audioContext.currentTime)
	}

	return {
		playNote,
		stopNote
	}
}

const createOutput = () => {
	const isBuiltInInstrumentSelected = store.isBuiltInInstrumentSelected
	const isMidiConnected = store.isMidiConnected
	const isMidiEnabled = store.isMidiEnabled
	const midiOutput = store.midiOutputName

	if (isBuiltInInstrumentSelected) {
		return playInstrument()
	} else if (isMidiConnected && isMidiEnabled) {
		const midiOutputDevice = WebMidi.getOutputByName(midiOutput)

		return {
			playNote: (note, options) => {
				if (Array.isArray(note)) {
					note.forEach((n) => {
						midiOutputDevice.playNote(n, options)
					})
				} else {
					midiOutputDevice.playNote(note, options)
				}
			},
			stopNote: (note) => {
				if (Array.isArray(note)) {
					note.forEach((n) => {
						midiOutputDevice.stopNote(n)
					})
				} else {
					midiOutputDevice.stopNote(note)
				}
			}
		}
	} else {
		throw new Error('No valid output available')
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
