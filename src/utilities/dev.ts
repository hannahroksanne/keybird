import * as Tonal from 'tonal'
import { WebMidi } from 'webmidi'
import { toner } from './toner'
import { store } from '../store'

const globalThat = globalThis as AnyObjectT
const areWeInProduction = !import.meta.env.DEV // trust it

export const setupForDevelopment = () => {
	if (areWeInProduction) return

	globalThat.store = store
	globalThat.WebMidi = WebMidi
	globalThat.Tonal = Tonal
	globalThat.toner = toner
}
