import 'react-simple-keyboard/build/css/index.css'
import '../styles/keyboard.css'
import './Main.css'
import { Vboard } from '../components/Vboard/Vboard'
import { Piano } from '../components/Piano'
import { Flex } from '../components/Flex'
import { Spacer } from '../components/Spacer'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { $logs } from '../stores'
import { LogList } from '../components/LogList'
import { KeyNameSelect, MidiControls, ScaleNameSelect } from '../components/Controls/ScaleControls'
import { KeyboardTopControls } from '../components/Controls/KeyboardTopControls'

export const Main = () => {
	const isLogListOpen = $logs.use((state) => state.isLogListOpen)
	const { scrollY, scrollYProgress } = useScroll()

	useMotionValueEvent(scrollY, 'change', (latest) => {
		console.log('Page scroll: ', latest)
	})

	return (
		<Flex.Column data-testid="MainView" className="MainView" px="4" justify="between">
			<Spacer size="24px" />

			<Flex.Column className="KeyboardContainer">
				<Vboard />
				<Piano />
			</Flex.Column>
			{isLogListOpen && <LogList />}
		</Flex.Column>
	)
}
