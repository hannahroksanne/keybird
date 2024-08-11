import { store } from './store'
import { toner } from './utilities/toner/toner'
import keyMapLayoutsConfig from './keyMapLayouts.config.json'
import defaultKeysConfig from './defaultKeys.config.json'
import uniqueRandomArray from 'unique-random-array'

const getFunctionalKeyConfigsMap = (configs: KeyConfigMapT) => {
	const keyConfigsMap = {}
	const entries = Object.entries(configs)
	const handleEntry = (entry) => entry[1].isFunctional && (keyConfigsMap[entry[0]] = entry[1])
	entries.forEach(handleEntry)
	return keyConfigsMap
}

const getChordsTonicsMap = (chordNames) => {
	const chordNamesMap = {}
	const chords = chordNames.map(toner.getChord)

	for (const chord of chords) {
		const complexity = chord.notes.length
		if (chord.name.includes('suspended')) continue
		chordNamesMap[chord.tonic] ??= []
		chordNamesMap[chord.tonic][complexity] ??= []
		chordNamesMap[chord.tonic][complexity].push(chord.symbol)
	}

	for (const tonic in chordNamesMap) {
		const uniqueChordNames = Array.from(new Set(chordNamesMap[tonic].flat()))
		chordNamesMap[tonic] = uniqueRandomArray(uniqueChordNames)
	}

	return chordNamesMap
}

export function generateKeyMap() {
	const inScaleChordNames = store.scaleChordNames
	const chordsTonicsMap = getChordsTonicsMap(inScaleChordNames)
	const keyMapLayoutName = store.keyMapLayoutName
	const scaleNotes = store.scaleNotes
	const octave = store.octave

	const functionalKeyConfigs = getFunctionalKeyConfigsMap(defaultKeysConfig)
	const keyMapLayout = keyMapLayoutsConfig[keyMapLayoutName]
	const keyMap = { ...functionalKeyConfigs }
	const keysCount = keyMapLayout.keyMapOrder.length
	const chordsPerTonic = Math.ceil(keysCount / scaleNotes.length)

	// Generate an array of the notes that will be applied
	// based off of keyMapLayout.
	const notes = toner.getManyOctavedNotes({
		count: keysCount,
		baseOctave: octave,
		scaleNotes
	})

	console.log('tonics map', chordsPerTonic, chordsTonicsMap)
	// For each keyCode in keyMapLayout.keyMapOrder
	// get the corresponding keyConfig from defaultKeysConfig
	// and apply the corresponding note and rootNote.
	// Also accounts for keyMapLayout remaps.
	keyMapLayout.keyMapOrder.forEach((keyCode, index) => {
		const keyConfig = defaultKeysConfig[keyCode]
		const remapIndex = keyMapLayout.remaps[keyCode]
		const originalNote = notes[index]
		const note = remapIndex ? notes[remapIndex] : originalNote
		const originalRootNote = toner.getNoteRootNote(originalNote)
		const rootNote = remapIndex ? toner.getNoteRootNote(note) : originalRootNote
		// const chordTonicIndex = Math.floor(index / chordsPerTonic)

		const chordName = chordsTonicsMap[originalRootNote]()
		// const chordName = chordsTonicsMap[rootNote]?.[scaleNotes.length]?.[0] ?? ''

		keyMap[keyCode] = {
			...keyConfig,
			alternateLabel: note,
			chordRootNote: originalRootNote,
			chordName,
			rootNote,
			note
		}
	})

	return keyMap
}
