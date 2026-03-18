import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { TextLink } from '~/components/ui/TextLink'
import type { AboutPreviewContent } from '~/types/content'

export const AboutPreview = component$(
  ({ eyebrow, heading, description, href, ctaLabel }: AboutPreviewProps) => {
    return (
      <Section spacing="default">
        <Container width="content">
          <div class="flex flex-col gap-4 md:gap-5">
            {eyebrow ? (
              <p class="text-sm font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                {eyebrow}
              </p>
            ) : null}

            <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
              {heading}
            </h2>

            <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
              {description}
            </p>

            <div>
              <TextLink href={href} label={ctaLabel} />
            </div>
          </div>
        </Container>
      </Section>
    )
  },
)

type AboutPreviewProps = AboutPreviewContent
