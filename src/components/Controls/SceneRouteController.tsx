import { SegmentedControl } from '@radix-ui/themes'
import { useLocation } from 'wouter'

export const SceneRouteController = () => {
	const [location, setLocation] = useLocation()

	const navigate = (newValue) => {
		setLocation(newValue)
	}

	return (
		<SegmentedControl.Root value={location} onValueChange={navigate}>
			<SegmentedControl.Item value="/">Keyboard</SegmentedControl.Item>
			<SegmentedControl.Item value="/chords">Chords</SegmentedControl.Item>
			<SegmentedControl.Item value="/settings">Settings</SegmentedControl.Item>
		</SegmentedControl.Root>
	)
}
