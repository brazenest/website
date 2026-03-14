import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

type ActionLinkProps = {
  href: string;
  variant?: "primary" | "secondary" | "tertiary";
  class?: string;
  external?: boolean;
  newTab?: boolean;
};

export const ActionLink = component$<ActionLinkProps>(
  ({ href, variant = "tertiary", class: className, external, newTab }) => {
    const classes = ["action-link", `action-link--${variant}`, className]
      .filter(Boolean)
      .join(" ");
    const isAnchor =
      external ||
      newTab ||
      href.startsWith("#") ||
      href.startsWith("/assets/") ||
      href.startsWith("http") ||
      href.startsWith("mailto:");

    if (isAnchor) {
      return (
        <a
          href={href}
          class={classes}
          rel={newTab ? "noopener noreferrer" : undefined}
          target={newTab ? "_blank" : undefined}
        >
          <Slot />
        </a>
      );
    }

    return (
      <Link href={href} class={classes}>
        <Slot />
      </Link>
    );
  },
);
