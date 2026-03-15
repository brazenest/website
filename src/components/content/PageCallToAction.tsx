import { component$ } from "@builder.io/qwik";
import { ActionLink, SectionEyebrow } from "~/components/ui";

type PageCallToActionLink = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  external?: boolean;
  newTab?: boolean;
};

type PageCallToActionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction: PageCallToActionLink;
  secondaryAction?: PageCallToActionLink;
  note?: string;
  class?: string;
};

export const PageCallToAction = component$<PageCallToActionProps>(
  ({
    eyebrow = "Next step",
    title,
    description,
    primaryAction,
    secondaryAction,
    note,
    class: className,
  }) => {
    const titleId = `page-cta-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    return (
      <section
        class={`page-cta ${className || ""}`.trim()}
        aria-labelledby={titleId}
      >
        <div class="page-cta__copy">
          <SectionEyebrow label={eyebrow} />
          <div class="page-cta__layout">
            <h2 id={titleId} class="page-cta__title">
              {title}
            </h2>
            <div class="page-cta__details">
              <p class="page-cta__body prose-copy">{description}</p>
              <div class="page-cta__actions">
                <ActionLink
                  href={primaryAction.href}
                  variant={primaryAction.variant ?? "primary"}
                  external={primaryAction.external}
                  newTab={primaryAction.newTab}
                >
                  {primaryAction.label}
                </ActionLink>

                {secondaryAction && (
                  <ActionLink
                    href={secondaryAction.href}
                    variant={secondaryAction.variant ?? "secondary"}
                    external={secondaryAction.external}
                    newTab={secondaryAction.newTab}
                  >
                    {secondaryAction.label}
                  </ActionLink>
                )}
              </div>
              {note && <p class="page-cta__note">{note}</p>}
            </div>
          </div>
        </div>
      </section>
    );
  },
);
