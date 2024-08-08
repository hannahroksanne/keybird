import * as Tonal from 'tonal'
import useKeyboardEvents from '@acusti/use-keyboard-events'
import { create } from 'zustand'
import { $midi } from './midi.store'
import { $keys } from './keys.store'

type StateT = {
	scaleName: VboardT.ScaleName
	scaleRootNote: VboardT.RootNote
	scaleType: VboardT.ScaleType
	scaleNotes: string[]
	pressedKeys: string[]
	areaAltLabelsShown: boolean
}

type ActionsT = {
	setScale: (rootNote: VboardT.RootNote, type: VboardT.ScaleType) => void
	reportKeyDown: (event: KeyboardEvent) => void
	reportKeyUp: (event: KeyboardEvent) => void
	setAreAltKeyLabelsShown: (areaAltLabelsShown: boolean) => void
}

const DEFAULT_SCALE_ROOT_NOTE = 'B'
const DEFAULT_SCALE_TYPE = 'minor'
const DEFAULT_SCALE_NAME = `${DEFAULT_SCALE_ROOT_NOTE} ${DEFAULT_SCALE_TYPE}`
const DEFAULT_SCALE_NOTES = Tonal.Scale.get(DEFAULT_SCALE_NAME).notes

const INITIAL_STATE: StateT = {
	scaleName: DEFAULT_SCALE_NAME as VboardT.ScaleName,
	scaleRootNote: DEFAULT_SCALE_ROOT_NOTE as VboardT.RootNote,
	scaleType: DEFAULT_SCALE_TYPE as VboardT.ScaleType,
	scaleNotes: DEFAULT_SCALE_NOTES,
	pressedKeys: [],
	areaAltLabelsShown: false
}

const store = create<StateT & ActionsT>((set, get) => ({
	...INITIAL_STATE,

	setScale: (scaleRootNote: VboardT.RootNote, scaleType: VboardT.ScaleType) => {
		const scaleName = `${scaleRootNote} ${scaleType}` as VboardT.ScaleName
		const scaleNotes = Tonal.Scale.get(scaleName).notes
		set({ scaleName, scaleType, scaleRootNote, scaleNotes })
	},

	reportKeyDown: (event: KeyboardEvent) => {
		const keyCode = event.code
		const currentPressedKeys = get().pressedKeys
		if (currentPressedKeys.includes(keyCode)) return
		const midiNote = $keys.state.midiMap[keyCode]
		const pressedKeys = [...currentPressedKeys, keyCode]
		midiNote && $midi.broadcastNoteStart(midiNote)
		set({ pressedKeys })
	},

	reportKeyUp: (event: KeyboardEvent) => {
		const keyCode = event.code
		const midiNote = $keys.state.midiMap[keyCode]
		const currentPressedKeys = get().pressedKeys
		const pressedKeys = currentPressedKeys.filter((key) => key !== keyCode)
		midiNote && $midi.broadcastNoteEnd(midiNote)
		set({ pressedKeys })
	},

	setAreAltKeyLabelsShown: (areaAltLabelsShown: boolean) => {
		set({ areaAltLabelsShown })
	}
}))

// Hooks
const useKeyboardInput = () => {
	const { reportKeyDown, reportKeyUp } = store()
	useKeyboardEvents({
		onKeyDown: reportKeyDown,
		onKeyUp: reportKeyUp
	})
}

const useIsKeyPressed = (keyCode: string): boolean => {
	return store((state) => state.pressedKeys.includes(keyCode))
}

const useScaleRootNote = () => {
	return store((state) => state.scaleRootNote)
}

const useScaleType = () => {
	return store((state) => state.scaleType)
}

const usePressedKeys = () => {
	return store((state) => state.pressedKeys)
}

const useAreAltKeyLabelsShown = () => {
	return store((state) => state.areaAltLabelsShown)
}

export const $store = {
	use: store,
	getState: store.getState,
	setState: store.setState,

	useKeyboardInput,
	useIsKeyPressed,
	useScaleRootNote,
	useScaleType,
	usePressedKeys,
	useAreAltKeyLabelsShown,
	reportKeyDown: store.getState().reportKeyDown,
	reportKeyUp: store.getState().reportKeyUp,

	get state() {
		return store.getState()
	},

	get store() {
		return store.getState()
	}
}

// Optional: Subscribe to state changes
store.subscribe(() => {
	// console.log(store.getState().suggestedNotes)
})
