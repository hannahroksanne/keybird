import * as INPUT_KEYS from './inputKeys'

export const checkIfKeyCodePlayable = (keyCode: string) => {
	return !!INPUT_KEYS.PLAYABLE.find((key: QwertyKeyT) => key.code === keyCode)
}

export const getKeyByKeyCode = (keyCode: string) => {
	return INPUT_KEYS.ALL.find((key: QwertyKeyT) => key.code === keyCode)
}
