import NextImage from 'next/image'
import { ImageModel } from "@/types/ui"

export const SectionHeading = ({ title, subtitle, thumbnail }: SectionHeadingProps) => {
	return (
		<header className="section-heading-wrap mb-10.5 grid md:grid-cols-5 gap-6">
			<div className="section-heading-textarea md:col-span-3">
				<h2 className="section-heading-title mb-5.25 lg:max-w-4xl text-4xl lg:text-5xl font-heading font-semibold leading-10.25 lg:leading-15">{title}</h2>
				{subtitle && (
					<p className="section-heading-subtitle max-w-2xl lg:max-w-3xl py-1.25 font-light xl:text-lg text-gray-600 dark:text-gray-400 tracking-wide leading-7.5">{subtitle}</p>
				)}
			</div>
			{thumbnail && (
				<div className="section-heading-thumbnail-wrap md:col-span-2 flex justify-center">
					<NextImage
						src={thumbnail.src}
						alt={thumbnail.alt}
						width={thumbnail.width}
						height={thumbnail.height}
					/>
				</div>
			)}
		</header>
	)
}

type SectionHeadingProps = {
  title: string
  subtitle?: string
	thumbnail?: ImageModel
}
