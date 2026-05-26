import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { systemThinkingItems } from '~/content/engineering/system-thinking'

/**
 * Secondary section: "How I Make System Decisions"
 * Rendered below-the-fold on the engineering page.
 */
export const SystemThinkingSection = component$(() => {
  return (
    <Section spacing="compact">
      <div class="ui-method-band ui-method-band--engineering">
        <Container width="full">
          <section id="system-thinking" aria-labelledby="system-thinking-title" class="ui-method-section scroll-mt-24">
            <div class="ui-method-hero">
              <div class="ui-method-copy flex max-w-[64ch] flex-col gap-3">
                <p class="ui-meta-label">Decision Model</p>
                <h2 id="system-thinking-title" class="text-3xl font-semibold tracking-tight md:text-5xl">How I Make System Decisions</h2>
                <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  The projects show the outcomes; these principles explain the decision model behind
                  them. <a href="/about" class="underline hover:no-underline">Learn how this approach connects to the production side</a>.
                </p>
              </div>

              <div class="ui-method-graphic ui-method-graphic--engineering" aria-hidden="true">
                <span class="ui-method-block ui-method-block--solid" />
                <span class="ui-method-block ui-method-block--tall" />
                <span class="ui-method-block ui-method-block--grid" />
                <span class="ui-method-line" />
                <span class="ui-method-line ui-method-line--short" />
              </div>
            </div>

            <ul class="ui-method-grid">
              {systemThinkingItems.map((item, index) => (
                <li key={item.title} class="ui-method-card ui-method-card--engineering">
                  <div class="ui-method-card-top">
                    <span class="ui-method-index">0{index + 1}</span>
                    <div class="ui-method-card-graphic" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div class="flex flex-col gap-2">
                    <h3 class="text-lg font-medium tracking-tight md:text-xl">{item.title}</h3>
                    <p class="text-base leading-7 text-[var(--muted)]">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </div>
    </Section>
  )
})
