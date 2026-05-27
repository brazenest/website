import { component$ } from '@builder.io/qwik'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { processItems } from '~/content/production/process'

/**
 * Secondary section: "How I Build the Story"
 * Rendered below-the-fold on the production page.
 */
export const ProductionStorySection = component$(() => {
  return (
    <Section spacing="compact">
      <div class="ui-method-band ui-method-band--production">
        <Container width="wide">
          <section id="production-story" aria-labelledby="production-story-title" class="ui-method-section">
            <div class="ui-method-hero">
              <div class="ui-method-copy flex max-w-[64ch] flex-col gap-3">
                <p class="ui-meta-label">Production Method</p>
                <h2 id="production-story-title" class="text-3xl font-semibold tracking-tight md:text-5xl">How I Build the Story</h2>
                <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  After the finished work, here is the repeatable method behind it: define visual
                  intent, capture adaptable coverage, and cut for rhythm, clarity, and mood. <a href="/about" class="ui-link-inline">See how this connects to system thinking</a>.
                </p>
              </div>

              <div class="ui-method-graphic ui-method-graphic--production" aria-hidden="true">
                <span class="ui-method-block ui-method-block--solid" />
                <span class="ui-method-block ui-method-block--wide" />
                <span class="ui-method-block ui-method-block--grid" />
                <span class="ui-method-line" />
                <span class="ui-method-line ui-method-line--short" />
              </div>
            </div>

            <ul class="ui-method-grid">
              {processItems.map((item, index) => (
                <li key={item.title} class="ui-method-card ui-method-card--production">
                  <div class="ui-method-card-top">
                    <span class="ui-method-index">0{index + 1}</span>
                    <div class="ui-method-card-graphic" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>

                  <div class="flex flex-col gap-2">
                    <h3 class="text-lg font-medium tracking-tight md:text-xl">
                      {item.title}
                    </h3>
                    <p class="text-base leading-7 text-[var(--muted)]">
                      {item.description}
                    </p>
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
