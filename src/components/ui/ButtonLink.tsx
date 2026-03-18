import { component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'
import type { ButtonVariant } from '~/types/ui'

type ButtonSize = 'sm' | 'md'

type ButtonLinkProps = {
  href: string
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  class?: string
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'ui-button-link--primary',
  secondary: 'ui-button-link--secondary',
  ghost: 'ui-button-link--ghost',
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: 'ui-button-link--sm',
  md: '',
}

export const ButtonLink = component$(
  ({ href, label, variant = 'secondary', size = 'md', class: className }: ButtonLinkProps) => {
    return (
      <a href={href} class={cn('ui-button-link', VARIANT_CLASS[variant], SIZE_CLASS[size], className)}>
        {label}
      </a>
    )
  },
)
