export const useTestId = (componentId: string, instanceId: string) => {
	return instanceId ? `${componentId}-${instanceId}` : componentId
}
