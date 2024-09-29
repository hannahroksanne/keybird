import '@radix-ui/themes/styles.css'
import './styles/reset.css'
import './styles/index.css'
import './styles/theme.css'
import './styles/variables.css'
import './styles/purpleTheme.css'
import './styles/fonts.css'

import { GrayTheme } from './components/layout/Themes'
import { Route, Switch, useLocation } from 'wouter'
import { Main } from './views/main/Main'
import { MainMenuBar } from './components/MainMenuBar/MainMenuBar'
import { Flex } from '#/components/layout/Flex'
import { RecoilRoot } from 'recoil'

export const App = () => {
	const [location] = useLocation()

	return (
		<RecoilRoot>
			<GrayTheme id="App" data-testid="App" className="App">
				<main>
					<Flex.Column data-testid="Router" data-location={location} height="100%">
						<MainMenuBar />
						<Switch>
							<Route component={Main} />
						</Switch>
						<GlowPixels />
					</Flex.Column>
				</main>
			</GrayTheme>
		</RecoilRoot>
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
