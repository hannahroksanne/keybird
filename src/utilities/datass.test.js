import { datass } from './datass'
import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

describe('datass.boolean', () => {
	const $store = datass.boolean(false)

	test('sets boolean initialState correctly', () => {
		expect($store.state).toBe(false)
	})

	test('sets new state correctly', () => {
		$store.setState(true)
		expect($store.state).toBe(true)
	})

	test('toggles state correctly', () => {
		$store.toggle()
		expect($store.state).toBe(false)
	})
})

describe('datass.number', () => {
	const $store = datass.number(0)

	test('sets number initialState correctly', () => {
		expect($store.state).toBe(0)
	})

	test('sets new state correctly', () => {
		$store.setState(10)
		expect($store.state).toBe(10)
	})

	test('increments state correctly', () => {
		$store.increment()
		expect($store.state).toBe(11)
	})

	test('decrements state correctly', () => {
		$store.decrement()
		expect($store.state).toBe(10)
	})
})

describe('datass.string', () => {
	const $store = datass.string('')

	test('sets string initialState correctly', () => {
		expect($store.state).toBe('')
	})

	test('sets new state correctly', () => {
		$store.setState('hello')
		expect($store.state).toBe('hello')
	})
})

describe('datass.array', () => {
	const initialState = []
	const updatedState0 = [1, 2, 3]
	const $store = datass.array(initialState)

	test('sets array initialState correctly', () => {
		expect($store.state).toBe(initialState)
	})

	test('sets new state correctly', () => {
		$store.setState(updatedState0)
		expect($store.state).toBe(updatedState0)
	})
})

describe('datass.array store useMap()', () => {
	const $store = datass.array([1, 2, 3])
	const updateSpy = vi.fn()

	const { result } = renderHook(() => {
		const doubledNumbers = $store.useMap((number) => number * 2)
		React.useEffect(() => {
			updateSpy()
		}, [doubledNumbers])
		return doubledNumbers
	})

	test('useMap() maps values correctly', () => {
		expect(result.current).toEqual([2, 4, 6])
		expect(updateSpy).toHaveBeenCalledTimes(1)
		act(() => $store.setState([1, 2, 3, 4]))
		expect(result.current).toEqual([2, 4, 6, 8])
		expect(updateSpy).toHaveBeenCalledTimes(2) // values in derived array by useMap DO change so re-render
	})

	test('useMap() only subscribes to updated values in returned array', () => {
		act(() => $store.setState([1, 2, 3]))
		expect(result.current).toEqual([2, 4, 6])
		expect(updateSpy).toHaveBeenCalledTimes(3) // values in derived array by useMap DO change so re-render
		// does it update again? should NOT update.
		act(() => $store.setState([1, 2, 3]))
		expect(result.current).toEqual([2, 4, 6])
		expect(updateSpy).toHaveBeenCalledTimes(3) // values in derived array by useMap DO NOT change so no re-render
	})
})

describe('datass.object', () => {
	const initialState = {}
	const updatedState0 = { name: 'John', age: 30 }
	const $store = datass.object(initialState)

	test('sets object initialState correctly', () => {
		expect($store.state).toBe(initialState)
	})

	test('sets new state correctly', () => {
		$store.setState(updatedState0)
		expect($store.state).toEqual(updatedState0)
	})
})

describe('datass.object usePartial()', () => {
	const initialState = { a: { id: 'AAA' }, b: { id: 'BBB' } }
	const $store = datass.object(initialState)
	const updateSpy = vi.fn()

	const { result } = renderHook(() => {
		const aId = $store.usePartial('a.id')
		React.useEffect(() => {
			updateSpy()
		}, [aId])
		return aId
	})

	test('usePartial() returns partial state correctly', () => {
		expect(result.current).toBe('AAA')
		expect(updateSpy).toHaveBeenCalledTimes(1)

		act(() => $store.setState({ a: { id: 'AAA' }, b: { id: 'BBB' } }))
		expect(result.current).toBe('AAA')
		expect(updateSpy).toHaveBeenCalledTimes(1) // value derived by selected path DOES NOT CHANGE so no re-render

		act(() => $store.setState({ a: { id: 'AAA' }, c: { id: 'CCC' } }))
		expect(result.current).toBe('AAA')
		expect(updateSpy).toHaveBeenCalledTimes(1) // value derived by selected path DOES NOT CHANGE so no re-render

		act(() => $store.setState({ a: { id: 'AAAA' }, c: { id: 'CCC' } }))
		expect(result.current).toBe('AAAA')
		expect(updateSpy).toHaveBeenCalledTimes(2) // value derived by selected path DOES CHANGE so re-render
	})
})

describe('datass.object use() with selector', () => {
	const initialState = { a: { id: 'AAA' }, b: { id: 'BBB' } }
	const $store = datass.object(initialState)
	const updateSpy = vi.fn()

	const { result } = renderHook(() => {
		const aId = $store.use((state) => state.a.id)
		React.useEffect(() => {
			updateSpy()
		}, [aId])
		return aId
	})

	test('use() with selector returns partial state correctly', () => {
		expect(result.current).toBe('AAA')
		expect(updateSpy).toHaveBeenCalledTimes(1)

		act(() => $store.setState({ a: { id: 'AAA' }, b: { id: 'BBBB' } }))
		expect(result.current).toBe('AAA')
		expect(updateSpy).toHaveBeenCalledTimes(1) // value derived by selected path DOES NOT CHANGE so no re-render

		act(() => $store.setState({ a: { id: 'AAAA' }, b: { id: 'BBBB' } }))
		expect(result.current).toBe('AAAA')
		expect(updateSpy).toHaveBeenCalledTimes(2) // value derived by selected path DOES CHANGE so re-render
	})
})
