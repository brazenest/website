import { Slot, component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'

type TagProps = {
  class?: string
}

export const Tag = component$(({ class: className }: TagProps) => {
  return (
    <span class={cn('ui-tag', className)}>
      <Slot />
    </span>
  )
})
