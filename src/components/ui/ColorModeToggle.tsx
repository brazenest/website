import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { cn } from '~/fns/cn'

const STORAGE_KEY = 'color-mode-dev-setting'

type ColorMode = 'light' | 'dark'
type ColorModeSetting = 'system' | ColorMode

type ColorModeToggleProps = {
  /** Icon-only rendering for tight spaces (e.g. the mobile topbar). */
  compact?: boolean
  class?: string
}

const SETTINGS: ReadonlyArray<{
  value: ColorModeSetting
  label: string
  icon: string
}> = [
  { value: 'system', label: 'System', icon: '◐' },
  { value: 'light', label: 'Light', icon: '☀' },
  { value: 'dark', label: 'Dark', icon: '☾' },
]

const getSystemMode = (): ColorMode =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const readSetting = (): ColorModeSetting => {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' || stored === 'system'
    ? stored
    : 'system'
}

const persistSetting = (setting: ColorModeSetting) => {
  try {
    if (setting === 'system') {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, setting)
    }
  } catch {
    /* localStorage unavailable (private mode) — runtime switch still works */
  }
}

const applySetting = (setting: ColorModeSetting) => {
  const mode: ColorMode = setting === 'system' ? getSystemMode() : setting
  document.documentElement.dataset.colorMode = mode
  document.documentElement.style.colorScheme = mode
}

/**
 * Visible color-mode control offering three choices: System, Light, and Dark.
 * By default (and whenever "System" is chosen) the site follows the OS color
 * scheme via the root.tsx boot script; picking Light or Dark writes an explicit,
 * indefinitely-persisted override to localStorage under STORAGE_KEY, which the
 * boot script reads on every load to avoid a flash of the wrong theme. Choosing
 * "System" clears the override and returns to following the OS.
 *
 * - Full form (`compact` off): a segmented three-option control.
 * - Compact form (`compact` on): a single icon button that cycles
 *   System → Light → Dark → System, for tight spaces like the mobile topbar.
 */
export const ColorModeToggle = component$(
  ({ compact = false, class: className }: ColorModeToggleProps) => {
    const setting = useSignal<ColorModeSetting>('system')

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
      setting.value = readSetting()

      // Keep the control in sync when another tab changes the stored preference.
      const onStorage = (event: StorageEvent) => {
        if (event.key === STORAGE_KEY || event.key === null) {
          setting.value = readSetting()
        }
      }
      window.addEventListener('storage', onStorage)
      cleanup(() => window.removeEventListener('storage', onStorage))
    })

    const select = $((next: ColorModeSetting) => {
      setting.value = next
      persistSetting(next)
      applySetting(next)
    })

    if (compact) {
      const current = SETTINGS.find((s) => s.value === setting.value) ?? SETTINGS[0]
      const nextIndex = (SETTINGS.indexOf(current) + 1) % SETTINGS.length
      const next = SETTINGS[nextIndex]
      const label = `Color mode: ${current.label}. Switch to ${next.label}.`

      return (
        <button
          type="button"
          onClick$={() => select(next.value)}
          aria-label={label}
          title={label}
          class={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--surface-elevated)] text-base font-medium text-[var(--fg)] transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] hover:bg-[var(--surface-interactive)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2',
            className,
          )}
        >
          <span aria-hidden="true" class="leading-none">
            {current.icon}
          </span>
        </button>
      )
    }

    return (
      <div
        role="group"
        aria-label="Color mode"
        class={cn(
          'grid grid-cols-3 gap-1 rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--surface-elevated)] p-1',
          className,
        )}
      >
        {SETTINGS.map((option) => {
          const isSelected = setting.value === option.value
          return (
            <button
              key={option.value}
              type="button"
              onClick$={() => select(option.value)}
              aria-pressed={isSelected}
              title={`${option.label} mode`}
              class={cn(
                'inline-flex items-center justify-center gap-1.5 rounded-[calc(var(--radius-button)-0.25rem)] px-2 py-1.5 text-xs font-medium transition-colors duration-[var(--motion-duration-quick)] ease-[var(--motion-easing-quick)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2',
                isSelected
                  ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                  : 'text-[var(--muted)] hover:bg-[var(--surface-interactive)] hover:text-[var(--fg)]',
              )}
            >
              <span aria-hidden="true" class="text-sm leading-none">
                {option.icon}
              </span>
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>
    )
  },
)
