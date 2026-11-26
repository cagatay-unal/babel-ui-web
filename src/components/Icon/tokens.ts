export const ICON_SIZE_TOKENS = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
} as const;

export type IconSize = keyof typeof ICON_SIZE_TOKENS;

export const ICON_VARIANT_TOKENS = [
  "current",
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "muted",
] as const;

export type IconVariant = (typeof ICON_VARIANT_TOKENS)[number];
