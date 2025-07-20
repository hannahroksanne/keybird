import * as React from 'react'
import { Button, Dialog, Flex, Text, Select, Separator } from '@radix-ui/themes'
import { Spacer } from './Spacer'

type ChordEditDialogProps = {
	chordItem: ChordProgressionItemT | null
	isOpen: boolean
	onClose: () => void
	onSave: (updates: Partial<ChordProgressionItemT>) => void
}

export const ChordEditDialog = React.memo((props: ChordEditDialogProps) => {
	const [octave, setOctave] = React.useState(3)
	const [inversion, setInversion] = React.useState(0)
	const [voicing, setVoicing] = React.useState('root')
	const [bassNote, setBassNote] = React.useState('none')

	// Update local state when dialog opens with new chord item
	React.useEffect(() => {
		if (props.chordItem && props.isOpen) {
			setOctave(props.chordItem.octave)
			setInversion(props.chordItem.inversion)
			setVoicing(props.chordItem.voicing)
			setBassNote(props.chordItem.bassNote || 'none')
		}
	}, [props.chordItem, props.isOpen])

	const handleSave = () => {
		props.onSave({
			octave,
			inversion,
			voicing,
			bassNote: bassNote === 'none' ? '' : bassNote
		})
		props.onClose()
	}

	const handleCancel = () => {
		props.onClose()
	}

	if (!props.chordItem) return null

	return (
		<Dialog.Root open={props.isOpen} onOpenChange={(open) => !open && props.onClose()}>
			<Dialog.Content style={{ maxWidth: 450 }}>
				<Dialog.Title>Edit Chord: {props.chordItem.chordName}</Dialog.Title>
				<Dialog.Description size="2" mb="4">
					Adjust the properties of this chord in the progression.
				</Dialog.Description>

				<Flex direction="column" gap="3">
					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							Octave
						</Text>
						<Select.Root value={octave.toString()} onValueChange={(value) => setOctave(parseInt(value))}>
							<Select.Trigger>
								<Text className="normalFont">Octave: {octave}</Text>
							</Select.Trigger>
							<Select.Content>
								{[1, 2, 3, 4, 5, 6, 7].map((oct) => (
									<Select.Item key={oct} value={oct.toString()}>
										{oct}
									</Select.Item>
								))}
							</Select.Content>
						</Select.Root>
					</label>

					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							Inversion
						</Text>
						<Select.Root value={inversion.toString()} onValueChange={(value) => setInversion(parseInt(value))}>
							<Select.Trigger>
								<Text className="normalFont">Inversion: {inversion === 0 ? 'Root' : `${inversion}${inversion === 1 ? 'st' : inversion === 2 ? 'nd' : 'rd'}`}</Text>
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="0">Root Position</Select.Item>
								<Select.Item value="1">First Inversion</Select.Item>
								<Select.Item value="2">Second Inversion</Select.Item>
								<Select.Item value="3">Third Inversion</Select.Item>
							</Select.Content>
						</Select.Root>
					</label>

					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							Voicing
						</Text>
						<Select.Root value={voicing} onValueChange={setVoicing}>
							<Select.Trigger>
								<Text className="normalFont">Voicing: {voicing}</Text>
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="root">Root</Select.Item>
								<Select.Item value="close">Close</Select.Item>
								<Select.Item value="open">Open</Select.Item>
								<Select.Item value="drop2">Drop 2</Select.Item>
								<Select.Item value="drop3">Drop 3</Select.Item>
							</Select.Content>
						</Select.Root>
					</label>

					<label>
						<Text as="div" size="2" mb="1" weight="bold">
							Bass Note (Optional)
						</Text>
						<Select.Root value={bassNote} onValueChange={setBassNote}>
							<Select.Trigger>
								<Text className="normalFont">Bass: {bassNote === 'none' ? 'None' : bassNote}</Text>
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="none">None</Select.Item>
								{['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map((note) => (
									<Select.Item key={note} value={note}>
										{note}
									</Select.Item>
								))}
							</Select.Content>
						</Select.Root>
					</label>
				</Flex>

				<Separator my="4" size="4" />

				<Flex gap="3" mt="4" justify="end">
					<Dialog.Close>
						<Button variant="soft" color="gray" onClick={handleCancel}>
							Cancel
						</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button onClick={handleSave}>Save Changes</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	)
})