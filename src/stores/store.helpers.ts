import { store } from './store'
import { toner } from '../utilities/toner'
import defaultKeysConfig from '../consts/default.keys.json'
import getRandom from 'just-random'
import filterObject from 'just-filter-object'
import { chords } from '../consts/chords'
import keyMapLayoutsConfig from '../consts/default.keymaps.json'

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

export function generateKeyMap(): KeyMapT {
	const scaleName = store.scaleName
	const octave = store.octave
	const scaleNotes = store.scaleNotes
	const keyMapLayout = keyMapLayoutsConfig[store.keyMapLayoutName]
	const playableKeysCount = keyMapLayout.keyMapOrder.length
	const functionalKeyConfigs = getFunctionalKeyConfigsMap(defaultKeysConfig)
	const scaleChords = chords[scaleName]
	const keyMap = { ...functionalKeyConfigs }

	console.log({
		scaleName,
		scaleChords,
		scaleNotes
		// octave,
		// keyMapLayout,
		// playableKeysCount,
		// functionalKeyConfigs,
		// keyMap
	})

	// Generate an array of the notes that will be applied
	// based off of keyMapLayout. i.e B2, C#3, D3, A3, C4...
	const notes = toner.getManyOctavedNotes({
		count: playableKeysCount,
		baseOctave: octave,
		scaleNotes: scaleNotes
	})

	// For each keyCode in keyMapLayout.keyMapOrder
	// get the corresponding keyConfig from defaultKeysConfig
	// and apply the corresponding note and rootNote.
	// Also accounts for keyMapLayout remaps.
	keyMapLayout.keyMapOrder.forEach((keyCode, index) => {
		const keyConfig = defaultKeysConfig[keyCode]
		const originalNote = notes[index]
		const originalRootNote = toner.getNoteRootNote(originalNote)

		const remapIndex = keyMapLayout.remaps[keyCode]
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
