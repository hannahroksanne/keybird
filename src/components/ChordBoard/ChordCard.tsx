import './ChordBoard.css'
import './ChordCard.css'

import * as React from 'react'
import { Flex } from '../Flex'
import { Text, Badge, Card, Heading } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronUpIcon, PlayIcon } from '@radix-ui/react-icons'
import { Spacer } from '../Spacer'
import { motion, useAnimate, useInView } from 'framer-motion'

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

export const ChordCard = () => {
	return (
		<Card className="ChordCard">
			<Flex.Row gap="3" align="center">
				<PlayIcon style={{ height: 16 }} />
				<Text className="ChordCardChordName">maj7sus2add13</Text>
			</Flex.Row>
		</Card>
	)
}
