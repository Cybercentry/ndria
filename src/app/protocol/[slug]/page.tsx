import Link from "next/link";
import { notFound } from "next/navigation";
import { PROTOCOLS, PROTOCOLS_BY_ID } from "@/data/protocols";
import { FEEDS } from "@/data/feeds";
import { getCell, STATUS_LABEL } from "@/data/coverage";
import { StatusBadge } from "@/components/StatusBadge";
import { getTvl } from "@/lib/tvl";
import { formatUsd } from "@/lib/format";

export function generateStaticParams() {
  return PROTOCOLS.map((p) => ({ slug: p.id }));
}

const SEV_STYLE: Record<string, string> = {
  critical: "text-red-400",
  high: "text-orange-400",
  medium: "text-amber-400",
  low: "text-yellow-400",
  info: "text-gray-400",
};

// Per-protocol detail page: live TVL (DefiLlama), governance data with provenance tags,
// audit history, incident history, and feed cards with methodology one-liners and verbatim
// ratings. Sourced data only - empty sections say so rather than inventing entries.
export default async function ProtocolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const protocol = PROTOCOLS_BY_ID[slug];
  if (!protocol) notFound();

  const tvl = await getTvl(protocol.defillamaSlug);

  return (
    <div>
      <Link href="/" className="text-xs text-[var(--muted)] hover:underline">
        ← Matrix
      </Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">{protocol.name}</h1>
          <p className="text-sm text-[var(--muted)]">
            {protocol.category}
            {protocol.notes ? ` · ${protocol.notes}` : ""}
          </p>
        </div>
        <div className="text-right">
          <div className="font-mono text-xl">{formatUsd(tvl)}</div>
          <div className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
            TVL · DefiLlama
          </div>
        </div>
      </div>

      {protocol.versions && (
        <div className="mt-3 flex flex-wrap gap-2">
          {protocol.versions.map((v) => (
            <span
              key={v.label}
              className="rounded border border-[var(--border)] px-2 py-0.5 text-xs"
            >
              {v.label}
            </span>
          ))}
        </div>
      )}

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Governance
        </h2>
        {protocol.governance?.length ? (
          <table className="w-full text-sm">
            <tbody>
              {protocol.governance.map((g) => (
                <tr key={g.label} className="border-b border-[var(--border)]">
                  <td className="py-2 pr-4 text-[var(--muted)]">{g.label}</td>
                  <td className="py-2 pr-4">{g.value}</td>
                  <td className="py-2 text-xs">
                    <span className="rounded bg-white/10 px-1.5 py-0.5">{g.provenance}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-[var(--muted)]">
            Governance data pending - to be sourced from onchain / verifiable sources with
            provenance tags before launch.
          </p>
        )}
      </section>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Audit history
          </h2>
          {protocol.audits?.length ? (
            <ul className="space-y-2 text-sm">
              {protocol.audits.map((a, i) => (
                <li key={i} className="border-b border-[var(--border)] pb-2">
                  <span className="font-medium">{a.auditor}</span>
                  {a.date && <span className="text-[var(--muted)]"> · {a.date}</span>}
                  {a.scope && <div className="text-xs text-[var(--muted)]">{a.scope}</div>}
                  {a.url && (
                    <a href={a.url} className="text-xs text-[var(--muted)] underline">
                      report
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              Audit history pending - sourced and linked, not fabricated.
            </p>
          )}
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
            Incident history
          </h2>
          {protocol.incidents?.length ? (
            <ul className="space-y-2 text-sm">
              {protocol.incidents.map((inc, i) => (
                <li key={i} className="border-b border-[var(--border)] pb-2">
                  <span className={SEV_STYLE[inc.severity ?? "info"]}>
                    {(inc.severity ?? "info").toUpperCase()}
                  </span>
                  {inc.date && <span className="text-[var(--muted)]"> · {inc.date}</span>}
                  {inc.impact && <span className="text-[var(--muted)]"> · {inc.impact}</span>}
                  <div className="text-xs">{inc.summary}</div>
                  {inc.url && (
                    <a href={inc.url} className="text-xs text-[var(--muted)] underline">
                      source
                    </a>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--muted)]">
              No incidents recorded yet - sourced and linked, not fabricated.
            </p>
          )}
        </section>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          What the feeds say
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {FEEDS.map((feed) => {
            const cell = getCell(protocol.id, feed.id);
            return (
              <div key={feed.id} className="rounded border border-[var(--border)] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{feed.name}</span>
                  <StatusBadge status={cell.status} />
                </div>
                <p className="mt-1 text-xs text-[var(--muted)]">{feed.focus}</p>
                {cell.verbatim ? (
                  <blockquote className="mt-3 border-l-2 border-[var(--border)] pl-3 text-sm">
                    “{cell.verbatim}”
                    {cell.sourceUrl && (
                      <a
                        href={cell.sourceUrl}
                        className="ml-2 text-xs text-[var(--muted)] underline"
                      >
                        source
                      </a>
                    )}
                  </blockquote>
                ) : (
                  <p className="mt-3 text-xs text-[var(--muted)]">{STATUS_LABEL[cell.status]}.</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
