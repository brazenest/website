import { component$ } from '@builder.io/qwik'
import { SideCard } from '~/components/side/SideCard'
import type { SideLinkCardContent } from '~/types/content'

export const SideSelector = component$(({ items }: SideSelectorProps) => {
  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:gap-8">
      {items.map((item) => (
        <SideCard key={item.href} {...item} />
      ))}
    </div>
  )
})

type SideSelectorProps = {
  items: SideLinkCardContent[]
}