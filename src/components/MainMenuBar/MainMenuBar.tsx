import './MainMenuBar.css'
import React from 'react'
import * as Menubar from '@radix-ui/react-menubar'
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons'
import { Flex } from '../Flex'
import { Button, Text, TextField } from '@radix-ui/themes'
import { SceneRouteController } from '../Controls/SceneRouteController'
import { KeyboardTopControls } from '../Controls/KeyboardTopControls'

const RADIO_ITEMS = ['Andy', 'Benoît', 'Luis']
const CHECK_ITEMS = ['Always Show Bookmarks Bar', 'Always Show Full URLs']

export const MainMenuBar = () => {
	return (
		<Flex.Column p="4" gap="3" data-testid="MainMenuBar" className="MainMenuBar">
			<Flex.Row gap="4" justify="between" align="center" className="MainMenuBarRow" wrap="wrap">
				<Flex.Row justify="start" align="center" gap="6">
					<img src="/images/keybirdLogo.svg" className="MainMenuBarLogo" />
					<SceneRouteController />
				</Flex.Row>
			</Flex.Row>
			<KeyboardTopControls />
		</Flex.Column>
	)
}

const FileMenu = () => {
	return (
		<Menubar.Menu>
			<Menubar.Trigger className="MenubarTrigger">
				<Text>File</Text>
			</Menubar.Trigger>
			<Menubar.Portal>
				<Menubar.Content className="MenubarContent" align="start" sideOffset={5} alignOffset={-3}>
					<Menubar.Item className="MenubarItem">
						New Tab <div className="RightSlot">⌘ T</div>
					</Menubar.Item>
					<Menubar.Item className="MenubarItem">
						New Window <div className="RightSlot">⌘ N</div>
					</Menubar.Item>
					<Menubar.Item className="MenubarItem" disabled>
						New Incognito Window
					</Menubar.Item>
					<Menubar.Separator className="MenubarSeparator" />
					<Menubar.Sub>
						<Menubar.SubTrigger className="MenubarSubTrigger">
							Share
							<div className="RightSlot">
								<ChevronRightIcon />
							</div>
						</Menubar.SubTrigger>
						<Menubar.Portal>
							<Menubar.SubContent className="MenubarSubContent" alignOffset={-5}>
								<Menubar.Item className="MenubarItem">Email Link</Menubar.Item>
								<Menubar.Item className="MenubarItem">Messages</Menubar.Item>
								<Menubar.Item className="MenubarItem">Notes</Menubar.Item>
							</Menubar.SubContent>
						</Menubar.Portal>
					</Menubar.Sub>
					<Menubar.Separator className="MenubarSeparator" />
					<Menubar.Item className="MenubarItem">
						Print… <div className="RightSlot">⌘ P</div>
					</Menubar.Item>
				</Menubar.Content>
			</Menubar.Portal>
		</Menubar.Menu>
	)
}

const EditMenu = () => {
	return (
		<Menubar.Menu>
			<Menubar.Trigger className="MenubarTrigger">
				<Text>Edit</Text>
			</Menubar.Trigger>
			<Menubar.Portal>
				<Menubar.Content className="MenubarContent" align="start" sideOffset={5} alignOffset={-3}>
					<Menubar.Item className="MenubarItem">
						Undo <div className="RightSlot">⌘ Z</div>
					</Menubar.Item>
					<Menubar.Item className="MenubarItem">
						Redo <div className="RightSlot">⇧ ⌘ Z</div>
					</Menubar.Item>
					<Menubar.Separator className="MenubarSeparator" />
					<Menubar.Sub>
						<Menubar.SubTrigger className="MenubarSubTrigger">
							Find
							<div className="RightSlot">
								<ChevronRightIcon />
							</div>
						</Menubar.SubTrigger>

						<Menubar.Portal>
							<Menubar.SubContent className="MenubarSubContent" alignOffset={-5}>
								<Menubar.Item className="MenubarItem">Search the web…</Menubar.Item>
								<Menubar.Separator className="MenubarSeparator" />
								<Menubar.Item className="MenubarItem">Find…</Menubar.Item>
								<Menubar.Item className="MenubarItem">Find Next</Menubar.Item>
								<Menubar.Item className="MenubarItem">Find Previous</Menubar.Item>
							</Menubar.SubContent>
						</Menubar.Portal>
					</Menubar.Sub>
					<Menubar.Separator className="MenubarSeparator" />
					<Menubar.Item className="MenubarItem">Cut</Menubar.Item>
					<Menubar.Item className="MenubarItem">Copy</Menubar.Item>
					<Menubar.Item className="MenubarItem">Paste</Menubar.Item>
				</Menubar.Content>
			</Menubar.Portal>
		</Menubar.Menu>
	)
}

const ViewMenu = () => {
	const [checkedSelection, setCheckedSelection] = React.useState([CHECK_ITEMS[1]])

	return (
		<Menubar.Menu>
			<Menubar.Trigger className="MenubarTrigger">
				<Text>View</Text>
			</Menubar.Trigger>
			<Menubar.Portal>
				<Menubar.Content className="MenubarContent" align="start" sideOffset={5} alignOffset={-14}>
					{CHECK_ITEMS.map((item) => (
						<Menubar.CheckboxItem
							className="MenubarCheckboxItem inset"
							key={item}
							checked={checkedSelection.includes(item)}
							onCheckedChange={() =>
								setCheckedSelection((current) =>
									current.includes(item) ? current.filter((el) => el !== item) : current.concat(item)
								)
							}
						>
							<Menubar.ItemIndicator className="MenubarItemIndicator">
								<CheckIcon />
							</Menubar.ItemIndicator>
							{item}
						</Menubar.CheckboxItem>
					))}
					<Menubar.Separator className="MenubarSeparator" />
					<Menubar.Item className="MenubarItem inset">
						Reload <div className="RightSlot">⌘ R</div>
					</Menubar.Item>
					<Menubar.Item className="MenubarItem inset" disabled>
						Force Reload <div className="RightSlot">⇧ ⌘ R</div>
					</Menubar.Item>
					<Menubar.Separator className="MenubarSeparator" />
					<Menubar.Item className="MenubarItem inset">Toggle Fullscreen</Menubar.Item>
					<Menubar.Separator className="MenubarSeparator" />
					<Menubar.Item className="MenubarItem inset">Hide Sidebar</Menubar.Item>
				</Menubar.Content>
			</Menubar.Portal>
		</Menubar.Menu>
	)
}

const ProfilesMenu = () => {
	const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2])

	return (
		<Menubar.Menu>
			<Menubar.Trigger className="MenubarTrigger">
				<Text>Profiles</Text>
			</Menubar.Trigger>
			<Menubar.Portal>
				<Menubar.Content className="MenubarContent" align="start" sideOffset={5} alignOffset={-14}>
					<Menubar.RadioGroup value={radioSelection} onValueChange={setRadioSelection}>
						{RADIO_ITEMS.map((item) => (
							<Menubar.RadioItem className="MenubarRadioItem inset" key={item} value={item}>
								<Menubar.ItemIndicator className="MenubarItemIndicator">
									<DotFilledIcon />
								</Menubar.ItemIndicator>
								{item}
							</Menubar.RadioItem>
						))}
						<Menubar.Separator className="MenubarSeparator" />
						<Menubar.Item className="MenubarItem inset">Edit…</Menubar.Item>
						<Menubar.Separator className="MenubarSeparator" />
						<Menubar.Item className="MenubarItem inset">Add Profile…</Menubar.Item>
					</Menubar.RadioGroup>
				</Menubar.Content>
			</Menubar.Portal>
		</Menubar.Menu>
	)
}
