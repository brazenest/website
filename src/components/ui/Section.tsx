import { Slot, component$ } from '@builder.io/qwik'
import type { SectionSpacing } from '~/types/ui'

const SPACING_TOKEN: Record<NonNullable<SectionSpacing>, string> = {
  default: 'var(--section-pad-y)',
  compact: 'var(--section-pad-y-compact)',
  hero: 'var(--section-pad-y-hero)',
}

export const Section = component$(({ spacing = 'default' }: SectionProps) => {
  return (
    <section style={{ paddingBlock: SPACING_TOKEN[spacing] }}>
      <Slot />
    </section>
  )
})

type SectionProps = {
  spacing?: SectionSpacing
}
