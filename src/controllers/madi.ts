export const getMetaFromJson = (json: JsonMidiT) => {
	const _tempo = json.header.tempos[0]
	const _timeSignature = json.header.timeSignatures[0]

	const bpm = Math.floor(_tempo.bpm)
	const ppq = json.header.PPQ || 96
	const signature = _timeSignature.timeSignature

	return {
		bpm,
		ppq,
		signature
	}
}

export const getTracksFromJson = (json: JsonMidiT) => {
	return json.tracks.map((track) => {
		return {
			id: track.id,
			name: track.name,
			channel: track.channel,
			notes: track.notes
		}
	})
}

export const getNotesFromJson = (track: MidiTrackT) => {
	return track.notes.map((note) => {
		return {
			name: note.name,
			ticks: note.ticks,
			duration: note.duration,
			velocity: note.velocity
		}
	})
}

export const convertJsonToMadi = (json: JsonMidiT) => {
	const meta = getMetaFromJson(json)
	const tracks = getTracksFromJson(json)
	const firstLine = '$MADI'

	console.log({ meta, tracks, firstLine })

	const metaLines = Object.entries(meta).map(([key, value]) => {
		return `${key}=${value}`
	})

	const trackLines = tracks.map((track) => {
		const trackFirstLine = '$TRACK'

		const getNotesStrings = (notes: MidiNoteT[]) => {
			return notes.map((note) => {
				return `[N=${note.name} T=${note.ticks} D=${note.duration} V=${note.velocity}]`
			})
		}

		const trackMeta = Object.entries(track).map(([key, value]) => {
			if (key === 'notes') return getNotesStrings(value as MidiNoteT[]).join('\n')
			return `${key}=${value}`
		})

		console.log({ trackFirstLine, trackMeta })
		return [trackFirstLine, ...trackMeta]
	})

	console.log({ metaLines, trackLines })
	const allLines = [firstLine, ...metaLines, ...trackLines.flat()]
	return allLines.join('\n')
}

const sectionsRegex = /(?=^\$)/gm
const bracketsRegex = /[\[\]]/g
const whiteSpaceRegex = /\s+/g

const getMadiSections = (madi: string) => {
	return madi.split(sectionsRegex).filter((piece: string) => {
		return piece.startsWith('$')
	})
}

const removeExcessLines = (target: string[]) => {
	return target.filter((line: string) => {
		return !!line && !line.startsWith('$')
	})
}

const getPreparedMadiSections = (madi: string) => {
	const sections = getMadiSections(madi)

	return sections.map((section: string) => {
		const isMeta = section.startsWith('$MADI')
		const isTrack = section.startsWith('$TRACK')
		const lines = removeExcessLines(section.split('\n'))
		const tag = isMeta ? 'meta' : isTrack ? 'track' : ''
		return [tag, lines]
	})
}

export const convertMadiToJson = (madi: string) => {
	// Please follow the guide of madi.json
	const sections = getPreparedMadiSections(madi)
	const final = { tracks: [] }

	for (const [tag, lines] of sections) {
		if (tag === 'meta') {
			for (const line of lines) {
				if (line.includes('=')) {
					const [key, value] = line.split('=')
					const lowerKey = key.toLowerCase()
					final[lowerKey] = value
				}
			}
		}

		if (tag === 'track') {
			const track = { notes: [] }

			for (const line of lines) {
				const isNote = line.startsWith('[')
				const isData = line.includes('=') && !isNote

				if (isData) {
					const [key, value] = line.split('=')
					const lowerKey = key.toLowerCase()
					track[lowerKey] = value
				}

				// We're working with a note line.
				if (isNote) {
					const cleanLine = line.replace(bracketsRegex, '')
					const pieces = cleanLine.split(whiteSpaceRegex)
					const [_name, _ticks, _duration, _velocity] = pieces
					const getValue = (target: string) => target.replace(/^\w=+/, '')

					track.notes.push({
						name: getValue(_name),
						ticks: Number(getValue(_ticks)),
						duration: Number(getValue(_duration)),
						velocity: Number(getValue(_velocity))
					})
				}
			}

			final.tracks.push(track)
		}
	}

	return final
}

const convert = (target: string | JsonMidiT) => {
	return typeof target === 'string' ? convertMadiToJson(target) : convertJsonToMadi(target)
}

export const madi = {
	getMetaFromJson,
	getTracksFromJson,
	getNotesFromJson,
	convertMadiToJson,
	convertJsonToMadi,
	convert
}
