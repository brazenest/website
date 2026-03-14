// lib/utils.ts
import { twMerge } from 'tailwind-merge'

export const cn = (...classes: Array<string | false | null | undefined>) => (
	// return classes.filter(Boolean).join(" ");
	twMerge(...classes)
)
