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
          <section class="ui-bottom-cta ui-cta-panel flex flex-col gap-4 md:gap-5">
            {eyebrow && <p class="ui-meta-label">{eyebrow}</p>}

            <Heading level={2} class="max-w-[20ch]">
              {title}
            </Heading>

            <Text class="max-w-[62ch]">{description}</Text>

            <div class="ui-cta-group ui-cta-actions">
              <ButtonLink
                href={primaryAction.href}
                label={primaryAction.label}
                variant={primaryAction.variant ?? 'primary'}
                disabled={primaryAction.disabled}
              />

              {secondaryAction && (
                <ButtonLink
                  href={secondaryAction.href}
                  label={secondaryAction.label}
                  variant={secondaryAction.variant ?? 'secondary'}
                  disabled={secondaryAction.disabled}
                />
              )}
            </div>
          </section>
        </Container>
      </Section>
    )
  },
)
