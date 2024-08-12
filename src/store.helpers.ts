import { store } from './store'
import { toner } from './utilities/toner'
import defaultKeysConfig from './consts/defaultKeys.config.json'
import getRandom from 'just-random'
import filterObject from 'just-filter-object'
import { chords } from './consts/chords'

const getFunctionalKeyConfigsMap = (configs: KeyConfigMapT) => {
	const checkIsEntryFunctional = (_, config: KeyConfigT) => config.isFunctional
	return filterObject(configs, checkIsEntryFunctional)
}

type GenerateKeyMapOptionsT = {
	scaleName: string
	scaleNotes: string[]
	keyMapLayout: AnyObjectT
	octave: number
}

export function generateKeyMap(options: GenerateKeyMapOptionsT): KeyMapT {
	const functionalKeyConfigs = getFunctionalKeyConfigsMap(defaultKeysConfig)
	const playableKeysCount = options.keyMapLayout.keyMapOrder.length
	const scaleChords = chords[options.scaleName]
	const keyMap = { ...functionalKeyConfigs }

	// Generate an array of the notes that will be applied
	// based off of keyMapLayout. i.e B2, C#3, D3, A3, C4...
	const notes = toner.getManyOctavedNotes({
		count: playableKeysCount,
		baseOctave: options.octave,
		scaleNotes: options.scaleNotes
	})

	// For each keyCode in keyMapLayout.keyMapOrder
	// get the corresponding keyConfig from defaultKeysConfig
	// and apply the corresponding note and rootNote.
	// Also accounts for keyMapLayout remaps.
	options.keyMapLayout.keyMapOrder.forEach((keyCode, index) => {
		const keyConfig = defaultKeysConfig[keyCode]
		const originalNote = notes[index]
		const originalRootNote = toner.getNoteRootNote(originalNote)

		const remapIndex = options.keyMapLayout.remaps[keyCode]
		const note = notes[remapIndex] || originalNote
		const rootNote = remapIndex ? toner.getNoteRootNote(note) : originalRootNote

		const chordName = getRandom(scaleChords[originalRootNote])

		keyMap[keyCode] = {
			...keyConfig,
			isBlackKey: toner.checkIsBlackKey(note),
			chordRootNote: originalRootNote,
			alternateLabel: note,
			chordName,
			rootNote,
			note
		}
	})

	// @ts-ignore
	return keyMap
}
