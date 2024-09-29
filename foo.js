import scales from './src/configuration/theory/scales.json' with { type: 'json' }
import fs from 'fs'

console.log(scales.length)

const _scales = scales.map((scale) => {
	const chordNames = Array.from(new Set(scale.chords))
	delete scale.chords

	return {
		...scale,
		chordNames: chordNames
	}
})

fs.writeFileSync('./src/configuration/theory/scales.json', JSON.stringify(_scales, null, 2))
