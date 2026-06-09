// Display helpers. Pure functions, safe in both server and client components.

/** Compact USD formatting for TVL: $1.23B / $45.6M / $789K / $123. */
export function formatUsd(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n)) return "-";
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${Math.round(n)}`;
}
