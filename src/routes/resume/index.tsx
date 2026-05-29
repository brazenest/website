import { $, component$ } from "@builder.io/qwik";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import { Footer } from "~/components/footer/Footer";
import { PageShell } from "~/components/layout/PageShell";
import { Header } from "~/components/nav/Header";
import { ButtonLink } from "~/components/ui/ButtonLink";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";
import { TextLink } from "~/components/ui/TextLink";
import { resumePageContent } from "~/content/resume";
import { staticHeads } from "~/fns/seo/staticHeads";

export const head: DocumentHead = staticHeads.resume;

export default component$(() => {
  const location = useLocation();
  const printModeParam = location.url.searchParams.get("print");
  const printMode = printModeParam === "ats" ? "ats" : printModeParam === "human" ? "human" : "browser";
  const getSkillDisciplineClass = (title: string) => {
    if (title.toLowerCase().includes("engineering")) return "ui-resume-cue--engineering";
    if (title.toLowerCase().includes("production")) return "ui-resume-cue--production";
    return "ui-resume-cue--mixed";
  };

  return (
    <PageShell theme="neutral" enableScrollReveal>
      <Header />

      <main id="main-content" class={`page-resume resume-page resume-mode-${printMode} flex-1 scroll-mt-24`}>
        <Section spacing="compact">
          <Container width="wide">
            <div class="resume-mode-switcher flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-4 md:flex-row md:items-center md:justify-between">
              <div class="flex flex-col gap-1">
                <p class="ui-meta-label">Resume Views</p>
                <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
                  {printMode === "browser"
                    ? "Browser view active. Open a print-optimized version when you want to export or print."
                    : printMode === "human"
                      ? "Human-friendly print view active. This version is tuned for readable printed output."
                      : "ATS-compatible print view active. This version favors parser-friendly structure and single-column flow."}
                </p>
              </div>

              <div class="flex flex-col gap-2 sm:flex-row">
                <ButtonLink
                  href="/resume?print=human"
                  label="Human-Friendly Print"
                  variant={printMode === "human" ? "primary" : "secondary"}
                  class="w-full sm:w-auto"
                />
                <ButtonLink
                  href="/resume?print=ats"
                  label="ATS-Compatible Print"
                  variant={printMode === "ats" ? "primary" : "secondary"}
                  class="w-full sm:w-auto"
                />
                {printMode !== "browser" && (
                  <>
                    <button
                      type="button"
                      onClick$={$(() => window.print())}
                      class="ui-button-link ui-button-link--ghost w-full sm:w-auto"
                    >
                      Print This Version
                    </button>
                    <ButtonLink
                      href="/resume"
                      label="Back to Browser View"
                      variant="ghost"
                      class="w-full sm:w-auto"
                    />
                  </>
                )}
              </div>
            </div>
          </Container>
        </Section>

        <Section spacing="spacious">
          <Container width="wide">
            <div class="resume-print-primary-flow flex flex-col gap-12 md:gap-16">
              <div class="resume-print-header grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] md:items-start md:gap-10">
                <div class="flex flex-col gap-3 md:gap-4">
                  <p class="ui-meta-label">
                    {resumePageContent.header.eyebrow}
                  </p>

                  <div class="flex flex-col gap-2">
                    <h1 class="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
                      {resumePageContent.header.name}
                    </h1>

                    <p class="text-lg font-medium leading-7 text-[var(--muted)] md:text-xl">
                      {resumePageContent.header.title}
                    </p>
                  </div>

                  {printMode === "browser" && (
                    <p class="resume-print-intro max-w-[64ch] text-sm leading-6 text-[color-mix(in_srgb,var(--fg)_58%,var(--bg))] md:text-base">
                      {resumePageContent.intro}
                    </p>
                  )}
                </div>

                <div class="flex flex-col gap-3 md:gap-4">
                  <div class="resume-print-portrait ui-editorial-frame aspect-[4/5] w-full max-w-[13rem]">
                    <img
                      src="/media/about/alden-portrait.jpg"
                      alt="Portrait of Alden Gillespy."
                      width={720}
                      height={900}
                      loading="lazy"
                      class="h-full w-full object-cover"
                      style={{ objectPosition: "52% 34%" }}
                    />
                  </div>
                </div>

                <div class="resume-contact ui-resume-meta-band ui-resume-cue--mixed flex flex-col gap-3 md:col-span-2 md:gap-4">
                  <p class="ui-meta-label">Contact</p>

                  <ul class="grid gap-2 text-sm leading-6 text-[var(--muted)] sm:grid-cols-2 xl:grid-cols-4 md:text-base">
                    {resumePageContent.header.contactItems.map((item) => (
                      <li
                        key={`${item.label}-${"href" in item ? item.href : "text"}`}
                      class="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface-elevated)] px-3 py-2"
                      >
                        {"href" in item ? (
                          <a
                            href={item.href}
                            target={
                              item.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              item.href.startsWith("http")
                                ? "noreferrer"
                                : undefined
                            }
                            class="rounded-[var(--radius-lg)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:text-[var(--fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:text-[var(--fg)]"
                          >
                            {item.label}
                            {item.href.startsWith("http") ? " 🔗" : ""}
                          </a>
                        ) : (
                          <span>{item.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <section
                class="resume-print-section resume-print-summary ui-resume-section ui-resume-cue--mixed grid gap-4 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10"
                aria-labelledby="resume-summary"
                data-scroll-reveal
              >
                <h2
                  id="resume-summary"
                  class="resume-print-summary-heading text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Summary
                </h2>

                <p class="resume-print-summary-copy max-w-[72ch] text-base leading-7 text-[var(--muted)] md:text-lg">
                  {resumePageContent.summary}
                </p>
              </section>

              <section
                class="resume-print-section resume-print-experience ui-resume-section ui-resume-cue--mixed grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10"
                aria-labelledby="resume-experience"
                data-scroll-reveal
              >
                <div class="resume-print-experience-heading flex flex-col gap-2">
                  <h2
                    id="resume-experience"
                    class="text-2xl font-semibold tracking-tight md:text-3xl"
                  >
                    Experience
                  </h2>

                  <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)] md:text-base">
                    Reverse-chronological roles focused on product delivery,
                    reliability, and full-stack system ownership.
                  </p>
                </div>

                <div class="resume-print-experience-list flex flex-col gap-8 md:gap-10">
                  {resumePageContent.experience.map((entry) => (
                    <article
                      key={`${entry.title}-${entry.organization}-${entry.timeframe}`}
                      class="resume-print-card resume-print-experience-item ui-resume-unit ui-resume-cue--engineering grid gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 md:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)] md:gap-8"
                    >
                      <div class="resume-print-experience-meta flex flex-col gap-1">
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {entry.title}
                        </h3>

                        <p class="resume-print-experience-org text-sm font-medium text-[var(--muted)] md:text-base">
                          {entry.organization}
                        </p>

                        <p class="resume-print-experience-timeframe text-sm text-[var(--muted)]">
                          {entry.timeframe}
                        </p>

                        <p class="resume-print-experience-context text-sm text-[var(--muted)]">
                          {entry.context}
                        </p>
                      </div>

                      <ul class="resume-print-experience-bullets flex flex-col gap-2 pl-5 text-sm leading-6 text-[var(--fg)] md:text-base">
                        {entry.bullets.map((item) => (
                          <li key={item} class="list-disc">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="wide">
            <section
              class="resume-print-section resume-print-projects ui-context-panel ui-resume-projects-panel ui-resume-cue--mixed grid gap-6 p-5 md:p-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-10 lg:p-8"
              aria-labelledby="resume-selected-projects"
            >
              <div class="resume-print-projects-heading flex flex-col gap-2">
                <h2
                  id="resume-selected-projects"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Selected Projects
                </h2>

                <p class="max-w-[28ch] text-sm leading-6 text-[var(--muted)] md:text-base">
                  Compact cross-disciplinary examples adapted from the longer
                  engineering and production case studies.
                </p>

                <div class="resume-print-project-visual ui-editorial-frame mt-2 aspect-[4/5] max-w-[20rem]">
                  <img
                    src="/media/identity/resume-projects-editorial.svg"
                    alt="Abstract editorial composition representing engineering systems and production deliverables grouped in one portfolio."
                    width={1000}
                    height={1250}
                    loading="lazy"
                    class="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div class="resume-print-project-list grid gap-4 md:grid-cols-2">
                {resumePageContent.selectedProjects.map((project) => (
                  <article
                    key={`${project.discipline}-${project.title}`}
                    class={`resume-print-card ui-resume-unit ${project.discipline === "Engineering" ? "ui-resume-cue--engineering" : "ui-resume-cue--production"} flex h-full flex-col gap-3 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5`}
                  >
                    <div class="flex flex-col gap-2">
                      <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                        {project.discipline}
                      </p>

                      <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {project.title}
                        </h3>

                        <p class="text-sm font-medium text-[var(--muted)] md:text-base">
                          {project.role}
                        </p>
                      </div>
                    </div>

                    <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
                      {project.description}
                    </p>

                    <div class="resume-print-project-link mt-auto pt-1">
                      <TextLink
                        href={project.href}
                        label={`View ${project.discipline} case study`}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="wide">
            <div class="resume-print-skills-grid resume-print-lower-flow grid gap-10 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-12">
              <section
                class="resume-print-section resume-print-skills-column flex flex-col gap-5 md:gap-6"
                aria-labelledby="resume-skills"
              >
                <h2
                  id="resume-skills"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Skills
                </h2>

                <div class="grid gap-4">
                  {resumePageContent.skills.map((group) => (
                    <article
                      key={group.title}
                      class={`resume-print-card ui-resume-unit ${getSkillDisciplineClass(group.title)} flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5`}
                    >
                      <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                        {group.title}
                      </h3>

                      {printMode === "ats" ? (
                        <p class="resume-print-skills-inline text-sm leading-6 text-[var(--muted)] md:text-base">
                          {group.items.join(", ")}
                        </p>
                      ) : (
                        <ul class="flex flex-wrap gap-2">
                          {group.items.map((item) => (
                            <li
                              key={`${group.title}-${item}`}
                              class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-3 py-2 text-sm text-[var(--fg)]"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>
              </section>

              <section
                class="resume-print-section resume-print-education-column flex flex-col gap-6 md:gap-8"
                aria-labelledby="resume-education"
              >
                <h2
                  id="resume-education"
                  class="text-2xl font-semibold tracking-tight md:text-3xl"
                >
                  Education
                </h2>

                <div class="flex flex-col gap-5 md:gap-6">
                  {resumePageContent.education.map((entry) => (
                    <article
                      key={`${entry.credential}-${entry.institution}`}
                      class="resume-print-card ui-resume-unit ui-resume-cue--mixed flex flex-col gap-2 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
                    >
                      <div class="flex flex-col gap-1">
                        <h3 class="text-lg font-semibold tracking-tight md:text-xl">
                          {entry.credential}
                        </h3>

                        <p class="text-sm font-medium text-[var(--muted)] md:text-base">
                          {entry.institution}
                        </p>

                        <p class="text-sm text-[var(--muted)]">
                          {entry.timeframe}
                        </p>
                      </div>

                      <p class="text-sm leading-6 text-[var(--muted)] md:text-base">
                        {entry.description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </Container>
        </Section>

        <Section spacing="compact">
          <Container width="content">
            <section
              id="resume-cta"
              aria-labelledby="resume-cta-title"
              class="ui-bottom-cta ui-cta-panel flex flex-col gap-4 md:gap-5"
            >
              <div class="ui-cta-layout">
                <div class="flex flex-col gap-4 md:gap-5">
                  <p class="ui-meta-label">Next Steps</p>

                  <h2 id="resume-cta-title" class="ui-cta-title">
                    Continue with the work that answers your question.
                  </h2>

                  <p class="ui-cta-text max-w-[42ch]">
                    Review engineering case studies for technical depth, production projects for narrative execution, or open the conversation for role-specific context.
                  </p>

                  <div class="ui-cta-group ui-cta-actions">
                    <ButtonLink
                      href="/engineering#selected-work"
                      label="Browse Engineering Case Studies"
                      variant="primary"
                    />
                    <ButtonLink
                      href="/production#selected-work"
                      label="Browse Production Projects"
                      variant="secondary"
                    />
                    <ButtonLink
                      href="/contact"
                      label="Start a Conversation"
                      variant="ghost"
                    />
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
          </Container>
        </Section>
      </main>

      <Footer />
    </PageShell>
  );
});
