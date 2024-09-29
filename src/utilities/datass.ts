import React, { useState, useEffect } from 'react'
import safeGet from 'just-safe-get'
import { nanoid } from 'nanoid'
import kindOf from 'kind-of'

const useNanoId = () => {
	return React.useMemo(() => nanoid(), [])
}

type SubscriberT = {
	id: string
	update: (newState: any) => void
	derive: (newState: any) => any
	previousValue: any
	currentValue: any
}

type SelectorT = (state: any) => any

class DatassStore<T> {
	storeId: string
	storeType: string
	initialState: T
	currentState: T
	previousState: T | null
	subscribers: Map<string, SubscriberT>
	shouldUpdate: (previousValue: any, newValue: any) => boolean

	constructor(storeType: string, ...args: any[]) {
		this.storeType = storeType
		this.previousState = null
		this.subscribers = new Map()

		const otherArgsCount = args.length

		if (otherArgsCount === 1) {
			const initialState = args[0]
			const type = kindOf(initialState)
			const id = nanoid(8)
			this.storeId = `${type}-${id}`
			this.initialState = initialState
			this.currentState = initialState
		} else if (otherArgsCount === 2) {
			const storeId = args[0]
			const initialState = args[1]
			this.storeId = storeId
			this.initialState = initialState
			this.currentState = initialState
		} else {
			throw new Error('Invalid datass store: datass.TYPE(id?, value)')
		}

		this.shouldUpdate = (previousValue: any, newValue: any) => previousValue !== newValue
	}

	replaceState(newState: T) {
		this.previousState = this.currentState
		this.currentState = newState

		this.subscribers.forEach((subscriber) => {
			const newValue = subscriber.derive(newState)
			const previousValue = subscriber.currentValue
			const shouldUpdate = this.shouldUpdate(previousValue, newValue)

			if (shouldUpdate) {
				subscriber.previousValue = subscriber.currentValue
				subscriber.currentValue = newValue
				subscriber.update(newValue)
			}
		})
	}

	subscribe(subscriber: SubscriberT) {
		const _subscriber = {
			...subscriber,
			currentValue: subscriber.previousValue
		}

		this.subscribers.set(subscriber.id, _subscriber)
		return () => this.unsubscribe(subscriber.id)
	}

	unsubscribe(id: string) {
		this.subscribers.delete(id)
	}

	useSelector(selector: SelectorT) {
		const subscriptionId = useNanoId()
		const [value, setValue] = useState(() => selector(this.currentState))

		useEffect(() => {
			const unsubscribe = this.subscribe({
				derive: (newState: T) => selector(newState),
				previousValue: value,
				currentValue: value,
				update: setValue,
				id: subscriptionId
			})

			return unsubscribe
		}, [value])

		return value
	}

	use() {
		const subscriptionId = useNanoId()
		const initialValue = this.currentState
		const [value, setValue] = useState(initialValue)
		const getCurrentState = (newState: T) => newState

		useEffect(() => {
			const unsubscribe = this.subscribe({
				derive: getCurrentState,
				previousValue: value,
				currentValue: value,
				update: setValue,
				id: subscriptionId
			})

			return unsubscribe
		}, [value])

		return value
	}

	get state() {
		return this.currentState
	}

	identify(name: string) {
		this.storeId = name
	}
}

class DatassObjectStore<T extends object> extends DatassStore<T> {
	shouldUpdate = (previousValue: any, newValue: any) => {
		return !this.areObjectsEqual(previousValue, newValue)
	}

	areObjectsEqual(obj1: any, obj2: any): boolean {
		if (obj1 === obj2) return true
		if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) return false
		const keys1 = Object.keys(obj1)
		const keys2 = Object.keys(obj2)
		if (keys1.length !== keys2.length) return false
		for (const key of keys1) {
			if (!keys2.includes(key) || !this.areObjectsEqual(obj1[key], obj2[key])) return false
		}
		return true
	}

	setState = (partialState: Partial<T> | T) => {
		this.replaceState({ ...this.currentState, ...partialState })
	}

	set = (partialState: Partial<T> | T) => {
		this.replaceState({ ...this.currentState, ...partialState })
	}

	usePartial = (path: string) => {
		return this.useSelector((state: T) => safeGet(state, path))
	}

	use = (selector?: (state: T) => any) => {
		if (selector) {
			return this.useSelector(selector)
		}
		return super.use()
	}
}

class DatassNumberStore extends DatassStore<number> {
	shouldUpdate = (a: number, b: number) => {
		return a !== b
	}

	setState = (newState: number) => {
		this.replaceState(newState)
	}

	set = (newState: number) => {
		this.replaceState(newState)
	}

	increment = () => {
		this.replaceState(this.currentState + 1)
	}

	decrement = () => {
		this.replaceState(this.currentState - 1)
	}

	get stringified() {
		return this.currentState.toString()
	}
}

class DatassBooleanStore extends DatassStore<boolean> {
	shouldUpdate = (a: boolean, b: boolean) => {
		return a !== b
	}

	setState = (newState: boolean) => {
		this.replaceState(newState)
	}

	set = (newState: boolean) => {
		this.replaceState(newState)
	}

	toggle = () => {
		this.replaceState(!this.currentState)
	}
}

class DatassStringStore extends DatassStore<string> {
	shouldUpdate = (a: string, b: string) => {
		return a !== b
	}

	setState = (newState: string) => {
		this.replaceState(newState)
	}

	set = (newState: string) => {
		this.replaceState(newState)
	}
	append = (value: string) => {
		this.replaceState(this.currentState + value)
	}

	prepend = (value: string) => {
		this.replaceState(value + this.currentState)
	}
}

class DatassArrayStore<T> extends DatassStore<T[]> {
	shouldUpdate = (previousValue: any, newValue: any) => {
		if (Array.isArray(previousValue) && Array.isArray(newValue)) {
			return !this.areArraysEqual(previousValue, newValue)
		}

		return previousValue !== newValue
	}

	areArraysEqual(arr1: any[], arr2: any[]): boolean {
		if (arr1.length !== arr2.length) return false
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) return false
		}
		return true
	}

	setState = (newState: T[]) => {
		this.replaceState(newState)
	}

	set = (newState: T[]) => {
		this.replaceState(newState)
	}

	useFilter = (filterCallback: (item: T) => boolean) => {
		return this.useSelector((state: T[]) => state.filter(filterCallback))
	}

	useMap = (mapCallback: (item: T) => any) => {
		return this.useSelector((state: T[]) => state.map(mapCallback))
	}
}

export const datass = {
	boolean: (...args: any[]) => new DatassBooleanStore('boolean', ...args),
	number: (...args: any[]) => new DatassNumberStore('number', ...args),
	string: (...args: any[]) => new DatassStringStore('string', ...args),
	array: <T>(...args: any[]) => new DatassArrayStore<T>('array', ...args),
	object: <T>(...args: any[]) => new DatassObjectStore<T>('object', ...args)
}
