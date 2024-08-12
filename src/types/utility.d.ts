type FalseyT = '' | 0 | null | undefined | false
type NullableT<T> = T | null
type OptionalT<T> = T | undefined
type PrimitiveT = string | number | boolean | bigint | symbol | null | undefined

type AnyObjectT = {
	[key: string]: any
}

type DictionaryT<T> = {
	[key: string]: T
}

// Be aware of TS's built in Partial<T>
// This is like Partial<T> but deep.
type DeepPartialT<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
