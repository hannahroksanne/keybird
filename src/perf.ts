type PerformancePatternT = {
	// How can I define an algorithmic
	// approach to applying patterns to
	// any given sets of notes (chords)?
	// If the user has created a progression
	// consisting of "C5", "Emadd13", "Gsus4",
	// "Cmaj7", there are different number of
	// notes indifferent chords, so I need to
	// figure out how to describe patterns and
	// how I can apply them to dynamic key counts.
}

type PerformanceT = {
	id: string
	name: string
	pattern: PerformancePatternT
}

type CompositionStateT = {
	tempo: number
	isPlaying: false
	scaleRootNote: string
	scaleType: string
	scaleName: string
	scaleNotes: string[]
	playbackNotes: PlaybackNoteT[]
}

type ProgressionChordT = {
	symbol: string
	notes: string[]
	startTicks: number
	durationTicks: number
	performanceId: string
}
