// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class', '[data-theme="dark"]'],
	theme: {
		extend: {
			fontFamily: {
				// default body
				sans: [
					'var(--font-engineering)',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'sans-serif',
				],
				// explicit classes: font-engineering, font-cinematic, font-heading
				engineering: [
					'var(--font-engineering)',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'sans-serif',
				],
				cinematic: [
					'var(--font-cinematic)',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'sans-serif',
				],
				heading: [
					'var(--font-cinematic)',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'sans-serif',
				],
			},
			borderRadius: {
				sm: "var(--radius-sm)",
				md: "var(--radius-md)",
				lg: "var(--radius-lg)",
				xl: "var(--radius-xl)",
			},
			boxShadow: {
				sm: "var(--shadow-sm)",
				md: "var(--shadow-md)",
				lg: "var(--shadow-lg)",
			},
			spacing: {
				1: "var(--space-1)",
				2: "var(--space-2)",
				3: "var(--space-3)",
				4: "var(--space-4)",
				6: "var(--space-6)",
				8: "var(--space-8)",
				12: "var(--space-12)",
				16: "var(--space-16)",
				gutter: 'var(--layout-gutter)',
			},
			fontSize: {
				xs: "var(--text-xs)",
				sm: ["var(--text-sm)", "calc(0.875rem * 24 / 14)"],
				base: "var(--text-base)",
				lg: ["var(--text-lg)", "calc(1.125rem * 26 / 18)"],
				xl: "var(--text-xl)",
				"2xl": "var(--text-2xl)",
				"3xl": "var(--text-3xl)",
				"4xl": "var(--text-4xl)",
				"5xl": ["var(--text-5xl)", "calc(3rem * 56 / 48)"],
				"6xl": ["var(--text-6xl)", "calc(3.75rem * 74 / 60)"],
			},
			screens: {
				'3xl': '1920px',
			},
			maxWidth: {
				'content-max': 'var(--layout-content-max)',
				'content-wide': 'var(--layout-content-wide)',
			},
		},
	},
	plugins: [],
}

export default config
