import { component$ } from '@builder.io/qwik'
import { Card } from '~/components/ui/Card'
import { Heading } from '~/components/ui/Heading'
import { Text } from '~/components/ui/Text'
import { TextLink } from '~/components/ui/TextLink'
import type { ProductionProject } from '~/types/content'

export const MediaCard = component$(
  ({ title, slug, description, media }: MediaCardProps) => {
    const primaryMedia = media[0]

    return (
      <Card padding="none" class="overflow-hidden">
        <div class="aspect-[16/10] w-full border-b border-[var(--border)] bg-[var(--surface-subtle)]">
          {primaryMedia ? (
            primaryMedia.type === 'image' ? (
              <img
                src={primaryMedia.src}
                alt={primaryMedia.alt ?? title}
                width={1600}
                height={1000}
                class="h-full w-full object-cover"
              />
            ) : (
              <div class="flex h-full items-center justify-center px-4">
                <Text variant="small">Video preview</Text>
              </div>
            )
          ) : (
            <div class="flex h-full items-center justify-center px-4">
              <Text variant="small">Media preview</Text>
            </div>
          )}
        </div>

        <div class="flex flex-1 flex-col" style={{ gap: 'var(--card-content-gap)', padding: 'var(--card-pad)' }}>
          <div class="flex flex-col" style={{ gap: 'var(--card-title-body-gap)' }}>
            <Heading level={3}>{title}</Heading>
            <Text variant="muted">{description}</Text>
          </div>

          <div style={{ paddingTop: 'var(--card-cta-gap)' }}>
            <TextLink href={`/production/projects/${slug}`} label="View production case study" />
          </div>
        </div>
      </Card>
    )
  },
)

type MediaCardProps = Pick<ProductionProject, 'title' | 'slug' | 'description' | 'media'>