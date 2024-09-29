import classcat from 'classcat'

export const useTestId = (componentId: string, props: AnyObjectT) => {
	const instanceId = props.testId || props.testid || props['data-testid'] || ''
	return instanceId ? instanceId : componentId
}

export const useClassNames = (className: string, props: AnyObjectT, otherClassNames: string[] = []) => {
	return classcat([className, props.className, ...otherClassNames])
}
