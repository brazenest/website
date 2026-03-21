import { Slot, component$ } from '@builder.io/qwik'
import type { ContainerWidth } from '~/types/ui'

const MAX_WIDTH_TOKEN: Record<ContainerWidth, string> = {
  content: 'var(--max-w-content)',
  wide: 'var(--max-w-wide)',
  full: 'var(--max-w-full)',
}

export const Container = component$(({ width = 'wide' }: ContainerProps) => {
  return (
    <div
      class="mx-auto w-full"
      style={{
        maxWidth: MAX_WIDTH_TOKEN[width],
        paddingInline: 'var(--container-pad-x)',
      }}
    >
      <Slot />
    </div>
  )
})

type ContainerProps = {
  width?: ContainerWidth
}
