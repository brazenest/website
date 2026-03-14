'use client'

import { useContactModal } from '@/hooks/useContactModal'
import { Button } from '@/components/newton/ui/Button'
import { ButtonSize, ButtonVariant } from '@/types/ui'

export const ContactButton = ({ children, variant = 'primary', size = 'xl', className = '' }: ContactButtonProps) => {
	const { open } = useContactModal();

	return (
		<Button
			className={className}
			onClick={open}
			variant={variant}
			size={size}
		>
			{children}
		</Button>
	)
}

type ContactButtonProps = {
    variant?: ButtonVariant
		size?: ButtonSize
    className?: string
    children:  React.ReactNode
}

export default ContactButton
