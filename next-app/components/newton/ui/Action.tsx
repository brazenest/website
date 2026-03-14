'use client'

import { ButtonVariant, ButtonSize } from "@/types/ui"
import { Button } from "./Button"
import { ButtonLink } from "./ButtonLink"
import { useContactModal } from "@/hooks/useContactModal"

export const Action = ({
	variant,
	size,
	className,
	children,
	href,
	onClick,
	isContactAction = false,
}: ActionProps) => {

	const { open } = useContactModal()

	if (href) {
		return (
			<ButtonLink
				variant={variant}
				size={size}
				className={className}
				href={href}
			>
				{children}
			</ButtonLink>
		)
	} else if (onClick) {
		return (
			<Button
				variant={variant}
				size={size}
				className={className}
				onClick={onClick}
			>
				{children}
			</Button>
		)
	} else if (isContactAction) {

		return (
			<Button
				variant={variant}
				size={size}
				className={className}
				onClick={open}
			>
				{children}
			</Button>
		)
	} else
		throw new Error('Action must have either href or onClick or be isContactAction')

}

export type ActionPropsBase = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ActionProps = ActionPropsBase & {
	href?: string
	onClick?: () => void
	isContactAction?: boolean
}
