import type { NextConfig } from "next";
import path from "path";
// @ts-check

const nextConfigFn = () => {
	/**
   * @type {import('next').NextConfig}
   */
	const nextConfig: NextConfig = {
		/* config options here */
		reactStrictMode: true,
		sassOptions: {
			includePaths: [path.join(__dirname, "styles")],
		},
		async headers() {
			return [
				{
					// matching all API routes
					source: "/:path*",
					headers: [
						{ key: "Access-Control-Allow-Credentials", value: "true" },
						{ key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
						{ key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
						{ key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
					]
				}
			]
		},
		async redirects() {
			return [
				{
					source: '/blog',
					destination: '/blog/posts',
					permanent: true,
				},
			];
		},
		experimental: {
			serverActions: {
				// edit: updated to new key. Was previously `allowedForwardedHosts`
				allowedOrigins: [
					'localhost',
					'stunning-guide-grjrr7659p439wwx-3000.app.github.dev',
				],
			},
		},
	};
	return nextConfig
}

export default nextConfigFn
