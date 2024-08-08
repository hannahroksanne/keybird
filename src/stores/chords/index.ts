import { create } from 'zustand'
import { toner } from '../../utilities/toner/toner'

type StoreT = {
	inScaleChorNames: string[]
	inScaleChords: AnyObjectT[]
}

const INITIAL_STATE = {
	inScaleChords: [],
	inScaleChorNames: []
}

const useStore = create<StoreT>(() => {
	return {
		...INITIAL_STATE
	}
})

export const $logs = {
	use: useStore,
	getState: useStore.getState,
	setState: useStore.setState,

	get state() {
		return useStore.getState()
	}
}
