import '@radix-ui/themes/styles.css'
import './styles/reset.css'
import './styles/index.css'
import './styles/theme.css'
import './styles/variables.css'
import './styles/purpleTheme.css'
import './styles/fonts.css'

import { GrayTheme } from './components/Themes'
import { Router } from './views/Router'

export const App = () => {
	return (
		<GrayTheme>
			<main data-testid="App">
				<Router />
			</main>
		</GrayTheme>
	)
}
