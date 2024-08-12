import { create } from 'zustand'
import appConfig from './consts/app.config.json'

type MainStateT = {
  audioContext: any
	logs: LogConfigT[]
	isLogsOverlayOpen: boolean
	octave: number
	scaleName: string
	scaleRootNote: string
	scaleType: string
	scaleNotes: string[]
	scaleChordNames: ScaleChordsT
	keyMapLayoutName: string
	keyboardLayoutName: string
	shouldShowAltLabels: boolean
	isMidiConnected: boolean
	isMidiEnabled: boolean
	midiOutputName: string
	midiConnectionError: any
  builtInInstrumentNames: string[]
  midiOutputNames: string[]
	pressedKeyCodes: string[]
	playingNotes: string[]
	playingRootNotes: string[]
	keyMap: KeyMapT
	playingChordNames: string[]
	maxChordComplexity: number
	chordTypeFilter: string
  isLocalSoundSelected: boolean
  loadedInstruments: AnyObjectT
  selectedInstrumentName: string
  isOutputEnabled: boolean
  areInstrumentsLoaded: boolean
  isBuiltInInstrumentSelected: boolean
}

const MAIN_INITIAL_STATE = {
  audioContext: null,
	isLogsOverlayOpen: false,
	logs: [],
	
  octave: 2,
	scaleName: `${appConfig.defaultScaleRootNote} ${appConfig.defaultScaleType}`,
	scaleRootNote: appConfig.defaultScaleRootNote,
	scaleType: appConfig.defaultScaleType,
	scaleNotes: [],
	scaleChordNames: {},

	keyMapLayoutName: appConfig.defaultKeyMapLayoutName,
	keyboardLayoutName: appConfig.defaultKeyboardLayoutName,
	shouldShowAltLabels: false,
	keyMap: {},
	
  builtInInstrumentNames: appConfig.builtInInstrumentNames,
  isMidiConnected: false,
	isMidiEnabled: false,
	midiOutputName: '',
	midiConnectionError: null,
  midiOutputNames: [],
  isLocalSoundSelected: false,
  selectedInstrumentName: '',
  loadedInstruments: {},
	isOutputEnabled: false,

  pressedKeyCodes: [],
	playingNotes: [],
	playingRootNotes: [],
	playingChordNames: [],
	
  maxChordComplexity: 5,
	chordTypeFilter: 'all',
  areInstrumentsLoaded: false,
  isBuiltInInstrumentSelected: false
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

const noop = (value: any) => value

const without = (target) => (item) => {
  console.log('wihout', { target, item })
  const x = target.filter((_item) => _item !== item)
  console.log({ x })
  return x
}


const asArray = (value) => Array.isArray(value) ? value : [value]
const unique = (target: any[]) => (item: any) => Array.from(new Set([...target, ...asArray(item)]))
const withOne = (target: any[]) => (item: any) => target.includes(item) ? target : [...target, item]
const useIncludes = (stateKey: string) => (item: any) => $main.use(state => state[stateKey].includes(item))
const getIncludes = (stateKey: string) => (item: any) => $main.state[stateKey].includes(item)
const use = (stateKey: string, mod: any = noop) => () => $main.use((state) => mod(state[stateKey]))
const get = (stateKey: string, mod: any = noop) => () => mod($main.state[stateKey])
const set = (stateKey: string, mod: any = noop) => (value: any) => $main.set((state) => ({ [stateKey]: mod(value ?? state[stateKey]) }))
const setFromState = (key: string, mod: any = noop) => () => $main.set((state) => ({ [key]: mod(state[key], state) }))
const setWithout = (key: string) => (item: any) => $main.set(state => ({ [key]: without(state[key])(item) }))
const addUnique = (key: string) => (item: any) => $main.set(state => ({ [key]: unique(state[key])(item) }))
const toggle = (key: string) => setFromState(key, (value: boolean) => !value) 
  
  // set(key, (value: boolean) => !value)

// logs
const useLogs = use('logs')
const getLogs = get('logs')
const setLogs = set('logs')

// octave
const useOctave = use('octave')
const getOctave = get('octave')
const setOctave = set('octave')

// scaleName
const useScaleName = use('scaleName')
const getScaleName = get('scaleName')
const setScaleName = set('scaleName')

// scaleRootNote
const useScaleRootNote = use('scaleRootNote')
const getScaleRootNote = get('scaleRootNote')
const setScaleRootNote = set('scaleRootNote')

// scaleType
const useScaleType = use('scaleType')
const getScaleType = get('scaleType')
const setScaleType = set('scaleType')

// shouldShowAltLabels
const useShouldShowAltLabels = use('shouldShowAltLabels')
const getShouldShowAltLabels = get('shouldShowAltLabels')
const setShouldShowAltLabels = set('shouldShowAltLabels')

// isLogsOverlayOpen
const useIsLogsOverlayOpen = use('isLogsOverlayOpen')
const getIsLogsOverlayOpen = get('isLogsOverlayOpen')
const setIsLogsOverlayOpen = set('isLogsOverlayOpen')

// scaleNotes
const useScaleNotes = use('scaleNotes')
const getScaleNotes = get('scaleNotes')
const setScaleNotes = set('scaleNotes')

// scaleChordNames
const useScaleChordNames = use('scaleChordNames')
const getScaleChordNames = get('scaleChordNames')
const setScaleChordNames = set('scaleChordNames')

// keyboardLayoutName
const useKeyboardLayoutName = use('keyboardLayoutName')
const getKeyboardLayoutName = get('keyboardLayoutName')
const setKeyboardLayoutName = set('keyboardLayoutName')

// keyMapLayoutName
const useKeyMapLayoutName = use('keyMapLayoutName')
const getKeyMapLayoutName = get('keyMapLayoutName')
const setKeyMapLayoutName = set('keyMapLayoutName')

// isMidiConnected
const useIsMidiConnected = use('isMidiConnected')
const getIsMidiConnected = get('isMidiConnected')
const setIsMidiConnected = set('isMidiConnected')

// isMidiEnabled
const useIsMidiEnabled = use('isMidiEnabled')
const getIsMidiEnabled = get('isMidiEnabled')
const setIsMidiEnabled = set('isMidiEnabled')
const toggleIsMidiEnabled = toggle('isMidiEnabled')

// midiOutputName
const useMidiOutputName = use('midiOutputName')
const getMidiOutputName = get('midiOutputName')
const setMidiOutputName = set('midiOutputName')

// pressedKeyCodes
const usePressedKeyCodes = use('pressedKeyCodes')
const getPressedKeyCodes = get('pressedKeyCodes')
const setPressedKeyCodes = set('pressedKeyCodes')

// playingNotes
const usePlayingNotes = use('playingNotes')
const getPlayingNotes = get('playingNotes')
const setPlayingNotes = set('playingNotes')
const useIsNotePlaying = useIncludes('playingNotes')
const getIsNotePlaying = getIncludes('playingNotes')

// playingRootNotes
const usePlayingRootNotes = use('playingRootNotes')
const getPlayingRootNotes = get('playingRootNotes')
const setPlayingRootNotes = set('playingRootNotes')
const useIsRootNotePlaying = useIncludes('playingRootNotes')

// keyMap
const useKeyMap = use('keyMap')
const getKeyMap = get('keyMap')
const setKeyMap = set('keyMap')
const getKeyMapping = (keyCode: string) => $main.state.keyMap[keyCode]
const useKeyMapping = (keyCode: string) => $main.use((state) => state.keyMap[keyCode])

// pressedKeyCodes
const useIsKeyCodePressed = useIncludes('pressedKeyCodes')
const getIsKeyCodePressed = getIncludes('pressedKeyCodes')
const addPressedKeyCode = addUnique('pressedKeyCodes')
const removePressedKeyCode = setWithout('pressedKeyCodes')

// playingChordNames
const usePlayingChordNames = use('playingChordNames')
const getPlayingChordNames = get('playingChordNames')
const setPlayingChordNames = set('playingChordNames')
const useIsChordPlaying = useIncludes('playingChordNames')
const addPlayingChordName = addUnique('playingChordNames')

// midiConnectionError
const useMidiConnectionError = use('midiConnectionError')
const getMidiConnectionError = get('midiConnectionError')
const setMidiConnectionError = set('midiConnectionError')

// maxChordComplexity
const useMaxChordComplexity = use('maxChordComplexity')
const getMaxChordComplexity = get('maxChordComplexity')
const setMaxChordComplexity = set('maxChordComplexity')

// chordTypeFilter
const useChordTypeFilter = use('chordTypeFilter')
const getChordTypeFilter = get('chordTypeFilter')
const setChordTypeFilter = set('chordTypeFilter')

const useMidiOutputNames = use('midiOutputNames')
const getMidiOutputNames = get('midiOutputNames')
const setMidiOutputNames = set('midiOutputNames')

const useIsLocalSoundSelected = use('isLocalSoundSelected')
const getIsLocalSoundSelected = get('isLocalSoundSelected')
const setIsLocalSoundSelected = set('isLocalSoundSelected')

const useLoadedInstruments = use('loadedInstruments')
const getLoadedInstruments = get('loadedInstruments')
const setLoadedInstruments = set('loadedInstruments')

const addLoadedInstrument = (name: string, instrument: any) => {
  $main.set({ loadedInstruments: { ...$main.state.loadedInstruments, [name]: instrument } })
}

const useSelectedInstrumentName = use('selectedInstrumentName')
const getSelectedInstrumentName = get('selectedInstrumentName')
const setSelectedInstrumentName = set('selectedInstrumentName')

const useIsOutputEnabled = use('isOutputEnabled')
const getIsOutputEnabled = get('isOutputEnabled')
const setIsOutputEnabled = set('isOutputEnabled')
const toggleIsOutputEnabled = toggle('isOutputEnabled')

const useAreInstrumentsLoaded = use('areInstrumentsLoaded')
const getAreInstrumentsLoaded = get('areInstrumentsLoaded')
const setAreInstrumentsLoaded = set('areInstrumentsLoaded')
const toggleAreInstrumentsLoaded = toggle('areInstrumentsLoaded')

const useAudioContext = use('audioContext')
const getAudioContext = get('audioContext')
const setAudioContext = set('audioContext')

const useIsBuiltInInstrumentSelected = use('isBuiltInInstrumentSelected')
const getIsBuiltInInstrumentSelected = get('isBuiltInInstrumentSelected')
const setIsBuiltInInstrumentSelected = set('isBuiltInInstrumentSelected')

type StoreT = {
  audioContext: any,
	reset: () => void
  setState: (state: any) => void
  set: (state: any) => (value: any) => void
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
	useMaxChordComplexity: () => number
	setMaxChordComplexity: (maxChordComplexity: number) => void
	useChordTypeFilter: () => string
	setChordTypeFilter: (chordTypeFilter: string) => void
  getIsNotePlaying: (note: string) => boolean
  useIsChordPlaying: (chordName: string) => boolean
  addPlayingChordName: (chordName: string) => void
  useMidiOutputNames: () => string[]
  setMidiOutputNames: (midiOutputNames: string[]) => void
  useIsLocalSoundSelected: () => boolean
  getIsLocalSoundSelected: () => boolean
  setIsLocalSoundSelected: (isLocalSoundSelected: boolean) => void
  useLoadedInstruments: () => AnyObjectT
  getLoadedInstruments: () => AnyObjectT
  setLoadedInstruments: (loadedInstruments: AnyObjectT) => void
  addLoadedInstrument: (name: string, instrument: any) => void
  useSelectedInstrumentName: () => string
  getSelectedInstrumentName: () => string
  setSelectedInstrumentName: (selectedInstrumentName: string) => void
  useIsOutputEnabled: () => boolean
  getIsOutputEnabled: () => boolean
  setIsOutputEnabled: (isOutputEnabled: boolean) => void
  toggleIsOutputEnabled: () => void
  useAreInstrumentsLoaded: () => boolean
  getAreInstrumentsLoaded: () => boolean
  setAreInstrumentsLoaded: (areInstrumentsLoaded: boolean) => void
  toggleAreInstrumentsLoaded: () => void
  toggleIsMidiEnabled: () => void
  useAudioContext: () => any
  getAudioContext: () => any
  setAudioContext: (audioContext: any) => void
  useIsBuiltInInstrumentSelected: () => boolean
  getIsBuiltInInstrumentSelected: () => boolean
  setIsBuiltInInstrumentSelected: (isBuiltInInstrumentSelected: boolean) => void
  

  isBuiltInInstrumentSelected: boolean
  areInstrumentsLoaded: boolean
  loadedInstruments: AnyObjectT
  selectedInstrumentName: string
  isLocalSoundSelected: boolean
  midiOutputNames: string[]
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
	maxChordComplexity: number
	chordTypeFilter: string
  isOutputEnabled: boolean

  useChordsWithRootNote: (rootNote: string) => string[]
}

const useChordsWithRootNote = (rootNote: string) => $main.use((state) => state.scaleChordNames[rootNote])

export const store: StoreT = {
  useChordsWithRootNote,
  setState: (state) => $main.set(state),
	reset,
  set,
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
	addPressedKeyCode,
	removePressedKeyCode,
	usePlayingChordNames,
	setPlayingChordNames,
	useIsKeyCodePressed,
	useIsRootNotePlaying,
	useIsNotePlaying,
	getIsKeyCodePressed,
	useMidiConnectionError,
	setMidiConnectionError,
	useMaxChordComplexity,
	setMaxChordComplexity,
	useChordTypeFilter,
	setChordTypeFilter,
  getIsNotePlaying,
  useIsChordPlaying,
  addPlayingChordName,
  useMidiOutputNames,
  setMidiOutputNames,
  useIsLocalSoundSelected,
  getIsLocalSoundSelected,
  setIsLocalSoundSelected,
  useLoadedInstruments,
  getLoadedInstruments,
  setLoadedInstruments,
  addLoadedInstrument,
  useSelectedInstrumentName,
  getSelectedInstrumentName,
  setSelectedInstrumentName,
  useIsOutputEnabled,
  getIsOutputEnabled,
  setIsOutputEnabled,
  toggleIsOutputEnabled,
  useAreInstrumentsLoaded,
  getAreInstrumentsLoaded,
  setAreInstrumentsLoaded,
  toggleAreInstrumentsLoaded,
  toggleIsMidiEnabled,
  useAudioContext,
  getAudioContext,
  setAudioContext,
  useIsBuiltInInstrumentSelected,
  getIsBuiltInInstrumentSelected,
  setIsBuiltInInstrumentSelected,

  get isBuiltInInstrumentSelected() {
    return getIsBuiltInInstrumentSelected()
  },

  get audioContext() {
    return getAudioContext()
  },
  
  get areInstrumentsLoaded() {
    return getAreInstrumentsLoaded()
  },

  get isOutputEnabled() {
    return getIsOutputEnabled()
  },

  get loadedInstruments() {
    return getLoadedInstruments()
  },

  get selectedInstrumentName() {
    return getSelectedInstrumentName()
  },

  get isLocalSoundSelected() {
    return getIsLocalSoundSelected()
  },


  get midiOutputNames() {
      return getMidiOutputNames()
  },

	get maxChordComplexity() {
		return getMaxChordComplexity()
	},

	get chordTypeFilter() {
		return getChordTypeFilter()
	},

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
