import { Theme as RadixTheme } from '@radix-ui/themes'

export const GrayTheme = (props) => {
	const { children, ...otherProps } = props

	return (
		<RadixTheme
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
		</RadixTheme>
	)
}

export const PurpleTheme = (props) => {
	return (
		<RadixTheme
			className="purple"
			appearance="dark"
			accentColor="purple"
			grayColor="gray"
			panelBackground="solid"
			scaling="100%"
			radius="medium"
		>
			{props.children}
		</RadixTheme>
	)
}

export const DarkYellowTheme = (props) => {
	return (
		<RadixTheme
			className="dark yellow"
			appearance="dark"
			accentColor="yellow"
			grayColor="gray"
			panelBackground="solid"
			scaling="100%"
			radius="medium"
		>
			{props.children}
		</RadixTheme>
	)
}
