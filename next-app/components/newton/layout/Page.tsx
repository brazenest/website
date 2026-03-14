export const Page = ({ id, className, children }: PageProps) => (
	<main id={id} className={className}>
		{children}
	</main>
)

type PageProps = {
  id: string
	className?: string
  children: React.ReactNode
}
