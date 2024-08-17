import { createHooks } from '../utilities/createHooks'
import { logsValues } from './logs.store'
import { outputValues } from './output.values'

type BaseT = typeof logsValues & typeof outputValues

export const use = createHooks<BaseT>({
	...logsValues,
	...outputValues
})
