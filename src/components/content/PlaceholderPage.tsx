import { component$ } from "@builder.io/qwik";
import { ContentWidth } from "~/components/layout";
import { SectionEyebrow } from "~/components/ui";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export const PlaceholderPage = component$<PlaceholderPageProps>(
  ({ eyebrow, title, description }) => {
    return (
      <ContentWidth variant="prose">
        <section class="page-intro">
          <SectionEyebrow label={eyebrow} />
          <div class="section-stack section-stack--compact">
            <h1 class="page-title">{title}</h1>
            <p class="page-description">{description}</p>
          </div>
        </section>
      </ContentWidth>
    );
  },
);
