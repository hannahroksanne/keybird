import './ChordBlock.css'

import { Button, Card, Text } from '@radix-ui/themes'
import { Flex } from './Flex'
import { InfoCircledIcon, PlusIcon, QuestionMarkIcon, KeyboardIcon } from '@radix-ui/react-icons'
import { useChord } from '../hooks/useChord'
import { DarkYellowTheme, GrayTheme } from './Themes'
import { Spacer } from './Spacer'
import { checkIsBlackKey } from '../utilities/toner'
import classcat from 'classcat'
import appConfig from '../consts/app.config.json'
import * as HoverCard from '@radix-ui/react-hover-card'
import React from 'react'
import * as Select from '@radix-ui/react-select'

type PropsT = {
	chordName: string
}

export const ChordBlock = React.memo((props: PropsT) => {
	const chord = useChord(props.chordName)

	const actionIcons = (
		<>
			<ActionIcon icon={InfoCircledIcon} />
			<ActionIcon icon={PlusIcon} />
			<ActionIcon icon={QuestionMarkIcon} />
		</>
	)

	return (
		<ChordBlockFrame {...chord} actionIcons={actionIcons}>
			<NotesList notes={chord.notes} />
		</ChordBlockFrame>
	)
})

const ChordBlockFrame = (props) => {
	const color = appConfig.tonicColors[props.tonic]
	const style = { '--backdropColor': `var(--${color}-9)` } as React.CSSProperties
	const className = classcat(['ChordBlockFrame', props.className])
	const cardClassName = classcat(['ChordBlockColoredBackdrop', `dark ${color}`, props.cardClassName])

	return (
		<Flex.Row className={className} style={style} flexGrow="1">
			<Card className={cardClassName}>
				<Flex.Row justify="between" align="center" className="ChordBlockTitleRow">
					<Text size="1" className="ChordBlockTitle">
						{props.name}
					</Text>
					<KeyboardIcon style={{ width: 16 }} />
				</Flex.Row>
				<Spacer size="3px" />
				<GrayTheme asChild>
					<Flex.Column className="ChordBlockContent">
						<Text size="3" className="ChordBlockSymbol">
							{props.symbol}
						</Text>
						<Spacer size="8px" />
						{props.children}
					</Flex.Column>
				</GrayTheme>
			</Card>

			<Flex.Column className="ChordBlockActionsColumn">
				<Flex.Column align="center" className="ChordBlockActionIcons">
					{props.actionIcons}
				</Flex.Column>
			</Flex.Column>
		</Flex.Row>
	)
}

type ChordBlockNotesPropsT = {
	notes: string[]
}

const NotesList = (props: ChordBlockNotesPropsT) => {
	return (
		<Flex.Row wrap="wrap" gap="1" className="NotesList">
			{props.notes.map((note) => (
				<Note key={note} note={note} />
			))}
		</Flex.Row>
	)
}

const Note = (props) => {
	const isBlackKey = checkIsBlackKey(props.note)
	const className = classcat(['Note', isBlackKey && 'NoteBlackKey'])
	const textClassName = classcat(['NoteText', isBlackKey && 'NoteTextBlackKey'])

	return (
		<Button size="1" className={className}>
			<Text size="3" className={textClassName}>
				{props.note}
			</Text>
		</Button>
	)
}

const ActionIcon = (props) => {
	return (
		<Flex.Row className="ActionIcon">
			<props.icon className="ActionIconIcon" />
		</Flex.Row>
	)
}

export const ProgressionChordBlock = React.memo((props: PropsT) => {
	const chord = useChord(props.chordName)

	const actionIcons = [<ActionIcon key="plus" icon={PlusIcon} />, <ActionIcon key="???" icon={QuestionMarkIcon} />]

	return (
		<ChordBlockFrame className="ProgressionChordBlock" {...chord} actionIcons={actionIcons}>
			<Select.Root>
				<Select.Trigger>
					<Text className="normalFont">Select</Text>
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="name">Name</Select.Item>
					<Select.Item value="complexity">Complexity</Select.Item>
					<Select.Item value="symbol">Symbol</Select.Item>
				</Select.Content>
			</Select.Root>
		</ChordBlockFrame>
	)
})
