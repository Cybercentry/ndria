"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PROTOCOLS } from "@/data/protocols";
import { FEEDS } from "@/data/feeds";
import { getCell } from "@/data/coverage";
import { StatusBadge } from "@/components/StatusBadge";
import { formatUsd } from "@/lib/format";
import type { ProtocolCategory } from "@/data/types";

type SortKey = "name" | "category" | "tvl" | "coverage";
type SortDir = "asc" | "desc";

const CATEGORIES: ProtocolCategory[] = [
  "Lending",
  "DEX / AMM",
  "Swap Aggregator",
  "Yield / Vault",
  "Liquid Staking",
];

// Counts covered + partial cells for a protocol (assessment progress, never a risk score).
function coverageCount(protocolId: string): number {
  let n = 0;
  for (const f of FEEDS) {
    const s = getCell(protocolId, f.id).status;
    if (s === "covered" || s === "partial") n++;
  }
  return n;
}

export function MatrixTable({ tvl }: { tvl: Record<string, number | null> }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProtocolCategory | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("tvl");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [groupByFamily, setGroupByFamily] = useState(false);

  const tvlOf = (slug?: string) => (slug ? tvl[slug] ?? null : null);

  const rows = useMemo(() => {
    const filtered = PROTOCOLS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });

    const dir = sortDir === "asc" ? 1 : -1;
    const cmp = (a: (typeof PROTOCOLS)[number], b: (typeof PROTOCOLS)[number]) => {
      switch (sortKey) {
        case "name":
          return dir * a.name.localeCompare(b.name);
        case "category":
          return dir * a.category.localeCompare(b.category);
        case "tvl": {
          const av = tvlOf(a.defillamaSlug) ?? -1;
          const bv = tvlOf(b.defillamaSlug) ?? -1;
          return dir * (av - bv);
        }
        case "coverage":
          return dir * (coverageCount(a.id) - coverageCount(b.id));
      }
    };

    const sorted = [...filtered].sort(cmp);
    if (groupByFamily) {
      // Keep same-family protocols adjacent, families ordered by their best sort position.
      const order = new Map<string, number>();
      sorted.forEach((p, i) => {
        const key = p.family ?? p.id;
        if (!order.has(key)) order.set(key, i);
      });
      sorted.sort((a, b) => {
        const ka = a.family ?? a.id;
        const kb = b.family ?? b.id;
        if (ka === kb) return 0;
        return (order.get(ka)! - order.get(kb)!);
      });
    }
    return sorted;
  }, [query, category, sortKey, sortDir, groupByFamily, tvl]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" || key === "category" ? "asc" : "desc");
    }
  };

  const arrow = (key: SortKey) => (sortKey === key ? (sortDir === "asc" ? " ▲" : " ▼") : "");

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter protocols..."
          className="rounded border border-[var(--border)] bg-transparent px-2 py-1 text-sm outline-none focus:border-gray-400"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ProtocolCategory | "all")}
          className="rounded border border-[var(--border)] bg-[var(--bg)] px-2 py-1 text-sm"
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <input
            type="checkbox"
            checked={groupByFamily}
            onChange={(e) => setGroupByFamily(e.target.checked)}
          />
          Group by family
        </label>
        <span className="ml-auto text-xs text-[var(--muted)]">
          {rows.length} of {PROTOCOLS.length} protocols
        </span>
      </div>

      <div className="overflow-x-auto rounded border border-[var(--border)]">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-white/5">
              <th
                className="sticky left-0 z-10 cursor-pointer bg-[var(--bg)] px-3 py-2 text-left font-medium"
                onClick={() => toggleSort("name")}
              >
                Protocol{arrow("name")}
              </th>
              <th
                className="cursor-pointer px-3 py-2 text-left font-medium text-[var(--muted)]"
                onClick={() => toggleSort("category")}
              >
                Category{arrow("category")}
              </th>
              <th
                className="cursor-pointer px-3 py-2 text-right font-medium text-[var(--muted)]"
                onClick={() => toggleSort("tvl")}
                title="Live TVL from DefiLlama"
              >
                TVL{arrow("tvl")}
              </th>
              <th
                className="cursor-pointer px-2 py-2 text-center font-medium text-[var(--muted)]"
                onClick={() => toggleSort("coverage")}
                title="Feeds covering this protocol (covered or partial)"
              >
                Cov.{arrow("coverage")}
              </th>
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
            {rows.map((p) => (
              <tr key={p.id} className="border-b border-[var(--border)] hover:bg-white/5">
                <td className="sticky left-0 z-10 bg-[var(--bg)] px-3 py-2 font-medium">
                  <Link href={`/protocol/${p.id}`} className="hover:underline">
                    {p.name}
                  </Link>
                  {p.versions && (
                    <span className="ml-2 inline-flex gap-1 align-middle">
                      {p.versions.map((v) => (
                        <span
                          key={v.label}
                          className="rounded bg-white/10 px-1 text-[9px] text-[var(--muted)]"
                        >
                          {v.label}
                        </span>
                      ))}
                    </span>
                  )}
                </td>
                <td className="px-3 py-2 text-xs text-[var(--muted)]">{p.category}</td>
                <td className="px-3 py-2 text-right font-mono text-xs">
                  {formatUsd(tvlOf(p.defillamaSlug))}
                </td>
                <td className="px-2 py-2 text-center font-mono text-xs text-[var(--muted)]">
                  {coverageCount(p.id)}/{FEEDS.length}
                </td>
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
    </div>
  );
}
