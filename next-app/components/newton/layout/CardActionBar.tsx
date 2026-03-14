import { ActionModel } from "@/types/ui"
import { Action } from "../ui/Action"

export const CardActionBar = ({ actions }: CardActionBarProps) => {
	return (
		<div className="card-actionbar mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex space-x-4">

			{actions.map((action, index) => (
				<Action
					key={index}
					variant={action.variant || 'secondary'}
					size="md"
					href={action.href!}
					className="card-action"
				>
					{action.text}
				</Action>
			))}

		</div>
	)
}

type CardActionBarProps = {
	actions: ActionModel[]
}