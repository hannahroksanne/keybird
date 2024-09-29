import { Button, Select, Text } from '@radix-ui/themes'
import { Flex } from '#/components/layout/Flex'
import { useOutputStore, useScaleStore } from './store'

export const OutputTypeSelect = () => {
	const { selectedType, setSelectedOutputType } = useOutputStore()
	const text = selectedType === 'instrument' ? 'Instrument' : 'MIDI Output'

	const handleChange = (value: string) => {
		setSelectedOutputType(value)
	}

	return (
		<Select.Root value={selectedType} onValueChange={handleChange}>
			<Select.Trigger>
				<Text>Output Type: {text}</Text>
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="midi">MIDI Port</Select.Item>
				<Select.Item value="instrument">Built-In Instrument</Select.Item>
			</Select.Content>
		</Select.Root>
	)
}

export const InstrumentSelect = () => {
	const { loadedInstrumentNames, selectedInstrumentName, setSelectedInstrumentName } = useOutputStore()

	const handleChange = (instrumentName: string) => {
		setSelectedInstrumentName(instrumentName)
	}

	return (
		<Select.Root value={selectedInstrumentName} onValueChange={handleChange}>
			<Select.Trigger>
				<Text>Instrument: {selectedInstrumentName}</Text>
			</Select.Trigger>
			<Select.Content>
				{loadedInstrumentNames.map((name) => (
					<Select.Item key={name} value={name}>
						{name}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}

export const MidiOutputSelect = () => {
	const {
		selectedType,
		midiDeviceNames,
		selectedMidiOutputDeviceName,
		isMidiEnabled,
		isMidiReady,
		setSelectedMidiOutputDeviceName
	} = useOutputStore()
	const isMidiOutputSelected = selectedType === 'midi'
	const isDisabled = !isMidiEnabled || !isMidiReady || !isMidiOutputSelected
	const value = isDisabled ? 'Disabled' : selectedMidiOutputDeviceName

	const handleChange = (newMidiOutputName: string) => {
		setSelectedMidiOutputDeviceName(newMidiOutputName)
	}

	return (
		<Select.Root value={value} onValueChange={handleChange}>
			<Select.Trigger>
				<Text>MIDI Output: {value}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				{midiDeviceNames.map((name) => (
					<Select.Item key={name} value={name}>
						{name}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}

export const BaseOctaveController = () => {
	const { baseOctave, setBaseOctave } = useScaleStore()
	const value = String(baseOctave)

	const handleChange = (newOctave: string) => {
		setBaseOctave(Number(newOctave))
	}

	return (
		<Select.Root value={value} onValueChange={handleChange}>
			<Select.Trigger>
				<Text>Octave {baseOctave}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((octave) => (
					<Select.Item key={octave} value={octave.toString()}>
						{octave}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}

export const KeyNameSelect = () => {
	const { key, setKey } = useScaleStore()

	const handleChange = (newRootNote: string) => {
		setKey(newRootNote)
	}

	return (
		<Select.Root size="2" value={key} onValueChange={handleChange}>
			<Select.Trigger>
				<Text>Key: {key}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				{['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map((note) => (
					<Select.Item key={note} value={note}>
						{note}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}

export const ScaleTypeSelect = () => {
	const { type, setType } = useScaleStore()

	const handleChange = (newScaleType: string) => {
		setType(newScaleType)
	}

	return (
		<Select.Root size="2" value={type} onValueChange={handleChange}>
			<Select.Trigger>
				<Text>Scale: {type}</Text>
			</Select.Trigger>
			<Select.Content position="popper">
				<Select.Item value="major">major</Select.Item>
				<Select.Item value="minor">minor</Select.Item>
			</Select.Content>
		</Select.Root>
	)
}

export const GlobalControlsRow = () => {
	return (
		<Flex.Row pl="4" gap="2">
			<BaseOctaveController />
			<KeyNameSelect />
			<ScaleTypeSelect />
		</Flex.Row>
	)
}

export const OutputControlsRow = () => {
	const { selectedType } = useOutputStore()
	const isInstrumentSelected = selectedType === 'instrument'

	return (
		<Flex.Row pr="4" gap="2">
			<OutputTypeSelect />
			{isInstrumentSelected ? <InstrumentSelect /> : <MidiOutputSelect />}
		</Flex.Row>
	)
}

export const MainControls = () => {
	return (
		<Flex.Row justify="between" className="MainControls" p="2">
			<GlobalControlsRow />
			<OutputControlsRow />
		</Flex.Row>
	)
}
