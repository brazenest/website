import { Slot, component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

type SmartLinkProps = {
  href?: string;
  external?: boolean;
  newTab?: boolean;
  class?: string;
};

export const SmartLink = component$<SmartLinkProps>(
  ({ href, external, newTab, class: className }) => {
    if (!href) {
      return (
        <span class={className}>
          <Slot />
        </span>
      );
    }

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
          class={className}
          rel={newTab ? "noopener noreferrer" : undefined}
          target={newTab ? "_blank" : undefined}
        >
          <Slot />
        </a>
      );
    }

    return (
      <Link href={href} class={className}>
        <Slot />
      </Link>
    );
  },
);