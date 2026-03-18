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
  letterSpacing: string
  color: string
}

const VARIANT_STYLES: Record<TextVariant, TypographyStyle> = {
  body: {
    fontSize: 'var(--body-size)',
    lineHeight: 'var(--body-leading)',
    letterSpacing: 'var(--body-tracking)',
    color: 'var(--text-body)',
  },
  muted: {
    fontSize: 'var(--muted-size)',
    lineHeight: 'var(--muted-leading)',
    letterSpacing: 'var(--muted-tracking)',
    color: 'var(--text-muted)',
  },
  small: {
    fontSize: 'var(--small-size)',
    lineHeight: 'var(--small-leading)',
    letterSpacing: 'var(--small-tracking)',
    color: 'var(--meta-fg)',
  },
}

export const Text = component$(({ variant = 'body', class: className }: TextProps) => {
  return (
    <p class={cn('ui-text', className)} style={{ ...VARIANT_STYLES[variant], margin: '0' }}>
      <Slot />
    </p>
  )
})
