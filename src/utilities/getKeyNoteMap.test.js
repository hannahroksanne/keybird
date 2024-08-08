import { test, expect } from 'vitest'
import { getKeyNoteMap } from './getKeyNoteMap'

test('getKeyNoteMap', () => {
	const result0 = getKeyNoteMap(['C', 'D', 'E', 'F', 'G', 'A', 'B'])

	expect(result0).toEqual({
		Digit1: 'C2',
		Digit2: 'D2',
		Digit3: 'E2',
		Digit4: 'F2',
		Digit5: 'G2',
		Digit6: 'A2',
		Digit7: 'B2',
		Digit8: 'C3',
		Digit9: 'D3',
		Digit0: 'E3',
		Minus: 'F3',
		Equal: 'G3',
		KeyQ: 'A3',
		KeyW: 'B3',
		KeyE: 'C4',
		KeyR: 'D4',
		KeyT: 'E4',
		KeyY: 'F4',
		KeyU: 'G4',
		KeyI: 'A4',
		KeyO: 'B4',
		KeyP: 'C5',
		BracketLeft: 'D5',
		BracketRight: 'E5',
		KeyA: 'F5',
		KeyS: 'G5',
		KeyD: 'A5',
		KeyF: 'B5',
		KeyG: 'C6',
		KeyH: 'D6',
		KeyJ: 'E6',
		KeyK: 'F6',
		KeyL: 'G6',
		Semicolon: 'A6',
		Quote: 'B6',
		KeyZ: 'C7',
		KeyX: 'D7',
		KeyC: 'E7',
		KeyV: 'F7',
		KeyB: 'G7',
		KeyN: 'A7',
		KeyM: 'B7',
		Comma: 'C8',
		Period: 'D8',
		Slash: 'E8'
	})
})
