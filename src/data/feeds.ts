import type { Feed } from "./types";

// Feed registry - the illustrative set from RFP Section 4.
// The final registry is a proposal artifact; `rationale` documents inclusion logic
// and `machineReadable` flags which feeds are automatable in M2 vs. manually curated.
export const FEEDS: Feed[] = [
  {
    id: "defiscan",
    name: "DeFiScan",
    focus:
      "Decentralization maturity framework: who controls keys, upgrades, and admin powers",
    type: "Rating",
    url: "https://www.defiscan.info/",
    machineReadable: true,
    rationale: "Cited as a design reference in the RFP. Structured stage framework, automatable.",
  },
  {
    id: "curatorwatch",
    name: "CuratorWatch",
    focus:
      "Vault-level risk monitoring for Morpho curators, tracking allocation risk and curator behavior",
    type: "Dashboard",
    machineReadable: true,
    rationale: "Only feed with curator-level granularity for Morpho Vaults.",
  },
  {
    id: "blockanalitica",
    name: "BlockAnalitica",
    focus:
      "Quantitative on-chain risk dashboards for lending markets: liquidations, collateral health, market exposure",
    type: "Dashboard",
    url: "https://blockanalitica.com/",
    machineReadable: true,
    rationale: "Deep quantitative coverage of major lending markets (Aave, Spark, Morpho).",
  },
  {
    id: "defipunkd",
    name: "DeFiPunk'd",
    focus:
      "Multi-dimension risk registry: Control, Exit, Autonomy, Open Access, Verifiability via distributed LLM consensus",
    type: "Rating",
    machineReadable: true,
    rationale: "Distinct methodology (LLM consensus) maximizes diversity of coverage.",
  },
  {
    id: "pharos",
    name: "Pharos",
    focus: "Real-time risk monitoring and automated alerts for live protocol risk events",
    type: "Monitoring",
    machineReadable: true,
    rationale: "Event-driven monitoring complements static ratings.",
  },
  {
    id: "defisphere",
    name: "DeFi Sphere",
    focus:
      "Multi-dimensional protocol analysis covering technical, financial, and operational risk",
    type: "Rating",
    machineReadable: false,
  },
  {
    id: "defisaver",
    name: "DeFi Saver",
    focus: "Live loan health and liquidation statistics for leveraged DeFi positions",
    type: "Dashboard",
    url: "https://defisaver.com/",
    machineReadable: true,
  },
  {
    id: "credora",
    name: "Credora",
    focus: "Institutional-grade credit risk ratings for DeFi protocols and borrowers",
    type: "Rating",
    url: "https://credora.io/",
    machineReadable: false,
    rationale: "Institutional credit lens; ratings may be gated, likely manual curation.",
  },
  {
    id: "risklayer",
    name: "RiskLayer",
    focus:
      "Economic security middleware built on EigenLayer. Proof of Risk consensus for decentralized, validator-attested risk scores.",
    type: "Rating",
    machineReadable: true,
  },
  {
    id: "pigi",
    name: "pigi.finance",
    focus:
      "Vault analytics and risk-adjusted yield comparison across 50+ protocols. Tracks historical exploits, holder concentration, and risk-adjusted APY.",
    type: "Dashboard",
    machineReadable: true,
  },
  {
    id: "xerberus",
    name: "Xerberus",
    focus:
      "Independent risk rating protocol for DeFi vaults. 300+ subscores across 85+ mechanisms. Investor-focused and open-source.",
    type: "Rating",
    machineReadable: true,
    rationale: "Open-source methodology aligns with public-good positioning.",
  },
  {
    id: "zyfai",
    name: "Zyfai Risk",
    focus:
      "Real-time risk score dashboard for DeFi liquidity pools. Tracks risk metrics, TVL, APY, and security grades across pools.",
    type: "Dashboard",
    machineReadable: true,
  },
  {
    id: "llamarisk",
    name: "LlamaRisk",
    focus:
      "Protocol risk research and parameter recommendations for DeFi. Analytics and monitoring focused on collateral and governance risk.",
    type: "Research",
    url: "https://www.llamarisk.com/",
    machineReadable: false,
    rationale: "Long-form research; high signal but manual curation expected.",
  },
  {
    id: "philidor",
    name: "Philidor Analytics",
    focus:
      "Deterministic vault risk scoring across 700+ vaults. Three-vector framework: asset quality, platform code maturity, and governance controls. Open methodology.",
    type: "Rating",
    machineReadable: true,
    rationale: "Open, deterministic methodology with broad vault coverage.",
  },
];

export const FEEDS_BY_ID: Record<string, Feed> = Object.fromEntries(
  FEEDS.map((f) => [f.id, f])
);
