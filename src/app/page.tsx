import Link from "next/link";
import { PROTOCOLS } from "@/data/protocols";
import { FEEDS } from "@/data/feeds";
import { coverageSummary } from "@/data/coverage";
import { MatrixTable } from "@/components/MatrixTable";
import { getTvlMap } from "@/lib/tvl";

// Server component: fetches live TVL (DefiLlama) once, then hands data to the client
// MatrixTable, which provides sort / filter / family grouping. Family grouping for
// versioned protocols is carried in the data and surfaced as version badges + a toggle.
export default async function HomePage() {
  const s = coverageSummary();
  const tvl = await getTvlMap(PROTOCOLS.map((p) => p.defillamaSlug));

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-2xl font-semibold">Neutral DeFi Risk Intelligence Aggregator</h1>
        <p className="mt-2 max-w-3xl text-sm text-[var(--muted)]">
          What every major risk feed says about a protocol, side by side, verbatim. NDRIA
          aggregates - it does not score, rank, or synthesize. No single feed is canonical;
          the aggregation is the value.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--muted)]">
          <span>{PROTOCOLS.length} protocols</span>
          <span>{FEEDS.length} feeds</span>
          <span>{s.total} matrix cells</span>
          <span className="text-green-400">{s.covered} covered</span>
          <span className="text-amber-400">{s.partial} partial</span>
          <span>{s.not_yet} not yet</span>
          <span>{s.unknown} unassessed</span>
        </div>
      </section>

      <MatrixTable tvl={tvl} />

      <p className="mt-4 text-xs text-[var(--muted)]">
        ✓ covered · ◐ partial · ○ not yet covered · ? unassessed. Coverage status describes
        whether a feed covers a protocol - never how risky the protocol is. TVL is live from
        DefiLlama. See the{" "}
        <Link href="/methodology" className="underline">
          methodology
        </Link>
        .
      </p>
    </div>
  );
}
