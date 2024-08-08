import DEFAULT_LAYOUT from '../defaultLayout.json'
import { ROOT_NOTES } from '../consts/scales'
import { $store } from './$store'
import { create } from 'zustand'

type StoreT = {
	rows: any[][]
	midiMap: Record<string, string>
	refreshMidiMap: () => void
}

const INITIAL_STATE = {
	rows: DEFAULT_LAYOUT.rows.map((row) => row.keys),
	midiMap: {}
}

const store = create<StoreT>((set, get) => {
	const refreshMidiMap = () => {
		const scaleNotes = $store.state.scaleNotes
		const keys = get().rows.flat()
		const midiMap = {} as AnyObjectT

		const playableKeys = keys.filter((key) => key.function === 'play')
		let octave = 0
		let previousNoteIndex = -1

		for (const keyIndex in playableKeys) {
			const index = Number(keyIndex)
			const key = playableKeys[index]
			const noteIndex = index % scaleNotes.length
			const note = scaleNotes[noteIndex]
			const allNoteIndex = ROOT_NOTES.indexOf(note)

			if (previousNoteIndex !== -1 && allNoteIndex <= previousNoteIndex) {
				octave += 1
			}

			midiMap[key.code] = `${note}${octave}`
			previousNoteIndex = allNoteIndex
		}

		return set({ midiMap })
	}

	return {
		...INITIAL_STATE,
		refreshMidiMap
	}
})

export const useMidiMap = (keyCode?: string): string | AnyObjectT => {
	return $keys.use((state) => (keyCode ? state.midiMap[keyCode] : state.midiMap))
}

export const $keys = {
	use: store,
	subscribe: store.subscribe,
	setState: store.setState,

	useMidiMap,
	refreshMidiMap: store.getState().refreshMidiMap,

	get state() {
		return store.getState()
	}
}
