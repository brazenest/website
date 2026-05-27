import { component$ } from "@builder.io/qwik";
import { Container } from "~/components/ui/Container";
import { Heading } from "~/components/ui/Heading";
import { Section } from "~/components/ui/Section";
import type { MarketingProofZoneProps } from "~/components/zones/marketing/types";

export const MarketingProofZone = component$(
  ({
    eyebrow = "Proof",
    title,
    items,
    spacing = "compact",
    surface = "subtle",
    containerWidth = "wide",
  }: MarketingProofZoneProps) => {
    return (
      <Section spacing={spacing} surface={surface}>
        <Container width={containerWidth}>
          <section class="ui-proof-band flex flex-col gap-4 md:gap-5">
            {eyebrow && <p class="ui-meta-label">{eyebrow}</p>}

            {title && (
              <Heading level={2} class="max-w-[24ch]">
                {title}
              </Heading>
            )}

            <ul class="grid gap-4 md:grid-cols-3">
              {items.map((item) => {
                const key = item.href ?? `${item.title}-${item.statement}`;

                return (
                  <li key={key}>
                    {item.href ? (
                      <a
                        href={item.href}
                        class="ui-proof-card group px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 md:px-5 md:py-4"
                      >
                        <p class="text-sm font-semibold text-[var(--fg)] transition-colors group-hover:text-[var(--state-hover-accent)]">
                          {item.title}
                        </p>
                        <p class="text-xs leading-5 text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                          {item.statement}
                        </p>
                      </a>
                    ) : (
                      <div class="ui-proof-card px-4 py-3 md:px-5 md:py-4">
                        <p class="text-sm font-semibold text-[var(--fg)]">
                          {item.title}
                        </p>
                        <p class="text-xs leading-5 text-[var(--muted)]">
                          {item.statement}
                        </p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        </Container>
      </Section>
    );
  },
);
