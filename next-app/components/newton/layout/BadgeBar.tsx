import { BadgeModel } from "@/types/ui"
import { Badge } from "../ui/Badge"

export const BadgeBar = ({ badges }: BadgeBarProps) => {

	if (badges.length === 0) throw new Error('Badges array is empty')

	return (
		<div className="badgebar flex flex-wrap gap-2 py-1">
			{badges.map(({ text }, i) => (
				<Badge key={i} text={text} />
			))}
		</div>
	)
}

type BadgeBarProps = {
  badges: BadgeModel[]
}
