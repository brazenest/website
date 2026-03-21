import { Slot, component$ } from '@builder.io/qwik'
import type { SectionSpacing, SectionSurface } from '~/types/ui'

const SPACING_TOKEN: Record<NonNullable<SectionSpacing>, string> = {
  default: 'var(--section-pad-y)',
  compact: 'var(--section-pad-y-compact)',
  spacious: 'var(--section-pad-y-spacious)',
}

const SURFACE_TOKEN: Record<SectionSurface, string> = {
  base: 'var(--surface-base)',
  subtle: 'var(--surface-subtle)',
  inset: 'var(--surface-inset)',
}

export const Section = component$(({ spacing = 'default', surface }: SectionProps) => {
  const style: Record<string, string> = { paddingBlock: SPACING_TOKEN[spacing] }
  if (surface) style.background = SURFACE_TOKEN[surface]
  return (
    <section style={style} data-scroll-reveal>
      <Slot />
    </section>
  )
})

type SectionProps = {
  spacing?: SectionSpacing
  surface?: SectionSurface
}
