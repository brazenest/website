import { component$ } from '@builder.io/qwik'
import { Card } from '~/components/ui/Card'
import { Heading } from '~/components/ui/Heading'
import { Text } from '~/components/ui/Text'
import { TextLink } from '~/components/ui/TextLink'
import type { EngineeringProject } from '~/types/content'

export const ProjectCard = component$(
  ({ title, slug, description, techStack }: ProjectCardProps) => {
    return (
      <Card>
        <div class="flex flex-1 flex-col" style={{ gap: 'var(--card-content-gap)' }}>
          <div class="flex flex-col" style={{ gap: 'var(--card-title-body-gap)' }}>
            <Heading level={3}>{title}</Heading>
            <Text variant="muted">{description}</Text>
          </div>

          <ul class="flex flex-wrap gap-2" style={{ paddingTop: 'var(--card-meta-gap)' }}>
            {techStack.map((tech) => (
              <li
                key={tech}
                class="rounded-[var(--radius-input)] border border-[var(--border)] bg-[var(--surface-subtle)] px-2.5 py-1 font-medium text-[var(--text-muted)]"
                style={{
                  fontSize: 'var(--small-size)',
                  lineHeight: 'var(--small-leading)',
                  letterSpacing: 'var(--small-tracking)',
                }}
              >
                {tech}
              </li>
            ))}
          </ul>

          <div style={{ paddingTop: 'var(--card-cta-gap)' }}>
            <TextLink href={`/engineering/projects/${slug}`} label="View case study" />
          </div>
        </div>
      </Card>
    )
  },
)

type ProjectCardProps = Pick<EngineeringProject, 'title' | 'slug' | 'description' | 'techStack'>