import { cn } from "@/lib/cn"
import { CardListType } from "@/types/layout"

export const CardList = ({ listType = 'div', className, children }: CardListProps) => {
	const ListContainer = listType
	const defaultClassName = "card-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5"

	return (
		<ListContainer className={cn(defaultClassName, className)}>
			{children}
		</ListContainer>
	)
}

type CardListProps = {
	listType?: CardListType
	className?: string
	children: React.ReactNode
}
