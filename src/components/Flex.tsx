import { Flex as RadixFlex, FlexProps } from '@radix-ui/themes'
import { useTestId } from '../utilities/component.utilities'
import React from 'react'

type PropsT = FlexProps & {
	testId?: string
}

const FlexBox = (componentId: string, direction: string) => {
	return React.forwardRef<HTMLDivElement, PropsT>((props: PropsT, ref) => {
		const { testId, ...otherProps } = props
		const _testId = useTestId(componentId, props)
		const updatedProps = { ...otherProps, direction } as FlexProps
		return <RadixFlex ref={ref} {...updatedProps} data-testid={_testId} />
	})
}

export const Flex = {
	Row: FlexBox('Flex.Row', 'row'),
	Column: FlexBox('Flex.Column', 'column')
}
