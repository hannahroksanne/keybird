import { create } from 'zustand'
import { LOGS_CONFIG } from './logs.config'

type DevelopmentLogT = {
	level: 'info' | 'warn' | 'error' | 'success'
	title: string
	message: string
	data: AnyObjectT
}

type StoreT = {
	list: DevelopmentLogT[]
}

const INITIAL_STATE = {
	list: []
}

const useStore = create<StoreT>(() => {
	return {
		...INITIAL_STATE
	}
})

const log = (id: string, data: AnyObjectT = {}) => {
	const log = { ...LOGS_CONFIG[id], data }
	const list = [log, ...$logs.state.list]
	useStore.setState({ list })
}

export const $logs = {
	use: useStore,
	getState: useStore.getState,
	setState: useStore.setState,

	log,

	get state() {
		return useStore.getState()
	}
}
