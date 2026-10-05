/** Tiny class-name joiner — no utility library needed for this site. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Formats a stat for the count-up component and its static fallback. */
export function formatStat(
  value: number,
  { prefix = "", suffix = "" }: { prefix?: string; suffix?: string } = {},
): string {
  return `${prefix}${value.toLocaleString("en-US")}${suffix}`;
}
