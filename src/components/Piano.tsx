import 'react-piano/dist/styles.css'
import './Piano.css'
import { Piano as ReactPiano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import { Note } from 'tonal'
import { GrayTheme } from './Themes'

export const Piano = () => {
	const firstNote = MidiNumbers.fromNote('c2')
	const lastNote = MidiNumbers.fromNote('b7')

	const keyboardShortcuts = KeyboardShortcuts.create({
		firstNote: firstNote,
		lastNote: lastNote,
		keyboardConfig: KeyboardShortcuts.HOME_ROW
	})

	const reportNotePlayed = (midiNumber: number) => {
		const noteName = Note.fromMidi(61)
		// console.log({ midiNumber, noteName })
	}

	return (
		<GrayTheme style={{ height: 80, position: 'relative' }}>
			<ReactPiano
				disabled
				style={{ width: '100%' }}
				noteRange={{ first: firstNote, last: lastNote }}
				playNote={reportNotePlayed}
				stopNote={console.log}
				keyboardShortcuts={keyboardShortcuts}
			/>
		</GrayTheme>
	)
}
