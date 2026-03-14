import { component$ } from "@builder.io/qwik";
import { SectionEyebrow } from "~/components/ui";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export const PlaceholderPage = component$<PlaceholderPageProps>(
  ({ eyebrow, title, description }) => {
    return (
      <section class="mx-auto max-w-3xl space-y-6">
        <SectionEyebrow label={eyebrow} />
        <div class="space-y-4">
          <h1 class="max-w-2xl text-4xl sm:text-5xl">{title}</h1>
          <p class="max-w-2xl text-lg leading-8 subtle-text">{description}</p>
        </div>
      </section>
    );
  },
);
