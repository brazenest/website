import { component$ } from "@builder.io/qwik";
import { PageShell } from "~/components/layout/PageShell";

export default component$(() => {
  return (
    <PageShell theme="neutral">
      <div class="p-4 text-sm mx-auto">
        <h1 class="text-2xl font-bold mb-4">Welcome to Personal Site v3</h1>
        <p class="text-base text-neutral-600">
          Tailwind CSS v4 is now active.
        </p>
      </div>
    </PageShell>
  );
});
