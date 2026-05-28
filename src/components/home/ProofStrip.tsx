import { component$ } from "@builder.io/qwik";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import type { ProofItem } from "~/types/content";

type ProofStripProps = {
  items: ProofItem[];
};

export const ProofStrip = component$(({ items }: ProofStripProps) => {
  return (
    <Section spacing="compact" surface="subtle">
      <Container width="wide">
        <section class="ui-proof-band flex flex-col gap-4 md:gap-5">
          <p class="ui-meta-label">Selected Proof</p>
          <div class="ui-proof-intro">
            <h2 class="text-3xl font-semibold tracking-tight md:text-4xl">
              Work that shows the standard before you start a conversation.
            </h2>
            <p class="max-w-[42ch] text-base leading-7 text-[var(--muted)] md:text-lg">
              These are compact case studies by design. Each one shows the
              problem, the judgment behind the work, and the kind of result I
              look for when a site or story has to perform in public.
            </p>
          </div>

          <ul class="ui-proof-grid">
            {items.map((item) => {
              const disciplineClass = item.href.startsWith("/engineering/")
                ? "ui-proof-card--engineering"
                : item.href.startsWith("/production/")
                  ? "ui-proof-card--production"
                  : "";

              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    class={`ui-proof-card ui-proof-card--graphic ${disciplineClass} group px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 md:px-5 md:py-4`}
                  >
                    {item.impact ? (
                      <p class="ui-proof-impact text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--fg)]/72">
                        {item.impact}
                      </p>
                    ) : null}
                    <div class="ui-proof-card-graphic" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <p class="text-sm font-semibold text-[var(--fg)] transition-colors group-hover:text-[var(--state-hover-accent)]">
                      {item.title}
                    </p>
                    <p class="text-xs leading-5 text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
                      {item.statement}
                    </p>
                    {item.detail ? (
                      <p class="text-sm leading-6 text-[var(--fg)]/82">
                        {item.detail}
                      </p>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <div class="ui-proof-footer">
            <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
              Engineering work is about the parts visitors do not see until
              something is slow, brittle, or hard to find.
            </p>
            <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
              Production work is about the parts visitors feel immediately:
              framing, pacing, credibility, and voice.
            </p>
            <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
              This site is the same kind of artifact I build for clients: a
              clear position, a maintainable system, and enough proof to make
              the next step obvious.
            </p>
          </div>
        </section>
      </Container>
    </Section>
  );
});
