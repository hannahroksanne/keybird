import './Vboard.css'
import './VboardKeyMenu.css'
import * as React from 'react'
import { ContextMenu } from '@radix-ui/themes'

type VboardKeyMenuPropsT = {
	reportOpenMenu: (isOpen: boolean) => void
	children: React.ReactNode
}

export const VboardKeyMenu = (props: VboardKeyMenuPropsT) => {
	return (
		<ContextMenu.Root onOpenChange={props.reportOpenMenu}>
			<ContextMenu.Trigger style={{ width: '100%', height: '100%' }}>{props.children}</ContextMenu.Trigger>
			<ContextMenu.Content>
				<ContextMenu.Item shortcut="E">Assign Note</ContextMenu.Item>
				<ContextMenu.Item shortcut="N">Assign Chord</ContextMenu.Item>
				<ContextMenu.Sub>
					<ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
					<ContextMenu.SubContent>
						<ContextMenu.Item>Increase Octave</ContextMenu.Item>
						<ContextMenu.Item>Decrease Octave</ContextMenu.Item>
					</ContextMenu.SubContent>
				</ContextMenu.Sub>
				<ContextMenu.Separator />
				<ContextMenu.Item shortcut="C" disabled>
					Copy
				</ContextMenu.Item>
				<ContextMenu.Item shortcut="P" disabled>
					Paste
				</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item shortcut="D" disabled>
					Disable
				</ContextMenu.Item>
				<ContextMenu.Item shortcut="x" color="red" disabled>
					Delete
				</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>
	)
}
