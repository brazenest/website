import Link from "next/link"

export const Tag = ({ text, href }: TagProps) => {
	return (
		<span className="tag inline-flex items-center rounded-full border px-3 py-1 select-none whitespace-nowrap text-xs bg-surface/70 border-gray-300/40 text-text-muted cursor-default">
			{href
				? (
					<Link href={href} className="tag-link">
						<span className="tag-text">{text}</span>
					</Link>
				)
				: (
					<span className="tag-text">text</span>
				)}
		</span>
	)
}

type TagProps = {
  text: string
  href?: string
}
