import { component$ } from "@builder.io/qwik";
import { ContentWidth } from "~/components/layout";
import { PageIntro } from "./PageIntro";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export const PlaceholderPage = component$<PlaceholderPageProps>(
  ({ eyebrow, title, description }) => {
    return (
      <ContentWidth variant="prose">
        <PageIntro
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </ContentWidth>
    );
  },
);
