import { NOTE_IDS } from '#/constants/noteIds'
import { Flex } from '#/components/layout/Flex'
import { Text } from '@radix-ui/themes'
import React from 'react'
import { useComponentSize } from 'react-use-size'
import range from 'array-range'
import { usePatternEditorStore } from './store'

const SIGNAL_INDEXES = range(1, 33)

const useGridColumnAndSignalCellWidth = () => {
  const { ref, width } = useComponentSize()
  const { signalCellWidth, cellWidth } = usePatternEditorStore()

  React.useEffect(() => {
    if (!width) return
    cellWidth(width / SIGNAL_INDEXES.length)
  }, [width, cellWidth])

  return { ref, width, cellWidth: signalCellWidth }
}

const GridColumnMarkersRow = () => {
  const { signalCellWidth } = usePatternEditorStore()

  return (
    <Flex.Row className="GridColumnMarkersRow" height="32px">
      {SIGNAL_INDEXES.map((signalIndex) => (
        <Flex.Row className="markerCell" key={signalIndex} width={signalCellWidth} height="32px" align="center">
          <Text>{signalIndex}</Text>
        </Flex.Row>
      ))}
    </Flex.Row>
  )
}

const LeftColumnSpacerRow = () => {
  return <Flex.Row className="LeftColumnSpacerRow" height="32px" width="100%"></Flex.Row>
}

export const PatternEditor = () => {
  return (
    <Flex.Column className="PatternEditor" px="4" py="4">
      <Flex.Row className="mainContainer">
        <Flex.Column className="leftColumn" width="80px">
          <LeftColumnSpacerRow />
          {NOTE_IDS.map((noteId) => (
            <Flex.Row key={noteId} className="signalRowDetails" height="32px" width="100%" align="center">
              <Text className="noteIdLabel">{noteId}</Text>
            </Flex.Row>
          ))}
        </Flex.Column>
        <GridColumn />
      </Flex.Row>
    </Flex.Column>
  )
}

export const GridColumn = () => {
  const { ref, cellWidth } = useGridColumnAndSignalCellWidth()

  return (
    <Flex.Column className="GridColumn" ref={ref}>
      <GridColumnMarkersRow />
      {NOTE_IDS.map((noteId) => (
        <Flex.Row key={noteId} className="signalRow" height="32px">
          {SIGNAL_INDEXES.map((signalIndex) => (
            <Flex.Row className="signalCell" key={signalIndex} width={cellWidth} height="32px"></Flex.Row>
          ))}
        </Flex.Row>
      ))}
    </Flex.Column>
  )
}