import './ChordBlock.css'
import { Spacer } from '#/components/layout/Spacer'
import { Flex } from '#/components/layout/Flex'
import { theory } from '#/utilities/toner'
import { Cross2Icon, DotsHorizontalIcon, GearIcon, KeyboardIcon, PlusCircledIcon, TrashIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Text, Select, TextField } from '@radix-ui/themes'
import { useChordProgressionStore, useScaleStore } from './store'

type ChordBlockPropsT = {
	chordName?: string
	chord?: any
}

const useOctave = (chord: ChordT) => {
	if (chord.id) {
		const updateChord = useChordProgressionStore.getState().updateChord
		const setOctave = (value: string) => updateChord(chord.id, { octave: value })
		return [chord.octave, setOctave]
	}

	const globalOctave = useScaleStore((state) => state.baseOctave)
	const [octave, setOctave] = React.useState(chord.octave || globalOctave)
	return [octave, setOctave]
}

const useInversion = (chord: ChordT) => {
	if (chord.id) {
		const updateChord = useChordProgressionStore.getState().updateChord
		const setInversion = (value: number) => updateChord(chord.id, { inversion: value })
		return [chord.inversion, setInversion]
	}

	const [inversion, setInversion] = React.useState(chord.inversion || 0)
	return [inversion, setInversion]
}

const useDuration = (chord: ChordT) => {
	if (chord.id) {
		const updateChord = useChordProgressionStore.getState().updateChord
		const setDuration = (value: string) => updateChord(chord.id, { duration: value })
		return [chord.duration, setDuration]
	}

	const [duration, setDuration] = React.useState('1 bar')
	return [duration, setDuration]
}

export const ChordBlock = (props: ChordBlockPropsT) => {
	const chord = props.chord || theory.getChord(props.chordName)
	const [areOptionsShown, setAreOptionsShown] = React.useState(false)
	const [octave, setOctave] = useOctave(chord)
	const [inversion, setInversion] = useInversion(chord)
	const [duration, setDuration] = useDuration(chord)
	const addChord = useChordProgressionStore.getState().addChord
	const removeChord = useChordProgressionStore.getState().removeChord
	const timeoutRef = React.useRef<number>()

	const toggleAreOptionsShown = () => {
		const newValue = !areOptionsShown
		setAreOptionsShown(newValue)
	}

	const addChordToProgression = () => {
		addChord(chord.symbol, {
			octave,
			inversion
		})
	}

	const removeChordFromProgression = () => {
		removeChord(chord.id)
	}

	const handleMouseLeave = () => {
		if (!areOptionsShown) return

		timeoutRef.current = setTimeout(() => {
			setAreOptionsShown(false)
		}, 2500)
	}

	const handleMouseEnter = () => {
		clearTimeout(timeoutRef.current)
	}

	const InclusionIcon = chord.id ? TrashIcon : PlusCircledIcon
	const inclusionAction = chord.id ? removeChordFromProgression : addChordToProgression
	const OptionsIcon = areOptionsShown ? Cross2Icon : GearIcon
	const detailsHeight = chord.id ? 112 : 72

	return (
		<Flex.Column className="ChordBlock" p="2" onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
			<Flex.Row justify="between" align="center" mb="4">
				<Flex.Row gap="2" align="center">
					<span className="coloredCircle" />
					<Text>{chord.symbol}</Text>
				</Flex.Row>
				<Flex.Row gap="2">
					<OptionsIcon className="dotsIcon" width="20px" height="20px" onClick={toggleAreOptionsShown} />
					<InclusionIcon className="addIcon" width="20px" height="20px" onClick={inclusionAction} />
				</Flex.Row>
			</Flex.Row>
			{areOptionsShown && (
				<ChordOptions
					chord={chord}
					octave={octave}
					setOctave={setOctave}
					inversion={inversion}
					setInversion={setInversion}
					duration={duration}
					setDuration={setDuration}
				/>
			)}

			{!areOptionsShown && (
				<Flex.Column height={detailsHeight} width="100%" justify="between" align="center">
					{chord.keyMap && (
						<Flex.Row align="center" mt="5">
							<KeyboardIcon width="20px" height="20px" />
							<Spacer width="8px" />
							<Text>{chord.keyMap}</Text>
						</Flex.Row>
					)}

					<Spacer size="1px" />

					<Flex.Row gap="4">
						<Text style={{ fontSize: 14 }}>Octave: {octave}</Text>
						<Text style={{ fontSize: 14 }}>Inversion: {inversion}</Text>
					</Flex.Row>
				</Flex.Column>
			)}
		</Flex.Column>
	)
}

const DURATIONS = [
	'1/8 bar',
	'1/4 bar',
	'1/2 bar',
	'1 bar',
	'1 1/8 bar',
	'1 1/4 bar',
	'1 1/2 bar',
	'2 bars',
	'2 1/8 bar',
	'2 1/4 bar',
	'2 1/2 bar',
	'3 bars',
	'3 1/8 bar',
	'3 1/4 bar',
	'3 1/2 bar',
	'4 bars'
]

const ChordOptions = (props) => {
	const isProgressionChord = !!props.chord.id

	return (
		<>
			<ChordBaseOctaveSelect octave={props.octave} setOctave={props.setOctave} />
			<Spacer size="8px" />
			<ChordInversionSelect inversion={props.inversion} setInversion={props.setInversion} />
			{isProgressionChord && (
				<>
					<Spacer size="8px" />
					<Select.Root value={props.duration} onValueChange={props.setDuration}>
						<Select.Trigger>
							<Text>Duration {props.duration}</Text>
						</Select.Trigger>
						<Select.Content position="popper">
							{DURATIONS.map((value) => (
								<Select.Item key={value} value={value}>
									{value}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</>
			)}
		</>
	)
}

type ChordBaseOctaveSelectPropsT = {
	octave: number
	setOctave: (octave: number) => void
}

export const ChordBaseOctaveSelect = React.memo((props: ChordBaseOctaveSelectPropsT) => {
	const setChordBaseOctave = (newOctave: string) => {
		const value = Number(newOctave)
		props.setOctave(value)
	}

	return (
		<Select.Root value={props.octave.toString()} onValueChange={setChordBaseOctave}>
			<Select.Trigger>
				<Text>Octave {props.octave}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
					<Select.Item key={value} value={value.toString()}>
						{value}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
})

type ChordInversionSelectPropsT = {
	inversion: number
	setInversion: (inversion: number) => void
}

export const ChordInversionSelect = React.memo((props: ChordInversionSelectPropsT) => {
	const setChordInversion = (newInversion: string) => {
		const value = Number(newInversion)
		props.setInversion(value)
	}

	return (
		<Select.Root value={props.inversion.toString()} onValueChange={setChordInversion}>
			<Select.Trigger>
				<Text>Inversion {props.inversion}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				{[-3, -2, -1, 0, 1, 2, 3].map((value) => (
					<Select.Item key={value} value={value.toString()}>
						{value}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
})
