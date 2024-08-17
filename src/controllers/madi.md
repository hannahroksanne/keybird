# madi

Lightweight MIDI representation format.

```
$MADI
BPM=140
PPQ=96
KEY=F#
SCALE=minor
$TRACK
ID=0
NAME=chord-piano
CHANNEL=0
[N=C#3 T=0 D=9487 V=99]
[N=A2 T=16 D=4838 V=127]
[N=F#2 T=24 D=0192 V=55]
[N=D3 T=31 D=6432 V=29]
$TRACK
ID=1
NAME=melodic-top-piano
CHANNEL=0
[N=C#5 T=0 D=9487 V=99]
[N=A3 T=96 D=4838 V=127]
[N=F#4 T=192 D=0192 V=55]
[N=D5 T=288 D=6432 V=29]
```

A `.madi` file / formatted data opens with `$MADI`. This is used as a delimiter for the
meta data to begin.

To parse the metadata, select everything between `$MADI` and before the first `$TRACK`,
break the selected text into one string per line.

```
$MADI
BPM=140
PPQ=96
KEY=F#
SCALE=minor
```

For each line, split the string at "=" and use the first value of the split as the
object key and the second as the value.

```json
{
	"meta": {
		"bpm": 140,
		"ppq": 96,
		"key": "F#",
		"scale": "minor"
	}
}
```

Next, match everything between `$TRACK` and either the next `$TRACK`, or the end of the
file.

```
ID=0
NAME=chord-piano
CHANNEL=0
[N=C#3 T=0 D=9487 V=99]
[N=A2 T=16 D=4838 V=127]
[N=F#2 T=24 D=0192 V=55]
[N=D3 T=31 D=6432 V=29]
```

Again, split by line and iterate. For lines that have "=", treat them as before,
split them, and assign them in a target object.

```json
{
	"id": 0,
	"name": "chord-piano",
	"channel": 0
}
```

For lines starting with `[`, after splitting them into an array of lines, we will:

1. Delete `[` and `]`.

2. Split the resulting string by spaces.

3. For each resulting string (i.e `N=B5`), create a target object, split the string by `"="`,
   and apply the second value to the target object where `N` is `note`, `T` is `ticks`, `D` is
   `duration`, and `V` is velocity.

```json
[
	{ "note": "C#3", "ticks": 0, "duration": 9487, "velocity": 99 },
	{ "note": "A2", "ticks": 16, "duration": 4838, "velocity": 127 },
	{ "note": "F#2", "ticks": 24, "duration": 0192, "velocity": 55 },
	{ "note": "D3", "ticks": 31, "duration": 6432, "velocity": 29 }
]
```

We apply this array to the track object...

```json
{
	"id": 0,
	"name": "chord-piano",
	"channel": 0,
	"notes": [
		{ "note": "C#3", "ticks": 0, "duration": 9487, "velocity": 99 },
		{ "note": "A2", "ticks": 16, "duration": 4838, "velocity": 127 },
		{ "note": "F#2", "ticks": 24, "duration": 0192, "velocity": 55 },
		{ "note": "D3", "ticks": 31, "duration": 6432, "velocity": 29 }
	]
}
```

And apply the track object to the main target object.

```json
{
	"meta": {
		"bpm": 140,
		"ppq": 96,
		"key": "F#",
		"scale": "minor"
	},

	"tracks": [
		{
			"id": 0,
			"name": "chord-piano",
			"channel": 0,
			"notes": [
				{ "note": "C#3", "ticks": 0, "duration": 9487, "velocity": 99 },
				{ "note": "A2", "ticks": 16, "duration": 4838, "velocity": 127 },
				{ "note": "F#2", "ticks": 24, "duration": 0192, "velocity": 55 },
				{ "note": "D3", "ticks": 31, "duration": 6432, "velocity": 29 }
			]
		}
	]
}
```

Repeat for anymore tracks.
