import Link from "next/link";
import { PROTOCOLS } from "@/data/protocols";
import { FEEDS } from "@/data/feeds";
import { getCell, coverageSummary } from "@/data/coverage";
import { StatusBadge } from "@/components/StatusBadge";

// The summary matrix: all protocols as rows, one column per feed.
// Family grouping for versioned protocols is carried in the data; live TVL is fetched
// per-protocol from DefiLlama (wired in a follow-up - see src/lib/tvl.ts TODO).
export default function HomePage() {
  const s = coverageSummary();
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

      <div className="overflow-x-auto rounded border border-[var(--border)]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-white/5">
              <th className="sticky left-0 bg-[var(--bg)] px-3 py-2 text-left font-medium">
                Protocol
              </th>
              <th className="px-3 py-2 text-left font-medium text-[var(--muted)]">Category</th>
              {FEEDS.map((f) => (
                <th
                  key={f.id}
                  className="px-2 py-2 text-center text-[11px] font-medium text-[var(--muted)]"
                  title={f.focus}
                >
                  {f.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROTOCOLS.map((p) => (
              <tr key={p.id} className="border-b border-[var(--border)] hover:bg-white/5">
                <td className="sticky left-0 bg-[var(--bg)] px-3 py-2 font-medium">
                  <Link href={`/protocol/${p.id}`} className="hover:underline">
                    {p.name}
                  </Link>
                </td>
                <td className="px-3 py-2 text-xs text-[var(--muted)]">{p.category}</td>
                {FEEDS.map((f) => (
                  <td key={f.id} className="px-2 py-2 text-center">
                    <StatusBadge status={getCell(p.id, f.id).status} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-[var(--muted)]">
        ✓ covered · ◐ partial · ○ not yet covered · ? unassessed. Coverage status describes
        whether a feed covers a protocol - never how risky the protocol is. See the{" "}
        <Link href="/methodology" className="underline">
          methodology
        </Link>
        .
      </p>
    </div>
  );
}
