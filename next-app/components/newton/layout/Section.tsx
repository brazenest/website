import NextImage from 'next/image'
import { cn } from "@/lib/cn"
import { ImageModel } from "@/types/content"
import { SectionWidth, SectionWidthClassMap } from "@/types/layout"

export const Section = ({
	width = 'default',
	id,
	backgroundImage,
	className,
	children,
}: SectionProps) => {

	const widthClasses: SectionWidthClassMap = {
		default: "max-w-7xl mx-auto",
		wide: "max-w-8xl mx-auto",
		full: "w-full",
	}
	const spacingClasses = "py-9.75 md:py-13"
	const borderClasses = ""

	return (
		<section id={id} className={cn('px-5 md:px-9.25 lg:px-8 shadow-xs', spacingClasses, borderClasses, className)}>

			<div className={cn('section-content-wrap', widthClasses[width])}>

				{/* Section background image */}
				{backgroundImage && (
					<div className="absolute inset-0 h-full w-full object-cover">
						<NextImage
							src={backgroundImage.src}
							alt={backgroundImage.alt}
							width={backgroundImage.width}
							height={backgroundImage.height}
							className="w-full h-full object-cover"
						/>
					</div>
				)}

				{/* Section content */}
				<div className="relative z-10">
					{children}
				</div>

			</div>

		</section>
	)
}

type SectionProps = {
  width?: SectionWidth
  id: string
  backgroundImage?: ImageModel
  className?: string
  children: React.ReactNode
}
