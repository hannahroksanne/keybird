import * as Tonal from 'tonal'

import { $midi } from '../views/$midi'
import { $core } from '../views/$core'

const globalThat = globalThis as AnyObjectT
const areWeInProduction = !import.meta.env.DEV // trust it

export const setupForDevelopment = () => {
	if (areWeInProduction) return
	globalThat.Tonal = Tonal
	globalThat.$midi = $midi
	globalThat.$core = $core
}
