type PropsT = {
	size?: string | number
	width?: string | number
	height?: string | number
}

export const Spacer = (props: PropsT) => {
	const finalWidth = props.width ?? props.size
	const finalHeight = props.height ?? finalWidth

	const style = {
		width: finalWidth,
		height: finalHeight,
		minWidth: finalWidth,
		minHeight: finalHeight
	}

	return <span style={style} />
}
