import { component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'

type LinkTextProps = {
  href?: string
  label: string
  disabled?: boolean
  class?: string
}

const LINK_TEXT_STYLE = {
  fontSize: 'var(--small-size)',
  lineHeight: 'var(--small-leading)',
  letterSpacing: 'var(--small-tracking)',
}

export const LinkText = component$(({ href, label, disabled = false, class: className }: LinkTextProps) => {
  const isInternal = Boolean(href && href.startsWith('/'))
  const rootClass = cn(
    'ui-link-action inline-flex items-center gap-[var(--stack-gap-sm)]',
    isInternal && 'ui-link-action--internal',
    className,
  )

  const content = (
    <>
      <span>{label}</span>
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
