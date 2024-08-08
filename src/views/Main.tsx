import 'react-simple-keyboard/build/css/index.css'
import '../styles/keyboard.css'
import './Main.css'
import { Box, Em, Select, Spinner } from '@radix-ui/themes'
import { Vboard } from '../components/Vboard/Vboard'
import { Piano } from '../components/Piano'
import { Flex } from '../components/Flex'
import { Spacer } from '../components/Spacer'
import { MidiToggleSwitch } from '../components/MidiToggleSwitch'
import { MidiWarningMessage } from '../components/MidiWarningMessage'
import { MidiOutputSelector } from '../components/MidiOutputSelector'
import { $midi } from '../stores/midi/$midi'
import { useCoreStoreMonitor } from './setup'
import { $core } from '../stores/core/$core'
import { MainMenuBar } from '../components/MainMenuBar/MainMenuBar'
import { ChordBoard } from '../components/ChordBoard/ChordBoard'
import { Text } from '@radix-ui/themes'
import React from 'react'
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, useViewportScroll } from 'framer-motion'

const list = { hidden: { opacity: 0 } }
const item = { hidden: { x: -10, opacity: 0 } }

export const Main = () => {
	useCoreStoreMonitor()

	const { scrollY, scrollYProgress } = useScroll()

	useMotionValueEvent(scrollY, 'change', (latest) => {
		console.log('Page scroll: ', latest)
	})

	return (
		<Flex.Column data-testid="MainView" style={{ width: '100%', height: '100%' }}>
			<MainMenuBar />
			<Spacer size="24px" />
			<Flex.Row justify="between" align="center" px="4" style={{ height: 36, minHeight: 36, maxHeight: 36 }}>
				<Flex.Row gap="6" pl="4" align="center">
					<KeyNameSelect />
					<ScaleNameSelect />
				</Flex.Row>
				<MidiControls />
			</Flex.Row>
			<Flex.Column p="4" py="2" pb="5" style={{ width: '100%', height: '100%' }}>
				<Vboard />
				<Piano />
			</Flex.Column>
			<Flex.Row justify="center" align="center" style={{ height: 100, width: '100vw' }}>
				<Text>yolo</Text>
				<motion.div style={{ width: 150, height: 150, borderRadius: 50, background: 'azure', scaleX: scrollYProgress }} />
			</Flex.Row>
			<Flex.Column style={{ width: '100%', height: '100%' }}>
				<ChordBoard />
			</Flex.Column>
			<Flex.Column style={{ width: '100%', height: '100%' }}>
				<GradientViewer />
			</Flex.Column>
		</Flex.Column>
	)
}

const MidiControls = () => {
	const isMidiReady = $midi.useIsMidiReady()

	if (!isMidiReady) {
		return <Spinner title="Preparing midi." />
	}

	return (
		<Flex.Row gap="4" align="center">
			<MidiWarningMessage />
			<MidiOutputSelector />
			<MidiToggleSwitch />
		</Flex.Row>
	)
}

const KeyNameSelect = () => {
	const rootNote = $core.use((state) => state.scaleRootNote)

	const reportKeyNameChange = (newRootNote: string) => {
		$core.setScaleRootNote(newRootNote as any)
	}

	return (
		<Select.Root size="3" value={rootNote} onValueChange={reportKeyNameChange}>
			<Select.Trigger variant="ghost" />
			<Select.Content>
				<Select.Group>
					<Select.Item value="C">C</Select.Item>
					<Select.Item value="C#">C#</Select.Item>
					<Select.Item value="D">D</Select.Item>
					<Select.Item value="D#">D#</Select.Item>
					<Select.Item value="E">E</Select.Item>
					<Select.Item value="F">F</Select.Item>
					<Select.Item value="F#">F#</Select.Item>
					<Select.Item value="G">G</Select.Item>
					<Select.Item value="G#">G#</Select.Item>
					<Select.Item value="A">A</Select.Item>
					<Select.Item value="A#">A#</Select.Item>
					<Select.Item value="B">B</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

const ScaleNameSelect = () => {
	const scaleType = $core.use((state) => state.scaleType)

	const changeScaleType = (newScaleType: string) => {
		$core.setScaleType(newScaleType as any)
	}

	return (
		<Select.Root size="3" value={scaleType} onValueChange={changeScaleType}>
			<Select.Trigger variant="ghost" />
			<Select.Content>
				<Select.Group>
					<Select.Item value="major">major</Select.Item>
					<Select.Item value="minor">minor</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

const gradientCssVariables = [
	'--gorgeousBlueGradient0',
	'--gorgeousBlueToRedGradient0',
	'--gorgeousGradient0',
	'--gorgeousGradient1',
	'--gorgeousGradient2',
	'--gorgeousGradient3',
	'--gorgeousGradient4',
	'--gorgeousGradient5',
	'--gorgeousGradient6',
	'--gorgeousGradient7',
	'--gorgeousGradient8',
	'--gorgeousGradient9',
	'--gorgeousGradient10',
	'--gorgeousGradient11',
	'--gorgeousGradient12',
	'--gradient-gray',
	'--gradient-mauve',
	'--gradient-slate',
	'--gradient-sage',
	'--gradient-olive',
	'--gradient-sand',
	'--gradient-tomato',
	'--gradient-red',
	'--gradient-ruby',
	'--gradient-crimson',
	'--gradient-pink',
	'--gradient-plum',
	'--gradient-purple',
	'--gradient-violet',
	'--gradient-iris',
	'--gradient-indigo',
	'--gradient-blue',
	'--gradient-cyan',
	'--gradient-teal',
	'--gradient-jade',
	'--complexGradient0',
	'--complexGradient1',
	'--complexGradient2',
	'--complexGradient3',
	'--complexGradient4',
	'--complexGradient5',
	'--complexGradient6',
	'--complexGradient7',
	'--complexGradient8',
	'--complexGradient9',
	'--complexGradient10',
	'--complexGradient11',
	'--complexGradient12',
	'--complexGradient13',
	'--complexGradient14',
	'--complexGradient15',
	'--complexGradient16',
	'--complexGradient17',
	'--complexGradient18',
	'--complexGradient19',
	'--complexGradient20'
]

const GradientViewer = () => {
	return (
		<Flex.Row wrap="wrap" gap="6">
			{gradientCssVariables.map((variable, index) => {
				return (
					<div
						style={{
							width: 500,
							height: 500,
							background: `var(${variable})`,
							boxShadow: 'var(--favoriteShadow0)'
						}}
					>
						<Text style={{ textShadow: '1px 1px 1px black', color: 'white' }}>{variable}</Text>
						<Em style={{ textShadow: '1px 1px 1px black', color: 'white' }}>{index}</Em>
					</div>
				)
			})}
		</Flex.Row>
	)
}

// red crimson violet iris plum violet tomato sage sand olive
