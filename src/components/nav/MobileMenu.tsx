import { component$, useSignal } from '@builder.io/qwik'
import { cn } from '~/fns/cn'

export const MobileMenu = component$(() => {
  const isOpen = useSignal(false)

  return (
    <div class="md:hidden">
      <button
        type="button"
        aria-controls="mobile-navigation"
        aria-expanded={isOpen.value ? 'true' : 'false'}
        aria-label="Toggle navigation menu"
        class="inline-flex h-10 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--border)] px-3 text-sm font-medium text-[var(--fg)] transition hover:bg-[var(--surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
        onClick$={() => {
          isOpen.value = !isOpen.value
        }}
      >
        Menu
      </button>

      <div
        id="mobile-navigation"
        aria-hidden={!isOpen.value}
        class={cn(
          'absolute left-0 right-0 top-full border-b border-[var(--border)] bg-[var(--bg)]',
          isOpen.value ? 'block' : 'hidden'
        )}
      >
        <nav aria-label="Mobile" class="mx-auto flex max-w-[80rem] flex-col px-4 py-4 md:px-8">
          <a
            href="/"
            class="rounded-[var(--radius-lg)] py-3 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
          >
            Home
          </a>
          <a
            href="/about"
            class="rounded-[var(--radius-lg)] py-3 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
          >
            About
          </a>
          <a
            href="/resume"
            class="rounded-[var(--radius-lg)] py-3 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
          >
            Resume
          </a>
          <a
            href="/contact"
            class="rounded-[var(--radius-lg)] py-3 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
          >
            Contact
          </a>
          <a
            href="/engineering"
            class="rounded-[var(--radius-lg)] py-3 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
          >
            Engineering
          </a>
          <a
            href="/production"
            class="rounded-[var(--radius-lg)] py-3 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
          >
            Production
          </a>
        </nav>
      </div>
    </div>
  )
})
