import './ChordBoard.css'

import * as React from 'react'
import { Flex } from '../Flex'
import { Badge, Heading, TextField } from '@radix-ui/themes'
import { store } from '../../store'
import { BigChordCard } from './BigChordCard'

export const ChordBoard = (props: AnyObjectT) => {
	const inScaleChordNames = store.useScaleChordNames()
	const scaleChordsEntries = Object.entries(inScaleChordNames)

	console.log({ scaleChordsEntries })

	return (
		<Flex.Column gap="3" p="4" pt="0" data-testid="ChordBoard" className="ChordBoard">
			<Flex.Row gap="3" mb="3" justify="between">
				<SectionHeading />
			</Flex.Row>
			<Flex.Row gap="3" wrap="wrap">
				{scaleChordsEntries.map(([rootNote, chordNames]) => (
					<RootNoteSection key={rootNote} rootNote={rootNote} chordNames={chordNames} />
				))}
			</Flex.Row>
		</Flex.Column>
	)
}

const RootNoteSection = (props) => {
	return (
		<Flex.Column gap="3">
			<Heading size="5">{props.rootNote}</Heading>
			<Flex.Row gap="3" wrap="wrap">
				{props.chordNames.map((chordName, index) => (
					<BigChordCard key={chordName} chordName={chordName} />
				))}
			</Flex.Row>
		</Flex.Column>
	)
}

const SectionHeading = () => {
	return (
		<Heading size="5" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
			{/* <HeadingIcon style={{ width: 16 }}  /> */}
			Scale Chords
			<Badge color="orange">feature in progress</Badge>
		</Heading>
	)
}
