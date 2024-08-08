import { Route, Switch, useLocation } from 'wouter'
import { Chords } from './Chords'
import { Settings } from './Settings'
import { Main } from './Main'
import { useCoreStoreMonitor } from './setup'
import { MainMenuBar } from '../components/MainMenuBar/MainMenuBar'
import { Flex } from '../components/Flex'

export const Router = () => {
	const [location] = useLocation()
	useCoreStoreMonitor()

	return (
		<Flex.Column data-testid="Router" data-location={location.substring(1)} justify="between" style={{ height: '100%' }}>
			<MainMenuBar />
			<Switch>
				<Route path="/" component={Main} />
				<Route path="/chords" component={Chords} />
				<Route path="/settings" component={Settings} />
			</Switch>
			<GlowPixels />
		</Flex.Column>
	)
}

// Make it look cool. That is all.
const GlowPixels = () => {
	return (
		<>
			<span className="pixel0"> </span>
			<span className="pixel1"> </span>
			<span className="pixel2"> </span>
		</>
	)
}
