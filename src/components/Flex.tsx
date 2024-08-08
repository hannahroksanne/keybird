import { Flex as RadixFlex, FlexProps } from '@radix-ui/themes'
import { useTestId } from '../utilities/component.utilities'

type PropsT = FlexProps & {
	testId?: string
}

const FlexBox = (componentId: string, direction: string) => (props: PropsT) => {
	const { testId, ...otherProps } = props
	const _testId = useTestId(componentId, props.testId || '')
	const updatedProps = { ...otherProps, direction } as FlexProps
	return <RadixFlex {...updatedProps} data-testid={_testId} />
}

export const Flex = {
	Row: FlexBox('Flex.Row', 'row'),
	Column: FlexBox('Flex.Column', 'column')
}
