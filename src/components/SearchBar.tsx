// import * as React from 'react'
// import { Cross1Icon, PlusCircledIcon, MagnifyingGlassIcon, CheckIcon } from '@radix-ui/react-icons'
// import { Flex, Box, Text, TextField, Button, RadioCards, SegmentedControl, ScrollArea, Badge } from '@radix-ui/themes'
// import { DropdownMenu, CheckboxGroup, RadioGroup, Tooltip } from '@radix-ui/themes'
// import { Select, Dialog, IconButton, Card, Inset, Strong } from '@radix-ui/themes'
// import { Spacer } from './Spacer'

// type PropsT = {}

// export const SearchBar = (props: PropsT) => {
// 	return (
// 		<Flex data-testid="SearchBar" direction="column">
// 			<TopRow />
// 			<Spacer size="12px" />
// 		</Flex>
// 	)
// }

// const HumanCard = (props) => {
// 	const SelectionIcon = props.isSelected ? CheckIcon : PlusCircledIcon
// 	const style = props.isSelected ? { border: '2px solid #ffc53d' } : {}
// 	return (
// 		<Box width="240px">
// 			<Card size="2" style={style}>
// 				<Inset clip="padding-box" side="top" pb="current">
// 					<img
// 						src={props.imageUrls[0]}
// 						alt="Actress"
// 						style={{
// 							display: 'block',
// 							objectFit: 'cover',
// 							width: '100%',
// 							height: 140,
// 							backgroundColor: 'var(--gray-5)',
// 							boxSizing: 'border-box'
// 						}}
// 					/>
// 				</Inset>
// 				<Flex gap="3" align="center">
// 					<SelectionIcon />
// 					<Text as="p" size="4">
// 						{props.fullName}
// 					</Text>
// 				</Flex>
// 				<Text as="p" size="3" mt="1">
// 					{props.age} years old
// 				</Text>
// 				<Text as="p" size="2" mt="1">
// 					Action, Drama, Comedy
// 				</Text>
// 			</Card>
// 		</Box>
// 	)
// }

// const CastFilterMenu = () => {
// 	return (
// 		<Dialog.Root>
// 			<Dialog.Trigger>
// 				<Button size="3" color="gray" variant="surface" highContrast>
// 					Cast
// 					<DropdownMenu.TriggerIcon />
// 				</Button>
// 			</Dialog.Trigger>

// 			<Dialog.Content maxWidth="850px" className="CastFilterMenu">
// 				<Dialog.Title>
// 					<Flex align="center" justify="between" gap="2">
// 						<Flex gap="3" align="center">
// 							<Text size="5">Cast</Text>
// 							<Text size="2" weight="light">
// 								Filter
// 							</Text>
// 						</Flex>
// 						<TextField.Root placeholder="Search..." size="2" style={{}}>
// 							<TextField.Slot>
// 								<MagnifyingGlassIcon height="16" width="16" />
// 							</TextField.Slot>
// 						</TextField.Root>
// 					</Flex>
// 				</Dialog.Title>

// 				<Spacer size="12px" />

// 				<Dialog.Description size="2" mb="4">
// 					<Flex align="center" gap="3" wrap="wrap">
// 						<Badge size="3">
// 							Angelina Jolie
// 							<Cross1Icon />
// 						</Badge>
// 						<Badge size="3">
// 							Scarlett Johansson
// 							<Cross1Icon />
// 						</Badge>
// 						<Badge size="3">
// 							Meryl Streep
// 							<Cross1Icon />
// 						</Badge>
// 						<Badge size="3">
// 							Meryl Streep
// 							<Cross1Icon />
// 						</Badge>
// 					</Flex>
// 				</Dialog.Description>

// 				<Spacer size="12px" />

// 				<ScrollArea type="always" scrollbars="vertical" style={{ height: 400 }}>
// 					<Flex gap="3" wrap="wrap" className="CastList" pt="12px">
// 						<HumanCard
// 							fullName="Scarlett Johansson"
// 							age={36}
// 							imageUrls={[
// 								'https://images.nightcafe.studio/jobs/GwAGJpeF0vLQKrPvU6KV/GwAGJpeF0vLQKrPvU6KV--1--v8r2d.jpg?tr=w-1600,c-at_max'
// 							]}
// 						/>
// 						<HumanCard
// 							fullName="Scarlett Johansson"
// 							age={36}
// 							imageUrls={['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGRw9M4IqZAEZAWiMnAjirRtyGnrRZZrwe8Q&s']}
// 						/>
// 						<HumanCard
// 							fullName="Scarlett Johansson"
// 							age={36}
// 							isSelected
// 							imageUrls={['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8EzM2q8UmfztVnlc7I5Riuxdoc4OEdg0R6w&s']}
// 						/>
// 						<HumanCard
// 							fullName="Scarlett Johansson"
// 							age={36}
// 							isSelected
// 							imageUrls={['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoMoKvZGypdRsK5OZoEXsevNbMWJ_cxIOtLQ&s']}
// 						/>
// 						<HumanCard
// 							fullName="Scarlett Johansson"
// 							age={36}
// 							imageUrls={['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUUOpfI5ljE4kOsmM220mYFMbrM4W1xMyIEA&s']}
// 						/>
// 						<HumanCard
// 							fullName="Scarlett Johansson"
// 							age={36}
// 							isSelected
// 							imageUrls={['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFBPYaamnKUVCnVXT8AA82zV6nDKe_0pWcvA&s']}
// 						/>
// 						<HumanCard
// 							fullName="Scarlett Johansson"
// 							age={36}
// 							imageUrls={['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXd05a-lMSKk-qd8A1-xhfNAHLykehjS99bg&s']}
// 						/>
// 						<HumanCard
// 							fullName="Scarlett Johansson"
// 							age={36}
// 							isSelected
// 							imageUrls={['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC7eSiqjFPpNRRi6HitGJnhEXUco0ykKaq-A&s']}
// 						/>
// 					</Flex>
// 				</ScrollArea>

// 				<Flex gap="3" mt="4" justify="end">
// 					<Dialog.Close>
// 						<Button variant="soft" color="gray">
// 							Cancel
// 						</Button>
// 					</Dialog.Close>
// 					<Dialog.Close>
// 						<Button>Apply</Button>
// 					</Dialog.Close>
// 				</Flex>
// 			</Dialog.Content>
// 		</Dialog.Root>
// 	)
// }

// const TopRow = () => {
// 	return (
// 		<Flex align="center" gap="3" direction="column">
// 			<Flex align="center" gap="3">
// 				<TextField.Root
// 					placeholder="Search..."
// 					value={store.filters.search}
// 					onChange={(e) => store.setSearch(e.target.value)}
// 					size="3"
// 					style={{ width: 800, height: 64, borderRadius: 50, minWidth: 200, maxWidth: 800, fontSize: 24 }}
// 				>
// 					<TextField.Slot>
// 						<MagnifyingGlassIcon height="32" width="32" />
// 					</TextField.Slot>
// 					<TextField.Slot>
// 						<Button size="4" variant="surface" style={{ position: 'relative', borderRadius: 50 }}>
// 							Search
// 						</Button>
// 						{/* <IconButton size="3" color="violet" variant="surface" style={{ borderRadius: 50 }}>
// 						<MagnifyingGlassIcon width="24" height="24" />
// 					</IconButton> */}
// 					</TextField.Slot>
// 				</TextField.Root>
// 			</Flex>

// 			<Spacer size="0px" />

// 			<Flex align="center" gap="3">
// 				<CastFilterMenu />

// 				<GenreDropdown />
// 				<LanguageDropdown />
// 				<TypeDropdown />
// 				<RatingDropdown />
// 				<YearsDropdown />
// 				<CountryDropdown />
// 				<SortByDropdown />
// 			</Flex>
// 		</Flex>
// 	)
// }

// const SortByDropdown = () => {
// 	return (
// 		<Select.Root size="3" value={store.filters.sortBy} onValueChange={store.setSortBy}>
// 			<Select.Trigger>
// 				<Text>Sort By</Text>
// 			</Select.Trigger>
// 			<Select.Content>
// 				<Select.Item value="releaseDate">Release Date</Select.Item>
// 				<Select.Item value="rating">Rating</Select.Item>
// 				<Select.Item value="title">Title</Select.Item>
// 			</Select.Content>
// 		</Select.Root>
// 	)
// }

// const LanguageDropdown = () => {
// 	const store = useSearbarStore()
// 	return (
// 		<DropdownMenu.Root>
// 			<DropdownMenu.Trigger>
// 				<Button size="3" color="gray" variant="surface" highContrast>
// 					Language <DropdownMenu.TriggerIcon />
// 				</Button>
// 			</DropdownMenu.Trigger>
// 			<DropdownMenu.Content>
// 				<CheckboxGroup.Root id="languages" value={store.filters.languages} onValueChange={store.setLanguages}>
// 					<Flex px="3" py="2" direction="column" gap="3">
// 						<CheckboxGroup.Item value="english">English</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="french">French</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="spanish">Spanish</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="german">German</CheckboxGroup.Item>
// 					</Flex>
// 				</CheckboxGroup.Root>
// 			</DropdownMenu.Content>
// 		</DropdownMenu.Root>
// 	)
// }

// const CountryDropdown = () => {
// 	return (
// 		<DropdownMenu.Root>
// 			<DropdownMenu.Trigger>
// 				<Button size="3" color="gray" variant="surface" highContrast>
// 					Country <DropdownMenu.TriggerIcon />
// 				</Button>
// 			</DropdownMenu.Trigger>
// 			<DropdownMenu.Content>
// 				<CheckboxGroup.Root id="countries" value={store.filters.countries} onValueChange={store.setCountries}>
// 					<Flex px="3" py="2" direction="column" gap="3">
// 						<CheckboxGroup.Item value="usa">USA</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="uk">UK</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="canada">Canada</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="france">France</CheckboxGroup.Item>
// 					</Flex>
// 				</CheckboxGroup.Root>
// 			</DropdownMenu.Content>
// 		</DropdownMenu.Root>
// 	)
// }

// const GenreDropdown = () => {
// 	const store = useSearbarStore()

// 	return (
// 		<DropdownMenu.Root>
// 			<DropdownMenu.Trigger>
// 				<Button size="3" color="gray" variant="surface" highContrast>
// 					Genre <DropdownMenu.TriggerIcon />
// 				</Button>
// 			</DropdownMenu.Trigger>
// 			<DropdownMenu.Content>
// 				<CheckboxGroup.Root id="genres" value={store.filters.genres} onValueChange={store.setGenres}>
// 					<Flex px="3" py="2" direction="column" gap="3">
// 						<CheckboxGroup.Item value="action">Action</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="adventure">Adventure</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="animation">Animation</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="comedy">Comedy</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="crime">Crime</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="documentary">Documentary</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="drama">Drama</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="family">Family</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="fantasy">Fantasy</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="history">History</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="horror">Horror</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="kids">Kids</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="music">Music</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="mystery">Mystery</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="news">News</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="reality">Reality</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="romance">Romance</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="science fiction">Science Fiction</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="soap">Soap</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="talk">Talk</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="thriller">Thriller</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="tv movie">TV Movie</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="war">War</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="war & politics">War & Politics</CheckboxGroup.Item>
// 						<CheckboxGroup.Item value="western">Western</CheckboxGroup.Item>
// 					</Flex>
// 				</CheckboxGroup.Root>
// 				<Button mt="3" variant="ghost" onClick={store.resetFilters}>
// 					Reset
// 				</Button>
// 			</DropdownMenu.Content>
// 		</DropdownMenu.Root>
// 	)
// }

// const TypeDropdown = () => {
// 	const store = useSearbarStore()
// 	return (
// 		<DropdownMenu.Root>
// 			<DropdownMenu.Trigger>
// 				<Button size="3" color="gray" variant="surface" highContrast>
// 					Type <DropdownMenu.TriggerIcon />
// 				</Button>
// 			</DropdownMenu.Trigger>
// 			<DropdownMenu.Content>
// 				<RadioGroup.Root id="type" value={store.filters.type} onValueChange={store.setType}>
// 					<Flex px="3" py="2" direction="column" gap="3">
// 						<RadioGroup.Item value="any">Any</RadioGroup.Item>
// 						<RadioGroup.Item value="movie">Movie</RadioGroup.Item>
// 						<RadioGroup.Item value="series">Series</RadioGroup.Item>
// 					</Flex>
// 				</RadioGroup.Root>
// 				<Button mt="3" variant="ghost" onClick={store.resetFilters}>
// 					Reset
// 				</Button>
// 			</DropdownMenu.Content>
// 		</DropdownMenu.Root>
// 	)
// }

// const RatingDropdown = () => {
// 	const store = useSearbarStore()

// 	return (
// 		<DropdownMenu.Root>
// 			<DropdownMenu.Trigger>
// 				<Button size="3" color="gray" variant="surface" highContrast>
// 					Rating <DropdownMenu.TriggerIcon />
// 				</Button>
// 			</DropdownMenu.Trigger>
// 			<DropdownMenu.Content>
// 				<RadioCards.Root id="rating" value={store.filters.rating} onValueChange={store.setRating}>
// 					<Flex px="3" py="2" direction="column" gap="3">
// 						<RadioCards.Item value="TV-MA">TV-MA</RadioCards.Item>
// 						<RadioCards.Item value="TV-14">TV-14</RadioCards.Item>
// 						<RadioCards.Item value="TV-PG">TV-PG</RadioCards.Item>
// 						<RadioCards.Item value="TV-G">TV-G</RadioCards.Item>
// 					</Flex>
// 				</RadioCards.Root>
// 			</DropdownMenu.Content>
// 		</DropdownMenu.Root>
// 	)
// }

// const YearsDropdown = () => {
// 	const store = useSearbarStore()

// 	return (
// 		<DropdownMenu.Root>
// 			<DropdownMenu.Trigger>
// 				<Button size="3" color="gray" variant="surface" highContrast>
// 					Years <DropdownMenu.TriggerIcon />
// 				</Button>
// 			</DropdownMenu.Trigger>
// 			<DropdownMenu.Content>
// 				<RadioCards.Root id="years" value={store.filters.years} onValueChange={store.setYears}>
// 					<Flex px="3" py="2" direction="column" gap="3">
// 						<RadioCards.Item value="2020">2020</RadioCards.Item>
// 						<RadioCards.Item value="2019">2019</RadioCards.Item>
// 						<RadioCards.Item value="2018">2018</RadioCards.Item>
// 						<RadioCards.Item value="2017">2017</RadioCards.Item>
// 					</Flex>
// 				</RadioCards.Root>
// 			</DropdownMenu.Content>
// 		</DropdownMenu.Root>
// 	)
// }
