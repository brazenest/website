import { Slot, component$ } from '@builder.io/qwik'
import type { ThemeName } from '~/types/ui'

export const PageShell = component$(({ theme }: PageShellProps) => {
  return (
    <div data-theme={theme} class="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text-body)]">
      <Slot />
    </div>
  )
})

type PageShellProps = {
  theme: ThemeName
}
