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
	isLogListOpen: boolean
}

const INITIAL_STATE = {
	list: [],
	isLogListOpen: false
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

const toggleLogListOpen = (isLogListOpen: boolean) => {
	useStore.setState({ isLogListOpen })
}

export const $logs = {
	use: useStore,
	getState: useStore.getState,
	setState: useStore.setState,
	toggleLogListOpen,

	log,

	get state() {
		return useStore.getState()
	}
}
