import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Heading } from '~/components/ui/Heading'
import { Section } from '~/components/ui/Section'
import { Text } from '~/components/ui/Text'
import type { MarketingHeroZoneProps } from '~/components/zones/marketing/types'

export const MarketingHeroZone = component$(
  ({
    eyebrow,
    title,
    description,
    primaryAction,
    secondaryAction,
    spacing = 'spacious',
    containerWidth = 'content',
  }: MarketingHeroZoneProps) => {
    return (
      <Section spacing={spacing}>
        <Container width={containerWidth}>
          <section class="flex flex-col gap-5 md:gap-6">
            {eyebrow && <p class="ui-meta-label">{eyebrow}</p>}

            <Heading level={1} class="max-w-[18ch]">
              {title}
            </Heading>

            <Text class="max-w-[70ch]">{description}</Text>

            {(primaryAction || secondaryAction) && (
              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                {primaryAction && (
                  <ButtonLink
                    href={primaryAction.href}
                    label={primaryAction.label}
                    variant={primaryAction.variant ?? 'primary'}
                    disabled={primaryAction.disabled}
                    class="w-full sm:w-auto"
                  />
                )}
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
            )}
          </section>
        </Container>
      </Section>
    )
  },
)
