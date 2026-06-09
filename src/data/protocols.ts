import type { Protocol } from "./types";

// Seed protocol list - the 20 protocols from RFP Section 3.
// Rankings must be verified against DefiLlama at time of build. `defillamaSlug`
// is used to fetch live TVL. Governance data is illustrative placeholder here and
// must be populated from onchain / verifiable sources before launch (see CHARTER.md).
export const PROTOCOLS: Protocol[] = [
  {
    id: "spark",
    name: "Spark",
    category: "Lending",
    defillamaSlug: "spark",
    notes: "Sky sub-protocol. SparkLend and sUSDS.",
    versions: [{ label: "SparkLend" }, { label: "sUSDS" }],
  },
  {
    id: "aave",
    name: "Aave",
    category: "Lending",
    family: "aave",
    defillamaSlug: "aave",
    notes: "Include v3 and v4.",
    versions: [{ label: "v3" }, { label: "v4" }],
  },
  {
    id: "morpho",
    name: "Morpho",
    category: "Lending",
    family: "morpho",
    defillamaSlug: "morpho",
    notes: "Core lending protocol. See also Morpho Vaults under Yield.",
  },
  {
    id: "fluid",
    name: "Fluid",
    category: "Lending",
    defillamaSlug: "fluid",
    notes: "Lending and DEX hybrid.",
  },
  {
    id: "gearbox",
    name: "Gearbox",
    category: "Lending",
    defillamaSlug: "gearbox",
    notes: "Credit account leverage protocol.",
  },
  {
    id: "euler",
    name: "Euler",
    category: "Lending",
    defillamaSlug: "euler",
    notes: "Modular vault lending.",
  },
  {
    id: "compound",
    name: "Compound",
    category: "Lending",
    family: "compound",
    defillamaSlug: "compound-finance",
    notes: "Include v2 and v3.",
    versions: [{ label: "v2" }, { label: "v3" }],
  },
  {
    id: "liquity",
    name: "Liquity",
    category: "Lending",
    family: "liquity",
    defillamaSlug: "liquity",
    notes: "Include v1 and v2. Immutable CDP protocol.",
    versions: [{ label: "v1" }, { label: "v2" }],
  },
  {
    id: "uniswap",
    name: "Uniswap",
    category: "DEX / AMM",
    family: "uniswap",
    defillamaSlug: "uniswap",
    notes: "Include v3, v4, and UniswapX.",
    versions: [{ label: "v3" }, { label: "v4" }, { label: "UniswapX" }],
  },
  {
    id: "curve",
    name: "Curve",
    category: "DEX / AMM",
    defillamaSlug: "curve-dex",
    notes: "Stablecoin and LST AMM infrastructure.",
  },
  {
    id: "balancer",
    name: "Balancer",
    category: "DEX / AMM",
    defillamaSlug: "balancer",
    notes: "Weighted and stable pools.",
  },
  {
    id: "cowswap",
    name: "CoW Swap",
    category: "Swap Aggregator",
    defillamaSlug: "cowswap",
    notes: "Intent-based DEX with MEV protection.",
  },
  {
    id: "1inch",
    name: "1inch",
    category: "Swap Aggregator",
    defillamaSlug: "1inch-network",
    notes: "DEX aggregator and limit order protocol.",
  },
  {
    id: "0x",
    name: "0x / Matcha",
    category: "Swap Aggregator",
    defillamaSlug: "0x",
    notes: "0x protocol and Matcha frontend.",
  },
  {
    id: "yearn",
    name: "Yearn Finance",
    category: "Yield / Vault",
    defillamaSlug: "yearn-finance",
    notes: "Automated yield vaults.",
  },
  {
    id: "mellow",
    name: "Mellow",
    category: "Yield / Vault",
    defillamaSlug: "mellow",
    notes: "Modular LRT vault infrastructure.",
  },
  {
    id: "morpho-vaults",
    name: "Morpho Vaults",
    category: "Yield / Vault",
    family: "morpho",
    defillamaSlug: "morpho",
    notes: "Curated MetaMorpho vaults.",
  },
  {
    id: "pendle",
    name: "Pendle",
    category: "Yield / Vault",
    defillamaSlug: "pendle",
    notes: "Yield tokenization and fixed-rate trading.",
  },
  {
    id: "lido",
    name: "Lido",
    category: "Liquid Staking",
    defillamaSlug: "lido",
    notes:
      "Largest ETH staking protocol. stETH is the most widely used DeFi collateral and yield source.",
  },
  {
    id: "rocketpool",
    name: "Rocket Pool",
    category: "Liquid Staking",
    defillamaSlug: "rocket-pool",
    notes: "Decentralized ETH staking. rETH.",
  },
];

export const PROTOCOLS_BY_ID: Record<string, Protocol> = Object.fromEntries(
  PROTOCOLS.map((p) => [p.id, p])
);
