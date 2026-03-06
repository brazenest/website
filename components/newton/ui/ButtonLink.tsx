import Link from 'next/link'
import { ButtonSizeStyleMap, ButtonVariantStyleMap } from '@/types/ui'
import { cn } from '@/lib/cn'
import { ActionPropsBase } from './Action';

const defaults = {
	className: 'rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition hover:cursor-pointer',
}

const buttonSizes: ButtonSizeStyleMap = {
	sm: 'text-xs sm:text-sm px-3 py-1.5',
	md: 'text-sm sm:text-md px-4 py-2',
	lg: 'text-base sm:text-lg px-5 py-2.5',
	xl: 'text-lg sm:text-xl px-6 py-3',
};

const variantStyles: ButtonVariantStyleMap = {
	primary:
			'bg-blue-700 text-white! hover:bg-blue-800 focus:ring-4 focus:ring-blue-900',
	secondary:
			'bg-gray-200 text-gray-900! hover:text-gray-800! hover:bg-gray-300 focus:ring-4 focus:ring-gray-400',
	tertiary:
			'bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-4 focus:ring-gray-400',
};

export const ButtonLink = ({
	variant = 'tertiary',
	size = 'md',
	href,
	className,
	children,
}: ButtonLinkProps) => {
	return (
		<Link href={href} className={cn(
			buttonSizes[size],
			variantStyles[variant],
			defaults.className,
			className
		)}>
			{children}
		</Link>
	)
}

export type ButtonLinkProps = ActionPropsBase & {
	href: string
}
