export const getDatabaseUrl = () => (
	`postgresql://${process.env.NEXT_PUBLIC_DB_USER}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@${process.env.NEXT_PUBLIC_DB_HOST}:${process.env.NEXT_PUBLIC_DB_PORT}/${process.env.NEXT_PUBLIC_DB_NAME}?schema=public`
)
