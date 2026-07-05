import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { SiteMark } from '~/components/brand/SiteMark'
import { ColorModeToggle } from '~/components/ui/ColorModeToggle'
import { cn } from '~/fns/cn'

type NavLink = { href: string; label: string }

const workLinks: NavLink[] = [
  { href: '/for-hire', label: 'For Hire' },
  { href: '/engineering', label: 'Engineering' },
  { href: '/production', label: 'Production' },
  { href: '/packages', label: 'Packages' },
]

const infoLinks: NavLink[] = [
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

export const SideNav = component$(() => {
  const isOpen = useSignal(false)
  const currentPath = useSignal('')

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    currentPath.value = window.location.pathname
  })

  const isActive = (href: string) =>
    href === '/' ? currentPath.value === '/' : currentPath.value.startsWith(href)

  return (
    <div class="v5-nav-host">
      {/* Mobile backdrop. One handler closes the drawer. */}
      <div
        aria-hidden="true"
        class={cn('v5-drawer-overlay', isOpen.value && 'is-open')}
        onClick$={() => {
          isOpen.value = false
        }}
      />

      {/* Mobile topbar */}
      <div class="v5-topbar" role="banner">
        <a href="/" class="v5-topbar-brand">
          <SiteMark class="h-6 w-6 shrink-0" />
          <span>Alden Gillespy</span>
        </a>
        <div class="flex items-center gap-2">
          <ColorModeToggle compact />
          <button
            type="button"
            class="v5-topbar-hamburger"
            aria-label={isOpen.value ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen.value}
            aria-controls="v5-sidebar"
            onClick$={() => {
              isOpen.value = !isOpen.value
            }}
          >
            <span class="sr-only">{isOpen.value ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" class="relative block h-4 w-5">
              <span
                class={cn(
                  'absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ease-in-out',
                  isOpen.value && 'translate-y-[5px] rotate-45',
                )}
              />
              <span
                class={cn(
                  'absolute bottom-1 left-0 block h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ease-in-out',
                  isOpen.value && '-translate-y-[5px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Sidebar. A single delegated click handler on the <aside> closes the
          mobile drawer whenever any link inside is activated, so each link does
          not need its own lazy-loaded QRL chunk. */}
      <aside
        id="v5-sidebar"
        class={cn('v5-sidebar', isOpen.value && 'is-open')}
        aria-label="Site navigation"
        onClick$={(event) => {
          if ((event.target as HTMLElement).closest('a')) {
            isOpen.value = false
          }
        }}
      >
        <div class="v5-sidebar-logo">
          <a href="/">
            <SiteMark class="h-6 w-6 shrink-0" variant="color" />
            <span>Alden Gillespy</span>
          </a>
        </div>

        <nav class="v5-sidebar-nav" aria-label="Primary">
          <a
            href="/"
            class={cn('v5-sidebar-link', isActive('/') && 'is-active')}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Home
          </a>

          <div class="v5-sidebar-divider" role="separator" />
          <p class="v5-sidebar-section-label">Work</p>

          {workLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              class={cn('v5-sidebar-link', isActive(link.href) && 'is-active')}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}

          <div class="v5-sidebar-divider" role="separator" />
          <p class="v5-sidebar-section-label">Discover</p>

          {infoLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              class={cn('v5-sidebar-link', isActive(link.href) && 'is-active')}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div class="v5-sidebar-footer">
          <ColorModeToggle class="mb-3" />
          <p>© {new Date().getFullYear()} Alden Gillespy</p>
        </div>
      </aside>
    </div>
  )
})
