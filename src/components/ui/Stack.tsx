import { Slot, component$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'
import type { StackGap } from '~/types/ui'

type StackProps = {
  gap?: StackGap
  class?: string
}

const GAP_TOKEN: Record<StackGap, string> = {
  xs: 'var(--stack-gap-xs)',
  sm: 'var(--stack-gap-sm)',
  md: 'var(--stack-gap-md)',
  lg: 'var(--stack-gap-lg)',
  xl: 'var(--stack-gap-xl)',
}

export const Stack = component$(({ gap = 'md', class: className }: StackProps) => {
  return (
    <div class={cn('flex flex-col', className)} style={{ gap: GAP_TOKEN[gap] }}>
      <Slot />
    </div>
  )
})