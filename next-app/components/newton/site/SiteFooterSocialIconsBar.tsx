import { FaGithub, FaYoutube, FaFlickr, FaLinkedin, FaTwitter, FaStackOverflow } from "react-icons/fa";
import clsx from "clsx";
import Link from "next/link";

export function SiteFooterSocialIconsBar({ className = "" }) {
	const iconClass =
        "text-text dark:text-dark-text hover:text-brand-500 dark:hover:text-dark-brand-500 transition-colors text-2xl";

	return (
		<div className={clsx("flex justify-center gap-6", className)}>
			<Link href="https://github.com/brazenest/" target="_blank">
				<FaGithub className={iconClass} />
			</Link>
			<Link href="https://youtube.com/c/SHADOWCATpictures" target="_blank">
				<FaYoutube className={iconClass} />
			</Link>
			<Link href="https://stackoverflow.com/users/3200445/alden-gillespy" target="_blank">
				<FaStackOverflow className={iconClass} />
			</Link>
			<Link href="https://x.com/AldenGillespy" target="_blank">
				<FaTwitter className={iconClass} />
			</Link>
			<Link href="https://www.linkedin.com/in/alden-gillespy" target="_blank">
				<FaLinkedin className={iconClass} />
			</Link>
			<Link href="https://www.flickr.com/photos/brazenest/" target="_blank">
				<FaFlickr className={iconClass} />
			</Link>
		</div>
	);
}
