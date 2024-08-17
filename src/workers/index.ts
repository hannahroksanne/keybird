import { createWorkerFactory, useWorker } from '@shopify/react-web-worker'

const createWorker = (path: string, meta: any) => {
	return new Worker(new URL('./worker.js', meta.url))
}
