import { expect, test } from 'vitest'
import { $store } from './$store.ts'

import { ALL_SCALES } from './utilities/allScales'

test('setScale ', () => {
	expect($store.state.scaleKey).toBe('B')
	expect($store.state.scaleType).toBe('minor')
	expect($store.state.scaleName).toBe('B minor')
	expect($store.state.scaleChords).toEqual(ALL_SCALES['B minor'])
	expect($store.state.scaleNotes).toEqual(['B', 'C#', 'D', 'E', 'F#', 'G', 'A'])

	$store.setScale('A', 'minor')
	expect($store.state.scaleKey).toBe('A')
	expect($store.state.scaleType).toBe('minor')
	expect($store.state.scaleName).toBe('A minor')
	expect($store.state.scaleChords).toEqual(ALL_SCALES['A minor'])
	expect($store.state.scaleNotes).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
})
