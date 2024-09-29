import { datass } from '#/utilities/datass'
import APP_CONFIG from '#/configuration/app.config.json'
import { buildEmptySignalsState } from '#/utilities/buildEmptySignalsState'

const isLoadingMidi = datass.boolean(false)
const isLoadingInstrument = datass.boolean(false)
const selectedInstrumentName = datass.string(APP_CONFIG.defaultInstrumentName)
const loadedInstruments = datass.array([])
const loadedInstrumentNames = datass.array<string>([])
const midiError = datass.string(null)
const isMidiReady = datass.boolean(false)
const isMidiEnabled = datass.boolean(false)
const midiOutputDeviceNames = datass.array<string>([])
const selectedMidiOutputDeviceName = datass.string('')
const audioContext = datass.object(null)
const isAudioContextReady = datass.boolean(false)
const isOutputEnabled = datass.boolean(false)
const selectedOutputType = datass.string(APP_CONFIG.defaultOutputType)
const shouldShowNoteLabels = datass.boolean(false)
const selectedKeyMapName = datass.string(APP_CONFIG.defaultKeyMapLayoutName)
const signalRows = datass.object(buildEmptySignalsState())
const scaleChordNames = datass.array<string>([])
const scaleNotes = datass.array<string>([])
const selectedScaleKey = datass.string(APP_CONFIG.defaultScaleRootNote)
const selectedScaleType = datass.string(APP_CONFIG.defaultScaleType)
const baseOctave = datass.number(APP_CONFIG.defaultBaseOctave)
const signalCellWidth = datass.number(32)

export const stores = {
	baseOctave,
	signalCellWidth,
	isLoadingMidi,
	loadedInstruments,
	isLoadingInstrument,
	selectedInstrumentName,
	loadedInstrumentNames,
	midiError,
	isMidiReady,
	isMidiEnabled,
	midiOutputDeviceNames,
	selectedMidiOutputDeviceName,
	audioContext,
	isAudioContextReady,
	isOutputEnabled,
	selectedOutputType,
	shouldShowNoteLabels,
	selectedKeyMapName,
	signalRows,
	scaleChordNames,
	scaleNotes,
	selectedScaleKey,
	selectedScaleType
}
