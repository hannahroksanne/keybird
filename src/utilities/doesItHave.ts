import typeOf from 'just-typeof'

const doesObjectHave = (target: AnyObjectT, subject: string) => {
	return Object.keys(target).includes(subject)
}

const doesArrayHave = (target: any[], subject: any) => {
	return target.includes(subject)
}

const doesStringHave = (target: string, subject: string | number) => {
	return target.includes(subject as string)
}

const hasTargets = {
	string: doesStringHave,
	array: doesArrayHave,
	object: doesObjectHave
}

export const doesItHave = (target) => {
	const type = typeOf(target)
	return hasTargets[type]
}
