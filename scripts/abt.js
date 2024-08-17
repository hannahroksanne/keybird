import fs from 'fs'
import path from 'path'

// Path to package.json in the current directory
const packageJsonPath = path.join(process.cwd(), 'package.json')

// Function to read and parse package.json
function readPackageJson() {
	try {
		const data = fs.readFileSync(packageJsonPath, 'utf8')
		return JSON.parse(data)
	} catch (error) {
		console.error('Error reading package.json:', error.message)
		process.exit(1)
	}
}

// Function to list all scripts
function listScripts() {
	const packageJson = readPackageJson()

	if (!packageJson.scripts || Object.keys(packageJson.scripts).length === 0) {
		console.log('No scripts found in package.json')
		return
	}

	console.log('Available scripts:')
	console.log('------------------')

	Object.entries(packageJson.scripts).forEach(([name, command]) => {
		console.log(`${name}: ${command}`)
	})
}

// Run the script
listScripts()
