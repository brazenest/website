import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui/Card";
import { Heading } from "~/components/ui/Heading";
import { LinkText } from "~/components/ui/LinkText";
import { Text } from "~/components/ui/Text";
import { cn } from "~/fns/cn";
import type { SideLinkCardContent } from "~/types/content";

export const SideCard = component$(
  ({ title, description, href, ctaLabel, themeHint }: SideCardProps) => {
    const sideThemeClass =
      themeHint === "engineering"
        ? "ui-side-card ui-side-card--engineering"
        : "ui-side-card ui-side-card--production";

    return (
      <Card
        href={href}
        interactive
        padding="spacious"
        class={cn(
          sideThemeClass,
          "touch-manipulation focus-visible:border-[var(--link-color)]",
        )}
      >
        <div
          class="flex flex-1 flex-col"
          style={{ gap: "var(--card-content-gap)" }}
        >
          <Heading level={3}>{title}</Heading>
          <Text variant="muted" class="max-w-[32ch]">
            {description}
          </Text>

          <div class="pt-3 md:pt-2">
            <LinkText label={ctaLabel} showArrow />
          </div>
        </div>
      </Card>
    );
  },
);

type SideCardProps = SideLinkCardContent;
