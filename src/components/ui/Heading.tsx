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
  1: { fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)' },
  2: { fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', lineHeight: 'var(--leading-tight)', letterSpacing: 'var(--tracking-tight)' },
  3: { fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-snug)', letterSpacing: 'var(--tracking-tight)' },
  4: { fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', lineHeight: 'var(--leading-snug)', letterSpacing: 'var(--tracking-normal)' },
  5: { fontFamily: 'var(--font-display)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-normal)', letterSpacing: 'var(--tracking-normal)' },
  6: { fontFamily: 'var(--font-display)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-normal)', letterSpacing: 'var(--tracking-normal)' },
}

const TAGS = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4', 5: 'h5', 6: 'h6' } as const

export const Heading = component$(({ level, class: className }: HeadingProps) => {
  const Tag = TAGS[level]

  return (
    <Tag class={cn('font-semibold', className)} style={LEVEL_STYLES[level]}>
      <Slot />
    </Tag>
  )
})
