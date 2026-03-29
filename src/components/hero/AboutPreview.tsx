import { component$ } from "@builder.io/qwik";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import type { AboutPreviewContent } from "~/types/content";

export const AboutPreview = component$(
  ({
    eyebrow,
    heading,
    description,
    href,
    ctaLabel,
    visual,
  }: AboutPreviewProps) => {
    return (
      <Section spacing="default">
        <Container width="wide">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)] lg:items-center">
            <div class="flex flex-col gap-4 md:gap-5">
              {eyebrow ? <p class="ui-meta-label">{eyebrow}</p> : null}

              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                {heading}
              </h2>

              <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {description}
              </p>

              <div class="ui-cta-group">
                <ButtonLink href={href} label={ctaLabel} variant="secondary" />
              </div>
            </div>

            {visual ? (
              <div class="ui-editorial-frame aspect-[6/5]">
                <img
                  src={visual.src}
                  alt={visual.alt}
                  width={1200}
                  height={1000}
                  loading="lazy"
                  class="h-full w-full object-cover"
                />
              </div>
            ) : null}
          </div>
        </Container>
      </Section>
    );
  },
);

type AboutPreviewProps = AboutPreviewContent;
