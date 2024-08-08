import * as Tonal from 'tonal'

import { $store } from '../views/$store'
import { $midi } from '../views/midi.store'
import { $keys } from '../views/keys.store'
import { $core } from '../views/core'

const globalThat = globalThis as AnyObjectT
const areWeInProduction = !import.meta.env.DEV // trust it

export const setupForDevelopment = () => {
	if (areWeInProduction) return
	globalThat.Tonal = Tonal
	globalThat.$store = $store
	globalThat.$midi = $midi
	globalThat.$keys = $keys
	globalThat.$core = $core
}
