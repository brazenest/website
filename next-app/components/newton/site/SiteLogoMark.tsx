'use client';

import { motion } from 'framer-motion';

export const SiteLogoMark = ({ size = 32 }: { size?: number }) => (
	<motion.svg
		viewBox={`0 0 39 ${size}`}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="h-11 w-auto transition-transform duration-300"
		whileHover={{ scale: 1.03 }}
	>
		{/* “A” mark */}
		<motion.path
			d="M5 27L16 5L27 27H22L16 15L10 27H5Z"
			fill="var(--color-accent)"
			transition={{ duration: 0.3 }}
		/>
		{/* Clean geometric “G”
          Technique: circle stroke with a controlled gap (dasharray) + inner bar.
          - Round linecaps make the gap ends look intentional.
          - We rotate the circle so the gap sits on the RIGHT.
      */}
		<motion.circle
			cx="70"
			cy="24"
			r="9"
			fill="none"
			stroke="var(--color-text)"
			strokeWidth="4"
			strokeLinecap="round"
			/* circumference ≈ 2πr = ~75.4
         visible arc  = 56, gap ≈ 19.4  */
			strokeDasharray="56 20"
			transform="rotate(-90 54 32)" /* puts the gap at 3 o’clock */
			transition={{ duration: 0.3 }}
		/>
		{/* Horizontal bar inside the gap */}
		<motion.line
			x1="31"
			y1="20"
			x2="61"
			y2="12"
			stroke="var(--color-text)"
			strokeWidth="4"
			strokeLinecap="round"
			transition={{ duration: 0.3 }}
		/>
		{/* Name text */}
		<text
			x="73"
			y="22"
			fontFamily="Space Grotesk, sans-serif"
			fontWeight="600"
			fontSize="13"
			fill="var(--color-text)"
			letterSpacing="0.02em"
		>
      Alden Gillespy
		</text>
	</motion.svg>
)

