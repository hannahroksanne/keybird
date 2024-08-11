import 'react-simple-keyboard/build/css/index.css'
import '../styles/keyboard.css'
import './Main.css'
import { Vboard } from '../components/Vboard/Vboard'
import { Piano } from '../components/Piano'
import { Flex } from '../components/Flex'
import { Spacer } from '../components/Spacer'
import { LogList } from '../components/LogList'
import { store } from '../store'

export const Main = () => {
	return (
		<Flex.Column data-testid="MainView" className="MainView" px="4" justify="between">
			<Spacer size="24px" />
			<Flex.Column className="KeyboardContainer">
				<Vboard />
				<Piano />
			</Flex.Column>
			<LogListRenderer />
		</Flex.Column>
	)
}

const LogListRenderer = () => {
	const isLogsListOpen = store.useIsLogsOverlayOpen()
	return isLogsListOpen ? <LogList /> : null
}
