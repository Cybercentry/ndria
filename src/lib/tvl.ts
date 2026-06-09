// Live TVL sourced from DefiLlama (RFP hard requirement; provenance tag: `defillama`).
//
// Uses the public DefiLlama API. `https://api.llama.fi/tvl/{slug}` returns the protocol's
// current TVL as a plain number. Results are cached/revalidated hourly via Next.js fetch
// caching so we stay within rate limits and pages render fast.

const DEFILLAMA_TVL = "https://api.llama.fi/tvl";
const REVALIDATE_SECONDS = 3600;

/** Current TVL for a single DefiLlama slug, or null if unavailable. */
export async function getTvl(slug: string | undefined): Promise<number | null> {
  if (!slug) return null;
  try {
    const res = await fetch(`${DEFILLAMA_TVL}/${slug}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data === "number" ? data : null;
  } catch {
    return null;
  }
}

/** Current TVL for many slugs, keyed by slug. Failed lookups resolve to null. */
export async function getTvlMap(
  slugs: (string | undefined)[]
): Promise<Record<string, number | null>> {
  const unique = Array.from(new Set(slugs.filter(Boolean) as string[]));
  const entries = await Promise.all(
    unique.map(async (slug) => [slug, await getTvl(slug)] as const)
  );
  return Object.fromEntries(entries);
}
