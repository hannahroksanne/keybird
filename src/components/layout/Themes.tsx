import { Theme as RadixTheme } from '@radix-ui/themes'

export const GrayTheme = (props) => {
	return (
		<RadixTheme
			data-testid="GrayTheme"
			className="GrayTheme gray"
			appearance="dark"
			accentColor="gray"
			grayColor="gray"
			panelBackground="solid"
			scaling="100%"
			radius="medium"
			{...props}
		/>
	)
}
