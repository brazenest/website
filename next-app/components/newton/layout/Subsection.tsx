import { ImageAlign, ImageModel } from '@/types/content'
import NextImage from 'next/image'

export const Subsection = ({
	id,
	title,
	badges,
	image,
	imageAlign = 'left',
	children,
}: SubsectionProps) => {
	return (
		<div id={id} className={`subsection flex flex-col md:flex-row ${imageAlign === 'right' && 'md:flex-row-reverse'} gap-5.75 border-b border-gray-200 dark:border-gray-800 pb-9.5`}>
			{image && (
				<span className="subsection-image-wrap image-wrap w-2/5">
					<NextImage
						src={image.src}
						alt={image.alt}
						width={image.width}
						height={image.height}
						className="subsection-image rounded-lg object-cover"
					/>
				</span>
			)}
			<span className={`subsection-content-wrap ${image ? 'w-3/5' : 'w-full'} py-1.5`}>
				{title && (
					<h3 className="subsection-title text-2xl font-heading font-semibold mb-4.25">{title}</h3>
				)}
				{badges && (
					<span className="subsection-badges">Badges go here.</span>
				)}
				<span className="subsection-content">
					{children}
				</span>
			</span>
		</div>
	)
}

type SubsectionProps = {
  id: string
  title?: string
  badges?: string[]
  image?: ImageModel
  imageAlign?: ImageAlign
  children: React.ReactNode
}
