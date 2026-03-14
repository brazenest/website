"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { SiteLogoMark } from "@/components/newton/site/SiteLogoMark";
import { useContactModal } from "@/hooks/useContactModal";
import { Button } from "../ui/Button";

export function SiteNavbar() {

	const [mobileOpen, setMobileOpen] = useState(false);
	const mobileMenuRef = useRef<HTMLDivElement | null>(null);

	const { open } = useContactModal()

	/* ---------- Close menu on click outside ---------- */
	useEffect(() => {
		function handleOutside(e: MouseEvent) {
			if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
				setMobileOpen(false);
			}
		}
		if (mobileOpen) document.addEventListener("mousedown", handleOutside);
		return () => document.removeEventListener("mousedown", handleOutside);
	}, [mobileOpen]);

	return (
		<>
			<nav className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center md:justify-between transition-all duration-300 no-underline! text-gray-800 dark:text-gray-200">

				{/* ---------- Logo ---------- */}
				<Link
					href="/"
					className="flex grow-1 items-center text-2xl"
				>
					<SiteLogoMark />
					<span className="site-logo-text">Alden Gillespy</span>
				</Link>

				{/* ---------- Desktop Nav ---------- */}
				<div className="hidden md:flex items-center gap-8">

					<NavLink id="about" href="/about">About</NavLink>
					<NavLink id="blog" href="/blog">Blog</NavLink>
					<NavLink id="contact" href="/resume" linkTarget="_blank">Resume</NavLink>

					<Button
						variant="primary"
						size="lg"
						onClick={open}
					>
							Contact Me
					</Button>

				</div>

				{/* ---------- Mobile Menu Toggle ---------- */}
				<button
					onClick={() => setMobileOpen((v) => !v)}
					className="md:hidden focus:outline-none"
				>
					<div className="space-y-1.5">
						<span
							className={clsx(
								"block h-0.5 w-6 bg-current transition-transform",
								mobileOpen && "translate-y-2 rotate-45"
							)}
						/>
						<span
							className={clsx(
								"block h-0.5 w-6 bg-current transition-opacity",
								mobileOpen && "opacity-0"
							)}
						/>
						<span
							className={clsx(
								"block h-0.5 w-6 bg-current transition-transform",
								mobileOpen && "-translate-y-2 -rotate-45"
							)}
						/>
					</div>
				</button>
			</nav>

			{/* ---------- Mobile Menu ---------- */}
			<div
				ref={mobileMenuRef}
				className={clsx(
					"md:hidden fixed top-20 left-0 w-full bg-gray-50 dark:bg-gray-950 shadow-lg transition-all duration-300 z-50",
					mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
				)}
			>
				<div className="flex flex-col p-6 gap-6">

					<MobileNavLink id="contact" href="/about" onClick={() => setMobileOpen(false)}>
						About
					</MobileNavLink>
					<MobileNavLink id="blog" href="/blog" onClick={() => setMobileOpen(false)}>
						Blog
					</MobileNavLink>
					<MobileNavLink id="blog" href="/resume" linkTarget="_blank" onClick={() => setMobileOpen(false)}>
						Resume
					</MobileNavLink>

					<Button
						variant="primary"
						size="xl"
						className="mt-2 text-center"
						onClick={open}
					>
							Contact Me
					</Button>

				</div>
			</div>
		</>
	);
}

/* ---------- Desktop Nav Link ---------- */
function NavLink({
	href,
	linkTarget,
	children,
}: {
  href: string;
	linkTarget?: string;
  children: React.ReactNode;
  id: string; // required for section-based highlighting
}) {

	return (
		<Link
			href={href}
			target={linkTarget}
			className={clsx(
				"tracking-widest relative group transition-all duration-300 text-text dark:text-dark-text",
			)}
		>
			{children}

			<span
				className={clsx(
					"absolute left-0 -bottom-1 h-[2px] rounded transition-all duration-300 w-0 group-hover:w-full bg-brand-400 dark:bg-dark-brand-400"
				)}
			/>
		</Link>
	);
}

/* ---------- Mobile Nav Link ---------- */
function MobileNavLink({ href, id, linkTarget, children, onClick }: MobileNavLinkProps) {

	return (
		<Link
			id={id}
			href={href}
			target={linkTarget}
			onClick={onClick}
			className={clsx(
				"block text-lg transition-all duration-300 tracking-widest",
			)}
		>
			{children}
		</Link>
	);
}

type MobileNavLinkProps = {
  href: string,
  id: string,
	linkTarget?: string,
  children: string,
  onClick: () => void,
}
