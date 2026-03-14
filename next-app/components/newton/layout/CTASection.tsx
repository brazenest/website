import { ActionModel } from "@/types/ui"
import { EmphasisSection } from "./EmphasisSection"

export const CTASection = ({
	id,
	heading,
	text,
	actions,
}: CTASectionProps) => {
	return (
		<EmphasisSection
			id={id}
			heading={heading}
			text={text}
			actions={actions}
		/>
	)
}

type CTASectionProps = {
	id: string
  heading: string
  text: string
  actions: ActionModel[]
}
