type Note = string
type Inversion = number
type Voicing = Note[]

type ChordT = {
	name: string
	symbol: string
	root: Note
	quality: string
	scaleDegree: number
	variations: string[]
	inversions: Inversion[]
	voicings: Voicing[]
	midiNotes: number[]
}
