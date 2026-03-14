"use client";

import { useEffect, useState } from "react";

export function useTheme() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const doc = document.documentElement;
		const stored = localStorage.getItem("theme") as "light" | "dark" | null;

		const initial =
            stored ??
            (window.matchMedia("(prefers-color-scheme: dark)").matches
            	? "dark"
            	: "light");

		doc.setAttribute("data-theme", initial);
		setTheme(initial);
	}, []);

	const toggle = () => {
		const next = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", next);
		document.documentElement.setAttribute("data-theme", next);
		setTheme(next);
	};

	return { theme, toggle };
}
