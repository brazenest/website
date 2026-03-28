import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/ui/Card";
import { Heading } from "~/components/ui/Heading";
import { Tag } from "~/components/ui/Tag";
import { Text } from "~/components/ui/Text";
import { TextLink } from "~/components/ui/TextLink";
import type { EngineeringProject } from "~/types/content";

export const ProjectCard = component$(
  ({
    title,
    slug,
    description,
    techStack,
    cardDescriptor,
    cardHighlight,
  }: ProjectCardProps) => {
    const visibleTech = techStack.slice(0, 3);
    const remainingTechCount = techStack.length - visibleTech.length;

    return (
      <Card>
        <div
          class="flex flex-1 flex-col"
          style={{ gap: "var(--card-content-gap)" }}
        >
          <div
            class="flex flex-col"
            style={{ gap: "var(--card-title-body-gap)" }}
          >
            <Heading level={3}>{title}</Heading>

            <div class="flex flex-col gap-3 md:gap-3.5">
              {cardDescriptor ? (
                <div class="flex flex-col gap-1">
                  <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                    Role and scope
                  </p>
                  <p class="text-sm leading-6 text-[var(--fg)]">
                    {cardDescriptor}
                  </p>
                </div>
              ) : null}

              <div class="flex flex-col gap-1">
                <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                  Project challenge
                </p>
                <Text variant="muted">{description}</Text>
              </div>

              {cardHighlight ? (
                <div class="flex flex-col gap-1">
                  <p class="text-xs font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
                    Why it mattered
                  </p>
                  <p class="text-sm leading-6 text-[var(--fg)]">
                    {cardHighlight}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <ul class="ui-tag-list pt-3 md:pt-2">
            {visibleTech.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}

            {remainingTechCount > 0 ? (
              <li>
                <Tag>+{remainingTechCount} more</Tag>
              </li>
            ) : null}
          </ul>

          <div class="pt-3 md:pt-2">
            <TextLink
              href={`/engineering/projects/${slug}`}
              label="Read engineering case study"
              class="inline-flex min-h-10 items-center"
            />
          </div>
        </div>
      </Card>
    );
  },
);

type ProjectCardProps = Pick<
  EngineeringProject,
  | "title"
  | "slug"
  | "description"
  | "techStack"
  | "cardDescriptor"
  | "cardHighlight"
>;
