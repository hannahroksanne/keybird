import './ChordBoard.css'
import './ChordCard.css'

import * as React from 'react'
import { Flex } from '../Flex'
import { Badge, Heading } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { ChordCard } from './ChordCard'
import { $core } from '../../stores'
import { $chords } from '../../stores/chords'
import { Spacer } from '../Spacer'

export const ChordBoard = (props: AnyObjectT) => {
	const [isExpanded, setIsExpanded] = React.useState(false)
	const HeadingIcon = isExpanded ? ChevronUpIcon : ChevronDownIcon
	const inScaleChordNames = $chords.use((state) => state.inScaleChordNames)

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded)
		props.expand()
	}

	return (
		<Flex.Column gap="3" p="4" data-testid="ChordBoard" className="ChordBoard">
			<Spacer size="12px" />
			<Flex.Row gap="3" mb="3">
				<SectionHeading />
			</Flex.Row>
			<Flex.Row gap="3" wrap="wrap">
				{inScaleChordNames.map((chordName, index) => (
					<ChordCard key={index} chordName={chordName} />
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
