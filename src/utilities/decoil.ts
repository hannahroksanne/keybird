import { atom, RecoilState, RecoilValue, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

type DecoilStateT<T> = RecoilState<T> & {
	useState: () => [T, (value: T) => void]
	useSetter: () => (value: T) => void
	useValue: () => T
}

type DecoilValueT<T> = RecoilValue<T> & {
	useState: () => [T, (value: T) => void]
	useSetter: () => (value: T) => void
	useValue: () => T
}

export const decoil = {
	selector: <T>(options: any): DecoilStateT<T> => {
		const _selector = selector<T>(options)
		Object.defineProperty(_selector, 'useState', () => useRecoilState(_selector))
		Object.defineProperty(_selector, 'useValue', () => useRecoilValue(_selector))
		Object.defineProperty(_selector, 'useSetter', () => useSetRecoilState(_selector))

		return _selector as DecoilStateT<T>
	},

	atom: <T>(options: any): DecoilStateT<T> => {
		const _atom = atom<T>(options)
		Object.defineProperty(_atom, 'useState', () => useRecoilState(_atom))
		Object.defineProperty(_atom, 'useValue', () => useRecoilValue(_atom))
		Object.defineProperty(_atom, 'useSetter', () => useSetRecoilState(_atom))
		return _atom as DecoilStateT<T>
	}
}
