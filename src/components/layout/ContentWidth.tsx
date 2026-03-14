import { Slot, component$ } from "@builder.io/qwik";

type ContentWidthProps = {
  variant?: "content" | "prose";
  class?: string;
};

export const ContentWidth = component$<ContentWidthProps>(
  ({ variant = "content", class: className }) => {
    const widthClass = variant === "prose" ? "prose-wrap" : "content-wrap";
    const classes = className ? `${widthClass} ${className}` : widthClass;

    return (
      <div class={classes}>
        <Slot />
      </div>
    );
  },
);
