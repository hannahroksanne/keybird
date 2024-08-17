import { hookstate } from '@hookstate/core'

// Error and warning logs. Future feature.
export const logs = hookstate<string[]>([])
// Is the logs panel open?
export const isLogsOpen = hookstate(false)

export const logsValues = {
	logs,
	isLogsOpen
}
