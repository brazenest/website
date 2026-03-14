"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContactModal } from "@/hooks/useContactModal";
import ContactForm from "./ContactForm";

export default function ContactModal() {
	const { isOpen, close } = useContactModal();
	const overlayRef = useRef<HTMLDivElement>(null);

	// Lock body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [isOpen]);

	// Close when pressing ESC
	useEffect(() => {
		function handleKey(e: KeyboardEvent) {
			if (e.key === "Escape") close();
		}
		window.addEventListener("keydown", handleKey);
		return () => window.removeEventListener("keydown", handleKey);
	}, [close]);

	// Close when clicking outside modal
	function handleOverlayClick(e: React.MouseEvent) {
		if (e.target === overlayRef.current) {
			close();
		}
	}

	return (
		<AnimatePresence mode="wait">
			{isOpen && (
				<motion.div
					ref={overlayRef}
					onClick={handleOverlayClick}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="
            fixed inset-0 z-[9999] 
            bg-black/50 
            backdrop-blur-sm 
            flex items-center justify-center 
            px-4
          "
				>
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 20, scale: 0.95 }}
						transition={{ type: 'spring', stiffness: 260, damping: 20 }}
						className="
              relative w-full max-w-lg 
              rounded-2xl 
              bg-gray-50
							dark:bg-gray-950 
              p-8 
              shadow-2xl 
              border border-gray-700 dark:border-gray-400
            "
					>
						{/* CLOSE BUTTON */}
						<button
							onClick={close}
							className="
                absolute top-4 right-4 
                text-[var(--color-text)] 
                hover:text-[var(--color-accent)] 
                transition
              "
							aria-label="Close contact form"
						>
                            ✕
						</button>

						{/* HEADER */}
						<h2 className="text-2xl font-semibold mb-4 text-[var(--color-text)]">
                            Get in Touch
						</h2>
						<p className="text-[var(--color-text-subtle)] mb-6">
                            Send me a message and I’ll get back to you soon.
						</p>

						{/* CONTACT FORM — SUCCESS CLOSES MODAL */}
						<ContactForm onSuccess={close} />
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
