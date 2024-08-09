import { create } from 'zustand'
import * as Tonal from 'tonal'
import { devtools } from 'zustand/middleware'
import { CONSTS } from '../../consts'

const getScaleNotes = (rootNote: string, scaleType: string) => {
	return Tonal.Scale.get(`${rootNote} ${scaleType}`).notes
}

type StoreT = {
	scaleNotes: string[]
	scaleRootNote: string
	scaleType: string
	qwertyKeys: QwertyKeyT[]
	shouldShowAltLabels: boolean
	octave: number
}

const INITIAL_STATE = {
	scaleNotes: getScaleNotes('B', 'minor'),
	scaleRootNote: 'B',
	scaleType: 'minor',
	qwertyKeys: CONSTS.QWERTY_KEYS,
	shouldShowAltLabels: false,
	octave: 2
}

const useStore = create<StoreT>(
	// @ts-ignore
	devtools(() => {
		return {
			...INITIAL_STATE
		}
	})
)

const incrementOctave = () => {
	const octave = $core.state.octave + 1
	$core.setState({ octave })
}

const decrementOctave = () => {
	const octave = $core.state.octave - 1
	$core.setState({ octave })
}

const getQwertyKey = (keyCode: string) => {
	const qwertyKey = $core.state.qwertyKeys.find((key) => {
		return key.keyCode === keyCode
	}) as QwertyKeyT

	return qwertyKey || {}
}

const updateQwertyKey = (keyCode: string, update: Partial<QwertyKeyT>) => {
	return $core.state.qwertyKeys.map((key) => {
		const isCorrectKey = key.keyCode === keyCode
		return isCorrectKey ? { ...key, ...update } : key
	})
}

const updateMatchingQueryKeys = (checkIfMatches: (key: QwertyKeyT) => boolean, update: Partial<QwertyKeyT>) => {
	return $core.state.qwertyKeys.map((key) => {
		const isCorrectKey = checkIfMatches(key)
		return isCorrectKey ? { ...key, ...update } : key
	})
}

const getPressedKeys = () => {
	return $core.state.qwertyKeys.filter((key) => key.isPressed)
}

const usePressedKeys = () => {
	return $core.use((state) => {
		return state.qwertyKeys.filter((key) => key.isPressed)
	})
}

const reportKeyDown = (keyCode: string) => {
	const qwertyKeys = updateQwertyKey(keyCode, { isPressed: true })
	useStore.setState({ qwertyKeys })
}

const reportKeyUp = (keyCode: string) => {
	const qwertyKeys = updateQwertyKey(keyCode, { isPressed: false })
	useStore.setState({ qwertyKeys })
}

const setScaleRootNote = (scaleRootNote: VboardT.RootNote) => {
	useStore.setState({ scaleRootNote })
}

const setScaleType = (scaleType: string) => {
	useStore.setState({ scaleType })
}

const setShouldShowAltLabels = (shouldShowAltLabels: boolean) => {
	useStore.setState({ shouldShowAltLabels })
}

const useAreAltLabelsShown = () => {
	return $core.use((state) => state.shouldShowAltLabels)
}

const useQwertyKeyCodes = () => {
	const qwertyKeys = $core.use((state) => state.qwertyKeys)
	return qwertyKeys.map((key) => key.keyCode)
}

// Get an array of { keyCode, row } objects.
// We just need this array for rendering the
// on screen keyboard one time, and each
// individual on screen key can subscribe
// to changes to its own qwertyKey object.
const useQwertyStringRows = () => {
	const rows = [] as string[][]

	// Get an joined string of keyCodes and row numbers.
	// This is to avoid future updates, as this function
	// should never result in a different string.
	const qwertyKeys = useStore((state) => {
		const strings = state.qwertyKeys.map((key) => {
			return `${key.keyCode} ${key.row}`
		})

		return strings.join('__')
	})

	const pairStrings = qwertyKeys.split('__')

	for (const pairString of pairStrings) {
		const [keyCode, row] = pairString.split(' ')
		const key = { keyCode, row: Number(row) }
		const rowValue = rows[key.row] || []
		rows[key.row] = [...rowValue, keyCode]
	}

	return rows
}

const useQwertyRows = () => {
	const qwertyKeys = $core.use((state) => state.qwertyKeys)
	const rows = [] as QwertyKeyT[][]

	for (const key of qwertyKeys) {
		const rowValue = rows[key.row] || []
		rows[key.row] = [...rowValue, key]
	}

	return rows
}

const getMidiForKeyCode = (keyCode: string) => {
	const qwertyKey = $core.state.qwertyKeys.find((key) => key.keyCode === keyCode)
	return qwertyKey?.midi || 0
}

const checkIfKeyIsPressed = (keyCode: string) => {
	const qwertyKey = $core.state.qwertyKeys.find((key) => key.keyCode === keyCode)
	return qwertyKey?.isPressed || false
}

const useQwertyKey = (keyCode: string): QwertyKeyT => {
	const qwertyKey = $core.use((state) => {
		return state.qwertyKeys.find((key) => key.keyCode === keyCode)
	})

	return qwertyKey as QwertyKeyT
}

const useQwertyKeys = () => {
	return $core.use((state) => state.qwertyKeys)
}

export const $core = {
	use: useStore,
	subscribe: useStore.subscribe,
	setState: useStore.setState,
	setScaleRootNote,
	useQwertyRows,
	setShouldShowAltLabels,
	useAreAltLabelsShown,
	useQwertyStringRows,
	useQwertyKey,
	checkIfKeyIsPressed,
	reportKeyDown,
	reportKeyUp,
	getMidiForKeyCode,
	usePressedKeys,
	getPressedKeys,
	setScaleType,
	getQwertyKey,
	useQwertyKeyCodes,
	useQwertyKeys,
	incrementOctave,
	decrementOctave,
	get state() {
		return useStore.getState()
	}
}
