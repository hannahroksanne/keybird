import './LogList.css'
import * as React from 'react'
import { Link as WouterLink } from 'wouter'
import * as Dialog from '@radix-ui/react-dialog'

import { Button, Heading, Link, Text } from '@radix-ui/themes'
import { $logs } from '../../stores'
import { Flex } from '../Flex'

export const LogList = () => {
	const isLogListOpen = $logs.use((state) => state.isLogListOpen)
	const logList = $logs.use((state) => state.list)

	const closeLogList = () => {
		$logs.toggleLogListOpen(false)
	}

	return (
		<Dialog.Root open={isLogListOpen}>
			<Dialog.Overlay className="LogListOverlay" />
			<Dialog.Content className="LogList">
				<Flex.Column className="LogListContent" gap="3">
					<Dialog.Title className="LogListTitle">Log List</Dialog.Title>
					<Dialog.Description className="LogListDescription">Lorem ipsum betch.</Dialog.Description>
					<Flex.Column gap="2" className="LogListLogs">
						{logList.map((log, index) => {
							return (
								<Flex.Column key={index} gap="2">
									<Heading size="6">{log.title}</Heading>
									<Text>{log.message}</Text>
								</Flex.Column>
							)
						})}
					</Flex.Column>
					<Flex.Row gap="3" className="LogListFooter" align="center" justify="between">
						<Link color="pink">
							<WouterLink href="/reportAnIssue">Report an Issue</WouterLink>
						</Link>
						<Button color="purple" variant="outline" onClick={closeLogList}>
							Close
						</Button>
					</Flex.Row>
					<Dialog.Close />
				</Flex.Column>
			</Dialog.Content>
		</Dialog.Root>
	)
}

/**
<ScrollArea type="always" scrollbars="vertical" style={{ height: 180 }}>
  <Box p="2" pr="8">
    <Heading size="4" mb="2" trim="start">
      Principles of the typographic craft
    </Heading>
    <Flex direction="column" gap="4">
      <Text as="p">
        Three fundamental aspects of typography are legibility, readability, and
        aesthetics. Although in a non-technical sense “legible” and “readable”
        are often used synonymously, typographically they are separate but
        related concepts.
      </Text>

      <Text as="p">
        Legibility describes how easily individual characters can be
        distinguished from one another. It is described by Walter Tracy as “the
        quality of being decipherable and recognisable”. For instance, if a “b”
        and an “h”, or a “3” and an “8”, are difficult to distinguish at small
        sizes, this is a problem of legibility.
      </Text>

      <Text as="p">
        Typographers are concerned with legibility insofar as it is their job to
        select the correct font to use. Brush Script is an example of a font
        containing many characters that might be difficult to distinguish. The
        selection of cases influences the legibility of typography because using
        only uppercase letters (all-caps) reduces legibility.
      </Text>
    </Flex>
  </Box>
</ScrollArea>s
 */
