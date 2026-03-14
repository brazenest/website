 ## old Blue (Engineering) scale
```css
  --color-brand-50: #f3f8ff;
  --color-brand-100: #e1efff;
  --color-brand-200: #bddcff;
  --color-brand-300: #8cc4ff;
  --color-brand-400: #55aaff;
  --color-brand-500: #3a9cff;
  --color-brand-600: #1d7edb;
  --color-brand-700: #1765b0;
  --color-brand-800: #144f8a;
  --color-brand-900: #123f6f;
```

## old Amber (Cinematic) scale
```css
  --color-brand-50: #3c2e1a;
  --color-brand-100: #4d351c;
  --color-brand-200: #714a23;
  --color-brand-300: #915f2a;
  --color-brand-400: #b67533;
  --color-brand-500: #ff9c4a;
  --color-brand-600: #ffa85f;
  --color-brand-700: #ffb776;
  --color-brand-800: #ffc98f;
  --color-brand-900: #ffddb2;
```


## Considered but replaced in favor of subsequent ChatGPT-suggested usage-to-color-values mapping
```css
  --color-page: var(--color-50);
  --color-surface: var(--color-100);
  --color-surface-alt: var(--color-150);
  --color-card: var(--color-200);
  --color-card-alt: var(--color-250);
  --color-panel: var(--color-300);
  --color-panel-alt: var(--color-350);
  --color-surface-strong: var(--color-400);
  --color-surface-strong-alt: var(--color-450);
  --color-disabled: var(--color-500);
  --color-border: var(--color-550);
  --color-muted: var(--color-600);
  --color-subtle: var(--color-650);
  --color-body: var(--color-900);
  --color-heading: var(--color-800);
  --color-ultra-strong: var(--color-900);
  --color-ultra-strong-rare: var(--color-950);
```

## Color Scales - Suggested Use Cases

### Neutral Light

| Weight | Category |
| ---: | --- |
| 0 | reserved base white |
| 700 | muted text |
| 750 | subdued labels |
| 800 | secondary text |
| 850 | soft primary |
| 900 | primary body text |
| 950 | strong headings |
| 975 | display text |
| 1000 | ink, reserved |

### Neutral Dark

| Weight | Category |
| ---: | --- |
| 0 | reserved base black |
| 700 | muted text |
| 750 | secondary text |
| 800 | strong secondary |
| 850 | primary body text |
| 900 | headings |
| 950 | high emphasis |
| 975 | very bright text |
| 1000 | reserved near-max |

### Cool Light

| Weight | Category |
| ---: | --- |
| 0 | pure white, reserved |
| 700 | muted tech text |
| 750 | subdued labels |
| 800 | secondary |
| 850 | soft primary |
| 900 | primary body |
| 950 | strong headings |
| 975 | display |
| 1000 | cool ink, reserved |

### Cool Dark

| Weight | Category |
| ---: | --- |
| 0 | reserved |
| 700 | muted |
| 750 | secondary text |
| 800 | strong secondary |
| 850 | primary body |
| 900 | headings |
| 950 | high emphasis |
| 975 | bright text |
| 1000 | reserved max-ish |

### Warm Light

| Weight | Category |
| ---: | --- |
| 0 | warm white, reserved |
| 700 | muted warm text |
| 750 | subdued labels |
| 800 | secondary |
| 850 | soft primary |
| 900 | primary body |
| 950 | strong headings |
| 975 | display |
| 1000 | warm ink, reserved |

### Warm dark

| Weight | Category |
| ---: | --- |
| 0 | reserved |
| 700 | muted |
| 750 | secondary |
| 800 | strong secondary |
| 850 | primary body |
| 900 | headings |
| 950 | high emphasis |
| 975 | bright text |
| 1000 | very bright, reserved |

## Contrast & Role Guidelines

### For light modes

| Role | Weights |
| --- | --- |
| Page backgrounds | 50-150 |
| Cards / sections | 150-300 |
| Borders / dividers | 400-550 |
| Muted / secondary text | 700-800 |
| Primary body text | 900 |
| Strong headings | 950 |

### For dark modes

| Role | Weights |
| --- | --- |
| Base surfaces | 100-250 |
| Cards / raised | 250-350 |
| Borders | 400-550 |
| Body text | 850 |
| Headings | 900-950 |

## Replaced color tokens

### First

```css
 /* --color-base: var(--color-0);
  --color-page: var(--color-50);
  --color-surface: var(--color-100);
  --color-surface-alt: var(--color-150);
  --color-card: var(--color-200);
  --color-panel: var(--color-250);
  --color-divider-subtle: var(--color-300);
  --color-stripe-light: var(--color-350);
  --color-stripe-dark: var(--color-400);
  --color-divider-light: var(--color-450);
  --color-divider: var(--color-500);
  --color-divider-dark: var(--color-550);
  --color-disabled: var(--color-600);
  --color-muted-alt: var(--color-650);
  --color-muted: var(--color-700);
  --color-secondary: var(--color-800);
  --color-body: var(--color-900);
  --color-heading: var(--color-950);
  --color-ultra-strong: var(--color-975);
  --color-ink: var(--color-1000); */
```

