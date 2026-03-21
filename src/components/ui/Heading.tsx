import { Slot, component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'
import type { HeadingLevel } from '~/types/ui'

type HeadingProps = {
  level: HeadingLevel
  class?: string
}

type TypographyStyle = {
  fontFamily: string
  fontSize: string
  lineHeight: string
  letterSpacing: string
}

const LEVEL_STYLES: Record<HeadingLevel, TypographyStyle> = {
  1: { fontFamily: 'var(--font-display)', fontSize: 'var(--heading-1-size)', lineHeight: 'var(--heading-1-leading)', letterSpacing: 'var(--heading-1-tracking)' },
  2: { fontFamily: 'var(--font-display)', fontSize: 'var(--heading-2-size)', lineHeight: 'var(--heading-2-leading)', letterSpacing: 'var(--heading-2-tracking)' },
  3: { fontFamily: 'var(--font-display)', fontSize: 'var(--heading-3-size)', lineHeight: 'var(--heading-3-leading)', letterSpacing: 'var(--heading-3-tracking)' },
  4: { fontFamily: 'var(--font-display)', fontSize: 'var(--heading-4-size)', lineHeight: 'var(--heading-4-leading)', letterSpacing: 'var(--heading-4-tracking)' },
  5: { fontFamily: 'var(--font-display)', fontSize: 'var(--heading-5-size)', lineHeight: 'var(--heading-5-leading)', letterSpacing: 'var(--heading-5-tracking)' },
  6: { fontFamily: 'var(--font-display)', fontSize: 'var(--heading-6-size)', lineHeight: 'var(--heading-6-leading)', letterSpacing: 'var(--heading-6-tracking)' },
}

const TAGS = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const

export const Heading = component$(({ level, class: className }: HeadingProps) => {
  const Tag = TAGS[level]

  return (
    <Tag class={cn('font-semibold text-[var(--text-strong)]', className)} style={{ ...LEVEL_STYLES[level], margin: '0' }}>
      <Slot />
    </Tag>
  )
})
