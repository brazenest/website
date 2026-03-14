import { Slot, component$ } from "@builder.io/qwik";

type ContentWidthProps = {
  variant?: "content" | "page" | "prose";
  class?: string;
};

export const ContentWidth = component$<ContentWidthProps>(
  ({ variant = "content", class: className }) => {
    const widthClass =
      variant === "prose"
        ? "prose-wrap w-[min(100%,var(--prose-width))] mx-auto"
        : variant === "page"
          ? "page-wrap w-[min(100%,var(--page-width))] mx-auto"
          : "content-wrap w-[min(100%,var(--content-width))] mx-auto";
    const classes = className ? `${widthClass} ${className}` : widthClass;

    return (
      <div class={classes}>
        <Slot />
      </div>
    );
  },
);
