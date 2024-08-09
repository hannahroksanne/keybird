import { create } from 'zustand'
import { toner } from '../../utilities/toner/toner'

type StoreT = {
	inScaleChordNames: string[]
	inScaleChords: AnyObjectT[]
}

const INITIAL_STATE = {
	inScaleChords: [],
	inScaleChordNames: []
}

const useStore = create<StoreT>(() => {
	return {
		...INITIAL_STATE
	}
})

export const $chords = {
	use: useStore,
	getState: useStore.getState,
	setState: useStore.setState,

	get state() {
		return useStore.getState()
	}
}
