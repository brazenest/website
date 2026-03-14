import { BlogPostDateModel } from "@/types/blog"

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

export const formatBlogPostDate = (date: BlogPostDateModel) => {

	const month = months[date.getMonth()]
	const day = String(date.getDay())
	const year = date.getFullYear()
	const hour = (() => {
		const h = date.getHours()
		return h === 0 ? 12 : h > 12 ? h - 12 : h
	})()
	const minute = String(date.getMinutes()).padStart(2, '0')
	const ampm = date.getHours() > 11 ? 'PM' : 'AM'
	const timezone = (() => {
		const sign = date.getTimezoneOffset() * -1 >= 0 ? '+' : '-'
		return `UTC${sign}${Math.abs((date.getTimezoneOffset() / 60) * -1)}`
	})()

	return `${month} ${day}, ${year} @ ${hour}:${minute} ${ampm} (${timezone})`
}
