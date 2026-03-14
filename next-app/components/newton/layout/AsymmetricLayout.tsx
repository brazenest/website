import { cn } from "@/lib/cn"
import { AsymmetricLayoutVariant, AsymmetricLayoutVariantStyleMap } from "@/types/layout"

export const AsymmetricLayout = ({ variant, first, second }: AsymmetricLayoutProps) => {

	const variantClasses: AsymmetricLayoutVariantStyleMap = {
		'two-thirds-left': {
			container: 'flex flex-col gap-8 md:flex-row-reverse',
			first: 'md:w-1/3',
			second: 'md:w-2/3',
		},
		'two-thirds-right': {
			container: 'flex flex-col gap-8 md:flex-row',
			first: 'md:w-1/3',
			second: 'md:w-2/3',
		},
	}

	return (
		<div className={cn("asymmetric-layout", variantClasses[variant].container)}>
			<div className={cn("asymmetric-layout-first", variantClasses[variant].first)}>
				{first}
			</div>
			<div className={cn("asymmetric-layout-second", variantClasses[variant].second)}>
				{second}
			</div>
		</div>
	)
}

type AsymmetricLayoutProps = {
  variant: AsymmetricLayoutVariant
  first: React.ReactNode
  second: React.ReactNode
}