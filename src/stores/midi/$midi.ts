import { Note, WebMidi } from 'webmidi'
import { create } from 'zustand'
import range from 'array-range'
import uniqueRandomArray from 'unique-random-array'
import { toner } from '../../utilities/toner/toner'
import { $core } from '../core'

type StoreT = {
	isMidiReady: boolean
	isMidiEnabled: boolean
	midiError: Error | null
	warningMessage: string
	errorMessage: string
	selectedMidiOutputName: string
	midiOutputs: any[]
	setIsMidiReady: (isMidiReady: boolean) => void
	setIsMidiEnabled: (isMidiEnabled: boolean) => void
	setMidiError: (error: Error) => void
	setWarningMessage: (warningMessage: string) => void
	setErrorMessage: (errorMessage: string) => void
	playChord: (notes: string[]) => void
	stopNotes: (notes: string[]) => void
	playNote: (note: string) => void
	stopNote: (note: string) => void
}

const INITIAL_STATE = {
	isMidiReady: false,
	isMidiEnabled: false,
	midiError: null,
	selectedMidiOutputName: '',
	midiOutputs: [],
	warningMessage: '',
	errorMessage: ''
}

const prepareMidi = (handleSuccess: any, handleError: any) => {
	setTimeout(() => {
		WebMidi.enable()
			.then(() => handleSuccess(true))
			.catch(handleError)
	}, 2000)
}

const getSelectedMidiOutput = () => {
	const { selectedMidiOutputName } = $midi.state
	const midiOutputs = WebMidi.outputs
	const output = midiOutputs.find((output) => output.name === selectedMidiOutputName)
	return output
}

const getInitialMidiOutput = () => {
	const midiOutputs = WebMidi.outputs
	const selectedMidiOutputName = midiOutputs[0]?.name

	return {
		midiOutputs,
		selectedMidiOutputName
	}
}

let timeout: any = null

const store = create<StoreT>((set, get) => {
	const setIsMidiReady = (isMidiReady: boolean) => {
		console.log('Midi is ready.')
		console.log('Midi outputs:', WebMidi.outputs)
		const { midiOutputs, selectedMidiOutputName } = getInitialMidiOutput()
		const isMidiEnabled = !!selectedMidiOutputName
		set({ isMidiReady, isMidiEnabled, midiOutputs, selectedMidiOutputName })
	}

	const setIsMidiEnabled = (isMidiEnabled: boolean) => {
		isMidiEnabled && console.log('Midi is enabled.')
		set({ isMidiEnabled })
	}

	const setMidiError = (error: Error) => {
		console.log('Midi error:', error)
		set({ midiError: error })
	}

	const setWarningMessage = (warningMessage: string) => {
		set({ warningMessage })
	}

	const setErrorMessage = (errorMessage: string) => {
		set({ errorMessage })
	}
	const velocityRange = range(0.35, 0.5, 0.05)
	const getRandomVelocity = uniqueRandomArray(velocityRange)
	const getRandomRawVelocity = uniqueRandomArray(range(45, 66))
	const createNote = (note: string) => {
		return new Note(note, {
			duration: 1250,
			attack: getRandomVelocity(),
			release: getRandomVelocity(),
			rawAttack: getRandomRawVelocity(),
			rawRelease: getRandomRawVelocity()
		})
	}

	const createNotes = (notes: string[]) => {
		const octavedNotes = toner.getOctavedNotes(notes, $core.state.octave)

		return octavedNotes.map((note) => {
			const isAlreadyNote = note instanceof Note
			return isAlreadyNote ? note : createNote(note)
		})
	}

	const playNotesStaggered = (output, notes: string[] | Note[], stagger = 222) => {
		notes.forEach((note, index) => {
			setTimeout(() => {
				output.playNote(note)
			}, index * stagger)
		})
	}

	const checkIfShouldContinue = () => {
		const { isMidiReady, isMidiEnabled, selectedMidiOutputName } = get()
		const shouldContinue = isMidiReady && isMidiEnabled && selectedMidiOutputName
		return shouldContinue
	}

	const prepare = (notes, options) => {
		const _notes = createNotes(notes)
		const output = getSelectedMidiOutput()
		return [output, _notes]
	}

	const playChord = (_notes: string[], options = { isStaggered: true }) => {
		const shouldContinue = checkIfShouldContinue()
		if (!shouldContinue) return

		const [output, notes] = prepare(_notes, options)

		if (options.staggered || true) {
			return playNotesStaggered(output, notes, 189)
		}

		output.playNote(notes)
	}

	const playNote = (note: string, options = {}) => {
		const shouldContinue = checkIfShouldContinue()
		if (!shouldContinue) return

		const [output, notes] = prepare([note], options)
		output.playNote(notes[0])
	}

	const stopNotes = (_notes: string[], options = {}) => {
		const shouldContinue = checkIfShouldContinue()
		if (!shouldContinue) return
		const [output, notes] = prepare(_notes, options)

		output.stopNote(_notes, {
			release: getRandomVelocity()
		})
	}

	const stopNote = (_note: string, options = {}) => {
		stopNotes([_note], options)
	}

	prepareMidi(setIsMidiReady, setMidiError)

	return {
		...INITIAL_STATE,
		setMidiError,
		setIsMidiReady,
		setWarningMessage,
		setErrorMessage,
		playNote,
		stopNote,
		playChord,
		stopNotes,
		setIsMidiEnabled
	}
})

type MidiNoteT = {
	midi: number
	velocity: number
}

const useIsMidiEnabled = () => {
	return store((state) => state.isMidiEnabled)
}

const useIsMidiReady = () => {
	return store((state) => state.isMidiReady)
}

const useWarningMessage = () => {
	return store((state) => state.warningMessage)
}

export const $midi = {
	use: store,
	subscribe: store.subscribe,
	setState: store.setState,

	useIsMidiReady,
	useIsMidiEnabled,
	useWarningMessage,
	setIsMidiEnabled: store.getState().setIsMidiEnabled,
	setUserWarningMessage: store.getState().setWarningMessage,
	setUserErrorMessage: store.getState().setErrorMessage,
	playChord: store.getState().playChord,
	stopNotes: store.getState().stopNotes,
	playNote: store.getState().playNote,
	stopNote: store.getState().stopNote,

	get state() {
		return store.getState()
	}
}
