import { Slot, component$ } from '@builder.io/qwik'
import type { SectionSpacing } from '~/types/ui'

export const Section = component$(({ spacing = 'default' }: SectionProps) => {
	const spacingClass =
		spacing === 'compact'
			? 'py-12 md:py-16'
			: spacing === 'hero'
				? 'py-20 md:py-28'
				: 'py-16 md:py-24'

	return (
		<section class={spacingClass}>
			<Slot />
		</section>
	)
})

type SectionProps = {
	spacing?: SectionSpacing
}
