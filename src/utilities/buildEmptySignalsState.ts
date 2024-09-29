import { NOTE_IDS } from '#/constants/noteIds'

export const buildEmptySignalsState = () => {
	return NOTE_IDS.reduce((final, noteId) => {
		final[noteId] = []
		return final
	}, {})
}
