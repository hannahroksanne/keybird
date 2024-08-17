import * as Tonal from 'tonal'
import { WebMidi } from 'webmidi'
import { toner } from './toner'
import { store } from '../stores/store'
import { madi } from '../controllers/madi'

const globalThat = globalThis as AnyObjectT
const areWeInProduction = !import.meta.env.DEV // trust it

export const setupForDevelopment = () => {
	if (areWeInProduction) return

	globalThat.store = store
	globalThat.madi = madi
	globalThat.WebMidi = WebMidi
	globalThat.Tonal = Tonal
	globalThat.toner = toner
}
