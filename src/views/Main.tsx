import 'react-simple-keyboard/build/css/index.css'
import '../styles/keyboard.css'
import './Main.css'
import { Select, Spinner } from '@radix-ui/themes'
import { Vboard } from '../components/Vboard/Vboard'
import { Piano } from '../components/Piano'
import { Flex } from '../components/Flex'
import DEFAULT_LAYOUT from '../defaultLayout.json'
import { Spacer } from '../components/Spacer'
import { $store } from './$store'
import { MidiToggleSwitch } from '../components/MidiToggleSwitch'
import { MidiWarningMessage } from '../components/MidiWarningMessage'
import { MidiOutputSelector } from '../components/MidiOutputSelector'
import { $midi } from './$midi'
import { useCoreStoreMonitor } from './setup'
import { $core } from './$core'

export const Main = () => {
	useCoreStoreMonitor()

	return (
		<Flex.Column data-testid="MainView" style={{ width: '100%', height: '100%' }}>
			<Spacer size="24px" />
			<Flex.Row justify="between" align="center" px="4" style={{ height: 36 }}>
				<Flex.Row gap="6" pl="4" align="center">
					<KeyNameSelect />
					<ScaleNameSelect />
				</Flex.Row>
				<MidiControls />
			</Flex.Row>
			<Flex.Column p="4" style={{ width: '100%', height: '100%' }}>
				<Vboard />
				<Piano />
			</Flex.Column>
		</Flex.Column>
	)
}

const MidiControls = () => {
	const isMidiReady = $midi.useIsMidiReady()

	if (!isMidiReady) {
		return <Spinner />
	}

	return (
		<Flex.Row gap="4" align="center">
			<MidiWarningMessage />
			<MidiOutputSelector />
			<MidiToggleSwitch />
		</Flex.Row>
	)
}

const KeyNameSelect = () => {
	const rootNote = $core.use((state) => state.scaleRootNote)

	const reportKeyNameChange = (newRootNote: string) => {
		$core.setScaleRootNote(newRootNote as any)
	}

	return (
		<Select.Root size="3" value={rootNote} onValueChange={reportKeyNameChange}>
			<Select.Trigger variant="ghost" />
			<Select.Content>
				<Select.Group>
					<Select.Item value="C">C</Select.Item>
					<Select.Item value="C#">C#</Select.Item>
					<Select.Item value="D">D</Select.Item>
					<Select.Item value="D#">D#</Select.Item>
					<Select.Item value="E">E</Select.Item>
					<Select.Item value="F">F</Select.Item>
					<Select.Item value="F#">F#</Select.Item>
					<Select.Item value="G">G</Select.Item>
					<Select.Item value="G#">G#</Select.Item>
					<Select.Item value="A">A</Select.Item>
					<Select.Item value="A#">A#</Select.Item>
					<Select.Item value="B">B</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

const ScaleNameSelect = () => {
	const scaleType = $core.use((state) => state.scaleType)

	const changeScaleType = (newScaleType: string) => {
		$core.setScaleType(newScaleType as any)
	}

	return (
		<Select.Root size="3" value={scaleType} onValueChange={changeScaleType}>
			<Select.Trigger variant="ghost" />
			<Select.Content>
				<Select.Group>
					<Select.Item value="major">major</Select.Item>
					<Select.Item value="minor">minor</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}
