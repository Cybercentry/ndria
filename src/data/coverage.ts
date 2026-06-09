import type { CoverageCell, CoverageStatus } from "./types";
import { PROTOCOLS } from "./protocols";
import { FEEDS } from "./feeds";

// Coverage matrix - one cell per (protocol, feed) pair.
//
// IMPORTANT: NDRIA never fabricates feed data. Cells are populated only from verified,
// linked sources by contributors (see CONTRIBUTING.md). Until a cell is assessed it is
// `unknown`. The RFP requires every cell to be explicitly assessed and labeled
// (covered / partial / not_yet) before M1 - that population is real work, not seed data.
//
// `CELLS` below holds the cells that HAVE been verified. `getCell` returns `unknown`
// for any pair not yet present, so the matrix is always complete and honest about gaps.
export const CELLS: CoverageCell[] = [
  // Example of a fully-populated, verifiable cell (illustrative format only):
  // {
  //   protocolId: "aave",
  //   feedId: "defiscan",
  //   status: "covered",
  //   verbatim: "Stage 1",
  //   sourceUrl: "https://www.defiscan.info/protocol/aave-v3",
  //   provenance: "feed-api",
  //   lastVerified: "2026-06-09",
  // },
];

const CELL_INDEX: Map<string, CoverageCell> = new Map(
  CELLS.map((c) => [`${c.protocolId}::${c.feedId}`, c])
);

export function getCell(protocolId: string, feedId: string): CoverageCell {
  return (
    CELL_INDEX.get(`${protocolId}::${feedId}`) ?? {
      protocolId,
      feedId,
      status: "unknown",
    }
  );
}

export const STATUS_LABEL: Record<CoverageStatus, string> = {
  covered: "Covered",
  partial: "Partial",
  not_yet: "Not yet covered",
  unknown: "Unassessed",
};

/** Summary counts used on the homepage to show assessment progress, not risk. */
export function coverageSummary() {
  let covered = 0,
    partial = 0,
    not_yet = 0,
    unknown = 0;
  for (const p of PROTOCOLS) {
    for (const f of FEEDS) {
      switch (getCell(p.id, f.id).status) {
        case "covered":
          covered++;
          break;
        case "partial":
          partial++;
          break;
        case "not_yet":
          not_yet++;
          break;
        default:
          unknown++;
      }
    }
  }
  const total = PROTOCOLS.length * FEEDS.length;
  return { covered, partial, not_yet, unknown, total };
}
