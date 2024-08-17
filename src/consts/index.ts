import rootNotes from './rootNotes.json'
import scaleNames from './chords/scaleNames.json'
import scaleTypesNames from './chords/scaleTypesNames.json'
import chordNames from './chords/chordNames.json'
import chordTypes from './chords/chordTypes.json'
import scales from './chords/scales.json'
import chords from './chords/chords.json'
import defaultKeysConfig from './default.keys.json'
import defaultLayout from './default.layouts.json'
import defaultKeymaps from './default.keymaps.json'
import appConfig from './app.config.json'

export {
	rootNotes,
	scaleNames,
	scaleTypesNames,
	chordNames,
	scales,
	chords,
	chordTypes,
	defaultKeysConfig,
	defaultLayout,
	defaultKeymaps,
	appConfig
}

export const playableKeyCodes = (() => {
	const playableKeyConfigs = Object.values(defaultKeysConfig).filter((keyConfig) => {
		return keyConfig.isPlayable
	})

	return playableKeyConfigs.map((keyConfig) => keyConfig.keyCode)
})()
