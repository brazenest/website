import { Slot, component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'
import type { CardPadding } from '~/types/ui'

type CardProps = {
  href?: string
  padding?: CardPadding
  interactive?: boolean
  class?: string
}

const CARD_PADDING: Record<Exclude<CardPadding, 'none'>, string> = {
  default: 'var(--card-pad)',
  spacious: 'var(--card-pad-spacious)',
}

export const Card = component$(
  ({ href, padding = 'default', interactive = false, class: className }: CardProps) => {
    const cardClass = cn('ui-card', interactive && 'ui-card--interactive group', className)
    const style = padding === 'none' ? undefined : { padding: CARD_PADDING[padding] }

    if (href) {
      return (
        <a href={href} class={cardClass} style={style}>
          <Slot />
        </a>
      )
    }

    return (
      <article class={cardClass} style={style}>
        <Slot />
      </article>
    )
  },
)