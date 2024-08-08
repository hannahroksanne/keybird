import '@radix-ui/themes/styles.css'
import './styles/index.css'
import './styles/theme.css'
import './styles/variables.css'
import './styles/purpleTheme.css'
import './styles/fonts.css'

import { Route, Switch } from 'wouter'
import { Main } from './views/Main'
import { GrayTheme } from './components/Themes'

export const App = () => {
	return (
		<GrayTheme>
			<main data-testid="App">
				<Switch>
					<Route path="/" component={Main} />
				</Switch>
			</main>
		</GrayTheme>
	)
}
