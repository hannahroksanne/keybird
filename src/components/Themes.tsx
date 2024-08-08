import { Theme } from '@radix-ui/themes'

export const GrayTheme = (props) => {
	const { children, ...otherProps } = props

	return (
		<Theme
			className="gray"
			appearance="dark"
			accentColor="gray"
			grayColor="gray"
			panelBackground="solid"
			scaling="100%"
			radius="medium"
			{...otherProps}
		>
			{props.children}
		</Theme>
	)
}

export const PurpleTheme = (props) => {
	return (
		<Theme
			className="purple"
			appearance="dark"
			accentColor="purple"
			grayColor="gray"
			panelBackground="solid"
			scaling="100%"
			radius="medium"
		>
			{props.children}
		</Theme>
	)
}
