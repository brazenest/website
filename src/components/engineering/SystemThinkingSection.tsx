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
      <Container width="content">
        <section id="system-thinking" aria-labelledby="system-thinking-title" class="scroll-mt-24 flex flex-col gap-6 md:gap-8">
          <div class="flex flex-col gap-2">
            <h2 id="system-thinking-title" class="text-2xl font-semibold tracking-tight md:text-3xl">How I Make System Decisions</h2>
            <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
              The projects show the outcomes; these principles explain the decision model behind
              them. <a href="/about" class="underline hover:no-underline">Learn how this approach connects to the production side</a>.
            </p>
          </div>

          <ul class="flex flex-col gap-5 md:gap-6">
            {systemThinkingItems.map((item) => (
              <li key={item.title} class="flex flex-col gap-2">
                <h3 class="text-lg font-medium tracking-tight md:text-xl">{item.title}</h3>
                <p class="text-base leading-7 text-[var(--muted)]">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </Section>
  )
})
