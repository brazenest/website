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
      <Container width="content">
        <section id="production-story" aria-labelledby="production-story-title" class="flex flex-col gap-6 md:gap-8">
          <div class="flex flex-col gap-2">
            <h2 id="production-story-title" class="text-2xl font-semibold tracking-tight md:text-3xl">How I Build the Story</h2>
            <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)]">
              After the finished work, here is the repeatable method behind it: define visual
              intent, capture adaptable coverage, and cut for rhythm, clarity, and mood. <a href="/about" class="underline hover:no-underline">See how this connects to system thinking</a>.
            </p>
          </div>

          <ul class="flex flex-col gap-5 md:gap-6">
            {processItems.map((item) => (
              <li key={item.title} class="flex flex-col gap-2">
                <h3 class="text-lg font-medium tracking-tight md:text-xl">
                  {item.title}
                </h3>
                <p class="text-base leading-7 text-[var(--muted)]">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </Section>
  )
})
