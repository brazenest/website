import { ActionModel } from "@/types/ui"
import { CTABar } from "@/components/newton/layout/CTABar"
import { Action } from "../ui/Action"

export const EmphasisSection = ({
	id,
	heading,
	text,
	actions,
}: EmphasisSectionProps) => {
	return (
		<section id={id} className="emphasis-section py-9.75 md:py-13 px-5 md:px-9.25 lg:px-8 bg-blue-50 dark:bg-blue-900 md:rounded-xl border-2 border-blue-300 dark:border-blue-800 text-center max-w-4xl lg:max-w-7xl mx-auto">
			<div className="emphasis-section-content">
				<span className="emphasis-section-inner pb-3 block">
					<h2 className="emphasis-section-heading max-w-4xl lg:max-w-3xl mx-auto font-heading font-bold lg:font-semibold tracking-tight text-5xl leading-13.75 lg:text-6xl lg:leading-18.75 text-black dark:text-white mb-7 lg:mb-5">{heading}</h2>
					<p className="emphasis-section-text max-w-2xl mx-auto text-lg md:text-xl leading-6.25 md:leading-7 text-gray-700 dark:text-gray-300">{text}</p>
				</span>
				<div className="emphasis-section-actions-wrap">
					<CTABar className="mt-4.5">
						{actions.map((action, index) => (
							<Action key={index} size="lg" href={action.href} variant={action.variant} onClick={action.onClick}>
								{action.text}
							</Action>
						))}
					</CTABar>
				</div>
			</div>
		</section>
	)
}

type EmphasisSectionProps = {
	id: string
	heading: string
	text: string
	actions: ActionModel[]
}
