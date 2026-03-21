import { component$ } from '@builder.io/qwik'
import { SideCard } from '~/components/side/SideCard'
import type { SideLinkCardContent } from '~/types/content'

export const SideSelector = component$(({ items }: SideSelectorProps) => {
  return (
    <nav aria-label="Featured sections">
      <ul role="list" class="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:gap-8">
        {items.map((item) => (
          <li key={item.href}>
            <SideCard {...item} />
          </li>
        ))}
      </ul>
    </nav>
  )
})

type SideSelectorProps = {
  items: SideLinkCardContent[]
}