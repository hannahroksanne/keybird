import { Select } from '@radix-ui/themes'
import { store } from '../stores/store'
import appConfig from '../consts/app.config.json'

export const KeyMapLayoutController = () => {
	const keyMapLayoutName = store.useKeyMapLayoutName()
	const keyMapLayoutNames = appConfig.keyMapLayoutNames

	return (
		<Select.Root value={keyMapLayoutName} onValueChange={store.setKeyMapLayoutName}>
			<Select.Trigger>Keymap: {keyMapLayoutName}</Select.Trigger>
			<Select.Content position="popper">
				{keyMapLayoutNames.map((layoutName) => (
					<Select.Item key={layoutName} value={layoutName}>
						{layoutName}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	)
}
