# seekwenzer

The octave property defines what octave the root note starts in.
Each object inside of the playback array represents a note.

Each note object has a performance array, which is a list of times
the note is played throughout the performance, when the note ends,
and the velocity of the note.

All startTime, endTime, and velocity are measured in percentages.
The startTime and endTime are relative to the length of a bar.
The velocity is relative to the 0-127 midi velocity range.

```json
{
	"name": "performance-x",
	"octave": 3,

	"playback": [
		{
			"note": "0",
			"modifier": { "octave": -1 },
			"performance": [
				{ "startTime": 0, "endTime": 23, "velocity": 50 },
				{ "startTime": 25, "endTime": 49, "velocity": 40 },
				{ "startTime": 50, "endTime": 73, "velocity": 70 },
				{ "startTime": 75, "endTime": 99, "velocity": 30 }
			]
		},
		{
			"note": "2",
			"modifier": { "octave": -1 },
			"performance": [
				{ "startTime": 0, "endTime": 23, "velocity": 50 },
				{ "startTime": 25, "endTime": 49, "velocity": 40 },
				{ "startTime": 50, "endTime": 73, "velocity": 70 },
				{ "startTime": 75, "endTime": 99, "velocity": 30 }
			]
		},
		{
			"note": "1",
			"performance": [
				{ "startTime": 13, "endTime": 24, "velocity": 50 },
				{ "startTime": 38, "endTime": 48, "velocity": 40 },
				{ "startTime": 63, "endTime": 72, "velocity": 70 },
				{ "startTime": 88, "endTime": 97, "velocity": 30 }
			]
		},
		{
			"note": "3",
			"performance": [
				{ "startTime": 13, "endTime": 24, "velocity": 50 },
				{ "startTime": 38, "endTime": 48, "velocity": 40 },
				{ "startTime": 63, "endTime": 72, "velocity": 70 },
				{ "startTime": 88, "endTime": 97, "velocity": 30 }
			]
		},
		{
			"note": "4",
			"modifier": { "octave": 1 },
			"substitute": "",
			"performance": [
				{ "startTime": 14, "endTime": 26, "velocity": 50 },
				{ "startTime": 39, "endTime": 50, "velocity": 40 },
				{ "startTime": 64, "endTime": 74, "velocity": 70 },
				{ "startTime": 89, "endTime": 99, "velocity": 30 }
			]
		}
	]
}
```

This is my data structure I wish to use in order to be able
to sequence any possible midi chord to be played in different
performance patterns. What are your thoughts? Is it effieicent?
Is it intuitive? Does it miss anything or overlook anything?
