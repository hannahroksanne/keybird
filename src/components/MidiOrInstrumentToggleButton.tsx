import { Button, Select, Text } from '@radix-ui/themes'
import { Flex } from './Flex'
import { store } from '../stores/store'
import { MidiOutputSelector } from './Controls/MidiOutputSelector'
import { MidiToggleButton } from './Controls/MidiToggleButton'
import { InstrumentSelector, OutputController } from './OutputController'
import React from 'react'

export const MidiOrInstrumentToggleButton = () => {
	const outputType = store.useOutputType()
	const text = outputType === 'builtIn' ? 'Built-In Instrument' : 'MIDI Output'

	return (
		<Select.Root value={outputType} onValueChange={store.setOutputType}>
			<Select.Trigger>
				<Text className="normalFont">Output Type: {text}</Text>
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="MIDI">MIDI Port</Select.Item>
				<Select.Item value="builtIn">Built-In Instrument</Select.Item>
			</Select.Content>
		</Select.Root>
	)

	// 	<Button variant="outline" size="2" onClick={store.toggleIsBuiltInInstrumentSelected}>
	// 		Output type: {text}
	// 	</Button>
	// )
}

export const OutputOptionsRow = () => {
	const outputType = store.useOutputType()

	return (
		<Flex.Row gap="3" mb="0" className="VboardDataRow" justify="between" align="center" style={{ width: '100%' }}>
			{/* <MidiOrInstrumentToggleButton /> */}

			<Flex.Row gap="3">
				{outputType === 'midi' && (
					<>
						<MidiOutputSelector />
						<MidiToggleButton />
					</>
				)}

				{outputType === 'builtIn' && (
					<>
						<InstrumentSelector />
						<OutputController />
					</>
				)}
			</Flex.Row>
		</Flex.Row>
	)
}
