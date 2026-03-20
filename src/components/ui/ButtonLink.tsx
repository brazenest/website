import { component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'
import type { ButtonVariant } from '~/types/ui'

type ButtonSize = 'sm' | 'md'

type ButtonLinkProps = {
  href: string
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  class?: string
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'ui-button-link--primary',
  secondary: 'ui-button-link--secondary',
  ghost: 'ui-button-link--ghost',
}

export const ButtonLink = component$(
  ({ href, label, variant = 'secondary', size = 'md', disabled = false, class: className }: ButtonLinkProps) => {
    return (
      <a
        href={disabled ? undefined : href}
        aria-disabled={disabled ? 'true' : undefined}
        tabIndex={disabled ? -1 : undefined}
        class={cn('ui-button-link', VARIANT_CLASS[variant], size === 'sm' && 'ui-button-link--sm', className)}
      >
        {label}
      </a>
    )
  },
)
