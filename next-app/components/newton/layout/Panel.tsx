import { cn } from "@/lib/cn"

export const Panel = ({ id, title, className, children }: PanelProps) => (
	<div id={id} className={`panel bg-gray-50 dark:bg-gray-950 border-blue-100 dark:border-gray-900 p-3.5 md:m-4 sm:p-3.75 shadow-sm rounded-xl`}>
		{title && (
			<h3 className="panel-title text-3xl font-heading font-bold mb-5.75">{title}</h3>
		)}
		<div className={cn('panel-content', className)}>
			{children}
		</div>
	</div>
)

type PanelProps = {
	id?: string
  title?: string
  className?: string
  children: React.ReactNode
}
