// import typeOf from 'just-typeof'
// import capitalize from 'just-capitalize'
// import { mold } from './mold'
// import { useHookstate } from '@hookstate/core'
// import typeOf from 'just-typeof'
// import { mold } from './mold'
// import { useHookstate } from '@hookstate/core'

// export const createHooks = <T>(hookRecord: T) => {
// 	type NewHookRecordT = {
// 		[K in keyof T]: T[K] extends Function ? T[K] : () => ReturnType<typeof useHookstate<T[K]>>
// 	}

// 	type ExtendedNewHookRecordT<T> = NewHookRecordT & {
// 		get: {
// 			[K in keyof T]: () => ReturnType<typeof useHookstate<T[K]>>['get']
// 		}
// 	}

// 	const keys = mold.keys(hookRecord)
// 	const use = { get: {} } as ExtendedNewHookRecordT<T>

// 	for (const key of keys) {
// 		const value = hookRecord[key]
// 		const isFunction = typeof value == 'function'
// 		if (isFunction) use[key] = hookRecord[key]
// 		if (isFunction) continue

// 		use[key] = () => useHookstate(hookRecord[key])

// 		Object.defineProperty(use.get, key, {
// 			get: () => use[key]().get()
// 		})
// 	}

// 	console.log('hooks:', use)
// 	console.log('keys:', keys)
// 	console.log('hookRecord:', hookRecord)
// 	return use as ExtendedNewHookRecordT<T>
// }

// // return proxy as ExtendedHookRecordT
// // const proxy = new Proxy(use, {
// //   get(target, prop, receiver) {
// //     if (prop in use) return use[prop]
// //     if (prop in getters) return getters[prop]
// //   }
// // })
