import { component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'
import type { SideLinkCardContent } from '~/types/content'

export const SideCard = component$(
  ({ title, description, href, ctaLabel, themeHint }: SideCardProps) => {
    const accentClass =
      themeHint === 'engineering'
        ? 'hover:border-[var(--color-engineering-500)]'
        : 'hover:border-[var(--color-production-500)]'

    return (
      <a
        href={href}
        class={cn(
          'group flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8',
          'transition duration-150 ease-out hover:-translate-y-0.5 hover:shadow-md',
          accentClass,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2',
        )}
      >
        <div class="flex flex-1 flex-col gap-4">
          <h3 class="text-xl font-semibold tracking-tight">{title}</h3>
          <p class="max-w-[32ch] text-sm leading-6 text-[var(--muted)] md:text-base">
            {description}
          </p>

          <div class="pt-2">
            <span class="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
              <span>{ctaLabel}</span>
              <span
                aria-hidden="true"
                class="transition-transform duration-150 group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </a>
    )
  },
)

type SideCardProps = SideLinkCardContent