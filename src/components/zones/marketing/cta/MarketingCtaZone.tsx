import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Heading } from '~/components/ui/Heading'
import { Section } from '~/components/ui/Section'
import { Text } from '~/components/ui/Text'
import type { MarketingCtaZoneProps } from '~/components/zones/marketing/types'

export const MarketingCtaZone = component$(
  ({
    eyebrow,
    title,
    description,
    primaryAction,
    secondaryAction,
    spacing = 'compact',
    surface,
    containerWidth = 'content',
  }: MarketingCtaZoneProps) => {
    return (
      <Section spacing={spacing} surface={surface}>
        <Container width={containerWidth}>
          <section class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:gap-5 md:p-8">
            {eyebrow && <p class="ui-meta-label">{eyebrow}</p>}

            <Heading level={2} class="max-w-[20ch]">
              {title}
            </Heading>

            <Text class="max-w-[62ch]">{description}</Text>

            <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
              <ButtonLink
                href={primaryAction.href}
                label={primaryAction.label}
                variant={primaryAction.variant ?? 'primary'}
                disabled={primaryAction.disabled}
                class="w-full sm:w-auto"
              />

              {secondaryAction && (
                <ButtonLink
                  href={secondaryAction.href}
                  label={secondaryAction.label}
                  variant={secondaryAction.variant ?? 'secondary'}
                  disabled={secondaryAction.disabled}
                  class="w-full sm:w-auto"
                />
              )}
            </div>
          </section>
        </Container>
      </Section>
    )
  },
)
