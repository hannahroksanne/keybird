import { Heading } from '@radix-ui/themes'
import { Flex } from '../components/Flex'
import { MainMenuBar } from '../components/MainMenuBar/MainMenuBar'
import { Spacer } from '../components/Spacer'

export const Settings = () => {
	return (
		<Flex.Column data-testid="SettingsScene" style={{ width: '100%', height: '100%' }}>
			<Spacer size="24px" />
			<Flex.Row>
				<Heading size="5">Settings</Heading>
			</Flex.Row>
		</Flex.Column>
	)
}
