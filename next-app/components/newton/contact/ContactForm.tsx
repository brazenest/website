"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactFormProps {
    onSuccess: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		const form = e.currentTarget;

		const data = {
			name: (form.elements.namedItem("name") as HTMLInputElement).value,
			email: (form.elements.namedItem("email") as HTMLInputElement).value,
			message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
		};

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const json = await res.json();

			if (!res.ok) {
				setMessage(json.error || "Failed to send message.");
			} else {
				setMessage("sent");
				onSuccess(); // close modal
			}
		} catch (err) {
			console.error(err);
			setMessage("Network error. Try again.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<motion.form
			key="contact-form"
			onSubmit={handleSubmit}
			className="space-y-5"
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 10 }}
		>
			{/* NAME */}
			<div className="flex flex-col space-y-1">
				<label htmlFor="name" className="text-sm font-medium text-[var(--color-text)]">
                    Name
				</label>
				<input
					id="name"
					name="name"
					required
					className="
            rounded-lg border border-[var(--color-border)]
            bg-[var(--color-bg)]
            px-4 py-2
            text-[var(--color-text)]
            focus:outline-none
            focus:ring-2 focus:ring-[var(--color-accent)]
          "
				/>
			</div>

			{/* EMAIL */}
			<div className="flex flex-col space-y-1">
				<label htmlFor="email" className="text-sm font-medium text-[var(--color-text)]">
                    Email
				</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					className="
            rounded-lg border border-[var(--color-border)]
            bg-[var(--color-bg)]
            px-4 py-2
            text-[var(--color-text)]
            focus:outline-none
            focus:ring-2 focus:ring-[var(--color-accent)]
          "
				/>
			</div>

			{/* MESSAGE */}
			<div className="flex flex-col space-y-1">
				<label htmlFor="message" className="text-sm font-medium text-[var(--color-text)]">
                    Message
				</label>
				<textarea
					id="message"
					name="message"
					rows={4}
					required
					className="
            rounded-lg border border-[var(--color-border)]
            bg-[var(--color-bg)]
            px-4 py-2
            text-[var(--color-text)]
            focus:outline-none
            focus:ring-2 focus:ring-[var(--color-accent)]
          "
				/>
			</div>

			{/* ERROR MESSAGE */}
			{message && message !== "sent" && (
				<p className="text-red-500 text-sm">{message}</p>
			)}

			{/* SUBMIT BUTTON */}
			<button
				type="submit"
				disabled={loading}
				className="
          w-full rounded-lg
          bg-[var(--color-accent)]
          text-white
          font-semibold
          px-4 py-3
          transition
          hover:bg-[var(--color-accent-hover)]
          disabled:opacity-50
        "
			>
				{loading ? "Sending..." : "Send Message"}
			</button>
		</motion.form>
	);
}
