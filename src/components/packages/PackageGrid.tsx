import { component$ } from '@builder.io/qwik'
import { PackageCard } from '~/components/packages/PackageCard'
import type { Package } from '~/types/content'

export const PackageGrid = component$(({ packages }: PackageGridProps) => {
  const toneClasses = ['ui-package-card--tone-1', 'ui-package-card--tone-2', 'ui-package-card--tone-3'] as const

  return (
    <ul class="grid grid-cols-1 gap-5 md:gap-6 xl:grid-cols-3 xl:gap-8">
      {packages.map((pkg, index) => (
        <li key={pkg.slug}>
          <PackageCard {...pkg} toneClass={toneClasses[index % toneClasses.length]} />
        </li>
      ))}
    </ul>
  )
})

type PackageGridProps = {
  packages: Package[]
}
