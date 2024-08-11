import { create } from 'zustand'
import appConfig from './app.config.json'

const MAIN_INITIAL_STATE = {
	isLogsOverlayOpen: false,
	logs: [],
	octave: 2,
	scaleName: `${appConfig.defaultScaleRootNote} ${appConfig.defaultScaleType}`,
	scaleRootNote: appConfig.defaultScaleRootNote,
	scaleType: appConfig.defaultScaleType,
	scaleNotes: [],
	scaleChordNames: [],
	keyMapLayoutName: appConfig.defaultKeyMapLayoutName,
	keyboardLayoutName: appConfig.defaultKeyboardLayoutName,
	shouldShowAltLabels: false,
	isMidiConnected: false,
	isMidiEnabled: false,
	midiOutputName: '',
	midiConnectionError: null,
	pressedKeyCodes: [],
	playingNotes: [],
	playingRootNotes: [],
	keyMap: {},
	playingChordNames: []
}

const useMainStore = create<MainStateT>(() => MAIN_INITIAL_STATE)

const $main = {
	use: useMainStore,
	set: useMainStore.setState,
	get state() {
		return useMainStore.getState()
	}
}

const reset = () => $main.set(MAIN_INITIAL_STATE)
const without = (target, item) => target.filter((_item) => _item !== item)

const useLogs = () => $main.use((state) => state.logs)
const getLogs = () => $main.state.logs
const setLogs = (logs) => $main.set({ logs })

const useOctave = () => $main.use((state) => state.octave)
const getOctave = () => $main.state.octave
const setOctave = (octave) => $main.set({ octave })

const useScaleName = () => $main.use((state) => state.scaleName)
const getScaleName = () => $main.state.scaleName
const setScaleName = (scaleName) => $main.set({ scaleName })

const useScaleRootNote = () => $main.use((state) => state.scaleRootNote)
const getScaleRootNote = () => $main.state.scaleRootNote
const setScaleRootNote = (scaleRootNote) => $main.set({ scaleRootNote })

const useScaleType = () => $main.use((state) => state.scaleType)
const getScaleType = () => $main.state.scaleType
const setScaleType = (scaleType) => $main.set({ scaleType })

const useShouldShowAltLabels = () => $main.use((state) => state.shouldShowAltLabels)
const getShouldShowAltLabels = () => $main.state.shouldShowAltLabels
const setShouldShowAltLabels = (shouldShowAltLabels) => $main.set({ shouldShowAltLabels })

const useIsLogsOverlayOpen = () => $main.use((state) => state.isLogsOverlayOpen)
const getIsLogsOverlayOpen = () => $main.state.isLogsOverlayOpen
const setIsLogsOverlayOpen = (isLogsOverlayOpen) => $main.set({ isLogsOverlayOpen })

const useScaleNotes = () => $main.use((state) => state.scaleNotes)
const getScaleNotes = () => $main.state.scaleNotes
const setScaleNotes = (scaleNotes) => $main.set({ scaleNotes })

const useScaleChordNames = () => $main.use((state) => state.scaleChordNames)
const getScaleChordNames = () => $main.state.scaleChordNames
const setScaleChordNames = (scaleChordNames) => $main.set({ scaleChordNames })

const useKeyboardLayoutName = () => $main.use((state) => state.keyboardLayoutName)
const getKeyboardLayoutName = () => $main.state.keyboardLayoutName
const setKeyboardLayoutName = (keyboardLayoutName) => $main.set({ keyboardLayoutName })

const useKeyMapLayoutName = () => $main.use((state) => state.keyMapLayoutName)
const getKeyMapLayoutName = () => $main.state.keyMapLayoutName
const setKeyMapLayoutName = (keyMapLayoutName) => $main.set({ keyMapLayoutName })

const useIsMidiConnected = () => $main.use((state) => state.isMidiConnected)
const getIsMidiConnected = () => $main.state.isMidiConnected
const setIsMidiConnected = (isMidiConnected) => $main.set({ isMidiConnected })

const useIsMidiEnabled = () => $main.use((state) => state.isMidiEnabled)
const getIsMidiEnabled = () => $main.state.isMidiEnabled
const setIsMidiEnabled = (isMidiEnabled) => $main.set({ isMidiEnabled })

const useMidiOutputName = () => $main.use((state) => state.midiOutputName)
const getMidiOutputName = () => $main.state.midiOutputName
const setMidiOutputName = (midiOutputName) => $main.set({ midiOutputName })

const usePressedKeyCodes = () => $main.use((state) => state.pressedKeyCodes)
const getPressedKeyCodes = () => $main.state.pressedKeyCodes
const setPressedKeyCodes = (pressedKeyCodes) => $main.set({ pressedKeyCodes: Array.from(new Set(pressedKeyCodes)) })
const useIsKeyCodePressed = (keyCode: string) => $main.use((state) => state.pressedKeyCodes.includes(keyCode))
const getIsKeyCodePressed = (keyCode: string) => $main.state.pressedKeyCodes.includes(keyCode)
const addPressedKeyCode = (keyCode: string) => setPressedKeyCodes([...getPressedKeyCodes(), keyCode])
const removePressedKeyCode = (keyCode: string) => setPressedKeyCodes(without($main.state.pressedKeyCodes, keyCode))

const usePlayingNotes = () => $main.use((state) => state.playingNotes)
const getPlayingNotes = () => $main.state.playingNotes
const setPlayingNotes = (playingNotes) => $main.set({ playingNotes })

const usePlayingRootNotes = () => $main.use((state) => state.playingRootNotes)
const getPlayingRootNotes = () => $main.state.playingRootNotes
const setPlayingRootNotes = (playingRootNotes) => $main.set({ playingRootNotes })

const useKeyMap = () => $main.use((state) => state.keyMap)
const getKeyMap = () => $main.state.keyMap
const setKeyMap = (keyMap) => $main.set({ keyMap })

const getKeyMapping = (keyCode: string) => $main.state.keyMap[keyCode]
const useKeyMapping = (keyCode: string) => $main.use((state) => state.keyMap[keyCode])

const usePlayingChordNames = () => $main.use((state) => state.playingChordNames)
const getPlayingChordNames = () => $main.state.playingChordNames
const setPlayingChordNames = (playingChordNames) => $main.set({ playingChordNames })

const useIsRootNotePlaying = (rootNote: string) => $main.use((state) => state.playingRootNotes.includes(rootNote))
const useIsNotePlaying = (note: string) => $main.use((state) => state.playingNotes.includes(note))

const useMidiConnectionError = () => $main.use((state) => state.midiConnectionError)
const getMidiConnectionError = () => $main.state.midiConnectionError
const setMidiConnectionError = (midiConnectionError) => $main.set({ midiConnectionError })

type StoreT = {
	reset: () => void
	useLogs: () => LogConfigT[]
	setLogs: (logs: LogConfigT[]) => void
	useOctave: () => number
	setOctave: (octave: number) => void
	useScaleName: () => string
	setScaleName: (scaleName: string) => void
	useScaleRootNote: () => string
	setScaleRootNote: (scaleRootNote: string) => void
	useScaleType: () => string
	setScaleType: (scaleType: string) => void
	useShouldShowAltLabels: () => boolean
	setShouldShowAltLabels: (shouldShowAltLabels: boolean) => void
	useIsLogsOverlayOpen: () => boolean
	setIsLogsOverlayOpen: (isLogsOverlayOpen: boolean) => void
	useScaleNotes: () => string[]
	setScaleNotes: (scaleNotes: string[]) => void
	useScaleChordNames: () => string[]
	setScaleChordNames: (scaleChordNames: string[]) => void
	useKeyboardLayoutName: () => string
	setKeyboardLayoutName: (keyboardLayoutName: string) => void
	useKeyMapLayoutName: () => string
	setKeyMapLayoutName: (keyMapLayoutName: string) => void
	useIsMidiConnected: () => boolean
	setIsMidiConnected: (isMidiConnected: boolean) => void
	useIsMidiEnabled: () => boolean
	setIsMidiEnabled: (isMidiEnabled: boolean) => void
	useMidiOutputName: () => string
	setMidiOutputName: (midiOutputName: string) => void
	usePressedKeyCodes: () => string[]
	setPressedKeyCodes: (pressedKeyCodes: string[]) => void
	useIsKeyCodePressed: (keyCode: string) => boolean
	usePlayingNotes: () => string[]
	setPlayingNotes: (playingNotes: string[]) => void
	usePlayingRootNotes: () => string[]
	setPlayingRootNotes: (playingRootNotes: string[]) => void
	useKeyMap: () => KeyMapT
	setKeyMap: (keyMap: KeyMapT) => void
	usePlayingChordNames: () => string[]
	setPlayingChordNames: (playingChordNames: string[]) => void
	getKeyMapping: (keyCode: string) => KeyMappingT
	useKeyMapping: (keyCode: string) => KeyMappingT
	addPressedKeyCode: (note: string) => void
	removePressedKeyCode: (note: string) => void
	useIsRootNotePlaying: (rootNote: string) => boolean
	useIsNotePlaying: (note: string) => boolean
	getIsKeyCodePressed: (keyCode: string) => boolean
	useMidiConnectionError: () => any
	setMidiConnectionError: (midiConnectionError: any) => void

	midiConnectionError: any
	logs: LogConfigT[]
	octave: number
	scaleName: string
	scaleRootNote: string
	scaleType: string
	shouldShowAltLabels: boolean
	isLogsOverlayOpen: boolean
	scaleNotes: string[]
	scaleChordNames: string[]
	keyboardLayoutName: string
	keyMapLayoutName: string
	isMidiConnected: boolean
	isMidiEnabled: boolean
	midiOutputName: string
	pressedKeyCodes: string[]
	playingNotes: string[]
	playingRootNotes: string[]
	keyMap: KeyMapT
	playingChordNames: string[]
}

export const store: StoreT = {
	reset,
	useLogs,
	setLogs,
	useOctave,
	setOctave,
	useScaleName,
	setScaleName,
	useScaleRootNote,
	setScaleRootNote,
	useScaleType,
	setScaleType,
	useShouldShowAltLabels,
	setShouldShowAltLabels,
	useIsLogsOverlayOpen,
	setIsLogsOverlayOpen,
	useScaleNotes,
	setScaleNotes,
	useScaleChordNames,
	setScaleChordNames,
	useKeyboardLayoutName,
	setKeyboardLayoutName,
	useKeyMapLayoutName,
	setKeyMapLayoutName,
	useIsMidiConnected,
	setIsMidiConnected,
	useIsMidiEnabled,
	setIsMidiEnabled,
	useMidiOutputName,
	setMidiOutputName,
	usePressedKeyCodes,
	setPressedKeyCodes,
	usePlayingNotes,
	setPlayingNotes,
	usePlayingRootNotes,
	setPlayingRootNotes,
	useKeyMap,
	setKeyMap,
	getKeyMapping,
	useKeyMapping,
	usePlayingChordNames,
	setPlayingChordNames,
	useIsKeyCodePressed,
	addPressedKeyCode,
	removePressedKeyCode,
	useIsRootNotePlaying,
	useIsNotePlaying,
	getIsKeyCodePressed,
	useMidiConnectionError,
	setMidiConnectionError,

	get midiConnectionError() {
		return getMidiConnectionError()
	},

	get logs() {
		return getLogs()
	},

	get octave() {
		return getOctave()
	},

	get scaleName() {
		return getScaleName()
	},

	get scaleRootNote() {
		return getScaleRootNote()
	},

	get scaleType() {
		return getScaleType()
	},

	get shouldShowAltLabels() {
		return getShouldShowAltLabels()
	},

	get isLogsOverlayOpen() {
		return getIsLogsOverlayOpen()
	},

	get scaleNotes() {
		return getScaleNotes()
	},

	get scaleChordNames() {
		return getScaleChordNames()
	},

	get keyboardLayoutName() {
		return getKeyboardLayoutName()
	},

	get keyMapLayoutName() {
		return getKeyMapLayoutName()
	},

	get isMidiConnected() {
		return getIsMidiConnected()
	},

	get isMidiEnabled() {
		return getIsMidiEnabled()
	},

	get midiOutputName() {
		return getMidiOutputName()
	},

	get pressedKeyCodes() {
		return getPressedKeyCodes()
	},

	get playingNotes() {
		return getPlayingNotes()
	},

	get playingRootNotes() {
		return getPlayingRootNotes()
	},

	get keyMap() {
		return getKeyMap()
	},

	get playingChordNames() {
		return getPlayingChordNames()
	}
}
