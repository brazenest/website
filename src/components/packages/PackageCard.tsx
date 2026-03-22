import { component$ } from '@builder.io/qwik'
import { Card } from '~/components/ui/Card'
import { Heading } from '~/components/ui/Heading'
import { Text } from '~/components/ui/Text'
import { TextLink } from '~/components/ui/TextLink'
import type { Package } from '~/types/content'

export const PackageCard = component$(
  ({ title, description, forWho, includes, outcome, ctaLabel, ctaHref, highlight }: PackageCardProps) => {
    return (
      <Card class={highlight ? 'ring-2 ring-[var(--primary)]' : undefined}>
        <div class="flex flex-1 flex-col" style={{ gap: 'var(--card-content-gap)' }}>
          <div class="flex flex-col" style={{ gap: 'var(--card-title-body-gap)' }}>
            <Heading level={3}>{title}</Heading>

            <div class="flex flex-col gap-3 md:gap-3.5">
              <div class="flex flex-col gap-1">
                <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  For
                </p>
                <Text variant="muted">{forWho}</Text>
              </div>

              <div class="flex flex-col gap-1">
                <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Description
                </p>
                <Text variant="muted">{description}</Text>
              </div>

              <div class="flex flex-col gap-1">
                <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  What's included
                </p>
                <ul class="flex flex-col gap-1.5">
                  {includes.map((item) => (
                    <li key={item} class="flex gap-2 text-sm leading-6 text-[var(--fg)]">
                      <span class="text-[var(--muted)]">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div class="flex flex-col gap-1">
                <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Outcome
                </p>
                <p class="text-sm leading-6 text-[var(--fg)]">{outcome}</p>
              </div>
            </div>
          </div>

          <div class="pt-3 md:pt-2">
            <TextLink
              href={ctaHref}
              label={ctaLabel}
              class="inline-flex min-h-10 items-center"
            />
          </div>
        </div>
      </Card>
    )
  },
)

type PackageCardProps = Package
