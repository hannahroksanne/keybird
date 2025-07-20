import './Chords.css'

import { Button, Heading, Select, Text } from '@radix-ui/themes'
import { Flex } from '../components/Flex'
import { Spacer } from '../components/Spacer'
import { ChordBlock, ChordKeyBindBlock, ProgressionChordItem } from '../components/ChordBlock'
import { store } from '../stores/store'
import React from 'react'
import { ChordKeybindOverlay } from '../components/ChordKeyBindOverlay'

export const Chords = () => {
	const scaleNotes = store.useScaleNotes()
	const [sortBy, setSortBy] = React.useState('name')
	const isKeybindOverlayOpen = store.useIsKeybindOverlayOpen()
	console.log('isKeybindOverlayOpen', isKeybindOverlayOpen)

	if (isKeybindOverlayOpen) return <ChordKeybindOverlay />

	return (
		<Flex.Column px="4" align="center" data-testid="ChordsScene" style={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
			<Flex.Row px="4" justify="between">
				<Heading size="5">Chords</Heading>
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
	const chordProgression = store.useChordProgression()
	const selectedIndex = store.useSelectedProgressionIndex()

	const handleSelectChord = (index: number) => {
		store.setSelectedProgressionIndex(selectedIndex === index ? -1 : index)
	}

	const handleEditChord = (chordItem: ChordProgressionItemT) => {
		// TODO: Open edit dialog
		console.log('Edit chord:', chordItem)
	}

	const handleRemoveChord = (id: string) => {
		store.removeChordFromProgression(id)
	}

	// Handle keyboard navigation
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (selectedIndex === -1) return
			
			if (e.key === 'ArrowLeft' && selectedIndex > 0) {
				e.preventDefault()
				store.moveChordInProgression(selectedIndex, selectedIndex - 1)
			} else if (e.key === 'ArrowRight' && selectedIndex < chordProgression.length - 1) {
				e.preventDefault()
				store.moveChordInProgression(selectedIndex, selectedIndex + 1)
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [selectedIndex, chordProgression.length])

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
				height: 160,
				width: '100vw',
				overflowX: 'scroll'
			}}
		>
			<Flex.Row className="ChordsList" gap="4" mr="6" pr="6">
				{chordProgression.map((chordItem, index) => (
					<ProgressionChordItem
						key={chordItem.id}
						chordItem={chordItem}
						index={index}
						isSelected={selectedIndex === index}
						onSelect={() => handleSelectChord(index)}
						onEdit={() => handleEditChord(chordItem)}
						onRemove={() => handleRemoveChord(chordItem.id)}
					/>
				))}
				<Spacer size="24px" />
			</Flex.Row>
		</Flex.Column>
	)
}
