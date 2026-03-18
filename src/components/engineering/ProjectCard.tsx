import { component$ } from '@builder.io/qwik'
import { Card } from '~/components/ui/Card'
import { Heading } from '~/components/ui/Heading'
import { Tag } from '~/components/ui/Tag'
import { Text } from '~/components/ui/Text'
import { TextLink } from '~/components/ui/TextLink'
import type { EngineeringProject } from '~/types/content'

export const ProjectCard = component$(
  ({ title, slug, description, techStack, cardDescriptor, cardHighlight }: ProjectCardProps) => {
    const visibleTech = techStack.slice(0, 3)
    const remainingTechCount = techStack.length - visibleTech.length

    return (
      <Card>
        <div class="flex flex-1 flex-col" style={{ gap: 'var(--card-content-gap)' }}>
          <div class="flex flex-col" style={{ gap: 'var(--card-title-body-gap)' }}>
            <Heading level={3}>{title}</Heading>

            {cardDescriptor ? (
              <p class="text-sm font-medium text-[var(--fg)]">{cardDescriptor}</p>
            ) : null}

            <Text variant="muted">{description}</Text>

            {cardHighlight ? (
              <p class="text-sm leading-6 text-[var(--muted)]">
                <span class="font-medium text-[var(--fg)]">Key outcome:</span> {cardHighlight}
              </p>
            ) : null}
          </div>

          <ul class="ui-tag-list" style={{ paddingTop: 'var(--card-meta-gap)' }}>
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

          <div style={{ paddingTop: 'var(--card-cta-gap)' }}>
            <TextLink href={`/engineering/projects/${slug}`} label="Read engineering case study" />
          </div>
        </div>
      </Card>
    )
  },
)

type ProjectCardProps = Pick<
  EngineeringProject,
  'title' | 'slug' | 'description' | 'techStack' | 'cardDescriptor' | 'cardHighlight'
>
