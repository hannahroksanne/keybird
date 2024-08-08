import { Box } from '@radix-ui/themes'

type PropsT = {
	size?: string | number
	width?: string | number
	height?: string | number
}

export const Spacer = (props: PropsT) => {
	const finalWidth = props.width ?? props.size
	const finalHeight = props.height ?? finalWidth
	return <Box as="span" style={{ width: finalWidth, height: finalHeight }} />
}
