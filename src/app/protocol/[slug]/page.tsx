import { FEEDS } from "@/data/feeds";

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold">Methodology</h1>

      <section className="mt-6 space-y-3 text-sm leading-relaxed">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          What NDRIA does
        </h2>
        <p>
          NDRIA aggregates what existing DeFi risk feeds publish about a protocol and shows
          it side by side, verbatim. The mental model is{" "}
          <strong>oracle diversity</strong>: no single feed should be canonical for something
          this important. The aggregation is the value.
        </p>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          What NDRIA does not do
        </h2>
        <p>
          NDRIA produces <strong>no risk scores or composite assessments of its own</strong>.
          Feed ratings are shown verbatim only. Coverage status (covered / partial / not yet
          covered) describes whether a feed covers a protocol - it is never a judgement about
          how risky a protocol is. Any future addition of composite scoring requires written
          agreement from the Ethereum Foundation, per the project charter.
        </p>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Data provenance
        </h2>
        <p>
          Every datum carries a provenance tag: <code>onchain</code> (read from contracts),{" "}
          <code>feed-api</code> (machine-readable feed output), <code>feed-manual</code>{" "}
          (curated from a feed without an API), <code>self-reported</code> (protocol's own
          claim), or <code>defillama</code> (TVL/metrics). Governance data is preferred from
          onchain or verifiable sources over self-reported.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Feed registry
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left text-[var(--muted)]">
              <th className="py-2 pr-4">Feed</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Focus</th>
              <th className="py-2">Automatable</th>
            </tr>
          </thead>
          <tbody>
            {FEEDS.map((f) => (
              <tr key={f.id} className="border-b border-[var(--border)] align-top">
                <td className="py-2 pr-4 font-medium">{f.name}</td>
                <td className="py-2 pr-4 text-[var(--muted)]">{f.type}</td>
                <td className="py-2 pr-4 text-[var(--muted)]">{f.focus}</td>
                <td className="py-2">{f.machineReadable ? "yes" : "manual"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
