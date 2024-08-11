import { Select } from '@radix-ui/themes'
import { store } from '../store'
import appConfig from '../consts/app.config.json'

export const KeyMapLayoutController = () => {
	const keyMapLayoutName = store.useKeyMapLayoutName()
	const keyMapLayoutNames = appConfig.keyMapLayoutNames

	return (
		<Select.Root value={keyMapLayoutName}>
			<Select.Trigger />
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
