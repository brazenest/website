export const Badge = ({ text }: BadgeProps) => {
	return (
		<span className="inline-flex items-center rounded-full border px-3 py-1 select-none whitespace-nowrap text-xs bg-surface/70 border-gray-300/40 text-text-muted cursor-default">
			{text}
		</span>
	)
}

type BadgeProps = {
  text: string
}
