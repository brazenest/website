import { Slot, component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'
import type { TextVariant } from '~/types/ui'

type TextProps = {
  variant?: TextVariant
  class?: string
}

type TypographyStyle = {
  fontSize: string
  lineHeight: string
  color?: string
}

const VARIANT_STYLES: Record<TextVariant, TypographyStyle> = {
  body: { fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)' },
  muted: { fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', color: 'var(--muted)' },
  small: { fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)', color: 'var(--muted)' },
}

export const Text = component$(({ variant = 'body', class: className }: TextProps) => {
  return (
    <p class={cn(className)} style={VARIANT_STYLES[variant]}>
      <Slot />
    </p>
  )
})
