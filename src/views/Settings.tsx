import './Settings.css'

import { Heading, Select, Text } from '@radix-ui/themes'
import { Flex } from '../components/Flex'
import { Spacer } from '../components/Spacer'
import { ChordBlock, ProgressionChordBlock } from '../components/ChordBlock'
import { store } from '../store'
import React from 'react'

export const Settings = () => {
	const scaleName = store.useScaleName()
	const scaleNotes = store.useScaleNotes()
	const [sortBy, setSortBy] = React.useState('name')

	return (
		<Flex.Column data-testid="SettingsScene" style={{ width: '100%' }}>
			<Flex.Row px="4" justify="between">
				<Heading size="5">Settings</Heading>
				<SortSelect value={sortBy} onChange={setSortBy} />
			</Flex.Row>
			<Spacer size="12px" />
			<Flex.Column gap="8" px="4" align="center">
				{scaleNotes.map((rootNote) => (
					<ChordBlockList key={rootNote} rootNote={rootNote} />
				))}
			</Flex.Column>
			<Spacer size="160px" />
			<ProgressionsBar />
		</Flex.Column>
	)
}

type ChordBlockListPropsT = {
	rootNote: string
}

const ChordBlockList = (props: ChordBlockListPropsT) => {
	const chordNames = store.useChordsWithRootNote(props.rootNote)

	return (
		<Flex.Column key={props.rootNote} gap="3">
			<Heading size="4">{props.rootNote}</Heading>
			<Flex.Row wrap="wrap" gap="3">
				{chordNames.map((chordName) => (
					<ChordBlock key={chordName} chordName={chordName} />
				))}
			</Flex.Row>
		</Flex.Column>
	)
}

type SortSelectPropsT = {
	value: string
	onChange: (value: string) => void
}

const SortSelect = React.memo((props: SortSelectPropsT) => {
	return (
		<Select.Root value={props.value} onValueChange={props.onChange}>
			<Select.Trigger>
				<Text className="normalFont">Sort by: {props.value}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				<Select.Item value="name">Name</Select.Item>
				<Select.Item value="complexity">Complexity</Select.Item>
				<Select.Item value="symbol">Symbol</Select.Item>
			</Select.Content>
		</Select.Root>
	)
})

const ProgressionsBar = () => {
	return (
		<Flex.Column
			className="ProgressionsBar"
			justify="end"
			style={{
				position: 'fixed',
				bottom: 0,
				left: 0,
				right: 0,
				padding: '8px 16px',
				height: 220,
				width: '100vw',
				overflowX: 'scroll'
			}}
		>
			<Flex.Row className="ChordsList" gap="4" mr="6" pr="6">
				<ProgressionChordBlock chordName="C" />
				<ProgressionChordBlock chordName="Dm" />
				<ProgressionChordBlock chordName="Em" />
				<ProgressionChordBlock chordName="F" />
				<ProgressionChordBlock chordName="G" />
				<ProgressionChordBlock chordName="Am" />
				<ProgressionChordBlock chordName="Bdim" />
				<Spacer size="24px" />
			</Flex.Row>
		</Flex.Column>
	)
}
