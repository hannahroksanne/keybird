import React from 'react'
import { CONSTS } from '../consts'
import { $core } from '../stores/core/$core'
import * as Tonal from 'tonal'
import cloneDeep from 'clone-deep'
import { toner } from '../utilities/toner'
import { $chords } from '../stores/chords'
import mems from 'mems'

const getScaleNotes = (rootNote: string, scaleType: string) => {
	return Tonal.Scale.get(`${rootNote} ${scaleType}`).notes
}

const getMidiNote = (note: string) => {
	return Tonal.Note.midi(note) as number
}

export const useCoreStoreMonitor = () => {
	useKeyMapper()
	useScaleManager()
	useRelatedKeysHandler()
	useChordsWatcher()
}

const useScaleManager = () => {
	const coreStore = $core.use()

	// Whenever the rootNote or scaleType changes,
	// update the scaleNotes.
	React.useEffect(() => {
		const scaleNotes = getScaleNotes(coreStore.scaleRootNote, coreStore.scaleType)
		$core.setState({ scaleNotes })
	}, [coreStore.scaleType, coreStore.scaleRootNote])
}

type KeyReducerTarget = {
	qwertyKeys: QwertyKeyT[]
	index: number
	octave: number
	lastRootNoteIndex: number
}

const createReducerTarget = (): KeyReducerTarget => {
	return {
		qwertyKeys: [],
		index: 0,
		octave: 1,
		lastRootNoteIndex: -1
	}
}

const useRelatedKeysHandler = () => {
	const pressedKeys = $core.usePressedKeys()
	// const pressedKeys = [{ rootNote: 'C' }, { rootNote: 'E' }]

	React.useEffect(() => {
		if (pressedKeys.length === 0) {
			const qwertyKeys = $core.state.qwertyKeys.map((key) => {
				if (key.isRelated) return { ...key, isRelated: false }
				return key
			})

			$core.setState({ qwertyKeys })
			return
		}

		const rootNotes = pressedKeys.map((key) => key.rootNote)

		const qwertyKeys = $core.state.qwertyKeys.map((key) => {
			if (!key.isPlayable) return key
			if (key.isPressed && !key.isRelated) return key
			if (key.isPressed && key.isRelated) return { ...key, isRelated: false }
			const isRelated = rootNotes.includes(key.rootNote)
			return { ...key, isRelated }
		})

		$core.setState({ qwertyKeys })
	}, [pressedKeys.length])
}

const pastResults = new Map()

const layouts = {
	default: [
		'Digit1',
		'Digit2',
		'Digit3',
		'Digit4',
		'Digit5',
		'Digit6',
		'Digit7',
		'Digit8',
		'Digit9',
		'Digit0',
		'Minus',
		'Equal',
		'KeyQ',
		'KeyW',
		'KeyE',
		'KeyR',
		'KeyT',
		'KeyY',
		'KeyU',
		'KeyI',
		'KeyO',
		'KeyP',
		'BracketLeft',
		'BracketRight',
		'Backslash',
		'KeyA',
		'KeyS',
		'KeyD',
		'KeyF',
		'KeyG',
		'KeyH',
		'KeyJ',
		'KeyK',
		'KeyL',
		'Semicolon',
		'Quote',
		'ShiftLeft',
		'KeyZ',
		'KeyX',
		'KeyC',
		'KeyV',
		'KeyB',
		'KeyN',
		'KeyM',
		'Comma',
		'Period',
		'Slash'
	],
	sidewaysRight: [
		'Digit1',
		'KeyQ',
		'KeyA',
		'KeyZ',
		'Digit2',
		'KeyW',
		'KeyS',
		'KeyX',
		'Digit3',
		'KeyE',
		'KeyD',
		'KeyC',
		'Digit4',
		'KeyR',
		'KeyF',
		'KeyV',
		'Digit5',
		'KeyT',
		'KeyG',
		'KeyB',
		'Digit6',
		'KeyY',
		'KeyH',
		'KeyN',
		'Digit7',
		'KeyU',
		'KeyJ',
		'KeyM',
		'Digit8',
		'KeyI',
		'KeyK',
		'Comma',
		'Digit9',
		'KeyO',
		'KeyL',
		'Period',
		'Digit0',
		'KeyP',
		'Semicolon',
		'Slash',
		'Minus',
		'BracketLeft',
		'Quote',
		'Equal',
		'BracketRight'
	]
}

const separatePlayableAndFunctionalQwertyKeys = (keys: QwertyKeyT[]) => {
	const separationTarget = { playableQwertyKeys: [], functionalQwertyKeys: [] }

	return keys.reduce((final, key) => {
		if (key.isPlayable) final.playableQwertyKeys.push(key)
		else final.functionalQwertyKeys.push(key)
		return final
	}, separationTarget)
}

const useKeyMapper = () => {
	const scaleNotesString = $core.use((state) => state.scaleNotes.join(' '))
	const layoutName = $core.use((state) => state.layoutName)
	const octave = $core.use((state) => state.octave)

	// Whenever the scaleNotes changes, update the
	// mapping of the qwertyKeys.
	React.useEffect(() => {
		const pastResult = pastResults.get(scaleNotesString + layoutName)

		if (pastResult) {
			const qwertyKeys = cloneDeep(pastResult)
			$core.setState({ qwertyKeys })
			return
		}

		const separated = separatePlayableAndFunctionalQwertyKeys(CONSTS.QWERTY_KEYS)
		const { playableQwertyKeys, functionalQwertyKeys } = separated
		const scaleNotes = $core.state.scaleNotes
		const target = createReducerTarget()
		const layout = layouts[layoutName]
		const layoutSortedQwertyKeys = []

		layout.forEach((keyCode: string, index: number) => {
			const qwertyKey = playableQwertyKeys.find((key) => key.keyCode === keyCode)
			layoutSortedQwertyKeys[index] = qwertyKey
		})

		const { qwertyKeys } = layoutSortedQwertyKeys.reduce((final, qwertyKey) => {
			const key = { ...qwertyKey }
			const rootNote = scaleNotes[final.index % scaleNotes.length]
			const allNotesIndex = CONSTS.MUSIC.ROOT_NOTES.indexOf(rootNote)
			const isFirstIteration = final.lastRootNoteIndex === -1
			const isNoteInNewOctave = !isFirstIteration && allNotesIndex <= final.lastRootNoteIndex

			if (isNoteInNewOctave) final.octave++
			key.rootNote = rootNote
			key.note = `${rootNote}${final.octave}`
			key.midi = getMidiNote(key.note)
			final.qwertyKeys.push(key)
			final.index++
			final.lastRootNoteIndex = allNotesIndex

			return final
		}, target)

		const final = CONSTS.QWERTY_KEYS.map((key: QwertyKeyT) => {
			if (key.isFunctional) return { ...key }
			return qwertyKeys.find((k) => k.keyCode === key.keyCode)
		})

		pastResults.set(scaleNotesString + layoutName, final)
		$core.setState({ qwertyKeys: final })
	}, [scaleNotesString, octave, layoutName])
}

const useChordsWatcher = () => {
	const scaleRootNote = $core.use((state) => state.scaleRootNote)
	const scaleType = $core.use((state) => state.scaleType)

	React.useEffect(() => {
		const scaleName = `${scaleRootNote} ${scaleType}`
		const scale = toner.scales.find((scale) => scale.name === scaleName)
		const chordNames = scale.chords
		$chords.setState({ inScaleChordNames: chordNames })

		const inScaleChords = chordNames.map((chordName) => {
			return toner.chords.find((chord) => chord.name === chordName)
		})

		$chords.setState({ inScaleChords })
	}, [scaleRootNote, scaleType])
}
