import { component$ } from "@builder.io/qwik";

type BadgeProps = {
  text: string;
  class?: string;
};

export const Badge = component$<BadgeProps>(({ text, class: className }) => {
  const classes = [
    "inline-flex items-center rounded-full border px-3 py-1 select-none whitespace-nowrap text-xs bg-surface/70 border-gray-300/40 text-text-muted cursor-default",
    className
  ].filter(Boolean).join(" ");

  return (
    <span class={classes}>
      {text}
    </span>
  );
});