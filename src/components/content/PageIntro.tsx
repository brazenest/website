import { Slot, component$ } from "@builder.io/qwik";
import { SectionEyebrow } from "~/components/ui";
import type { MediaAsset } from "~/lib/content";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  backgroundImage?: MediaAsset;
  heroTone?: "default" | "inverse";
};

export const PageIntro = component$<PageIntroProps>(
  ({ eyebrow, title, description, backgroundImage, heroTone = "default" }) => {
    return (
      <header
        class={{
          "page-intro": true,
          "page-intro--hero": Boolean(backgroundImage),
          "page-intro--hero-inverse":
            Boolean(backgroundImage) && heroTone === "inverse",
        }}
        style={
          backgroundImage
            ? {
              "--page-intro-image": `url("${encodeURI(backgroundImage.src)}")`,
            }
            : undefined
        }
      >
        <div class="page-intro__body">
          <SectionEyebrow label={eyebrow} />
          <div class="section-stack section-stack--compact flex flex-col gap-[var(--space-3)]">
            <h1 class="page-title">{title}</h1>
            <p class="page-description">{description}</p>
          </div>
          <Slot />
        </div>
      </header>
    );
  },
);
