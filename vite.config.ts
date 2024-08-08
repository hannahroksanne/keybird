import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mixPlugin from 'vite-plugin-mix'

export default defineConfig({
	plugins: [
		react(),
		// @ts-ignore
		mixPlugin.default({
			handler: './server/index.ts'
		})
	]
})
