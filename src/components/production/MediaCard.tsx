import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui/Card";
import { Heading } from "~/components/ui/Heading";
import { Text } from "~/components/ui/Text";
import { TextLink } from "~/components/ui/TextLink";
import type { ProductionProject } from "~/types/content";

export const MediaCard = component$(
  ({
    title,
    slug,
    description,
    media,
    cardContext,
    cardDemonstrates,
  }: MediaCardProps) => {
    const primaryMedia = media[0];

    return (
      <Card padding="none" class="overflow-hidden">
        <div class="aspect-[16/10] w-full border-b border-[var(--border)] bg-[var(--surface-elevated)]">
          {primaryMedia ? (
            primaryMedia.type === "image" ? (
              <img
                src={primaryMedia.src}
                alt={primaryMedia.alt ?? title}
                width={1600}
                height={1000}
                loading="lazy"
                class="h-full w-full object-cover"
              />
            ) : (
              // Video media: render poster image with play button affordance
              <div class="relative h-full w-full">
                {primaryMedia.poster ? (
                  <img
                    src={primaryMedia.poster}
                    alt={primaryMedia.alt ?? `${title} video preview`}
                    width={1600}
                    height={1000}
                    loading="lazy"
                    class="h-full w-full object-cover"
                  />
                ) : (
                  <div class="h-full w-full bg-gradient-to-br from-[var(--surface-elevated)] to-[var(--surface)]" />
                )}
                {/* Play button indicator */}
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="rounded-full bg-[var(--fg)]/80 p-3 backdrop-blur-sm transition-all duration-200">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-[var(--bg)]"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 3.5L5 16.5L16 10L5 3.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div class="flex h-full items-center justify-center px-4">
              <Text variant="small">Media preview</Text>
            </div>
          )}
        </div>

        <div
          class="flex flex-1 flex-col"
          style={{ gap: "var(--card-content-gap)", padding: "var(--card-pad)" }}
        >
          <div
            class="flex flex-col"
            style={{ gap: "var(--card-title-body-gap)" }}
          >
            <Heading level={3}>{title}</Heading>

            <div class="flex flex-col gap-3 md:gap-3.5">
              {cardContext ? (
                <div class="flex flex-col gap-1">
                  <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                    Role and context
                  </p>
                  <p class="text-sm leading-6 text-[var(--fg)]">
                    {cardContext}
                  </p>
                </div>
              ) : null}

              <div class="flex flex-col gap-1">
                <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Production challenge
                </p>
                <Text>{description}</Text>
              </div>

              {cardDemonstrates ? (
                <div class="flex flex-col gap-1">
                  <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                    What it demonstrates
                  </p>
                  <p class="text-sm leading-6 text-[var(--fg)]">
                    {cardDemonstrates}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div class="pt-3 md:pt-2">
            <TextLink
              href={`/production/projects/${slug}`}
              label="View production case study"
              class="inline-flex min-h-10 items-center"
            />
          </div>
        </div>
      </Card>
    );
  },
);

type MediaCardProps = Pick<
  ProductionProject,
  | "title"
  | "slug"
  | "description"
  | "media"
  | "cardContext"
  | "cardDemonstrates"
>;
