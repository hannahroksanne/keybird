import * as Tonal from 'tonal'
import { WebMidi } from 'webmidi'

import { $midi } from '../stores/midi/$midi'
import { $core } from '../stores/core/$core'
import { toner } from './toner/toner'
import { $chords } from '../stores/chords'
import { store } from '../store'

const globalThat = globalThis as AnyObjectT
const areWeInProduction = !import.meta.env.DEV // trust it

export const setupForDevelopment = () => {
	if (areWeInProduction) return

	globalThat.store = store
	globalThat.WebMidi = WebMidi
	globalThat.Tonal = Tonal
	globalThat.$midi = $midi
	globalThat.$core = $core
	globalThat.toner = toner
	globalThat.$chords = $chords
}
