import { SegmentedControl } from '@radix-ui/themes'
import { useLocation } from 'wouter'

const areWeInProduction = !import.meta.env.DEV // trust it

export const SceneRouteController = () => {
	const [location, setLocation] = useLocation()

	const navigate = (newValue) => {
		setLocation(newValue)
	}

	const isChordsDisabled = areWeInProduction

	return (
		<SegmentedControl.Root value={location} onValueChange={navigate}>
			<SegmentedControl.Item value="/">Keyboard</SegmentedControl.Item>
			<SegmentedControl.Item aria-disabled={isChordsDisabled} value="/chords">
				Chords
			</SegmentedControl.Item>
			{/* <SegmentedControl.Item value="/settings">Settings</SegmentedControl.Item> */}
		</SegmentedControl.Root>
	)
}
