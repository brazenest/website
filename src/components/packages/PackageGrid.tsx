import { component$ } from '@builder.io/qwik'
import { PackageCard } from '~/components/packages/PackageCard'
import type { Package } from '~/types/content'

export const PackageGrid = component$(({ packages }: PackageGridProps) => {
  return (
    <ul class="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 xl:gap-8">
      {packages.map((pkg) => (
        <li key={pkg.slug}>
          <PackageCard {...pkg} />
        </li>
      ))}
    </ul>
  )
})

type PackageGridProps = {
  packages: Package[]
}
