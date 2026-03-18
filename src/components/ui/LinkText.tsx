import { component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'

type LinkTextProps = {
  href?: string
  label: string
  showArrow?: boolean
  class?: string
}

const LINK_TEXT_STYLE = {
  fontSize: 'var(--small-size)',
  lineHeight: 'var(--small-leading)',
  letterSpacing: 'var(--small-tracking)',
}

export const LinkText = component$(({ href, label, showArrow = false, class: className }: LinkTextProps) => {
  const rootClass = cn('ui-link inline-flex items-center gap-[var(--stack-gap-sm)] group', className)

  const content = (
    <>
      <span>{label}</span>
      {showArrow ? (
        <span aria-hidden="true" class="transition-transform duration-150 group-hover:translate-x-0.5">
          →
        </span>
      ) : null}
    </>
  )

  if (href) {
    return (
      <a href={href} class={rootClass} style={LINK_TEXT_STYLE}>
        {content}
      </a>
    )
  }

  return (
    <span class={rootClass} style={LINK_TEXT_STYLE}>
      {content}
    </span>
  )
})
