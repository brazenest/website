import { component$ } from '@builder.io/qwik'
import { TextLink } from '@/components/ui/TextLink'
import type { ProductionProject } from '@/types/content'

export const MediaCard = component$(
  ({ title, slug, description, media }: MediaCardProps) => {
    const primaryMedia = media[0]

    return (
      <article class="flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
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
              <div class="flex h-full items-center justify-center px-4 text-sm text-[var(--muted)]">
                Video preview
              </div>
            )
          ) : (
            <div class="flex h-full items-center justify-center px-4 text-sm text-[var(--muted)]">
              Media preview
            </div>
          )}
        </div>

        <div class="flex flex-1 flex-col gap-4 p-6 md:p-7">
          <div class="flex flex-col gap-2">
            <h3 class="text-xl font-semibold tracking-tight">{title}</h3>
            <p class="text-sm leading-6 text-[var(--muted)] md:text-base">{description}</p>
          </div>

          <div class="pt-1">
            <TextLink href={`/production/projects/${slug}`} label="View project" />
          </div>
        </div>
      </article>
    )
  },
)

type MediaCardProps = Pick<ProductionProject, 'title' | 'slug' | 'description' | 'media'>