export const styles = [
	{
		value: 'once',
		name: 'Once',
		chord: { style: 'once' },
		bass: { style: 'once' }
	},
	{
		value: 'basic-1',
		name: 'Basic' + ' 1',
		chord: { style: 'split-23-1', step: [1, 8] },
		bass: { style: 'once', octave: 3 },
		sustain: 'chord'
	},
	{
		value: 'basic-2',
		name: 'Basic' + ' 2',
		chord: { style: 'arp-1-2-3-2', step: [1, 8] },
		bass: { style: 'once', octave: 3 },
		sustain: 'chord'
	},
	{
		value: 'basic-3',
		name: 'Basic' + ' 3',
		chord: { style: 'arp-1-3-2-3', step: [1, 8], mirror: !0 },
		bass: { style: 'once', octave: 3 },
		sustain: 'chord'
	},
	{
		value: 'basic-4',
		name: 'Basic' + ' 4',
		chord: { style: 'arp-1-2-3-1-2-4', step: [1, 8] },
		bass: { style: 'once', octave: 3 },
		sustain: 'chord'
	},
	{
		value: 'pop-1',
		name: 'Pop 1',
		chord: { style: 'beat' },
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '1!1+! . . . . . . @1f! 1!1+! . . . . 1s1+s . .'
		},
		tempo: 120,
		shuffle: '2:1'
	},
	{
		value: 'pop-2',
		name: 'Pop 2',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: 'x . . . . x? . . 0# . . . . x . .'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '11+ . . 1 . . 1+m? 1fm? 11+ . . 1 1+ . 1+m 1fm'
		},
		tempo: 90,
		sustain: 'chord'
	},
	{
		value: 'pop-3',
		name: 'Pop 3',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: 'xs . . . 1s3s 2s . @xs . . . . 12 . 3- .'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1s1+s . . 1+! . . @1s . . . . 1+! . 1+! . .'
		},
		tempo: 90,
		sustain: 'chord'
	},
	{
		value: 'pop-4',
		name: 'Pop 4',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: 'xS2 xT . . xm . . . xm . . . xm . . . x . . . xm . . . xm . . . 3 1 2 3 xS2 xT . . xm . . . xm . . . xm . . . x . . . xm . . . xm . . . 1 2 3 1',
			numNotes: 3
		},
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '1 . . @1f# . . . . 1 . . @1f# . 1f# . .',
			octave: 3
		},
		tempo: 90,
		sustain: 'chord'
	},
	{
		value: 'dance-1',
		name: 'Dance 1',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: 'x . . @x . . @x . . x . . x . . x'
		},
		bass: { style: 'bass-octave-1' },
		sustain: '2-beats'
	},
	{
		value: 'dance-2',
		name: 'Dance 2',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '. . x . . x . . x . . x . 1 2* 1'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: 'x . . . x . . @x . . x . . . . .',
			octave: 3
		},
		sustain: 'chord'
	},
	{
		value: 'rock-1',
		name: 'Rock 1',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: 'xs . . . . . . . . . x! . . x! . .'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: 'xs x! xs x! xs x! xs x! xs x! xs x! xs x! xs x! xs x! xs x! xs x! xs x! xs x! xs x! xs x! xs @1<!'
		},
		xsustain: 'chord'
	},
	{
		value: 'rock-2',
		name: 'Rock 2',
		tempo: 120,
		chord: { style: 'arpeggio', step: [1, 8], arp: 'xs . . xs . . x! .' },
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1s . . . 1+ . . . . . 1s . 1+ . . . 1s . . . 1+ . . . . . 1s . 1+ . 1s .'
		},
		xsustain: 'chord'
	},
	{
		value: 'rock-3',
		name: 'Rock 3',
		tempo: 120,
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '. . . . xs . . @2 . 13 . . x . 2 13 . . 1! . xs . . @2 . 13 . . x . 2 13'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1 . . . . . . . . . 1 . . . . .',
			octave: 3
		}
	},
	{
		value: 'rock-4',
		name: 'Rock 4',
		tempo: 120,
		chord: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '234 . 234 . 1 234 . @234 . 1 234 . 1 234 . 1'
		},
		bass: { style: 'bass-octave-1', step: [1, 8] },
		sustain: 'chord'
	},
	{
		value: 'swing-1',
		name: 'Swing 1',
		chord: { style: 'arpeggio', step: [1, 8], arp: '. . . xs# . . 0!# .' },
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '1s . . . . . . @1f& 1s . . . . . . @1f& 1s . . . . . . @1f& 1s . . . . . @1f& 1<%',
			octave: 3
		},
		shuffle: '2:1',
		tempo: 130,
		tags: ['retro']
	},
	{
		value: 'swing-2',
		name: 'Swing 2',
		chord: {
			style: 'arpeggio',
			step: [1, 8],
			arp: 'x! . . @xs . . . . . x! . . . x! . .'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '1s . 1fs . 1+s 1 1fs# . 1+s . 1fs . 1s @1// 1/s . 1s . 1fs . 1+s 1 1fs# . 1+s . 1fs . 1s @1// 1/ 1+'
		},
		shuffle: '2:1',
		tempo: 130,
		tags: ['retro']
	},
	{
		value: 'waltz-1',
		name: 'Waltz',
		timeSignature: '3/4',
		chord: { style: 'arpeggio', step: [1, 3], arp: '. x x' },
		bass: {
			style: 'arpeggio',
			step: [1, 3],
			arp: '1 . . 1f# . .',
			octave: 3
		},
		sustain: 'chord',
		tags: ['retro']
	},
	{
		value: 'jazz-waltz-1',
		name: 'Jazz Waltz',
		timeSignature: '3/4',
		chord: { style: 'arpeggio', step: [1, 6], arp: '. x! . . xs .' },
		bass: {
			style: 'arpeggio',
			step: [1, 6],
			arp: '1 . . @1 . @1f 1 . . @1 . @1f 1 . . @1 . @1f 1 . . @1 . .',
			octave: 3
		},
		shuffle: '2:1',
		tempo: 120,
		tags: ['retro']
	},
	{
		value: 'reggae-1',
		name: 'Reggae',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '. . x! . . . x! . . . x! 231+ . . x! . . . x! . . . x! . . . x! 2!3!1+! . 2!3!1+! x! .'
		},
		bass: { style: 'arpeggio', step: [1, 16], arp: '1 1 . . . 1+! . .' },
		shuffle: '2:1',
		tempo: 80,
		tags: ['latin']
	},
	{
		value: 'salsa-1',
		name: 'Salsa 1',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '14 2 3 14 . 23 @0 14 . 23 . @14 . 23 @0 14',
			numNotes: 3
		},
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1s . . @1f&s# . . @1s . . . . @1f&s# . . @1s . . . . @1f&s# . . @1s . . . . @1f&s# . . . .',
			octave: 3
		}
	},
	{
		value: 'salsa-2',
		name: 'Salsa 2',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '3# . 4 1# . 2 @0 3m# . 4 . @1# . 2 @0 3'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1s . . @1f&s# . . @1s . . . . @1f&s# . . @1s . . . . @1f&s# . . @1s . . . . @1f&s# . . . .',
			octave: 3
		}
	},
	{
		value: 'bossa-nova-1',
		name: 'Bossa Nova 1',
		chord: {
			style: 'arpeggio',
			step: [1, 8],
			arp: 'x! . xs . . x . @x! . xs . . x! . x! .'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '1s . . 1 1fs# . . @1s . . . 1 1fs# . . @1f- 1s . . 1 1fs# . . @1s . . . 1 1fs# . @1\\\\ 1\\',
			octave: 3
		},
		tempo: 120,
		tags: ['latin']
	},
	{
		value: 'bossa-nova-2',
		name: 'Bossa Nova 2',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '. . . . x . . . . . x! . . . . . . . . . xs . . . . . . . x! . . .'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1! . . . . . 1f! . 1fs# . . . . . @1s . . . 1!m . . . 1 . 1+! . 1<+! . 1f! . 1f<! .'
		},
		tempo: 120,
		tags: ['latin']
	},
	{
		value: 'samba-1',
		name: 'Samba',
		chord: {
			style: 'arpeggio',
			step: [1, 8],
			arp: 'x! . x @1! . x! . @x! . x! . @x! . x! . 1!'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '1s . . . 1f&s# . . . 1s . . . 1f&s# . . @1f&!',
			octave: 3
		},
		tempo: 120,
		tags: ['latin']
	},
	{
		value: 'merengue-1',
		name: 'Merengue',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '. x! . x! . . x! . . . x! . . . x! .'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1s . . . 1f&s# . . . 1s . . . 1f&s# . . .',
			octave: 3
		},
		tempo: 120,
		tags: ['latin']
	},
	{
		value: 'cumbia-1',
		name: 'Cumbia',
		chord: { style: 'arpeggio', step: [1, 8], arp: '. x!' },
		bass: { style: 'arpeggio', step: [1, 8], arp: '1 . 2! 3!', octave: 3 },
		tempo: 100,
		tags: ['latin']
	},
	{
		value: 'reggaeton-1',
		name: 'Reggaeton',
		chord: { style: 'arpeggio', step: [1, 16], arp: '. . . x! . . x .' },
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '1 . 1f&# . 1 . 1f&# 1?',
			octave: 3
		},
		tempo: 100,
		tags: ['latin']
	},
	{
		value: 'tango-1',
		name: 'Tango',
		chord: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '. . . 1 2*! . 1 . . . . 1 2*! . 2*! .'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '1s . . 1f# 1+# . 1f# .',
			octave: 3
		},
		tempo: 120,
		sustain: 'chord',
		tags: ['latin']
	},
	{
		value: 'flamenco-1',
		name: 'Flamenco 1',
		chord: {
			style: 'arpeggio',
			step: [1, 6],
			arp: '. xs .',
			noteDuration: 0.3
		},
		bass: {
			style: 'arpeggio',
			step: [1, 6],
			arp: '11f . 1+s',
			octave: 3,
			noteDuration: 0.3
		},
		tempo: 100,
		timeSignature: '6/8',
		tags: ['latin']
	},
	{
		value: 'flamenco-2',
		name: 'Flamenco 2',
		chord: {
			style: 'arpeggio',
			step: [1, 12],
			arp: '. . 13 2 1s3s . . . 1m3 . 2s .',
			noteDuration: 0.3
		},
		bass: {
			style: 'arpeggio',
			step: [1, 12],
			arp: '11f . . . . . 1s1fs . . . . .',
			octave: 3,
			noteDuration: 0.3
		},
		tempo: 100,
		timeSignature: '6/8',
		tags: ['latin']
	},
	{
		value: 'flamenco-3',
		name: 'Flamenco 3',
		chord: {
			style: 'arpeggio',
			step: [1, 32],
			arp: '. . . . 1s 2s 3s 4s 1,2,3,4, . . . 1!2!3!4! . . . . . . . 1s . . . 2s3s4s . . . . . . .',
			numNotes: 3
		},
		bass: { style: 'arpeggio', step: [1, 4], arp: '1s . 2s 3s', octave: 3 },
		tempo: 100,
		tags: ['latin']
	},
	{
		value: 'ragtime-1',
		name: 'Ragtime',
		chord: { style: 'offbeat' },
		bass: {
			style: 'arpeggio',
			arp: '1 . 1f- . 1 . 1f- . 1 . 1f- . 1 . 1f- . 1 . 1f- . 1 . 1f- . 1 . 1f- . 1 . 1f- @1f&?',
			octave: 3,
			step: [1, 8]
		},
		tags: ['retro']
	},
	{
		value: 'country-1',
		name: 'Country 1',
		chord: { style: 'backbeat' },
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '1s . . @2 3 . 2 3',
			octave: 3
		},
		shuffle: '2:1',
		sustain: '2-beats',
		tags: ['retro']
	},
	{
		value: 'country-2',
		name: 'Country 2',
		chord: { style: 'arpeggio', step: [1, 8], arp: '. . 123 1 . 1 23 1' },
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '1s . . . 1f . 1f> . 1s . . . 1f> . 1f .',
			octave: 3
		},
		shuffle: '2:1',
		sustain: 'chord',
		tags: ['retro']
	},
	{
		value: 'polyrhythm-1',
		name: 'Polyrhythm',
		chord: { style: 'arp-1-2', step: [1, 6], mirror: !0 },
		bass: { style: 'bass-5th-up', step: [1, 4], octave: 3 },
		sustain: 'chord',
		tempo: 80,
		timeSignature: '6/8'
	},
	{
		value: 'straddle-run-1',
		name: 'Straddle run',
		chord: { style: 'straddle-run-1', numNotes: 3 },
		bass: { style: 'once', double: !0 },
		sustain: 'chord'
	},
	{
		value: 'strumming-1',
		name: 'Strumming 1',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '2*# . . 1m 2*m 1m @2*# . . 1m 2*m 1m 2*# . . .'
		},
		bass: { style: 'once', octave: 3 },
		sustain: 'chord'
	},
	{
		value: 'strumming-2',
		name: 'Strumming 2',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '2*# . 2*m 1m 2*m . @2*# . 2*m 1m 2*m . 2*# . . .'
		},
		bass: { style: 'once', octave: 3 },
		sustain: 'chord'
	},
	{
		value: 'boogie-1',
		name: 'Boogie',
		chord: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '. x! . . x . . . x . . @x! . . . .'
		},
		bass: { style: 'bass-boogie-2', octave: 3 },
		shuffle: '2:1',
		tags: ['retro']
	},
	{
		value: 'funk-1',
		name: 'Funk 1',
		chord: { style: 'backbeat' },
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1s . . . . . @1<+! . 1+! . 1f<! 1f! . 1<+! 1+ .'
		},
		shuffle: '2:1',
		tags: ['retro']
	},
	{
		value: 'funk-2',
		name: 'Funk 2',
		chord: { style: 'backbeat' },
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1s . . . . . @1f<! 1f! 1<+! . . 1+! . . @1s . . . . . . . . . 1+ . . . 1<+ . . .'
		},
		shuffle: '2:1',
		tags: ['retro']
	},
	{
		value: 'funk-3',
		name: 'Funk 3',
		chord: { style: 'backbeat' },
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1s . . 1!m . . @1<+! . 1+! . . . . . . . 1! . . . . . @1<+! . 1+! . . 1!m . . 1<+! 1+'
		},
		shuffle: '2:1',
		tags: ['retro']
	},
	{
		value: 'funk 4',
		name: 'Funk 4',
		chord: { style: 'backbeat' },
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1s . . 1+! . 1ms! @1<+m! . 1+! . . . . . . . 1s . . 1+! . . . . . 1f<<+! 1f<+! 1f<<+! 1+! 1<+! 1f! 1f<!'
		},
		shuffle: '2:1',
		tags: ['retro']
	},
	{
		value: 'funk 5',
		name: 'Funk 5',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			arp: 'xs . . @x! . . . . . . . . x! . . . xs . . @x! . . . . . . . . . . . .'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 16],
			arp: '1 . . . . . . @1<+ 1+! 1<+ 1f! 1f<! . . @1< . 1 . . . . . . @1+! 1s . 1+! . 1<s . 1<+! .'
		},
		shuffle: '2:1',
		tags: ['retro']
	},
	{
		value: 'melodic-1',
		name: 'Melodic 1',
		chord: { style: 'arpeggio', step: [1, 2], arp: '. xs' },
		bass: {
			style: 'arpeggio',
			octave: 3,
			step: [1, 8],
			arp: '1 1f 2<<+ 2<+ 2+ 2<+ 2<<+ 1f 1 1f 2<<+ 2<+ 2+ . . 1f'
		},
		sustain: 'chord'
	},
	{
		value: 'melodic-2',
		name: 'Melodic 2',
		chord: {
			style: 'arpeggio',
			step: [1, 8],
			octaveOffset: 0,
			arp: '. 1 2 4 3+ 2 4 3+'
		},
		bass: { style: 'pulse', step: [1, 1], octave: 3 },
		sustain: 'chord'
	},
	{
		value: 'melodic-3',
		name: ' Melodic 3',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			octaveOffset: 0,
			arp: '. 1 2 3 4 2 3 4 1 2 3 1 2 4 2 3'
		},
		bass: { style: 'pulse', step: [1, 1], octave: 3 },
		sustain: 'chord',
		tempo: 80
	},
	{
		value: 'melodic-4',
		name: ' Melodic 4',
		chord: { style: 'arpeggio', step: [1, 8], arp: '. . . x . . x .' },
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			octave: 3,
			arp: '1 1f 1+ . . 1f# . .'
		},
		sustain: 'chord'
	},
	{
		value: 'melodic-5',
		name: ' Melodic 5',
		chord: {
			style: 'arpeggio',
			step: [1, 8],
			octaveOffset: 0,
			arp: '. 1 2 3 4 3 2 1 . 1 2 3 4 2 3 1'
		},
		bass: { style: 'pulse', step: [1, 1], octave: 3 },
		sustain: 'chord'
	},
	{
		value: 'melodic-6',
		name: ' Melodic 6',
		chord: {
			style: 'arpeggio',
			step: [1, 8],
			xoctaveOffset: 0,
			arp: '23 1 2 3 1 2 3 1 23 1 2 3> 1 2 3 1'
		},
		bass: { style: 'once', octave: 3 },
		sustain: 'chord'
	},
	{
		value: 'melodic-7',
		name: ' Melodic 7',
		chord: {
			style: 'arpeggio',
			step: [1, 16],
			octave: 4,
			numNotes: 3,
			arp: '345 . 1 . 2 . @234 . . . . . 4<< 4< 4 . . . 234 . . . @23 . . . 21 . . . . .'
		},
		bass: {
			style: 'arpeggio',
			step: [1, 8],
			octave: 3,
			arp: '1 . . 0# . . . . 1 . . 0# . . . 3'
		},
		sustain: 'chord'
	},
	{
		value: 'melodic-8',
		name: ' Melodic 8',
		chord: {
			style: 'arpeggio',
			step: [1, 8],
			arp: '2 1 @2> 1 2>> 1 2>>> @2 1 2> 1 @2>> 1 2> 1 @2<'
		},
		bass: {
			style: 'arpeggio',
			octave: 3,
			step: [1, 8],
			arp: '1 . . . . . . . 0# . . . . 1+ . 1+'
		},
		sustain: 'chord'
	},
	{
		value: 'modulation-1',
		name: 'Mod 1',
		chord: { style: 'modulation-1' },
		bass: { style: 'modulation-1' },
		tempo: 100,
		tags: ['mod']
	},
	{
		value: 'modulation-2',
		name: 'Mod 2',
		chord: { style: 'modulation-2' },
		bass: { style: 'modulation-2' },
		tempo: 100,
		tags: ['mod']
	},
	{
		value: 'modulation-3',
		name: 'Mod 3',
		chord: { style: 'modulation-3' },
		bass: { style: 'modulation-3' },
		tempo: 100,
		tags: ['mod']
	},
	{
		value: 'modulation-4',
		name: 'Mod 4',
		chord: { style: 'modulation-4' },
		bass: { style: 'modulation-4' },
		tempo: 100,
		tags: ['mod']
	}
]
