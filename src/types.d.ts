type KeyConfigT = {
	keyCode: string
	color: string
	variant: string
	label: string
	width: number
	isFunctional: boolean
	isPlayable: boolean
	function: string
}

type PlayableKeyMappingT = KeyConfigT & {
	note: string
	rootNote: string
	alternateLabel: string
}

type FunctionalKeyMappingT = KeyConfigT & {
	alternateLabel: string
}

type KeyMappingT = FunctionalKeyMappingT | PlayableKeyMappingT

type KeyConfigMapT = {
	[keyCode: string]: KeyConfigT
}

type KeyMapT = {
	[keyCode: string]: KeyMappingT
}

type LogConfigT = {
	level: 'info' | 'warn' | 'error' | 'success'
	title: string
	message: string
	data: AnyObjectT
}

type LogsConfigT = {
	[key: string]: LogConfigT
}

type MainStateT = {
	logs: LogConfigT[]
	isLogsOverlayOpen: boolean
	octave: number
	scaleName: string
	scaleRootNote: string
	scaleType: string
	scaleNotes: string[]
	scaleChordNames: string[]
	keyMapLayoutName: string
	keyboardLayoutName: string
	shouldShowAltLabels: boolean
	isMidiConnected: boolean
	isMidiEnabled: boolean
	midiOutputName: string
	midiConnectionError: any
	pressedKeyCodes: string[]
	playingNotes: string[]
	playingRootNotes: string[]
	keyMap: KeyMapT
	playingChordNames: string[]
}

// ####################### old below

type VboardRootNoteT = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

type VboardLayoutKeyT = {
	function: string
	label: string
	code: string
	width: number
}

type VboardLayoutT = {
	id: string
	rows: VboardRowT[]
}

type VboardRowT = {
	id: string
	keys: VboardLayoutKeyT[]
}

type VboardKeyT = {
	function: string
	label: string
	code: string
	width: number
	className?: string
	variant?: string
	color?: string
}

type VboardChordT = {
	rootNote: string
	name: string
	notes: string[]
	scaleNames?: string[]
}

type VboardScaleT = {
	rootNote: VboardRootNoteT
	notes: string[]
	chordNames: string[]
	scaleType: string
}

type VboardSymbolT = {
	name: string
	symbols: string[]
	example: string
}

type VboardAllScalesT = {
	[key: VboardScaleNameT]: VboardScaleT
}

namespace VboardT {
	export type RootNote = VboardRootNoteT
	export type ScaleType = VboardScaleTypeT
	export type ScaleName = VboardScaleNameT
	export type Layout = VboardLayoutT
	export type Row = VboardRowT
	export type Key = VboardKeyT
	export type Chord = VboardChordT
	export type Scale = VboardScaleT
	export type Symbol = VboardSymbolT
	export type AllScales = VboardAllScalesT
}

type KeyEventT = Partial<KeyboardEvent> & {
	key: string // 'a', 'A', '1', 'Enter', 'Shift', 'ArrowUp', etc
	code: string // 'KeyA', 'Digit1', 'Enter', 'ShiftRight', 'ArrowUp', etc
	type: string // 'keydown', 'keyup', 'keypress'
	altKey: boolean // Is the alt key pressed?
	shiftKey: boolean // Is the shift key pressed?
	ctrlKey: boolean // Is the control key pressed?
	metaKey: boolean // Is Windows / Command key pressed?
	repeat: boolean // Is the key being held down?
	location: number // 0 standard, 1 left, 2 right, 3 numpad, 4 mobile, 5 joystick
	currentTarget: HTMLElement // To reference the key.
}

type QwertyKeyT = {
	// So that we can keep specific keys maintained
	// and configued in the qwertyKeys.config but
	// not have them rendering to the DOM.
	isIgnored: boolean

	// Each quertyKey specifies the row it will
	// be rendered in. This is to simplify complexity
	// related to having nested objects in state.
	row: number
	keyCode: string
	label: string
	width: number
	altLabel: string
	isPressed: boolean
	isRelated: boolean
	isPlayable: boolean
	isFunctional: boolean
	isDisabled: boolean
	isConfigurable: boolean
	function: string
	variant: string
	color: string
	midi: number
	velocity: number
	pattern: string
	rhythm: string
	inversion: number
	voicing: string
	humanize: number
	note: string
	rootNote: string
}

type KeyCodeAndRowT = {
	keyCode: string
	row: number
}
