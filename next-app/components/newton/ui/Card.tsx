import NextImage from "next/image"
import { ImageModel } from "@/types/content"
import { ActionModel, BadgeModel, CardLayoutVariant, CardSize, CardSizeStyleMap } from "@/types/ui"
import { CardActionBar } from "../layout/CardActionBar"
import { BadgeBar } from "../layout/BadgeBar"
import { LinkSymbol } from "./LinkSymbol"
import { cn } from "@/lib/cn"
import { AsymmetricLayout } from "../layout/AsymmetricLayout"

export const Card = ({
	size = 'md',
	layoutVariant = 'default',
	id,
	title,
	image,
	actions = [],
	badges = [],
	withLinkSymbol = false,
	className,
	children,
}: CardProps) => {

	const cardSizeClasses: CardSizeStyleMap = {
		sm: {
			title: 'text-xl mb-4.5',
			content: 'text-sm',
		},
		md: {
			title: 'text-2xl mb-5',
			content: 'text-base',
		},
		lg: {
			title: 'text-3xl',
			content: 'text-lg',
		},
	}



	return (
		<div id={id} className={cn("card flex flex-col bg-gray3-100 dark:bg-gray-950 border-r-2 border-b-2 border-l border-t border-blue-200 rounded-lg shadow-md p-4.5", className)}>

			{/* Card title */}
			{title && (
				<h4 className={cn('card-title text-2xl font-heading font-semibold leading-6.75 text-gray-800 dark:text-gray-200 hover:text-inherit', cardSizeClasses[size].title)}>
					{title}
					{withLinkSymbol && (
						<LinkSymbol />
					)}
				</h4>
			)}

			{layoutVariant === 'default' ? (
				<span className="text-gray-600 dark:text-gray-400">
					{children}
				</span>
			) : (<>
				<AsymmetricLayout 
					variant={layoutVariant}
					first={image && (<>
						{/* Card image */}
						<NextImage
							src={image.src}
							alt={image.alt}
							width={image.width}
							height={image.height}
							className="card-image rounded-md pb-5.5 bg-green-5020"
						/>
					</>)}
					second={<>
						{/* Card content */}
						<span className={cn('card-content col-span-2 text-gray-600 dark:text-gray-300', cardSizeClasses[size].content)}>
							{children}
						</span>
					</>}
				/>

				{badges.length > 0 && (
					<span className="card-badges mt-3.25">
						<BadgeBar badges={badges} />
					</span>
				)}

				{/* Card actions */}
				{actions.length > 0 && (
					<CardActionBar actions={actions} />
				)}
			</>)}

		</div>
	)
}

type CardProps = {
	size?: CardSize
	layoutVariant?: CardLayoutVariant
	id?: string
	title?: string
	image?: ImageModel
	badges?: BadgeModel[]
	actions?: ActionModel[]
	withLinkSymbol?: boolean
	className?: string
	children: React.ReactNode
}