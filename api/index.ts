import express from 'express'

const app = express()

app.get('/foo', (request, response) => {
	response.send('bar')
})

export const handler = app
