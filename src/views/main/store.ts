import { create } from 'zustand'
import { buildEmptySignalsState } from '#/utilities/buildEmptySignalsState'
import APP_CONFIG from '#/configuration/app.config.json'
import { theory } from '#/utilities/toner'
import { nanoid } from 'nanoid'

// Types
type ScaleStateT = {
	key: string
	type: string
	baseOctave: number
	name: string
	notes: string[]
	chordNames: string[]
	groupedChordNames: string[]
	reset: () => void
	setBaseOctave: (baseOctave: number) => void
	setKey: (key: string) => void
	setType: (type: string) => void
}

type OutputStateT = {
	selectedType: string
	selectedInstrumentName: string
	selectedMidiOutputDeviceName: string
	audioContext: AudioContext | null
	audioError: Error | null
	isAudioReady: boolean
	isOutputEnabled: boolean
	midiError: Error | null
	isMidiReady: boolean
	isMidiEnabled: boolean
	isLoadingMidi: boolean
	selectedOutputType: string
	midiDeviceNames: string[]
	isLoadingInstrument: boolean
	allInstrumentNames: string[]
	loadedInstruments: any[]
	loadedInstrumentNames: string[]
	reset: () => void
	setSelectedInstrumentName: (selectedInstrumentName: string) => void
	setSelectedOutputType: (selectedOutputType: string) => void
	setSelectedMidiOutputDeviceName: (selectedMidiOutputDeviceName: string) => void
}

type ChordProgressionStateT = {
	chords: any[]
	reset: () => void
	addChord: (chordSymbol: string, modifiers: any) => void
	removeChord: (chordId: string) => void
	updateChord: (chordId: string, updates: any) => void
}

type PatternEditorStateT = {
	signalRows: any
	signalCellWidth: number | null
	reset: () => void
	cellWidth: (cellWidth: number) => void
	removeSignal: (noteId: string, signalId: string) => void
	addSignal: (noteId: string, signal: any) => void
}

type ChordBrowserStateT = {
	selectedRootNote: string
	isSuggestActive: boolean
	suggestionVibe: string
	reset: () => void
	setSelectedRootNote: (rootNote: string) => void
	toggleIsSuggestActive: () => void
	setSuggestionVibe: (vibe: string) => void
}

// Stores
export const useScaleStore = create<ScaleStateT>((set, get) => ({
	key: APP_CONFIG.defaultScaleRootNote,
	type: APP_CONFIG.defaultScaleType,
	baseOctave: APP_CONFIG.defaultBaseOctave,
	name: `${APP_CONFIG.defaultScaleRootNote} ${APP_CONFIG.defaultScaleType}`,
	notes: theory.getScaleNotes(`${APP_CONFIG.defaultScaleRootNote} ${APP_CONFIG.defaultScaleType}`),
	chordNames: theory.getScaleChordNames(`${APP_CONFIG.defaultScaleRootNote} ${APP_CONFIG.defaultScaleType}`),
	groupedChordNames: theory.getRootNoteGroupedChordNames(`${APP_CONFIG.defaultScaleRootNote} ${APP_CONFIG.defaultScaleType}`),

	reset: () =>
		set({
			key: APP_CONFIG.defaultScaleRootNote,
			type: APP_CONFIG.defaultScaleType,
			name: `${APP_CONFIG.defaultScaleRootNote} ${APP_CONFIG.defaultScaleType}`,
			notes: theory.getScaleNotes(`${APP_CONFIG.defaultScaleRootNote} ${APP_CONFIG.defaultScaleType}`),
			chordNames: theory.getScaleChordNames(`${APP_CONFIG.defaultScaleRootNote} ${APP_CONFIG.defaultScaleType}`)
		}),

	setKey: (key: string) => set({ key }),
	setType: (type: string) => set({ type }),
	setBaseOctave: (baseOctave: number) => set({ baseOctave })
}))

export const useOutputStore = create<OutputStateT>((set, get) => ({
	selectedType: APP_CONFIG.defaultOutputType,
	selectedInstrumentName: APP_CONFIG.defaultInstrumentName,
	selectedMidiOutputDeviceName: '',
	audioContext: null,
	audioError: null,
	isAudioReady: false,
	isOutputEnabled: false,
	midiError: null,
	isMidiReady: false,
	isMidiEnabled: false,
	isLoadingMidi: false,
	midiDeviceNames: [],
	isLoadingInstrument: false,
	allInstrumentNames: [],
	selectedOutputType: 'instrument',
	loadedInstruments: [],
	loadedInstrumentNames: [],
	reset: () =>
		set({
			selectedType: APP_CONFIG.defaultOutputType,
			selectedInstrumentName: APP_CONFIG.defaultInstrumentName,
			selectedMidiOutputDeviceName: '',
			audioContext: null,
			audioError: null,
			isAudioReady: false,
			isOutputEnabled: false,
			midiError: null,
			isMidiReady: false,
			isMidiEnabled: false,
			isLoadingMidi: false,
			midiDeviceNames: [],
			selectedOutputType: 'instrument',
			isLoadingInstrument: false,
			allInstrumentNames: [],
			loadedInstruments: [],
			loadedInstrumentNames: []
		}),

	setSelectedMidiOutputDeviceName: (selectedMidiOutputDeviceName: string) =>
		set({
			selectedMidiOutputDeviceName
		}),

	setSelectedInstrumentName: (selectedInstrumentName: string) =>
		set({
			selectedInstrumentName
		}),

	setSelectedOutputType: (selectedOutputType: string) =>
		set({
			selectedOutputType
		})
}))

const CHORD_PROGRESSION_KEY_MAP = [
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'0',
	'Q',
	'W',
	'E',
	'R',
	'T',
	'Y',
	'U',
	'I',
	'O',
	'P',
	'A',
	'S',
	'D',
	'F',
	'G',
	'H',
	'J',
	'K',
	'L',
	'Z',
	'X',
	'C',
	'V',
	'B',
	'N',
	'M'
]

export const useChordProgressionStore = create<ChordProgressionStateT>((set, get) => ({
	chords: [],

	reset: () => set({ chords: [] }),

	addChord: (chordSymbol, modifiers) => {
		const id = nanoid(8)
		const newIndex = get().chords.length
		const keyMap = CHORD_PROGRESSION_KEY_MAP[newIndex]
		const duration = '1 bar'
		const chord = { ...theory.getChord(chordSymbol), ...modifiers, keyMap, id, duration }
		const newChords = [...get().chords, chord]
		set({ chords: newChords })
	},

	removeChord: (chordId) =>
		set((state) => ({
			chords: state.chords.filter((chord) => chord.id !== chordId)
		})),

	updateChord: (chordId, updates) =>
		set((state) => ({
			chords: state.chords.map((chord) => (chord.id === chordId ? { ...chord, ...updates } : chord))
		}))
}))

export const usePatternEditorStore = create<PatternEditorStateT>((set, get) => ({
	signalRows: buildEmptySignalsState(),
	signalCellWidth: null,
	reset: () =>
		set({
			signalRows: buildEmptySignalsState(),
			signalCellWidth: null
		}),
	cellWidth: (cellWidth) => set({ signalCellWidth: cellWidth }),
	removeSignal: (noteId, signalId) =>
		set((state) => ({
			signalRows: {
				...state.signalRows,
				[noteId]: state.signalRows[noteId].filter((signal: any) => signal.id !== signalId)
			}
		})),
	addSignal: (noteId, signal) =>
		set((state) => ({
			signalRows: {
				...state.signalRows,
				[noteId]: [...state.signalRows[noteId], signal]
			}
		}))
}))

const getFirstScaleNote = () => useScaleStore.getState().notes[0]

export const useChordBrowserStore = create<ChordBrowserStateT>((set, get) => ({
	selectedRootNote: 'All',
	isSuggestActive: false,
	suggestionVibe: 'Emotional',
	reset: () => set({ selectedRootNote: 'All' }),
	setSuggestionVibe: (vibe) => set({ suggestionVibe: vibe }),
	toggleIsSuggestActive: () => set({ isSuggestActive: !get().isSuggestActive }),
	setSelectedRootNote: (rootNote) => set({ selectedRootNote: rootNote })
}))
