import { component$ } from "@builder.io/qwik";

type SectionEyebrowProps = {
  label: string;
};

export const SectionEyebrow = component$<SectionEyebrowProps>(({ label }) => {
  return <p class="eyebrow">{label}</p>;
});
