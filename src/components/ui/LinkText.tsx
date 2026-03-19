import { component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'

type LinkTextProps = {
  href?: string
  label: string
  showArrow?: boolean
  disabled?: boolean
  class?: string
}

const LINK_TEXT_STYLE = {
  fontSize: 'var(--small-size)',
  lineHeight: 'var(--small-leading)',
  letterSpacing: 'var(--small-tracking)',
}

export const LinkText = component$(({ href, label, showArrow = false, disabled = false, class: className }: LinkTextProps) => {
  const rootClass = cn('ui-link inline-flex items-center gap-[var(--stack-gap-sm)] group', className)

  const content = (
    <>
      <span>{label}</span>
      {showArrow ? (
        <span
          aria-hidden="true"
          class="transition-transform duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] motion-reduce:transform-none group-hover:translate-x-0.5"
        >
          →
        </span>
      ) : null}
    </>
  )

  if (href && !disabled) {
    return (
      <a href={href} class={rootClass} style={LINK_TEXT_STYLE}>
        {content}
      </a>
    )
  }

  return (
    <span aria-disabled={disabled ? 'true' : undefined} class={rootClass} style={LINK_TEXT_STYLE}>
      {content}
    </span>
  )
})
