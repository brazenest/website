import { component$ } from '@builder.io/qwik'
import { LinkText } from '~/components/ui/LinkText'
import { cn } from '~/fns/cn'
import type { SideLinkCardContent } from '~/types/content'

export const SideCard = component$(
  ({ title, description, href, ctaLabel, themeHint }: SideCardProps) => {
    const accentBorderClass =
      themeHint === 'engineering'
        ? 'border-l-2 border-l-[var(--color-engineering-500)] md:border-l-0 md:hover:border-[var(--color-engineering-500)]'
        : 'border-l-2 border-l-[var(--color-production-500)] md:border-l-0 md:hover:border-[var(--color-production-500)]'

    return (
      <a
        href={href}
        class={cn(
          'group flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8',
          'transition duration-150 ease-out md:hover:-translate-y-0.5 md:hover:shadow-md',
          accentBorderClass,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2',
        )}
      >
        <div class="flex flex-1 flex-col gap-4">
          <h3 class="text-xl font-semibold tracking-tight">{title}</h3>
          <p class="max-w-[32ch] text-sm leading-6 text-[var(--muted)] md:text-base">
            {description}
          </p>

          <div class="pt-2">
            <LinkText
              label={ctaLabel}
              showArrow
              class="group-hover:text-[var(--link-color-hover)] group-hover:[text-decoration-line:var(--link-decoration-hover)]"
            />
          </div>
        </div>
      </a>
    )
  },
)

type SideCardProps = SideLinkCardContent