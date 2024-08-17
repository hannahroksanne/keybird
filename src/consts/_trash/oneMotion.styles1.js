export const styles1 = [
	{
		value: 'none',
		name: 'None',
		step: [1, 1],
		list: '.',
		shared: !0,
		global: !0,
		bassOption: !0
	},
	{
		value: 'once',
		name: 'Once',
		step: [1, 1],
		loop: !1,
		list: 'xs',
		shared: !0,
		global: !0,
		bassOption: !0
	},
	{
		value: 'bar',
		name: 'Whole bar',
		step: [1, 1],
		list: 'xs',
		shared: !0,
		global: !0
	},
	{
		value: 'half-bar',
		name: 'Half bar',
		step: [1, 2],
		list: 'xs',
		shared: !0
	},
	{
		value: 'backbeat',
		name: 'Backbeat',
		step: [1, 4],
		list: '. x',
		shared: !0,
		styleGroup: 'a'
	},
	{
		value: 'beat',
		name: 'Beat',
		list: 'x',
		beatDiv: 1,
		shared: !0,
		global: !0,
		styleGroup: 'a',
		bassOption: !0
	},
	{
		value: 'offbeat',
		name: 'Offbeat',
		beatDiv: 2,
		list: '. x',
		shared: !0,
		styleGroup: 'a'
	},
	{
		value: 'pulse',
		name: 'Custom',
		list: 'x',
		shared: !0,
		customStep: !0,
		styleGroup: 'a'
	},
	{
		value: 'tresillo-1',
		name: 'Tresillo',
		step: [1, 16],
		list: 'x . . x . . x! .',
		shared: !0,
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'd',
		bassOption: !0
	},
	{
		value: 'bass-octave-tresillo',
		name: 'Octave tresillo 1',
		list: '1 . . 1+s . . 1+ .',
		step: [1, 16],
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'd',
		deprecated: !0
	},
	{
		value: 'tresillo-2',
		name: 'Tresillo slow',
		step: [1, 8],
		list: 'x . . @x . . x! .',
		shared: !0,
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'd',
		bassOption: !0
	},
	{
		value: 'cinquillo',
		name: 'Cinquillo',
		step: [1, 8],
		list: 'x . x! @x . x! x .',
		shared: !0,
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'd',
		bassOption: !0
	},
	{
		value: 'habanera',
		name: 'Habanera',
		step: [1, 8],
		list: 'x . . x! x . x .',
		shared: !0,
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'd',
		bassOption: !0
	},
	{
		value: 'son-clave-3-2',
		name: 'Son clave 3-2',
		step: [1, 16],
		cropLength: 1,
		list: 'x . . x . . @x . . . x . x . . .',
		shared: !0,
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'd',
		bassOption: !0
	},
	{
		value: 'son-clave-2-3',
		name: 'Son clave 2-3',
		step: [1, 16],
		cropLength: 1,
		list: '. . x . x . . . x . . x . . x .',
		shared: !0,
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'd',
		bassOption: !0
	},
	{
		value: 'bossa-nova-clave-3-2',
		name: 'Bossa Nova clave 3-2',
		step: [1, 16],
		cropLength: 1,
		list: 'x . . x . . @x . . . x . . x . .',
		shared: !0,
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'd',
		bassOption: !0
	},
	{
		value: 'bossa-nova-clave-2-3',
		name: 'Bossa Nova clave 2-3',
		step: [1, 16],
		cropLength: 1,
		list: '. . x . . x . . x . . x . . x .',
		shared: !0,
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'd',
		bassOption: !0
	},
	{
		value: 'dotted-eight',
		name: '3/16',
		step: [1, 16],
		cropLength: 1,
		list: 'x . . x . . @x . . x . . x . . x',
		shared: !0,
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'd',
		bassOption: !0
	},
	{
		value: 'split-13-2',
		name: 'Split 13-2',
		list: '13 2',
		customStep: !0,
		styleGroup: 'h'
	},
	{
		value: 'split-23-1',
		name: 'Split 23-1',
		list: '23 1',
		customStep: !0,
		styleGroup: 'h'
	},
	{
		value: 'arp-1-2',
		name: 'Arp 1-2',
		list: '1 2',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-x-1-2',
		name: 'Arp x-1-2',
		list: '. 1 2',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-2-3',
		name: 'Arp 1-2-3',
		list: '1 2 3',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-3-2',
		name: 'Arp 1-3-2',
		list: '1 3 2',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-x-1-2-1',
		name: 'Arp x-1-2-1',
		list: '. 1 2 1',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-x-1-2-3',
		name: 'Arp x-1-2-3',
		list: '. 1 2 3',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-2-3-2',
		name: 'Arp 1-2-3-2',
		list: '1 2 3 2',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-2-3-4',
		name: 'Arp 1-2-3-4',
		list: '1 2 3 4',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-2-4-3',
		name: 'Arp 1-2-4-3',
		list: '1 2 4 3',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-3-2-3',
		name: 'Arp 1-3-2-3',
		list: '1 3 2 3',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-3-2-4',
		name: 'Arp 1-3-2-4',
		list: '1 3 2 4',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-4-3-2',
		name: 'Arp 1-4-3-2',
		list: '1 4 3 2',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-2-1-2-3',
		name: 'Arp 2-1-2-3',
		list: '2 1 2 3',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-2-3-4-3-2',
		name: 'Arp 1-2-3-4-3-2',
		list: '1 2 3 4 3 2',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-2-3-1-2-4',
		name: 'Arp 1-2-3-1-2-4',
		list: '1 2 3 1 2 4',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-2-3-2-3-2',
		name: 'Arp 1-2-3-2-3-2',
		list: '1 2 3 2 3 2',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-3-2-3-4-3',
		name: 'Arp 1-3-2-3-4-3',
		list: '1 3 2 3 4 3',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-2-1-2-3-4-3',
		name: 'Arp 2-1-2-3-4-3',
		list: '2 1 2 3 4 3',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'arp-1-3-2-3-4-3-2-3',
		name: 'Arp 1-3-2-3-4-3-2-3',
		list: '1 3 2 3 4 3 2 3',
		customStep: !0,
		canMirror: !0,
		styleGroup: 'g'
	},
	{
		value: 'simple-run-1',
		name: 'Simple run',
		step: [1, 8],
		list: '1 2 3 4 5 6 7 8 9 8 7 6 5 4 3 2',
		cropLength: 0,
		customStep: !0,
		canMirror: !0,
		styleGroup: 'i',
		timeSignature: '4/4'
	},
	{
		value: 'simple-run-2',
		name: 'Simple run',
		step: [1, 12],
		list: '1 2 3 4 5 6 7 6 5 4 3 2',
		cropLength: 0,
		customStep: !0,
		canMirror: !0,
		styleGroup: 'i',
		timeSignature: '6/8'
	},
	{
		value: 'zig-zag-run-1',
		name: 'Zig-zag run',
		step: [1, 8],
		list: '1 3 2 4 3 5 4 6 5 7 4 6 3 5 2 4',
		cropLength: 0,
		customStep: !0,
		canMirror: !0,
		styleGroup: 'i',
		timeSignature: '4/4'
	},
	{
		value: 'zig-zag-run-2',
		name: 'Zig-zag run',
		step: [1, 12],
		list: '1 3 2 4 3 5 4 6 3 5 2 4',
		cropLength: 0,
		customStep: !0,
		canMirror: !0,
		styleGroup: 'i',
		timeSignature: '6/8'
	},
	{
		value: 'straddle-run-1',
		name: 'Straddle run',
		step: [1, 8],
		list: '13 2 24 3 35 4 46 5 57 6 46 5 35 4 24 3',
		cropLength: 0,
		customStep: !0,
		canMirror: !0,
		styleGroup: 'i',
		timeSignature: '4/4'
	},
	{
		value: 'misc-run-1',
		name: 'Misc run',
		step: [1, 16],
		list: '1 2 4 2 3 5 3 4 6 4 5 7 3 4 6 3',
		cropLength: 0,
		customStep: !0,
		canMirror: !0,
		styleGroup: 'i',
		timeSignature: '4/4'
	},
	{
		value: 'straddle-run-2',
		name: 'Straddle run',
		step: [1, 12],
		list: '13 2 24 3 35 4 46 5 35 4 24 3',
		cropLength: 0,
		customStep: !0,
		canMirror: !0,
		styleGroup: 'i',
		timeSignature: '6/8'
	},
	{
		value: 'bass-octave-1',
		name: 'Bass octave 1',
		list: '1 1+',
		customStep: !0,
		styleGroup: 'e',
		bassOption: !0
	},
	{
		value: 'bass-octave-2',
		name: 'Bass octave 2',
		list: '1 . 1+ 1+',
		step: [1, 16],
		styleGroup: 'e'
	},
	{
		value: 'bass-octave-3',
		name: 'Bass octave 3',
		list:
			'1 . 1+ . 1 . 1+ . 1 . 1+ . 1 . 1<+ 1+ 1 . 1+ . 1 . 1+ . 1 . 1+ . 1 . 1<+ 1+ 1 . 1+ . 1 . 1+ . 1 . 1+ . 1 . 1<+ 1+ 1 . 1+ . 1 . 1+ . 1 . 1+ . 1 . 1>+ 1+',
		step: [1, 16],
		styleGroup: 'e'
	},
	{
		value: 'bass-octave-4',
		name: 'Bass octave 4',
		list: '1 1+ 1+ 1 1+ 1+ 1 1+',
		step: [1, 8],
		styleGroup: 'e'
	},
	{
		value: 'bass-octave-5',
		name: 'Bass octave 5',
		list: '1s . . . . 1+ 1 .',
		step: [1, 8],
		styleGroup: 'e'
	},
	{
		value: 'bass-5th-up',
		name: 'Bass 5th up',
		list: '1s 1fs#',
		step: [1, 4],
		customStep: !0,
		sustain: !1,
		styleGroup: 'f'
	},
	{
		value: 'bass-5th-down',
		name: 'Bass 5th down',
		list: '1s 1f-s#',
		step: [1, 4],
		customStep: !0,
		sustain: !1,
		styleGroup: 'f'
	},
	{
		value: 'bass-5th-pong',
		name: 'Bass 5th pong',
		list: '1s 1fs# 1+s# 1fs#',
		step: [1, 4],
		customStep: !0,
		sustain: !1,
		styleGroup: 'f'
	},
	{
		value: 'bass-5th-tresillo',
		name: 'Bass 5th tresillo',
		step: [1, 16],
		resetStep: !0,
		customStep: !0,
		list: '1 . . 1f!# . . 1f!# .',
		sustain: !1,
		shuffle: '1:1',
		timeSignature: '4/4',
		styleGroup: 'f'
	},
	{
		value: 'modulation-1',
		name: 'Mod 1',
		step: [1, 16],
		list: '0s#(volume=1) 0(volume=0.5)',
		styleGroup: 'l',
		shared: !0
	},
	{
		value: 'modulation-2',
		name: 'Mod 2',
		step: [1, 32],
		list: '0s#(volume=1) 0(volume=0.5)',
		styleGroup: 'l',
		shared: !0
	},
	{
		value: 'modulation-3',
		name: 'Mod 3',
		step: [1, 16],
		list: '0s#(volume=0.5) 0(volume=0) 0(volume=1) 0(volume=0)',
		styleGroup: 'l',
		shared: !0
	},
	{
		value: 'modulation-4',
		name: 'Mod 4',
		step: [1, 32],
		list: '0s#(pitch=-0.1) 0s#(pitch=0.1) 0s#(pitch=-0.2) 0s#(pitch=-0.2) 0s#(pitch=-0.3) 0s#(pitch=-0.3)',
		styleGroup: 'l',
		shared: !0
	},
	{
		value: 'bass-reggae-1',
		name: 'Bass reggae',
		step: [1, 16],
		list: '1 1 . . . 1+! . .',
		styleGroup: 'b',
		deprecated: !0
	},
	{
		value: 'bass-salsa-1',
		name: 'Bass salsa',
		step: [1, 16],
		list: '1s . . @1f&s# . . @1s . . . . @1f&s# . . @1s . . . . @1f&s# . . @1s . . . . @1f&s# . . . .',
		sustain: !1,
		shuffle: '1:1',
		styleGroup: 'b',
		deprecated: !0
	},
	{
		value: 'bass-bossa-nova-1',
		name: 'Bass bossa nova 1',
		step: [1, 8],
		list: '1s . . 1 1fs# . . @1s . . . 1 1fs# . . @1f- 1s . . 1 1fs# . . @1s . . . 1 1fs# . @1\\\\ 1\\',
		sustain: !1,
		shuffle: '1:1',
		styleGroup: 'b',
		deprecated: !0
	},
	{
		value: 'bass-bossa-nova-2',
		name: 'Bass bossa nova 2',
		step: [1, 16],
		list: '1! . . . . . 1f! . 1fs# . . . . . @1s . . . 1!m . . . 1 . 1+! . 1<+! . 1f! . 1f<! .',
		sustain: !1,
		shuffle: '1:1',
		styleGroup: 'b',
		deprecated: !0
	},
	{
		value: 'bass-tango-1',
		name: 'Bass tango',
		step: [1, 8],
		list: '1s . . 1f# 1+# . 1f# .',
		sustain: !1,
		shuffle: '1:1',
		styleGroup: 'b',
		deprecated: !0
	},
	{
		value: 'bass-boogie-1',
		name: 'Bass boogie 1',
		step: [1, 8],
		list: '1 1 1>> 1>> 1>>>> 1>>>> 1>>>>> 1>>>>',
		sustain: !1,
		shuffle: '2:1',
		styleGroup: 'b'
	},
	{
		value: 'bass-boogie-2',
		name: 'Bass boogie 2',
		step: [1, 8],
		list: '1 1+ 1>> 1+ 1>>>> 1+ 1>>>>> 1>>>>',
		sustain: !1,
		shuffle: '2:1',
		styleGroup: 'b'
	},
	{
		value: 'bass-boogie-3',
		name: 'Bass boogie 3',
		step: [1, 8],
		list: '11f 11f 11f> 11f>',
		sustain: !1,
		shuffle: '2:1',
		styleGroup: 'b'
	},
	{
		value: 'bass-boogie-4',
		name: 'Bass boogie 4',
		step: [1, 8],
		list: '11f 11f 1>>\\ 1>>',
		sustain: !1,
		shuffle: '2:1',
		styleGroup: 'b'
	},
	{
		value: 'bass-boogie-5',
		name: 'Bass boogie 5',
		step: [1, 8],
		list: '1 1 1>>\\ 1>> 1>>>> 1 1>>>>> 1>>>>',
		sustain: !1,
		shuffle: '2:1',
		styleGroup: 'b'
	},
	{
		value: 'bass-boogie-6',
		name: 'Bass boogie 6',
		step: [1, 8],
		list: '1 1f 11f> 1f 11f>> 1f 11f> 1f',
		sustain: !1,
		shuffle: '2:1',
		styleGroup: 'b'
	},
	{
		value: 'bass-funk-1',
		name: 'Bass funk 1',
		step: [1, 16],
		list: '1s . . . . . @1<+! . 1+! . 1f<! 1f! . 1<+! 1+ .',
		sustain: !1,
		shuffle: '2:1',
		styleGroup: 'b',
		deprecated: !0
	},
	{
		value: 'bass-funk-2',
		name: 'Bass funk 2',
		step: [1, 16],
		list: '1s . . . . . @1f<! 1f! 1<+ . . 1+! . . @1s . . . . . . . . . 1+ . . . 1<+ . . .',
		sustain: !1,
		shuffle: '2:1',
		styleGroup: 'b',
		deprecated: !0
	},
	{
		value: 'bass-funk-3',
		name: 'Bass funk 3',
		step: [1, 16],
		list: '1s . . 1!m . . @1<+! . 1+! . . . . . . . 1! . . . . . @1<+! . 1+! . . 1!m . . 1<+! 1+',
		sustain: !1,
		shuffle: '2:1',
		styleGroup: 'b',
		deprecated: !0
	},
	{
		value: 'bass-funk-4',
		name: 'Bass funk 4',
		step: [1, 16],
		list: '1s . . 1+! . 1ms! @1<+m! . 1+! . . . . . . . 1s . . 1+! . . . . . 1f<<+! 1f<+! 1f<<+! 1+! 1<+! 1f! 1f<!',
		sustain: !1,
		shuffle: '2:1',
		styleGroup: 'b',
		deprecated: !0
	},
	{
		value: 'waltz-1',
		name: 'Waltz 1',
		step: [1, 3],
		timeSignature: '3/4',
		list: '. x x',
		styleGroup: 'k'
	},
	{
		value: 'waltz-2',
		name: 'Waltz 2',
		step: [1, 6],
		timeSignature: '3/4',
		list: '. . x . x . . . x x x .',
		styleGroup: 'k'
	},
	{
		value: 'waltz-3',
		name: 'Waltz 3',
		step: [1, 6],
		timeSignature: '3/4',
		list: '. 1 2* . 2* . . . 2* 1 2* .',
		styleGroup: 'k'
	},
	{
		value: 'arpeggio',
		name: 'Custom sequence',
		customStep: !0,
		arp: !0,
		shared: !0,
		canMirror: !0,
		styleGroup: 'c'
	}
]
