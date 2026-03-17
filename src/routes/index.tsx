import { component$ } from "@builder.io/qwik";
import { PageShell } from "~/components/layout/PageShell";
import { Container } from "~/components/ui/Container";
import { Section } from "~/components/ui/Section";

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <main class="flex-1">
        <Section spacing="hero">
          <Container width="default">
            <p class="text-sm">Personal Site v3 foundation initialized.</p>
          </Container>
        </Section>
      </main>
    </PageShell>
  );
});
