export const getClassPrefix = (c) => {
	const match = c.match(/^([a-z][a-z0-9-]+)-[a-z0-9]$/)
	return match ? match[1] : c
}