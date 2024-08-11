import '@radix-ui/themes/styles.css'
import './styles/reset.css'
import './styles/index.css'
import './styles/theme.css'
import './styles/variables.css'
import './styles/purpleTheme.css'
import './styles/fonts.css'

import { GrayTheme } from './components/Themes'
import { Route, Switch, useLocation } from 'wouter'
import { Chords } from './views/Chords'
import { Settings } from './views/Settings'
import { Main } from './views/Main'
import { useCoreStoreMonitor } from './views/setup'
import { MainMenuBar } from './components/MainMenuBar/MainMenuBar'
import { Flex } from './components/Flex'
import { useStoreSync } from './store.sync'

export const App = () => {
	const [location] = useLocation()

	return (
		<GrayTheme>
			<main data-testid="App">
				<Flex.Column
					data-testid="Router"
					data-location={location.substring(1)}
					justify="between"
					style={{ height: '100%' }}
				>
					<HookBranch />
					<MainMenuBar />
					<Switch>
						<Route path="/" component={Main} />
						<Route path="/chords" component={Chords} />
						<Route path="/settings" component={Settings} />
					</Switch>
					<GlowPixels />
				</Flex.Column>
			</main>
		</GrayTheme>
	)
}

// This is to ensure that these hooks
// do not cause the entire app to re-render.
const HookBranch = () => {
	useCoreStoreMonitor()
	useStoreSync()
	return null
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
