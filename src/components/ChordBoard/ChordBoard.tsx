import './ChordBoard.css'
import './ChordCard.css'

import * as React from 'react'
import { Flex } from '../Flex'
import { Text, Badge, Card, Heading } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronUpIcon, PlayIcon } from '@radix-ui/react-icons'
import { Spacer } from '../Spacer'
import { motion, useAnimate, useInView } from 'framer-motion'
import { ChordCard } from './ChordCard'

const useAnimation = () => {
	const [ref, animate] = useAnimate()
	const isInView = useInView(ref)

	React.useEffect(() => {
		if (isInView) {
			animate('.ChordCardChordName', { opacity: 1, backgroundColor: '#000' }, { ease: 'linear', duration: 5 })
		}
	}, [isInView])

	return ref
}

export const ChordBoard = (props: AnyObjectT) => {
	const [isExpanded, setIsExpanded] = React.useState(false)
	const HeadingIcon = isExpanded ? ChevronUpIcon : ChevronDownIcon
	// const ref = useAnimation()

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded)
		props.expand()
	}

	return (
		<Flex.Column gap="3" data-testid="ChordBoard" className="ChordBoard">
			<Flex.Row gap="3" mb="3">
				<Heading size="5" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
					<HeadingIcon style={{ width: 16 }} onClick={toggleExpanded} />
					Scale Chords
					<Badge color="orange">feature in progress</Badge>
				</Heading>
			</Flex.Row>
			<Flex.Row gap="3" wrap="wrap">
				{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
					<ChordCard key={index} />
				))}
			</Flex.Row>
		</Flex.Column>
	)
}
