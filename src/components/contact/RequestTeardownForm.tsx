import { component$, useSignal, $ } from "@builder.io/qwik";
import { trackTeardownRequest } from "~/fns/analytics";

type FormState = "idle" | "submitting" | "success" | "error";

export const RequestTeardownForm = component$(() => {
  const formState = useSignal<FormState>("idle");
  const errorMessage = useSignal("");

  const handleSubmit$ = $(
    async (event: SubmitEvent, element: HTMLFormElement) => {
      const form = element;

      formState.value = "submitting";

      try {
        const formData = new FormData(form);
        const intent = formData.get("intent")?.toString() || "unknown";

        const response = await fetch("/api/contact/teardown", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          errorMessage.value =
            error.message || "Failed to submit form. Please try again.";
          formState.value = "error";
          return;
        }

        // Track successful submission
        trackTeardownRequest(intent);

        formState.value = "success";
        form.reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          formState.value = "idle";
        }, 5000);
      } catch {
        errorMessage.value =
          "Network error. Please check your connection and try again.";
        formState.value = "error";
      }
    },
  );

  return (
    <form
      preventdefault:submit
      onSubmit$={handleSubmit$}
      class="flex flex-col gap-5 md:gap-6"
    >
      <div class="flex flex-col gap-5">
        {/* Website URL */}
        <div class="flex flex-col gap-2">
          <label for="website-url" class="text-sm font-medium text-[var(--fg)]">
            Website URL
          </label>
          <input
            id="website-url"
            type="url"
            name="websiteUrl"
            placeholder="https://example.com"
            required
            disabled={formState.value === "submitting"}
            class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--fg)] placeholder-[var(--muted)] transition-colors focus:border-[var(--focus)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]/10 disabled:opacity-50"
          />
        </div>

        {/* Intent Selector */}
        <div class="flex flex-col gap-2">
          <label for="intent" class="text-sm font-medium text-[var(--fg)]">
            What are you looking for?
          </label>
          <select
            id="intent"
            name="intent"
            required
            disabled={formState.value === "submitting"}
            class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--fg)] transition-colors focus:border-[var(--focus)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]/10 disabled:opacity-50"
          >
            <option value="">Select an option</option>
            <option value="teardown">Website Teardown Review</option>
            <option value="project">Project Inquiry</option>
            <option value="both">Both</option>
          </select>
        </div>

        {/* Optional: Email */}
        <div class="flex flex-col gap-2">
          <label for="email" class="text-sm font-medium text-[var(--muted)]">
            Your email (optional)
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@example.com"
            disabled={formState.value === "submitting"}
            class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--fg)] placeholder-[var(--muted)] transition-colors focus:border-[var(--focus)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]/10 disabled:opacity-50"
          />
        </div>

        {/* Optional: Context */}
        <div class="flex flex-col gap-2">
          <label for="context" class="text-sm font-medium text-[var(--muted)]">
            Brief context (optional)
          </label>
          <textarea
            id="context"
            name="context"
            placeholder="What's your current situation or goals?"
            disabled={formState.value === "submitting"}
            rows={3}
            class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--fg)] placeholder-[var(--muted)] transition-colors focus:border-[var(--focus)] focus:outline-none focus:ring-2 focus:ring-[var(--focus)]/10 disabled:opacity-50 resize-none"
          />
        </div>
      </div>

      {/* Status Messages */}
      {formState.value === "error" && (
        <div class="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--muted)]">
          {errorMessage.value}
        </div>
      )}

      {formState.value === "success" && (
        <div class="rounded-[var(--radius-lg)] border border-green-200/30 bg-green-50/30 px-4 py-3 text-sm text-[var(--fg)]">
          Thanks for reaching out! I'll review your site and send a breakdown
          soon.
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={
          formState.value === "submitting" || formState.value === "success"
        }
        class="rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--fg)_18%,transparent)] bg-[var(--color-neutral-950)] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:border-[var(--color-neutral-950)] hover:bg-[var(--color-neutral-900)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fg)]/15 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {formState.value === "submitting" && "Sending..."}
        {formState.value === "success" && "Sent!"}
        {(formState.value === "idle" || formState.value === "error") &&
          "Send Teardown Request"}
      </button>
    </form>
  );
});
