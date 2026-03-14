import { Slot, component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { primaryNav } from "~/lib/content";

export const SiteShell = component$(() => {
  const location = useLocation();

  return (
    <div class="px-4 py-5 sm:px-6 lg:px-8">
      <div class="shell-panel mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col rounded-[2rem]">
        <header class="flex flex-col gap-5 border-b px-6 py-5 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14">
          <Link href="/" class="space-y-1">
            <p class="text-lg font-semibold">Alden Gillespy</p>
            <p class="text-sm subtle-text">Personal site v3 foundation</p>
          </Link>

          <nav class="flex flex-wrap gap-2 text-sm">
            {primaryNav.map((item) => {
              const isActive =
                location.url.pathname === item.href ||
                (item.href !== "/" &&
                  location.url.pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  class="nav-pill"
                  data-active={isActive ? "true" : "false"}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main class="flex-1 px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
          <Slot />
        </main>

        <footer class="border-t px-6 py-5 text-sm subtle-text sm:px-10 lg:px-14">
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>Minimal Qwik shell for the personal site rewrite.</p>
            <p>Theme follows your system preference.</p>
          </div>
        </footer>
      </div>
    </div>
  );
});
