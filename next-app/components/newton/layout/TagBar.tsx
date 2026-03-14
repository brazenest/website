import { TagModel } from "@/types/ui"
import { Tag } from "../ui/Tag"

export const TagBar = ({ tags }: TagBarProps) => {
	return (
		<div className="tagbar flex flex-wrap gap-2">
			{tags.map((tag, i) => <Tag key={i} text={tag.name} href={`/blog/tags/${tag.slug}`} />)}
		</div>
	)
}

type TagBarProps = {
	tags: TagModel[]
}
