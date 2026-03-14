import { cn } from "@/lib/cn"

export const CTABar = ({ className, children }: CTABarProps) => {
	return (
		<div className={cn("ctabar flex justify-center space-x-4 p-2.25", className)}>
			{children}
		</div>
	)
}

type CTABarProps = {
	className?: string
  children: React.ReactNode
}
