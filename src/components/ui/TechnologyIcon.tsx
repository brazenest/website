import { component$ } from "@builder.io/qwik";
import type { TechnologyIconKey } from "~/lib/content/model";

type TechnologyIconProps = {
  kind: TechnologyIconKey;
};

const renderIcon = (kind: TechnologyIconKey) => {
  switch (kind) {
    case "react":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <circle cx="12" cy="12" r="1.85" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="8.2" ry="3.35" />
          <ellipse cx="12" cy="12" rx="8.2" ry="3.35" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="8.2" ry="3.35" transform="rotate(120 12 12)" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="4.25" y="4.25" width="15.5" height="15.5" rx="2.2" stroke="currentColor" stroke-width="1.5" />
          <path d="M8 9h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          <path d="M12 9v6.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          <path d="M14.9 11.5c.82 0 1.5.55 1.5 1.28 0 .7-.53 1.08-1.33 1.24l-.64.13c-.72.15-1.18.46-1.18 1.06 0 .66.61 1.17 1.49 1.17.68 0 1.31-.22 1.82-.63" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      );
    case "nextjs":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
          <circle cx="12" cy="12" r="8.75" />
          <path d="M8.2 15.8V8.2h1.64l4.32 5.8V8.2h1.64v7.6h-1.64L9.84 10v5.8z" />
        </svg>
      );
    case "nodejs":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55">
          <path d="M12 3.2l6.8 3.9v7.8L12 18.8l-6.8-3.9V7.1z" />
          <path d="M12 8.1v5.8" />
          <path d="M9.2 9.6l2.8-1.5 2.8 1.5" />
          <path d="M9.2 14.4l2.8 1.5 2.8-1.5" />
        </svg>
      );
    case "qwik":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">
          <path d="M12 2.5l7 4v11l-7 4-7-4v-11z" />
          <path d="M12.1 7.2a4.7 4.7 0 1 0 3.35 8.04" />
          <path d="M14.55 14.1l2.25 2.5" />
        </svg>
      );
    case "typed-content":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55">
          <rect x="5" y="5" width="6.2" height="5.2" rx="1.1" />
          <rect x="12.8" y="5" width="6.2" height="5.2" rx="1.1" />
          <rect x="8.9" y="13.2" width="6.2" height="5.2" rx="1.1" />
          <path d="M11.2 7.6h1.6" />
          <path d="M12 10.2v3" />
        </svg>
      );
    case "aws":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55">
          <path d="M5.4 12.2l2.35-5.8h1.35l2.35 5.8" />
          <path d="M6.4 10h3.1" />
          <path d="M13.1 6.5v4.9c0 1.7 1 2.9 2.75 2.9s2.75-1.2 2.75-2.9V6.5" />
          <path d="M6.3 17.2c3.1 1.45 7.5 1.87 11.4.52" stroke-linecap="round" />
          <path d="M16.65 16.3l1.45 1.42-1.95.35" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      );
    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55">
          <path d="M8 15.5c-1.1 0-2-.9-2-2.02V8.9c0-2.27 1.83-4.1 4.08-4.1h1.62c2.38 0 4.3 1.93 4.3 4.3v4.77c0 1-.65 1.86-1.58 2.15" />
          <path d="M9.2 10.1h4.8" />
          <path d="M10.1 19.2V7.5" />
          <path d="M14.2 8.1c1.54.26 2.45 1.3 2.45 2.92 0 1.88-1.22 3.1-3.2 3.1h-1.9" />
        </svg>
      );
    case "elasticsearch":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55">
          <path d="M7.2 8.2c1.15-1.95 4.9-2.95 7.55-1.6" />
          <path d="M5.9 12c.95-1.1 4.55-1.55 7.7-.45" />
          <path d="M6.8 15.7c1.75-.38 4.3-.1 6 .85" />
          <path d="M15.2 14.2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6z" />
          <path d="M17.7 12.6l2.3 2.3" />
        </svg>
      );
    case "solr":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55">
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 4.5c1.85 2 2.75 3.9 2.75 5.8S13.85 14 12 15.8c-1.85-1.8-2.75-3.65-2.75-5.5S10.15 6.5 12 4.5z" />
          <path d="M6.2 15.6c1.72-.82 3.7-1.22 5.8-1.22s4.08.4 5.8 1.22" />
        </svg>
      );
  }
};

export const TechnologyIcon = component$<TechnologyIconProps>(({ kind }) => {
  return (
    <span class="technology-link__icon" aria-hidden="true">
      {renderIcon(kind)}
    </span>
  );
});
