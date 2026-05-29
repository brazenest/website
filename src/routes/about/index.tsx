import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { ButtonLink } from '~/components/ui/ButtonLink'
import { Footer } from '~/components/footer/Footer'
import { PageShell } from '~/components/layout/PageShell'
import { Header } from '~/components/nav/Header'
import { Container } from '~/components/ui/Container'
import { Section } from '~/components/ui/Section'
import { aboutPageContent } from '~/content/about'
import { staticHeads } from '~/fns/seo/staticHeads'

export const head: DocumentHead = staticHeads.about

export default component$(() => {
  return (
    <PageShell theme="neutral" enableScrollReveal>
      <Header />

      <main id="main-content" class="flex-1 scroll-mt-24">
        <Section spacing="spacious">
          <Container width="content">
            <div class="flex flex-col gap-10 md:gap-12">
              <div class="grid gap-8 md:gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
                <div class="flex flex-col gap-3 md:gap-4">
                  <p class="ui-meta-label">
                    {aboutPageContent.eyebrow}
                  </p>

                  <h1 class="text-4xl font-semibold tracking-tight leading-tight md:text-5xl">
                    {aboutPageContent.title}
                  </h1>

                  <p class="max-w-[56ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                    {aboutPageContent.intro}
                  </p>
                </div>

                <figure class="mx-auto w-full max-w-[18rem] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(15,23,42,0.08)] lg:mx-0" data-scroll-reveal>
                  <img
                    src="/media/identity/about-approach-editorial.svg"
                    alt="Abstract editorial composition representing one practice across systems, structure, and visual storytelling."
                    width={960}
                    height={1200}
                    loading="eager"
                    class="aspect-[4/5] w-full object-cover"
                  />
                </figure>
              </div>

              <div class="flex flex-col gap-10 md:gap-12">
                {aboutPageContent.narrativeSections.map((section, index) => (
                  <section
                    key={section.heading}
                    class={
                      index === 1
                        ? 'ui-about-focus grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.88fr)] lg:items-start'
                        : index === 0
                          ? 'ui-about-intro grid gap-5 md:gap-6 md:grid-cols-[minmax(11rem,13rem)_minmax(0,1fr)] md:items-start'
                          : 'flex flex-col gap-4 md:gap-5'
                    }
                    data-scroll-reveal
                  >
                    {index === 0 ? (
                      <div class="ui-about-intro-photo ui-editorial-frame aspect-[4/5] order-last md:order-first md:aspect-[3/4]">
                        <img
                          src={aboutPageContent.portrait.src}
                          alt={aboutPageContent.portrait.alt}
                          width={720}
                          height={900}
                          loading="lazy"
                          class="h-full w-full object-cover"
                          style={{ objectPosition: '52% 34%' }}
                        />
                      </div>
                    ) : null}

                    <div class="flex flex-col gap-4 md:gap-5 order-first md:order-last">
                    <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                      {section.heading}
                    </h2>

                    <div class="flex flex-col gap-4 md:gap-5">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          class="max-w-[70ch] text-base leading-7 text-[var(--fg)] md:text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    </div>

                    {index === 1 ? (
                      <div class="ui-about-focus-media ui-editorial-frame aspect-[5/6] hidden lg:block">
                        <img
                          src="/media/generated/about-practice-studio.png"
                          alt="Editorial studio image showing technical notes, production tools, and authored visual planning in one multidisciplinary practice."
                          width={1024}
                          height={1536}
                          loading="lazy"
                          class="h-full w-full object-cover"
                        />
                      </div>
                    ) : null}
                  </section>
                ))}

                <section class="ui-about-panel ui-about-panel--principles flex flex-col gap-5 md:gap-6" data-scroll-reveal>
                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {aboutPageContent.principles.heading}
                  </h2>

                  <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                    {aboutPageContent.principles.intro}
                  </p>

                  <ul class="grid gap-4 md:grid-cols-2 md:gap-5">
                    {aboutPageContent.principles.items.map((item) => (
                      <li key={item.title} class="ui-about-principle-card flex flex-col gap-2">
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

                <section class="ui-about-panel ui-about-panel--split flex flex-col gap-5 md:gap-6" data-scroll-reveal>
                  <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
                    {aboutPageContent.split.heading}
                  </h2>

                  <p class="max-w-[70ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                    {aboutPageContent.split.intro}
                  </p>

                  <div class="grid gap-4 md:grid-cols-2">
                    {aboutPageContent.split.sides.map((side) => (
                      <article
                        key={side.title}
                        class={`ui-about-split-card ${side.title === 'Engineering' ? 'ui-about-split-card--engineering' : 'ui-about-split-card--production'} flex flex-col gap-2 rounded-[var(--radius-xl)] border border-[var(--border)] p-5`}
                      >
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {side.title}
                        </h3>
                        <p class="text-base leading-7 text-[var(--muted)]">
                          {side.description}
                        </p>
                      </article>
                    ))}
                  </div>

                  <p class="max-w-[70ch] text-base leading-7 text-[var(--fg)] md:text-lg">
                    {aboutPageContent.split.bridge}
                  </p>
                </section>

                <section id="about-next" class="ui-bottom-cta ui-cta-panel flex flex-col gap-4 md:gap-5" data-scroll-reveal>
                  <div class="ui-cta-layout">
                    <div class="flex flex-col gap-4 md:gap-5">
                      <p class="ui-meta-label">
                        {aboutPageContent.cta.eyebrow}
                      </p>

                      <h2 class="ui-cta-title">
                        {aboutPageContent.cta.heading}
                      </h2>

                      <p class="ui-cta-text max-w-[42ch]">
                        {aboutPageContent.cta.description}
                      </p>

                      <div class="ui-cta-group ui-cta-actions">
                        {aboutPageContent.cta.links.map((link) => (
                          <ButtonLink
                            key={`${link.href}-${link.label}`}
                            href={link.href}
                            label={link.label}
                            variant={link.variant}
                            class="w-full"
                          />
                        ))}
                      </div>
                    </div>

                    <div class="ui-cta-image ui-editorial-frame aspect-[5/4]">
                      <img
                        src="/media/generated/about-practice-studio.png"
                        alt="Studio context image representing engineering and production collaboration."
                        width={1536}
                        height={1024}
                        loading="lazy"
                        class="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  )
})
