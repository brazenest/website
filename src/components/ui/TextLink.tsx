import { component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'

export const TextLink = component$(({ href, label, className }: TextLinkProps) => {
  return (
    <a
      href={href}
      class={cn(
        'group inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] underline-offset-4 transition duration-150 ease-out hover:text-[var(--fg)] hover:underline',
        'focus-visible:rounded-[var(--radius-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:underline',
        className,
      )}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        class="transition-transform duration-150 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  )
})

type TextLinkProps = {
  href: string
  label: string
  className?: string
}