import { Slot, component$ } from '@builder.io/qwik'
import type { ContainerWidth } from '~/types/ui'

export const Container = component$(({ width = 'default' }: ContainerProps) => {
  const maxWidthClass =
    width === 'narrow'
      ? 'max-w-[70ch]'
      : 'max-w-[80rem]'

  return (
    <div class={`mx-auto w-full px-4 md:px-8 ${maxWidthClass}`}>
      <Slot />
    </div>
  )
})

type ContainerProps = {
  width?: ContainerWidth
}
