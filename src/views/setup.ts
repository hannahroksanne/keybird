import React from 'react'
import { CONSTS } from '../consts'
import { $core } from '../stores/core/$core'
import * as Tonal from 'tonal'
import cloneDeep from 'clone-deep'

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

		// console.log('done checking related keys', qwertyKeys)
		$core.setState({ qwertyKeys })
	}, [pressedKeys.length])
}

const useKeyMapper = () => {
	const scaleNotesString = $core.use((state) => state.scaleNotes.join(' '))
	const pastResults = React.useRef<AnyObjectT>({})

	// Whenever the scaleNotes changes, update the
	// mapping of the qwertyKeys.
	React.useEffect(() => {
		console.log('remapping qwertyKeys')
		const pastResult = pastResults.current[scaleNotesString]

		if (pastResult) {
			const qwertyKeys = cloneDeep(pastResult)
			console.log(scaleNotesString, ' has been mapped before.', qwertyKeys)
			$core.setState({ qwertyKeys })
			return
		}

		const cleanQwertyKeys = CONSTS.getQwertyKeysClone()
		const scaleNotes = $core.state.scaleNotes
		const target = createReducerTarget()

		const { qwertyKeys } = cleanQwertyKeys.reduce((final, key) => {
			if (!key.isPlayable) {
				final.qwertyKeys.push(key)
				return final
			}

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

		pastResults.current[scaleNotesString] = qwertyKeys
		$core.setState({ qwertyKeys })
	}, [scaleNotesString])
}
