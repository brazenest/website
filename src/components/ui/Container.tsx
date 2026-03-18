import { Slot, component$ } from '@builder.io/qwik'
import type { ContainerWidth } from '~/types/ui'

export const Container = component$(({ width = 'default' }: ContainerProps) => {
  const maxWidthClass =
    width === 'narrow'
      ? 'max-w-[70ch]'
      : 'max-w-[80rem]'

  return (
    <div class={`mx-auto w-full ${maxWidthClass}`} style={{ paddingInline: 'var(--container-pad-x)' }}>
      <Slot />
    </div>
  )
})

type ContainerProps = {
  width?: ContainerWidth
}
