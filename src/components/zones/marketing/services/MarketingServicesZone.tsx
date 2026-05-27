import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Heading } from '~/components/ui/Heading'
import { Section } from '~/components/ui/Section'
import { Text } from '~/components/ui/Text'
import type { MarketingServicesZoneProps } from '~/components/zones/marketing/types'

export const MarketingServicesZone = component$(
  ({
    eyebrow,
    title,
    description,
    items,
    spacing = 'default',
    surface,
    containerWidth = 'wide',
  }: MarketingServicesZoneProps) => {
    return (
      <Section spacing={spacing} surface={surface}>
        <Container width={containerWidth}>
          <section class="flex flex-col gap-6 md:gap-8">
            <div class="flex flex-col gap-3 md:gap-4">
              {eyebrow && <p class="ui-meta-label">{eyebrow}</p>}

              <Heading level={2} class="max-w-[22ch]">
                {title}
              </Heading>

              {description && <Text class="max-w-[70ch]">{description}</Text>}
            </div>

            <ul class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => {
                const key = `${item.title}-${item.description}`

                return (
                  <li key={key}>
                    <article class="flex h-full flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6">
                      <div class="flex flex-col gap-2">
                        <Heading level={3}>{item.title}</Heading>
                        <Text variant="muted">{item.description}</Text>
                      </div>

                      {item.bullets && item.bullets.length > 0 && (
                        <ul class="flex flex-col gap-1.5">
                          {item.bullets.map((bullet) => (
                            <li key={bullet} class="flex gap-2 text-sm leading-6 text-[var(--fg)]">
                              <span class="text-[var(--muted)]">-</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {item.cta && (
                        <div class="mt-auto pt-1">
                          <ButtonLink
                            href={item.cta.href}
                            label={item.cta.label}
                            variant={item.cta.variant ?? 'ghost'}
                            size="sm"
                            disabled={item.cta.disabled}
                          />
                        </div>
                      )}
                    </article>
                  </li>
                )
              })}
            </ul>
          </section>
        </Container>
      </Section>
    )
  },
)
