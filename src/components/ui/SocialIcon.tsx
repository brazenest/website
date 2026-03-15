import { component$ } from "@builder.io/qwik";

type SocialIconProps = {
  kind: string;
};

const renderIcon = (kind: string) => {
  switch (kind) {
    case "Email":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <rect x="3.75" y="5.25" width="16.5" height="13.5" rx="2.2" />
          <path d="M5.7 7.2 12 12.1l6.3-4.9" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      );
    case "GitHub":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.3-3.75-1.3-.5-1.28-1.24-1.62-1.24-1.62-1-.68.08-.67.08-.67 1.12.08 1.7 1.14 1.7 1.14.98 1.7 2.6 1.2 3.23.92.1-.72.4-1.2.72-1.47-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.22 1.14-3-.1-.28-.5-1.44.1-3 0 0 .94-.3 3.08 1.14a10.5 10.5 0 0 1 5.6 0c2.14-1.46 3.08-1.14 3.08-1.14.6 1.56.22 2.72.1 3 .72.8 1.14 1.78 1.14 3 0 4.3-2.62 5.24-5.12 5.5.42.36.78 1.06.78 2.16v3.2c0 .3.2.66.78.54A11.2 11.2 0 0 0 12 .8Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.2 8.2a2.9 2.9 0 0 0-2.04-2.06C17.35 5.6 12 5.6 12 5.6s-5.35 0-7.16.54A2.9 2.9 0 0 0 2.8 8.2 30.6 30.6 0 0 0 2.25 12c0 1.3.18 2.57.55 3.8a2.9 2.9 0 0 0 2.04 2.06c1.81.54 7.16.54 7.16.54s5.35 0 7.16-.54a2.9 2.9 0 0 0 2.04-2.06c.37-1.23.55-2.5.55-3.8 0-1.3-.18-2.57-.55-3.8ZM10.2 15.45V8.55L15.95 12l-5.75 3.45Z" />
        </svg>
      );
    case "LinkedIn":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M5.4 8.4A1.8 1.8 0 1 1 5.4 4.8a1.8 1.8 0 0 1 0 3.6ZM3.9 9.9h3v10.2h-3V9.9Zm5 0h2.88v1.4h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.58v5.8h-3v-5.14c0-1.22-.02-2.8-1.7-2.8-1.7 0-1.96 1.33-1.96 2.7v5.24h-3V9.9Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
          <circle cx="12" cy="12" r="7.5" />
        </svg>
      );
  }
};

export const SocialIcon = component$<SocialIconProps>(({ kind }) => {
  return <span class="social-icon" aria-hidden="true">{renderIcon(kind)}</span>;
});
