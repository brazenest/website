import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'

const STORAGE_KEY = 'color-mode-dev-setting'

type ColorMode = 'light' | 'dark'

type ColorModeToggleProps = {
  /** Icon-only rendering for tight spaces (e.g. the mobile topbar). */
  compact?: boolean
  class?: string
}

/**
 * Visible light/dark switch. Defaults to light (see root.tsx color-mode
 * script); choosing dark persists to localStorage under STORAGE_KEY, which the
 * inline boot script reads on every load to avoid a flash of the wrong theme.
 */
export const ColorModeToggle = component$(
  ({ compact = false, class: className }: ColorModeToggleProps) => {
    const mode = useSignal<ColorMode>('light')

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      mode.value =
        document.documentElement.dataset.colorMode === 'dark' ? 'dark' : 'light'
    })

    const toggle = $(() => {
      const next: ColorMode = mode.value === 'dark' ? 'light' : 'dark'
      mode.value = next
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* localStorage unavailable (private mode) — runtime toggle still works */
      }
      document.documentElement.dataset.colorMode = next
      document.documentElement.style.colorScheme = next
    })

    const isDark = mode.value === 'dark'
    const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

    return (
      <button
        type="button"
        onClick$={toggle}
        aria-label={label}
        aria-pressed={isDark}
        title={label}
        class={cn(
          'inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--surface-elevated)] text-sm font-medium text-[var(--fg)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:bg-[var(--surface-interactive)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2',
          compact ? 'h-9 w-9' : 'w-full px-3 py-2',
          className,
        )}
      >
        <span aria-hidden="true" class="text-base leading-none">
          {isDark ? '☀' : '☾'}
        </span>
        {!compact && <span>{isDark ? 'Light mode' : 'Dark mode'}</span>}
      </button>
    )
  },
)
