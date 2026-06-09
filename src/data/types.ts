// Core data model for NDRIA.
//
// Design principle (see CHARTER.md): NDRIA presents existing feed data verbatim.
// It does NOT synthesize, score, or rank risk. Coverage status describes whether a
// feed covers a protocol - never how risky the protocol is.

export type ProtocolCategory =
  | "Lending"
  | "DEX / AMM"
  | "Swap Aggregator"
  | "Yield / Vault"
  | "Liquid Staking";

export type FeedType =
  | "Rating"
  | "Dashboard"
  | "Monitoring"
  | "Research";

/**
 * Whether a feed covers a protocol. This is NOT a risk judgement.
 * - covered:  feed publishes assessment/data for this protocol
 * - partial:  feed covers some versions/markets/aspects but not the whole protocol
 * - not_yet:  feed does not currently cover this protocol
 * - unknown:  not yet assessed by NDRIA contributors
 */
export type CoverageStatus = "covered" | "partial" | "not_yet" | "unknown";

/** How a piece of data was obtained - surfaced in the UI as a provenance tag. */
export type Provenance = "onchain" | "feed-api" | "feed-manual" | "self-reported" | "defillama";

export interface Feed {
  id: string;
  name: string;
  /** One-line description of the feed's focus, shown verbatim on the methodology page. */
  focus: string;
  type: FeedType;
  url?: string;
  /** True when the feed exposes machine-readable output that can be automated (M2). */
  machineReadable: boolean;
  /** Rationale for inclusion in the registry (RFP Section 4 asks for this). */
  rationale?: string;
}

export interface ProtocolVersion {
  label: string; // e.g. "v3", "v4", "UniswapX"
  note?: string;
}

export interface Protocol {
  id: string;
  name: string;
  category: ProtocolCategory;
  /** Family grouping key for versioned protocols (e.g. uniswap groups v3/v4/UniswapX). */
  family?: string;
  versions?: ProtocolVersion[];
  notes?: string;
  /** DefiLlama slug used to pull live TVL at build/run time. */
  defillamaSlug?: string;
  /** Governance summary with provenance - populated from verifiable sources. */
  governance?: GovernanceDatum[];
  /** Security audit history (RFP protocol detail page). Sourced and linked, not fabricated. */
  audits?: Audit[];
  /** Incident / exploit history (RFP protocol detail page). Sourced and linked. */
  incidents?: Incident[];
}

export interface GovernanceDatum {
  label: string;
  value: string;
  provenance: Provenance;
  source?: string;
}

export interface Audit {
  auditor: string;
  date?: string; // ISO date
  scope?: string;
  url?: string;
}

export type IncidentSeverity = "critical" | "high" | "medium" | "low" | "info";

export interface Incident {
  date?: string; // ISO date
  summary: string;
  severity?: IncidentSeverity;
  /** Approx. funds at risk / lost, if reported (display string, e.g. "$1.2M"). */
  impact?: string;
  url?: string;
}

/**
 * A single cell in the protocol-by-feed matrix.
 * `verbatim` holds exactly what the feed says - never paraphrased or scored by NDRIA.
 */
export interface CoverageCell {
  protocolId: string;
  feedId: string;
  status: CoverageStatus;
  /** Verbatim rating/label as published by the feed (no synthesis). */
  verbatim?: string;
  /** Direct link to the feed's page for this protocol. */
  sourceUrl?: string;
  provenance?: Provenance;
  /** ISO date the cell was last verified by a contributor. */
  lastVerified?: string;
}
