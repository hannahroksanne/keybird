export const LOGS_CONFIG: LogsConfigT = {
	midiConnectionSucceeded: {
		level: 'success',
		title: 'MIDI Connection Succeeded',
		message: 'Successfully connected to webmidi.',
		data: {}
	},

	midiConnectionFailed: {
		level: 'error',
		title: 'MIDI Connection Failed',
		message: 'Failed to connect to webmidi.',
		data: {}
	},

	midiOutputEnabled: {
		level: 'info',
		title: 'MIDI Output Enabled',
		message: 'Midi output was turned on.',
		data: {}
	},

	midiOutputDisabled: {
		level: 'info',
		title: 'MIDI Output Disabled',
		message: 'Midi output was turned off.',
		data: {}
	},

	midiOutputsFound: {
		level: 'info',
		title: 'MIDI Outputs Found',
		message: 'Midi outputs were found.',
		data: {}
	},

	noMidiOutputsFound: {
		level: 'warn',
		title: 'No MIDI Outputs Found',
		message: 'No midi outputs were found.',
		data: {}
	}
}
