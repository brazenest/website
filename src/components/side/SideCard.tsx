import { component$ } from '@builder.io/qwik'
import { Card } from '~/components/ui/Card'
import { Heading } from '~/components/ui/Heading'
import { LinkText } from '~/components/ui/LinkText'
import { Text } from '~/components/ui/Text'
import { cn } from '~/fns/cn'
import type { SideLinkCardContent } from '~/types/content'

export const SideCard = component$(
  ({ title, description, href, ctaLabel, themeHint }: SideCardProps) => {
    const accentBorderClass =
      themeHint === 'engineering'
        ? 'border-l-2 border-l-[var(--color-engineering-500)] md:border-l-0 md:hover:border-[var(--color-engineering-500)]'
        : 'border-l-2 border-l-[var(--color-production-500)] md:border-l-0 md:hover:border-[var(--color-production-500)]'

    return (
      <Card
        href={href}
        interactive
        padding="spacious"
        class={cn(
          accentBorderClass,
          'focus-visible:border-[var(--link-color)]',
        )}
      >
        <div class="flex flex-1 flex-col" style={{ gap: 'var(--card-content-gap)' }}>
          <Heading level={3}>{title}</Heading>
          <Text variant="muted" class="max-w-[32ch]">
            {description}
          </Text>

          <div style={{ paddingTop: 'var(--card-cta-gap)' }}>
            <LinkText
              label={ctaLabel}
              showArrow
              class="group-hover:text-[var(--link-color-hover)] group-hover:[text-decoration-line:var(--link-decoration-hover)]"
            />
          </div>
        </div>
      </Card>
    )
  },
)

type SideCardProps = SideLinkCardContent