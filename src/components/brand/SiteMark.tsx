import { component$ } from "@builder.io/qwik";

export const SiteMark = component$(({ class: className, title, variant = "mono" }: SiteMarkProps) => {
  const primaryStroke = variant === "color" ? "var(--accent)" : "currentColor";
  const secondaryStroke = variant === "color" ? "var(--impact)" : "currentColor";

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      class={className}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M7.75 23.5L16 8.5L24.25 23.5"
        stroke={primaryStroke}
        stroke-width="2.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.25 18.5H22.75"
        stroke={secondaryStroke}
        stroke-width="2.25"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});

type SiteMarkProps = {
  class?: string;
  title?: string;
  variant?: "mono" | "color";
};
