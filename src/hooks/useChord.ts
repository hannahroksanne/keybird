import * as Tonal from 'tonal'
import memoize from 'just-memoize'

const getChord = memoize(Tonal.Chord.get)

export const useChord = (chordName: string) => {
	return getChord(chordName)
}
