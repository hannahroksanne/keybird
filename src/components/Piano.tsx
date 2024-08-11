import 'react-piano/dist/styles.css'
import './Piano.css'
import { Piano as ReactPiano, KeyboardShortcuts, MidiNumbers } from 'react-piano'
import { GrayTheme } from './Themes'

export const Piano = () => {
	const firstNote = MidiNumbers.fromNote('c2')
	const lastNote = MidiNumbers.fromNote('b7')
	const reportNotePlayed = (midiNumber: number) => {}

	const keyboardShortcuts = KeyboardShortcuts.create({
		firstNote: firstNote,
		lastNote: lastNote,
		keyboardConfig: KeyboardShortcuts.HOME_ROW
	})

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
