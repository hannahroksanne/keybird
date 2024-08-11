import { store } from './store'
import { toner } from './utilities/toner/toner'
import keyMapLayoutsConfig from './keyMapLayouts.config.json'
import defaultKeysConfig from './defaultKeys.config.json'

const getFunctionalKeyConfigsMap = (configs: KeyConfigMapT) => {
	const keyConfigsMap = {}
	const entries = Object.entries(configs)
	const handleEntry = (entry) => entry[1].isFunctional && (keyConfigsMap[entry[0]] = entry[1])
	entries.forEach(handleEntry)
	return keyConfigsMap
}

export function generateKeyMap() {
	const keyMapLayoutName = store.keyMapLayoutName
	const scaleNotes = store.scaleNotes
	const octave = store.octave

	const functionalKeyConfigs = getFunctionalKeyConfigsMap(defaultKeysConfig)
	const keyMapLayout = keyMapLayoutsConfig[keyMapLayoutName]
	const keyMap = { ...functionalKeyConfigs }

	// Generate an array of the notes that will be applied
	// based off of keyMapLayout.
	const notes = toner.getManyOctavedNotes({
		count: keyMapLayout.keyMapOrder.length,
		baseOctave: octave,
		scaleNotes
	})

	// For each keyCode in keyMapLayout.keyMapOrder
	// get the corresponding keyConfig from defaultKeysConfig
	// and apply the corresponding note and rootNote.
	// Also accounts for keyMapLayout remaps.
	keyMapLayout.keyMapOrder.forEach((keyCode, index) => {
		const keyConfig = defaultKeysConfig[keyCode]
		const remapIndex = keyMapLayout.remaps[keyCode]
		const note = remapIndex ? notes[remapIndex] : notes[index]
		const rootNote = toner.getNoteRootNote(note)

		keyMap[keyCode] = {
			...keyConfig,
			alternateLabel: note,
			rootNote,
			note
		}
	})

	return keyMap
}
