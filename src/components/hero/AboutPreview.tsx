import { component$ } from '@builder.io/qwik'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import type { AboutPreviewContent } from '~/types/content'

export const AboutPreview = component$(
  ({ eyebrow, heading, paragraphs, links }: AboutPreviewProps) => {
    return (
      <Section spacing="default">
        <Container width="content">
          <div class="flex flex-col gap-4 md:gap-5">
            {eyebrow ? (
              <p class="ui-meta-label">
                {eyebrow}
              </p>
            ) : null}

            <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
              {heading}
            </h2>

            <div class="flex flex-col gap-4 md:gap-5">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
              {links.map((link) => (
                <ButtonLink
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  label={link.label}
                  variant={link.variant || 'secondary'}
                  class="w-full sm:w-auto"
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    )
  },
)

type AboutPreviewProps = AboutPreviewContent
