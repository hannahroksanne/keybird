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
import { Main } from './views/Main'
import { MainMenuBar } from './components/MainMenuBar/MainMenuBar'
import { Flex } from './components/Flex'
import { useStoreSync } from './stores/store.sync'
import React from 'react'

const areWeInProduction = !import.meta.env.DEV // trust it

export const App = () => {
	const [location] = useLocation()
	const [shouldLoad, setShouldLoad] = React.useState(false)

	React.useEffect(() => {
		setTimeout(() => setShouldLoad(true), 500)
	}, [])

	return (
		<GrayTheme>
			<main data-testid="App">
				<Flex.Column data-testid="Router" data-location={location.substring(1)} style={{ height: '100%' }}>
					{shouldLoad && <HookBranch />}
					<MainMenuBar />
					<Switch>
						<Route path="/" component={Main} />
						<Route path="/chords" component={Chords} />
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
