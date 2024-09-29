import './MainMenuBar.css'
import { Flex } from '#/components/layout/Flex'
import { Link } from '@radix-ui/themes'
import { useLocation } from 'wouter'
import { Spacer } from '../layout/Spacer'

export const MainMenuBar = () => {
	const [location, setLocation] = useLocation()

	const routeToChordBrowser = () => {
		setLocation('/')
	}

	const routeToPatternEditor = () => {
		setLocation('/patternEditor')
	}

	const routeToKeyboard = () => {
		setLocation('/keyboard')
	}

	return (
		<Flex.Column p="4" gap="3" data-testid="MainMenuBar" className="MainMenuBar">
			<Flex.Row gap="4" align="center" className="MainMenuBarRow" wrap="wrap">
				<Flex.Row justify="start" align="center" gap="6">
					<img src="/images/keybirdLogo.svg" className="MainMenuBarLogo" />
				</Flex.Row>
				<Spacer width="24px" />
				<Flex.Row className="LinksSwitch" gap="6">
					<Link className="MainMenuBarLink" onClick={routeToKeyboard}>
						Keyboard
					</Link>
					<Link className="MainMenuBarLink" onClick={routeToChordBrowser}>
						Chords
					</Link>
					<Link className="MainMenuBarLink" onClick={routeToPatternEditor}>
						Patterns
					</Link>
				</Flex.Row>
			</Flex.Row>
		</Flex.Column>
	)
}
