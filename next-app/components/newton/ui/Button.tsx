import { cn } from '@/lib/cn'
import { ButtonVariantStyleMap, ButtonSizeStyleMap } from '@/types/ui'
import { ActionPropsBase } from './Action'

const defaults = {
	className: 'rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition hover:cursor-pointer'
}

const buttonSizes: ButtonSizeStyleMap = {
	sm: 'text-xs sm:text-sm px-3 py-1.5',
	md: 'text-sm sm:text-md px-4 py-2',
	lg: 'text-base sm:text-lg px-5 py-2.5',
	xl: 'sm:text-lg px-6 py-3',
}

const variantStyles: ButtonVariantStyleMap = {
	primary:
		'bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-400',
	secondary:
		'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-4 focus:ring-gray-400',
	tertiary:
		'bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200',
}

export const Button = ({
	variant = 'tertiary',
	size = 'md',
	className,
	children,
	onClick,
}: ButtonProps) => {
	return (
		<button
			className={cn(
				buttonSizes[size],
				variantStyles[variant],
				defaults.className,
				className
			)}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export type ButtonProps = ActionPropsBase & {
	onClick: () => void
}
