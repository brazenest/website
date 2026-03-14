import { cn } from '../../lib/cn'

export interface BadgeProps {
  text: string
  href?: string
  className?: string
}

export const Badge = ({ text, href, className }: BadgeProps) => {
  const content = (
    <span className={cn(
      "inline-flex items-center rounded-full border px-3 py-1 select-none whitespace-nowrap text-xs bg-surface/70 border-gray-300/40 text-text-muted cursor-default",
      className
    )}>
      {text}
    </span>
  )

  if (href) {
    // For linking, but since framework differs, perhaps return content and let wrapper handle
    // For now, assume no href in shared, or handle differently
    return content
  }

  return content
}