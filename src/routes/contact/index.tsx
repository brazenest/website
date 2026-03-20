import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { contactPageContent } from '~/content/contact'
import { staticHeads } from '~/fns/seo/staticHeads'

export const head: DocumentHead = staticHeads.contact

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="wide">
            <div class="grid gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:gap-12">
              <div class="flex flex-col gap-4 md:gap-5">
                <p class="ui-meta-label">
                  {contactPageContent.eyebrow}
                </p>

                <h1 class="max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                  {contactPageContent.title}
                </h1>

                <p class="max-w-[72ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {contactPageContent.intro}
                </p>

                <p class="max-w-[68ch] text-base leading-7 text-[var(--fg)] md:text-lg">
                  {contactPageContent.bridge}
                </p>
              </div>

              <aside class="flex flex-col gap-5 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5 md:p-6">
                <div class="flex flex-col gap-2">
                  <p class="ui-meta-label">
                    {contactPageContent.contactPanel.eyebrow}
                  </p>

                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {contactPageContent.contactPanel.heading}
                  </h2>

                  <p class="text-base leading-7 text-[var(--muted)]">
                    {contactPageContent.contactPanel.description}
                  </p>
                </div>

                <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2 xl:flex-col xl:items-stretch">
                  <ButtonLink
                    href="mailto:ag@aldengillespy.com?subject=Project%20Inquiry"
                    label="Email Project Details"
                    variant="primary"
                    class="w-full"
                  />
                  <ButtonLink
                    href="/resume"
                    label="View Resume"
                    variant="secondary"
                    class="w-full"
                  />
                </div>

                <ul class="flex flex-col gap-4">
                  {contactPageContent.contactPanel.methods.map((method) => (
                    <li
                      key={method.label}
                      class="flex flex-col gap-1 border-t border-[var(--border)] pt-4 first:border-t-0 first:pt-0"
                    >
                      <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                        {method.label}
                      </p>

                      <a
                        href={method.href}
                        target={method.href.startsWith('http') ? '_blank' : undefined}
                        rel={method.href.startsWith('http') ? 'noreferrer' : undefined}
                        class="rounded-[var(--radius-lg)] text-sm font-medium text-[var(--fg)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--state-hover-accent)] active:text-[var(--state-active-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)] md:text-base"
                      >
                        {method.value}
                      </a>

                      <p class="text-sm leading-6 text-[var(--muted)]">
                        {method.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="wide">
            <section
              class="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10"
              aria-labelledby="contact-fit"
            >
              <div class="flex flex-col gap-2">
                <h2 id="contact-fit" class="text-2xl font-semibold tracking-tight md:text-3xl">
                  {contactPageContent.inquiryTypes.heading}
                </h2>

                <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)] md:text-base">
                  {contactPageContent.inquiryTypes.intro}
                </p>
              </div>

              <ul class="grid gap-4 md:grid-cols-2">
                {contactPageContent.inquiryTypes.items.map((item) => (
                  <li key={item.title}>
                    <article
                      class="flex flex-col gap-2 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
                    >
                      <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                        {item.title}
                      </h3>
                      <p class="text-base leading-7 text-[var(--muted)]">
                        {item.description}
                      </p>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          </Container>
        </Section>

        <Section spacing="compact" surface="subtle">
          <Container width="wide">
            <div class="grid gap-10 xl:grid-cols-2 xl:gap-12">
              <section class="flex flex-col gap-5 md:gap-6" aria-labelledby="contact-include">
                <h2
                  id="contact-include"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  {contactPageContent.includeItems.heading}
                </h2>

                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {contactPageContent.includeItems.intro}
                </p>

                <ul class="flex flex-col gap-4">
                  {contactPageContent.includeItems.items.map((item) => (
                    <li key={item.title}>
                      <article
                        class="flex flex-col gap-2 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
                      >
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {item.title}
                        </h3>

                        <p class="text-base leading-7 text-[var(--muted)]">
                          {item.description}
                        </p>
                      </article>
                    </li>
                  ))}
                </ul>
              </section>

              <section class="flex flex-col gap-5 md:gap-6" aria-labelledby="contact-next">
                <h2
                  id="contact-next"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  {contactPageContent.nextSteps.heading}
                </h2>

                <p class="max-w-[60ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {contactPageContent.nextSteps.intro}
                </p>

                <ol class="flex flex-col gap-4">
                  {contactPageContent.nextSteps.items.map((item, index) => (
                    <li
                      key={item.title}
                      class="grid gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 md:grid-cols-[2.5rem_minmax(0,1fr)] md:items-start"
                    >
                      <div class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-subtle)] text-sm font-semibold text-[var(--fg)]">
                        {index + 1}
                      </div>

                      <div class="flex flex-col gap-2">
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {item.title}
                        </h3>

                        <p class="text-base leading-7 text-[var(--muted)]">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <p class="max-w-[60ch] text-sm leading-6 text-[var(--muted)] md:text-base">
                  {contactPageContent.nextSteps.note}
                </p>
              </section>
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <section
              id="contact-cta"
              class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 md:gap-5 md:p-8"
            >
              <p class="ui-meta-label">
                {contactPageContent.cta.eyebrow}
              </p>

              <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                {contactPageContent.cta.heading}
              </h2>

              <p class="max-w-[62ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                {contactPageContent.cta.description}
              </p>

              <div class="ui-cta-group flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:gap-2">
                {contactPageContent.cta.buttons.map((button) => (
                  <ButtonLink
                    key={`${button.href}-${button.label}`}
                    href={button.href}
                    label={button.label}
                    variant={button.variant}
                    class="w-full sm:w-auto"
                  />
                ))}
              </div>

              <p class="max-w-[62ch] text-sm leading-6 text-[var(--muted)] md:text-base">
                {contactPageContent.cta.footnote}
              </p>
            </section>
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  )
})