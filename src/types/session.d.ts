type ArpEventT = {
  midi: number;
  keep?: boolean;
  octave?: number;
  duration?: number;
  sustain?: number;
  scaleSteps?: number;
};

type RootT = {
  name: string
  instrument: string
  scale: string
  scaleKey: string
  chordLayout: ChordLayoutT
  sequence: SequenceT[]
  application: string
  style: StyleT
  effectType: string
  effectAmount: number
  loopSequence: boolean
  manualChordPositions: boolean
  melody: MelodyT
  customChords: CustomChordT[]
  parallellScaleChords: boolean
  description: string
  public: boolean
  free: boolean
  bassInstrument: string
  melodyInstrument: string
}

type ChordLayoutT = {
  "diatonic-triad": boolean
  "diatonic-sus4": boolean
  "diatonic-7": boolean
}

type SequenceT = {
  length: number
  chordOctave: number
  bassOctave: number
  chordInv: number
  rootPos: number
  chord: string
}

type StyleT = {
  bass: BassT
  chord: ChordT
  shuffle: string
  sustain: string
  tempo: number
  timeSignature: string
}

type BassT = {
  style: string
  velocity: number
  double: boolean
  octave: number
  arp: string
  loop: boolean
  arpEvents: ArpEventT[]
  arpLength: number
  octaveOffset: number
  cropLength: number
  noteDuration: number
  step: number[]
  mirror: boolean
}

type ChordT = {
  style: string
  velocity: number
  spread: number
  numNotes: number
  double: boolean
  octave: number
  arp: string
  loop: boolean
  arpEvents: ArpEventT[]
  arpLength: number
  octaveOffset: number
  inversions: boolean
  open: boolean
  keep: boolean
  cropLength: number
  noteDuration: number
  mirror: boolean
  step: number[]
}

type EffectEchoT = {
  active: boolean
  delay: number
  feedback: number
  amount: number
}

type MelodyT = {
  events: any[]
}

type CustomChordT = {
  chord: string
}
