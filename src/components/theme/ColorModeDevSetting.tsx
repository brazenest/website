import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { cn } from "~/fns/cn";

type ColorMode = "light" | "dark";
type ColorModeSetting = "system" | ColorMode;

const STORAGE_KEY = "color-mode-dev-setting";

const getSystemColorMode = (): ColorMode => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getStoredSetting = (): ColorModeSetting => {
  const storedSetting = window.localStorage.getItem(STORAGE_KEY);

  if (
    storedSetting === "system" ||
    storedSetting === "dark" ||
    storedSetting === "light"
  ) {
    return storedSetting;
  }

  return "system";
};

const applyColorMode = (mode: ColorMode) => {
  document.documentElement.dataset.colorMode = mode;
  document.documentElement.style.colorScheme = mode;
};

export const ColorModeDevSetting = component$(() => {
  const setting = useSignal<ColorModeSetting>("system");
  const effectiveMode = useSignal<ColorMode>("light");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const syncColorMode = () => {
      setting.value = getStoredSetting();
      effectiveMode.value =
        setting.value === "system" ? getSystemColorMode() : setting.value;
      applyColorMode(effectiveMode.value);
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      syncColorMode();
    };

    syncColorMode();
    mediaQuery.addEventListener("change", syncColorMode);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mediaQuery.removeEventListener("change", syncColorMode);
      window.removeEventListener("storage", handleStorageChange);
    };
  });

  const options: Array<{ label: string; value: ColorModeSetting }> = [
    { label: "System", value: "system" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  return (
    <section class="flex flex-col gap-4 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface-subtle)] p-5 md:p-6">
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
          Development display mode
        </h2>
        <p class="text-base leading-7 text-[var(--muted)]">
          The public site follows system preference. These controls only set a
          local override for this browser while reviewing the site.
        </p>
      </div>

      <div
        class="grid gap-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-2 sm:grid-cols-3"
        role="group"
        aria-label="Development display mode"
      >
        {options.map((option) => {
          const isSelected = setting.value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected ? "true" : "false"}
              class={cn(
                "rounded-[var(--radius-lg)] px-4 py-3 text-sm font-semibold transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2",
                isSelected
                  ? "bg-[var(--accent)] text-[var(--accent-fg)]"
                  : "bg-transparent text-[var(--muted)] hover:bg-[var(--surface-interactive)] hover:text-[var(--fg)]",
              )}
              onClick$={() => {
                setting.value = option.value;
                if (option.value === "system") {
                  window.localStorage.removeItem(STORAGE_KEY);
                  effectiveMode.value = getSystemColorMode();
                } else {
                  // Explicit choice; persists indefinitely until changed.
                  window.localStorage.setItem(STORAGE_KEY, option.value);
                  effectiveMode.value = option.value;
                }
                applyColorMode(effectiveMode.value);
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p class="text-sm leading-6 text-[var(--muted)]">
        Active render: {effectiveMode.value}
      </p>
    </section>
  );
});
