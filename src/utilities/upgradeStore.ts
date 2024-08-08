import { create } from 'zustand'

export const upgradeStore = <StateT, ActionsT>(state: StateT, additions: ActionsT) => {
	const store = create<StateT>(() => state)

	return {
		use: store,
		subscribe: store.subscribe,

		setState: store.setState,

		get state() {
			return store.getState()
		},

		...additions
	}
}

type _StoreT<T> = {
	state: T
	setState: (state: Partial<T>) => void
}

export const upgradeStore1 = <StateT, ActionsT>(
	state: StateT,
	prepareActions: (store: _StoreT<StateT>) => ActionsT
) => {
	const store = create<StateT>(() => state)

	const $store = {
		use: store,

		subscribe: store.subscribe,
		setState: store.setState,

		get state() {
			return store.getState()
		}
	}

	const actions = prepareActions($store)
	return [$store, actions]
}
