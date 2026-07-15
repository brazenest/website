/**
 * WCAG 2.x contrast-ratio helpers used by the colour engine's --w-on snap rule (BUILD.md §3b):
 * --w-on must be whichever of white / deep ink clears 4.5:1 against --w-key.
 */

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const int = parseInt(full, 16)
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const v = c / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

export function contrastRatio(hexA: string, hexB: string): number {
  const lumA = relativeLuminance(hexToRgb(hexA))
  const lumB = relativeLuminance(hexToRgb(hexB))
  const [lighter, darker] = lumA >= lumB ? [lumA, lumB] : [lumB, lumA]
  return (lighter + 0.05) / (darker + 0.05)
}

/** Snap to whichever of white / deep ink clears 4.5:1 against `key`; never interpolates. */
export function pickOnColor(key: string, deep: string): string {
  const white = '#FFFFFF'
  return contrastRatio(key, white) >= 4.5 ? white : deep
}
