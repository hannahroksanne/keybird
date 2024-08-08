import QWERTY_KEYS from './qwertyKeys.config.json'
import MUSIC from './music.config.json'

import cloneDeep from 'clone-deep'

export const getQwertyKeysClone = () => {
	const nonIgnoredQwertyKeys = QWERTY_KEYS.filter((key) => !key.isIgnored)
	return cloneDeep(nonIgnoredQwertyKeys)
}

export const CONSTS = {
	getQwertyKeysClone,
	QWERTY_KEYS,
	MUSIC
}
