import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { SocialLink } from "~/lib/content";

type SocialLinkItemProps = {
  link: SocialLink;
};

export const SocialLinkItem = component$<SocialLinkItemProps>(({ link }) => {
  const label = link.handle ? `${link.label} / ${link.handle}` : link.label;

  if (!link.href) {
    return (
      <li class="link-list-item flex flex-wrap items-baseline justify-between gap-[0.4rem_1rem] p-[0.9rem_1rem]">
        <span class="link-list-label text-[1.04rem] font-semibold tracking-[-0.015em]">{label}</span>
        <span class="meta-text font-mono">{link.note}</span>
      </li>
    );
  }

  if (link.external || link.href.startsWith("http")) {
    return (
      <li class="link-list-item">
        <a
          href={link.href}
          class="link-list-label"
          rel="noopener noreferrer"
          target="_blank"
        >
          {label}
        </a>
        <span class="meta-text font-mono">{link.note}</span>
      </li>
    );
  }

  return (
    <li class="link-list-item">
      <Link href={link.href} class="link-list-label">
        {label}
      </Link>
      <span class="meta-text font-mono">{link.note}</span>
    </li>
  );
});