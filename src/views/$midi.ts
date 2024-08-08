import { WebMidi } from 'webmidi'
import { create } from 'zustand'

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
	broadcastNoteStart: (midi: number) => void
	broadcastNoteEnd: (midi: number) => void
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

const getMidiOutput = () => {
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
		const { midiOutputs, selectedMidiOutputName } = getMidiOutput()
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

	const handleMidiIssue = () => {
		const { isMidiReady, isMidiEnabled } = get()
		const isThereAnIssue = !isMidiEnabled || !isMidiReady

		const clearAfterDelay = () => {
			if (timeout) clearTimeout(timeout)

			timeout = setTimeout(() => {
				$midi.setUserWarningMessage('')
			}, 5000)
		}

		if (!isMidiReady) {
			$midi.setUserWarningMessage('Midi is not ready.')
			clearAfterDelay()
			return
		}

		if (!isMidiEnabled) {
			$midi.setUserWarningMessage('Midi is not enabled.')
			clearAfterDelay()
		}

		return isThereAnIssue
	}

	const broadcastNoteStart = (midi: number) => {
		const isThereAnIssue = handleMidiIssue()
		if (isThereAnIssue) return

		const outputName = get().selectedMidiOutputName
		const output = WebMidi.outputs.find((output) => output.name === outputName)
		if (!output) return

		console.log('sending the note...', midi)
		output.playNote(midi, {
			attack: 0.05
		})
	}

	const broadcastNoteEnd = (midi: number) => {
		const isThereAnIssue = handleMidiIssue()
		if (isThereAnIssue) return

		const outputName = get().selectedMidiOutputName
		const output = WebMidi.outputs.find((output) => output.name === outputName)
		if (!output) return

		console.log('stopping the note...', midi)
		output.sendNoteOff(midi, {
			release: 0.2
		})
	}

	prepareMidi(setIsMidiReady, setMidiError)

	return {
		...INITIAL_STATE,
		setMidiError,
		setIsMidiReady,
		setWarningMessage,
		setErrorMessage,
		broadcastNoteStart,
		broadcastNoteEnd,
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
	broadcastNoteStart: store.getState().broadcastNoteStart,
	broadcastNoteEnd: store.getState().broadcastNoteEnd,

	get state() {
		return store.getState()
	}
}
