import './ChordBrowser.css'
import { Flex } from '#/components/layout/Flex'
import { Text, Box, SegmentedControl, Tabs, Button } from '@radix-ui/themes'
import { ChordBlock } from './ChordBlock'
import { useScaleStore, useChordBrowserStore } from './store'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import React from 'react'
import { Select } from '@radix-ui/themes'

const RootNoteSelect = () => {
	const { notes: selectedScaleNotes } = useScaleStore()
	const { selectedRootNote, setSelectedRootNote } = useChordBrowserStore()

	const handleChange = (value: string) => {
		setSelectedRootNote(value)
	}

	return (
		<Flex.Row className="RootNoteSelect">
			<SegmentedControl.Root className="RootNoteSelectRoot" value={selectedRootNote} onValueChange={handleChange}>
				<SegmentedControl.Item key="All" value="All">
					All
				</SegmentedControl.Item>
				{selectedScaleNotes.map((rootNote) => (
					<SegmentedControl.Item key={rootNote} value={rootNote}>
						{rootNote}
					</SegmentedControl.Item>
				))}
			</SegmentedControl.Root>
		</Flex.Row>
	)
}

const RootNoteToggleGroup = () => {
	const { notes } = useScaleStore()
	const { selectedRootNote, setSelectedRootNote } = useChordBrowserStore()

	return (
		<ToggleGroup.Root
			className="RootNoteToggleGroup"
			type="single"
			defaultValue={selectedRootNote}
			onValueChange={setSelectedRootNote}
			aria-label="Chord Root Notes"
		>
			{notes.map((note) => (
				<ToggleGroup.Item className="RootNoteItem" value={note} aria-label={note}>
					<Text>{note}</Text>
				</ToggleGroup.Item>
			))}
		</ToggleGroup.Root>
	)
}

export const ChordBrowser = () => {
	const { notes } = useScaleStore()
	const { groupedChordNames } = useScaleStore()
	const { selectedRootNote } = useChordBrowserStore()
	const isAll = selectedRootNote === 'All'

	const checkIfInactive = (note: string) => {
		return !isAll && note !== selectedRootNote
	}

	return (
		<Flex.Column className="ChordBrowser">
			<Flex.Row gap="4">
				<AISuggestButton />
				<VibeSelect />
				<RootNoteSelect />
			</Flex.Row>

			{notes.map((note) => {
				const isInactive = checkIfInactive(note)
				if (isInactive) return null

				return (
					<Flex.Row key={note} className="ChordBlocks" gap="4" p="4">
						{groupedChordNames[note].map((chordName) => {
							return <ChordBlock key={chordName} chordName={chordName} />
						})}
					</Flex.Row>
				)
			})}
		</Flex.Column>
	)
}

const AISuggestButton = () => {
	const { isSuggestActive, toggleIsSuggestActive } = useChordBrowserStore()

	return (
		<Button color="cyan" variant={isSuggestActive ? 'solid' : 'soft'} onClick={toggleIsSuggestActive}>
			AI Suggest
		</Button>
	)
}

const VIBES = ['Happy', 'Sad', 'Angry', 'Calm', 'Energetic', 'Melancholy', 'Playful', 'Romantic', 'Tense', 'Wistful']

const VibeSelect = () => {
	const { suggestionVibe, setSuggestionVibe } = useChordBrowserStore()
	return (
		<Select.Root value={suggestionVibe} onValueChange={setSuggestionVibe}>
			<Select.Trigger>
				<Text>Vibe: {suggestionVibe}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				{VIBES.map((value) => (
					<Select.Item key={value} value={value}>
						{value}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}
